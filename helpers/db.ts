import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";
import { DB_NAME, MONGO_URI } from "../config.ts";
// Intialize the plugin
await init();

// Connect to mongodb
const client = new MongoClient();

client.connectWithUri(MONGO_URI);

// Specifying the database name

const db = client.database(DB_NAME);

// Declare the collections here. Here we are using only one collection
const Dog = db.collection("dogs");
export { db, Dog };
