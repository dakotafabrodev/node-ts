import express, { Request, Response } from "express";
import { json } from "body-parser";
import { isRegularExpressionLiteral } from "typescript";
require("dotenv").config();

const jsonParser = json();
const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  // this will send all posts
});

router.get("/flagged", (req: Request, res: Response): void => {
  // this will send all unresolved posts
});

router.put(
  "/flag_for_review",
  jsonParser,
  (req: Request, res: Response): void => {
    // this route will take in a postId
    // update a post by id
    // send status code 200
    // send data with postSuccess and post
  }
);

router.put(
  "/submit_report",
  jsonParser,
  (req: Request, res: Response): void => {
    // this route will expect req.body to have updatedPostBody, postId, and moderatedBy
    // update isInappropriate, isResolved, and moderatedBy
    // get next flagged report
    // find moderator through moderatedBy
    // update moderator.activeReport with next report & isAvailableForReport: false & increment moderationCount by 1
    // autoAssign reports (possibly move this to its own route?? router.put("/assign"))
    // send status code 200
    // send data with postData and moderatorData
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
