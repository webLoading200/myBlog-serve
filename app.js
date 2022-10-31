const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koaBody = require('koa-body');
const index = require('./routes/index')
const users = require('./routes/users')
const upload = require('./routes/upload')
const blog = require('./routes/blog')
const path = require("path")
// error handler
onerror(app)

app.use(cors({
	origin: function(ctx) { //设置允许来自指定域名请求
		return '*'
		// if (ctx.url === '/test') {
		// 	; // 允许来自所有域名请求
		// }
		// return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
	},
	maxAge: 5, //指定本次预检请求的有效期，单位为秒。
	credentials: true, //是否允许发送Cookie
	allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
	allowHeaders: ['*'], //设置服务器支持的所有头信息字段
	exposeHeaders: ['*'] //设置获取其他自定义字段
}))

// middlewares
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
	extension: 'pug'
}))
app.use(koaBody({
	multipart: true,
	formidable: {
		//上传文件存储目录
		uploadDir:  path.join(__dirname, `/public/uploads/`),
		//允许保留后缀名
		keepExtensions: true,
		multipart: true,
	}
  })
)
// logger
app.use(async (ctx, next) => {
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
});

module.exports = app
