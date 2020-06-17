const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const user = require('./routes/view/user')

const { REDIS_CONF } = require('./conf/db')
const session=require('koa-generic-session')
const redisStore=require('koa-redis')


const userAPIRouter=require('./routes/api/user')


// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
//session 配置
app.keys=["userfnfer1323Ud@#_!"]


app.use(session({
  key:"weibo.sid",
  prefix:'weibo:sess',//redis.key浅醉
  cookie:{
    path:"/",
    httpOnly:true,
    maxAge:24*60*60*1000,

  },
  store:redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })

}))


// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())

app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
