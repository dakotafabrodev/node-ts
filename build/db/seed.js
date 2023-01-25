"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
require("dotenv").config();
const postSeed = [
    {
        content: "I am inappropriate!",
        author: "author1",
        reportedInappropriate: true,
        isInappropriate: false,
        isResolved: false,
        moderatedBy: "",
    },
    {
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
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _1.db.createCollection(_1.DB_COLLECTIONS.posts);
        yield _1.db.createCollection(_1.DB_COLLECTIONS.moderators);
        yield _1.db.createCollection(_1.DB_COLLECTIONS.removed);
        const seedPosts = yield _1.db
            .collection(_1.DB_COLLECTIONS.posts)
            .insertMany(postSeed);
        const seedModerators = yield _1.db
            .collection(_1.DB_COLLECTIONS.moderators)
            .insertMany(moderatorSeed);
        return { seedMsg: seedPosts, moderatorMsg: seedModerators };
    }
    catch (x) {
        console.error(x);
        return { error: x };
    }
});
