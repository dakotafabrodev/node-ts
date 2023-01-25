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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = exports.DB_COLLECTIONS = exports.DB_NAME = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv").config();
exports.DB_NAME = process.env.NODE_ENV === "production"
    ? process.env.DB_NAME_PROD
    : process.env.DB_NAME_DEV2;
exports.DB_COLLECTIONS = process.env.NODE_ENV === "production"
    ? { posts: "posts", moderators: "moderators", removed: "removed" }
    : {
        posts: "posts-test",
        moderators: "moderators-test",
        removed: "removed-test",
    };
exports.client = new mongodb_1.MongoClient(process.env.MONGO_URI);
exports.db = exports.client.db(exports.DB_NAME);
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        return { status: 200, msg: "OK - Connected to MongoDB" };
    }
    catch (x) {
        console.error(x);
        return { status: 400, msg: "Bad Request - Could Not Connect" };
    }
});
exports.default = connectToMongoDB;
