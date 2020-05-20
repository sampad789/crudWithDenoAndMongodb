import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes.ts";

const port = 5000;
const app = new Application();
//Middlewares
app.use(router.routes());
// Allow all methods i.e CRUD Functionality : PART OF DENO'S SECURITY FEATURE
app.use(router.allowedMethods());

console.log(`Deno Server Running on Port ${port}`);

//Top level await: No need to wrap in an async >  Feature of deno
await app.listen({ port });
