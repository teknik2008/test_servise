let Koa = require('koa');
let IO = require('koa-socket-2');
const middleware = require('./middleware')
const app = new Koa();
const io = new IO();
io.attach(app);
app.use(async (ctx,next)=>{
    ctx.io=io
    await next()
})
middleware(app)
app.listen(3000, () => console.log("server started 3000"));

module.exports = app;