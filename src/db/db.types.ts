import { Document, Model } from "mongoose";

export interface IPost {
  content: string;
  author: string;
  reportedInappropriate: boolean;
  isInappropriate: boolean;
  isResolved: boolean;
  moderatedBy: object; // will be an array that holds a string or a MongoDB ObjectId object
}

export interface IModerator {
  name: string;
  activeReport: object; // will be an array that holds a IPostDocument
  moderationCount: number;
  isAvailableForReport: boolean;
}

export interface IPostModel extends IPost, Document {}
export interface IPostDocument extends Model<IPostDocument> {}

export interface IModeratorModel extends IModerator, Document {}
export interface IModeratorDocument extends Model<IModeratorDocument> {}
