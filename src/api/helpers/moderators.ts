import { ObjectId } from "mongodb";
import { IModeratorDocument, IPostDocument } from "../../db/db.types";
import { ModeratorModel } from "../../db/db.model";
import { DB_COLLECTIONS, db } from "../../db";
import { updatePost } from "./reports";
require("dotenv").config();

export const getModerator = async (
  _id: string
): Promise<IModeratorDocument> => {
  let result: IModeratorDocument[] = [];
  const moderator = await db
    .collection(DB_COLLECTIONS.moderators)
    .find({ _id: new ObjectId(_id) });

  await moderator.forEach((moderator) => {
    result.push(new ModeratorModel(moderator));
  });

  return result[0];
};

export const getAvailableModerators = async (): Promise<
  IModeratorDocument[]
> => {
  let result: IModeratorDocument[] = [];
  const moderators = await db
    .collection(DB_COLLECTIONS.moderators)
    .find({ isAvailableForReport: true });

  await moderators.forEach((moderator) => {
    result.push(new ModeratorModel(moderator));
  });

  return result;
};

export const getAllModerators = async (): Promise<IModeratorDocument[]> => {
  let result: IModeratorDocument[] = [];
  const moderators = await db.collection(DB_COLLECTIONS.moderators).find();

  await moderators.forEach((moderator) => {
    result.push(new ModeratorModel(moderator));
  });

  return result;
};

export const updateModerator = async (
  updatedModeratorObj: IModeratorDocument
): Promise<IModeratorDocument> => {
  const { _id } = updatedModeratorObj;
  const moderatorUpdate = await db
    .collection(DB_COLLECTIONS.moderators)
    .updateOne(
      {
        _id: new ObjectId(_id),
      },
      updatedModeratorObj
    );

  const updatedModerator = await getModerator(_id);

  return updatedModerator;
};

export const autoAssignReports = async (
  unresolvedPosts: IPostDocument[],
  availableModerators: IModeratorDocument[]
): Promise<object> => {
  if (availableModerators.length <= 0)
    return { msg: "No available moderators" };

  await availableModerators.forEach(async (moderator, index): Promise<void> => {
    const post = unresolvedPosts[index];
    moderator.pushReport(post._id);
    moderator.isAvailable();
    post.setModeratedBy(moderator._id);

    await updateModerator(moderator);
    await updatePost(post);
  });

  return { msg: "Unresolved posts auto-assigned to available moderators." };
};
