import express, { Request, Response } from "express";
import { json } from "body-parser";
import {
  getAllPosts,
  getNextFlaggedReport,
  getPost,
  getUnresolvedPosts,
} from "./helpers/reports";
import { db, DB_COLLECTIONS } from "../db";
import { ObjectId } from "mongodb";
import { getModerator } from "./helpers/moderators";
import { setReportedInappropriate, setResolved } from "../db/db.methods";
require("dotenv").config();

const jsonParser = json();
const router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const allPosts = await getAllPosts();

    res.status(200).json({ allPosts: allPosts });
  } catch (x) {
    console.error(x);
    res.status(400).json({ error: x });
  }
});

router.get("/flagged", async (req: Request, res: Response): Promise<void> => {
  try {
    const allUnresolved = await getUnresolvedPosts();

    res.status(200).json({ unresolved: allUnresolved });
  } catch (x) {
    console.error(x);
    res.status(400).json({ error: x });
  }
});

router.put(
  "/flag_for_review",
  jsonParser,
  async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.body;
    try {
      const currentPost = await getPost(postId);
      currentPost.setReportedInappropriate();

      const updatedPost = await db.collection(DB_COLLECTIONS.posts).updateOne(
        {
          _id: new ObjectId(postId),
        },
        currentPost
      );

      const updatedPostToSend = await getPost(postId);

      res
        .status(200)
        .json({ data: { postSuccess: updatedPost, post: updatedPostToSend } });
    } catch (x) {
      console.error(x);
      res.status(400).json({ error: x });
    }
  }
);

router.put(
  "/submit_report",
  jsonParser,
  async (req: Request, res: Response): Promise<void> => {
    const { updatedPostBody, postId, moderatedBy } = req.body;
    try {
      const currentPost = await getPost(postId);
      currentPost.setReportedInappropriate();
      currentPost.setModeratorDecision(updatedPostBody.isInappropriate);
      currentPost.setResolved();
      currentPost.setModeratedBy(moderatedBy);

      const updatedPost = await db.collection(DB_COLLECTIONS.posts).updateOne(
        {
          _id: new ObjectId(postId),
        },
        currentPost
      );

      const nextReport = await getNextFlaggedReport();

      const currentModerator = await getModerator(moderatedBy);
      currentModerator.pushReport(nextReport._id);
      currentModerator.isAvailable();
      currentModerator.incrementModerationCount();

      const updatedModerator = await db
        .collection(DB_COLLECTIONS.moderators)
        .updateOne(
          {
            _id: new ObjectId(moderatedBy),
          },
          currentModerator
        );

      const updatedModeratorToSend = await getModerator(moderatedBy);
      const updatedPostToSend = await getPost(postId);

      res.status(200).json({
        data: {
          postData: { postSuccess: updatedPost, post: updatedPostToSend },
          moderatorData: {
            moderatorSuccess: updatedModerator,
            moderator: updatedModeratorToSend,
          },
        },
      });
    } catch (x) {
      console.error(x);
      res.status(400).json({ error: x });
    }
  }
);

router.post("/removed", jsonParser, (req: Request, res: Response): void => {
  // this route will add an inappropriate resolved post to a REMOVED db collection
  // get req.body
  // add to mongodb
  // send response
});

router.delete("/", jsonParser, (req: Request, res: Response): void => {
  // this route will delete a post from Posts collection
  // get req.body.postId
  // delete from mongodb collection
  // send response
});

export default router;
