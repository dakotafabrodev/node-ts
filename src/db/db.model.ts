import { model } from "mongoose";
import { IPostDocument, IModeratorDocument } from "./db.types";
import { PostSchema, ModeratorSchema } from "./db.schema";
import { DB_COLLECTIONS } from ".";

export const PostModel = model<IPostDocument>(DB_COLLECTIONS.posts, PostSchema);
export const MoeratorModel = model<IModeratorDocument>(
  DB_COLLECTIONS.moderators,
  ModeratorSchema
);
