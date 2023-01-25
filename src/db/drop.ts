import { DB_COLLECTIONS, db } from ".";

const drop = async (): Promise<object> => {
  try {
    await db.collection(DB_COLLECTIONS.posts).drop();
    await db.collection(DB_COLLECTIONS.moderators).drop();
    await db.collection(DB_COLLECTIONS.removed).drop();

    return { msg: "Post, Moderator, and Removed collections dropped from db" };
  } catch (x) {
    return { error: x };
  }
};

drop();
