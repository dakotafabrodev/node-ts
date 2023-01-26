import { ObjectId } from "mongodb";
import { DB_COLLECTIONS, db } from ".";
require("dotenv").config();

const postSeed = [
  {
    _id: new ObjectId(process.env.TEST_OBJ_1),
    content: "I am inappropriate!",
    author: "author1",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    _id: new ObjectId(process.env.TEST_OBJ_2),
    content: "I am inappropriate!!",
    author: "author2",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    content: "I am inappropriate!!!",
    author: "author3",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    content: "I am inappropriate!!!!",
    author: "author4",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    content: "I am inappropriate!!!!!",
    author: "author5",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },

  {
    content: "You're so great!",
    author: "author6",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    content: "I love you!!",
    author: "author7",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    content: "Yassssss!",
    author: "author8",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    content: "You got this!",
    author: "author9",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
  {
    content: "Keep going, friend.",
    author: "author10",
    reportedInappropriate: true,
    isInappropriate: false,
    isResolved: false,
    moderatedBy: "",
  },
];

const moderatorSeed = [
  {
    _id: new ObjectId(process.env.TEST_MOD_1),
    name: "mod1",
    activeReport: [],
    moderationCount: 0,
    isAvailableForReport: true,
  },
  {
    name: "mod2",
    activeReport: [],
    moderationCount: 0,
    isAvailableForReport: true,
  },
  {
    name: "mod3",
    activeReport: [],
    moderationCount: 0,
    isAvailableForReport: true,
  },
];

const seed = async (): Promise<object> => {
  try {
    await db.createCollection(DB_COLLECTIONS.posts);
    await db.createCollection(DB_COLLECTIONS.moderators);
    await db.createCollection(DB_COLLECTIONS.removed);

    const seedPosts = await db
      .collection(DB_COLLECTIONS.posts)
      .insertMany(postSeed);

    const seedModerators = await db
      .collection(DB_COLLECTIONS.moderators)
      .insertMany(moderatorSeed);

    console.log("Database seeded 🌱");
    return { seedMsg: seedPosts, moderatorMsg: seedModerators };
  } catch (x) {
    console.error(x);
    return { error: x };
  }
};

seed();
