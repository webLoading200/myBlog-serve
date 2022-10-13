const router = require("koa-router")();
const db = require("../public/javascripts/sql");
router.post("/", async (ctx, next) => {
  let data = await db("select * from user");
  console.log(data);
  await ctx.render("index", {
    title: "Hello Koa 2!" + data[0].name,
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.post("/json", async (ctx, next) => {
	console.log(ctx.request.body)
  ctx.body = {
    title: "koa2 json",
	code:200
  };
});

module.exports = router;
