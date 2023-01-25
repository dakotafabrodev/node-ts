import { MongoClient } from "mongodb";
import mongoose from "mongoose";
require("dotenv").config();

export const DB_NAME =
  process.env.NODE_ENV === "production"
    ? process.env.DB_NAME_PROD
    : process.env.DB_NAME_DEV2;

export const DB_COLLECTIONS =
  process.env.NODE_ENV === "production"
    ? { posts: "posts", moderators: "moderators", removed: "removed" }
    : {
        posts: "posts-test",
        moderators: "moderators-test",
        removed: "removed-test",
      };

export const client = new MongoClient(process.env.MONGO_URI!);
export const db = client.db(DB_NAME);

const connectToMongoDB = async (): Promise<object> => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    return { status: 200, msg: "OK - Connected to MongoDB" };
  } catch (x) {
    console.error(x);
    return { status: 400, msg: "Bad Request - Could Not Connect" };
  }
};

export default connectToMongoDB();
