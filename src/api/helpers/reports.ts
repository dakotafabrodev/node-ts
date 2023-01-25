import { ObjectId } from "mongodb";
import { IPost, IPostDocument, IPostModel } from "../../db/db.types";
import { PostModel } from "../../db/db.model";
import { DB_COLLECTIONS, db } from "../../db";
require("dotenv").config();

export const getPost = async (_id: string): Promise<IPostDocument> => {
  let result: IPostDocument[] = [];
  const post = await db
    .collection(DB_COLLECTIONS.posts)
    .find({ _id: new ObjectId(_id) });
  await post.forEach((post) => {
    result.push(new PostModel(post));
  });

  return result[0];
};

export const getAllPosts = async (): Promise<IPostDocument[]> => {
  let result: IPostDocument[] = [];
  const allReports = await db.collection(DB_COLLECTIONS.posts).find();

  await allReports.forEach((report) => {
    result.push(new PostModel(report));
  });

  return result;
};

export const getUnresolvedPosts = async (): Promise<IPostDocument[]> => {
  let result: IPostDocument[] = [];
  const unresolvedPosts = await db
    .collection(DB_COLLECTIONS.posts)
    .find({ reportedInappropriate: true, isResolved: false });

  await unresolvedPosts.forEach((post) => {
    result.push(new PostModel(post));
  });

  return result;
};

export const getNextFlaggedReport = async (): Promise<IPostDocument> => {
  const unresolvedPosts = await getUnresolvedPosts();
  return unresolvedPosts[0];
};

export const updatePost = async (
  updatedPostObj: IPostDocument
): Promise<IPostDocument> => {
  const { _id } = updatedPostObj;
  const postUpdate = await db.collection(DB_COLLECTIONS.posts).updateOne(
    {
      _id: new ObjectId(_id),
    },
    updatedPostObj
  );
  const updatedPost = await getPost(_id);

  return updatedPost;
};

export const createPost = async (
  newPostObj: IPostDocument
): Promise<object> => {
  const newPost = await db
    .collection(DB_COLLECTIONS.posts)
    .insertOne(new PostModel(newPostObj));

  return newPost;
};
