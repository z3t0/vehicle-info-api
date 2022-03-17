import { default as Koa } from "koa";
import { default as KoaJson} from "koa-json";


const app = new Koa();

// Setup middleware.
// 1. Encode response as json
app.use(KoaJson());

// response
app.use(ctx => {
    console.log("received request");
    ctx.body = {message: 'Hello Koa'};
});


function start() {
    app.listen(3000);
    console.log("server started on port 3000");
}

export { start };