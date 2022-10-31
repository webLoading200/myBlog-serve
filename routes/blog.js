const router = require("koa-router")();
const db = require("../public/javascripts/sql");
router.prefix("/blog");
router.get("/getBlogList", async(ctx, next)=> {
	let data = await db("select * from bloglist");
	console.log(data)
	ctx.body = {
		code:200,
		state:200,
		resule:"success",
		data:data
	}
});


module.exports = router;
