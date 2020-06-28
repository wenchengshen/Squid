const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const user = require('./routes/view/user')
const blog = require('./routes/view/blog')
const { REDIS_CONF } = require('./conf/db')
const session=require('koa-generic-session')
const redisStore=require('koa-redis')
const path=require('path')

const userAPIRouter=require('./routes/api/user')
const blogIndexAPIRouter=require('./routes/api/blog')

const util=require('./routes/api/util')
// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(require('koa-static')(path.join(__dirname,'..','uploadFiles' )))

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



// routes
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
//主页
app.use(blogIndexAPIRouter.routes(), blogIndexAPIRouter.allowedMethods())
//用户
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods())
app.use(util.routes(),util.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
