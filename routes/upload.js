const router = require("koa-router")();
const multer = require('@koa/multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/upload')
    },
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({ storage })
router.prefix("/upload");

router.get("/", function (ctx, next) {
  ctx.body = "this is a users response!";
  
});

router.post("/uploadMd",upload.single('file'), function (ctx, next) {
  console.log(ctx.request.files.file);
  ctx.body = "this is a users/bar response";
});

module.exports = router;
