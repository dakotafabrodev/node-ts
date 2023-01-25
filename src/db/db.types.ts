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

export interface IPostDocument extends IPost, Document {
  setModeratedBy: (this: IPostDocument, moderatedBy: string) => string;
}
export interface IPostModel extends Model<IPostDocument> {}

export interface IModeratorDocument extends IModerator, Document {
  isAvailable: (this: IModeratorDocument) => Promise<boolean>;
  popReport: (this: IModeratorDocument) => Promise<IPostDocument>;
  pushReport: (this: IModeratorDocument, reportedPost: IPostDocument) => string;
  incrementModerationCount: (this: IModeratorDocument) => number;
}
export interface IModeratorModel extends Model<IModeratorDocument> {}
