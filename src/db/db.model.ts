import { model } from "mongoose";
import { IPostDocument } from "./db.types";
import { IModeratorDocument } from "./db.types";
import { PostSchema } from "./db.schema";
import { ModeratorSchema } from "./db.schema";

export const PostModel = model<IPostDocument>("post", PostSchema);
export const ModeratorModel = model<IModeratorDocument>(
  "moderator",
  ModeratorSchema
);
