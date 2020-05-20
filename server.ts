import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";
import "https://deno.land/x/dotenv/mod.ts";

const port = 5000;

const app = new Application();
//Middlewares
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Deno Server Running on Port ${port}`);

//Top level await: No need to wrap in an async >  Feature of deno
await app.listen({ port });
