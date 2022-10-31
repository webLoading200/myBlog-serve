const router = require("koa-router")();
const multer = require('@koa/multer')
const fs = require("fs")
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, '../public/upload')
	},
	filename: function(req, file, cb) {
		const fileFormat = (file.originalname).split('.')
		cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
	}
})
const upload = multer({
	storage
})
router.prefix("/upload");

router.get("/", function(ctx, next) {
	ctx.body = "this is a users response!";

});

router.post('/uploadMd', async (ctx, next) => {
	var str = ctx.request.files.file.filepath
	console.log(str)
	var pathArr = str.split("\\uploads\\")
	var basicUrl = "http://localhost:8888/" //为基础路径
	console.log(pathArr)
	ctx.body = {
		// filename: ctx.request.files.file,
		code: 200,
		state: 200,
		resule: "success",
		path: basicUrl + 'uploads/' + pathArr[1]
	}
})
router.get('/getMd', async (ctx, next) => {
	fs.readFile(`../public/uploads${ctx.request.query.url}`, 'utf-8', (err, data) => {
		//利用marked进行数据处理
		console.log(err)
		console.log(`../public/uploads${ctx.request.query.url}`)
		console.log(data)
		ctx.body = {
			// filename: ctx.request.files.file,
			code: 200,
			state: 200,
			resule: "success",
			// data: data.toString()
		}
	})
})
module.exports = router;
