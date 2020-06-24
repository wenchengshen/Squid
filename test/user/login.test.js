const server = require('../server')

// 用户信息
const username = `u_${Date.now()}`
const password = `p_${Date.now()}`


const testUser = {
    username,
    password,
    nickname: username,
    gender: 1
}

// 存储 cookie
let COOKIE = ''

test("注册，不一定成功",async ()=>{
    const res=await server.post('/api/user/register')
        .send(testUser)
    expect(res.body.errno).toBe(0)
})


test('验证是否存在用户名，应该成功', async () => {
    const res = await server
        .post('/api/user/isExist')
        .send(username)
    expect(res.body.errno).toBe(10003)
})


// 登录
test('登录，应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            username,
            password
        })
    expect(res.body.errno).toBe(0)

    // 获取 cookie
    // COOKIE = res.headers['set-cookie'].join(';')
})