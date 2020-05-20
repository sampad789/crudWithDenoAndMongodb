import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getDogs,
  getDog,
  updateDog,
  deleteDog,
  addDog,
} from "./controllers/dogs.ts";
const router = new Router();

//Destructuring response from context i.e ctx
router
  .get("/api/v1/dogs", getDogs)
  .get("/api/v1/dogs/:id", getDog)
  .post("/api/v1/dogs", addDog)
  .put("/api/v1/dogs/:id", updateDog)
  .delete("/api/v1/dogs/:id", deleteDog);

export default router;
