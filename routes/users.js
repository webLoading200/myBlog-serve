const router = require("koa-router")();
const db = require("../public/javascripts/sql");
router.prefix("/users");

router.get("/userInfo", async(ctx, next)=> {
	let data = await db("select * from user");
	console.log(data)
	ctx.body = {
		code:200,
		state:200,
		resule:"success",
		data:data
	}
});
router.get("/selfInfo",async(ctx, next)=>  {
	let data = await db("select * from user where  userId = 'laiwei'");
	console.log(data)
	ctx.body = {
		code:200,
		state:200,
		resule:"success",
		data:data[0]
	}
});

router.get("/bar", async(ctx, next)=>  {
	console.log(ctx);

	ctx.body = "this is a users/bar response";
});

module.exports = router;
