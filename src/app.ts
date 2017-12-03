import Koa from "koa";
import IO from "koa-socket-2";
const app = new Koa();
// response
app.use(async (ctx) => {
  ctx.body = "Hello World";
});

// tslint:disable-next-line:no-console
app.listen(3000, () => console.log("server started 3000"));

export default app;
