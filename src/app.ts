import { default as Koa } from "koa";

const app = new Koa();

// response
app.use(ctx => {
    console.log("received request");
    ctx.body = 'Hello Koa';
});


function start() {
    app.listen(3000);
    console.log("server started on port 3000");
}

export { start };