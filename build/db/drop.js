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
const drop = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield _1.db.collection(_1.DB_COLLECTIONS.posts).drop();
        yield _1.db.collection(_1.DB_COLLECTIONS.moderators).drop();
        yield _1.db.collection(_1.DB_COLLECTIONS.removed).drop();
        return { msg: "Post, Moderator, and Removed collections dropped from db" };
    }
    catch (x) {
        return { error: x };
    }
});
drop();
