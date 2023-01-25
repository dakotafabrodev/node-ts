import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

const PostSchema = new Schema({
  content: String,
  author: String,
  reportedInappropriate: Boolean,
  isInappropriate: Boolean,
  isResolved: Boolean,
  moderatedBy: [{ type: ObjectId || String, maxLength: 1 }],
});

const ModeratorSchema = new Schema({
  name: String,
  activeReport: Object,
  moderationCount: Number,
  isAvailableForReport: Boolean,
});

export { PostSchema, ModeratorSchema };
