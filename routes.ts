import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

//Destructuring response from context i.e ctx
router.get("/api/v1/dogs", ({ response }: { response: any }) => {
  response.body = "All Dogs ";
});

export default router;
