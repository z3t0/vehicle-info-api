import { default as Koa } from "koa";
import { default as KoaJson} from "koa-json";
import * as Lib from "./lib";


const app = new Koa();

// Setup middleware.
// 1. Encode response as json
app.use(KoaJson());

// response
app.use(async (ctx) => {
    console.log("received request");

    const aggregate =
        await Lib.fetchAndGenerateAggregateForAllVehicles();

    ctx.body = aggregate;
});


async function start() {
    app.listen(3000);
    console.log("server started on port 3000");
}

export { start };