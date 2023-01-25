import request from "supertest";
import app from "../src/index";
import connectToMongoDB from "../src/db";
import { PostModel, ModeratorModel } from "../src/db/db.model";
import { ObjectId } from "mongodb";
import { createExportAssignment } from "typescript";
import { createPost } from "../src/api/helpers/reports";

describe("API Endpoints Tests", (): void => {
  describe("GET ROUTES", (): void => {
    test("GET / sample GET route", async (): Promise<void> => {
      const res = await request(app).get("/");

      expect(res.body).toEqual({
        msg: "We out here, Lex!",
        api_docs: "this will be a link to a notable shared note",
      });
    });

    test("GET /api/reports - gets all reports", async (): Promise<void> => {
      const res = await request(app).get("/api/reports");

      expect(Array.isArray(res.body.allPosts)).toBe(true);
    });

    test("GET /api/reports/flagged - gets all flagged reports", async (): Promise<void> => {
      const res = await request(app).get("/api/reports/flagged");

      expect(Array.isArray(res.body.unresolved)).toBe(true);
    });

    test("GET /api/moderators - gets all moderators", async (): Promise<void> => {
      const res = await request(app).get("/api/moderators");

      expect(Array.isArray(res.body.allModerators)).toBe(true);
    });

    test("GET * - catch all route", async (): Promise<void> => {
      const res = await request(app).get("/funky_route");

      expect(res.body).toEqual({
        msg: "No routes matched!",
        api_docs: "this will be a link to a notable shared note",
      });
    });

    describe("PUT ROUTES", (): void => {
      test("PUT /api/reports/flag_for_review - updates a post to flag for review", async (): Promise<void> => {
        const post = new PostModel({
          content: "Keep going, friend!",
          author: "author100",
          reportedInappropriate: false,
          isInappropriate: false,
          isResolved: false,
          moderatedBy: "",
        });

        await createPost(post);

        const res = await request(app)
          .put("/api/reports/flag_for_review")
          .send({ postId: post._id });

        expect(res.status).toEqual(200);
        expect(res.body.data).toHaveProperty("postSuccess");
        expect(res.body.data).toHaveProperty("post");
        expect(res.body.data.post).toHaveProperty("_id");
      });
    });

    describe("PUT /api/reports/submit_report", (): void => {
      const postId = "63d00f18bd995650e2b8321e";
      const moderatorId = "63d00f1bbd995650e2b8322a";
      const updatedPost = {
        content: "I am inappropriate!",
        author: "author1",
        reportedInappropriate: false,
        isInappropriate: false,
        isResolved: false,
        moderatedBy: moderatorId,
      };

      test("updates a post's reportedInappropriate, isInappropriate, and isResolved properties", async (): Promise<void> => {
        const res = await request(app).put("/api/reports/submit_report").send({
          updatedPostBody: updatedPost,
          postId: postId,
          moderatedBy: moderatorId,
        });

        expect(res.status).toEqual(200);
        expect(res.body.data.postData.postSuccess.acknowledged).toEqual(true);
        expect(res.body.data.postData.post.reportedInappropriate).toEqual(true);
        expect(res.body.data.postData.post.isInappropriate).toEqual(false);
        expect(res.body.data.postData.post.isResolved).toEqual(true);
      });
    });
  });

  describe("MongoDB", (): void => {
    describe("Testing connectToMongoDB()", (): void => {
      test("connectToMongoDB returns a success object", async (): Promise<void> => {
        expect(await connectToMongoDB()).toEqual({
          status: 200,
          msg: "OK - Connected to MongoDB",
        });
      });
    });
  });

  describe("Instance Methods for Model Objects", (): void => {
    describe("Testing Moderator Methods", (): void => {
      test("isAvailable returns false if activeReport contains an object", (): void => {
        const testPostObj = new PostModel({
          content: "I am inappropriate!",
          author: "author1",
          reportedInappropriate: true,
          inappropriate: false,
          isResolved: true,
          moderatedBy: "",
          assignedTo: "",
        });

        const testModeratorObj = new ModeratorModel({
          name: "mod1-test",
          activeReport: [testPostObj._id],
          moderationCount: 0,
          available: true,
        });

        expect(Array.isArray(testModeratorObj.activeReport)).toEqual(true);
        expect(testModeratorObj.isAvailable()).toEqual(false);
      });

      test("isAvailable returns true if activeReport is empty", (): void => {
        const testModeratorObj = new ModeratorModel({
          name: "mod1-test",
          activeReport: [],
          moderationCount: 0,
          available: true,
        });

        expect(Array.isArray(testModeratorObj.activeReport)).toEqual(true);
        expect(testModeratorObj.isAvailable()).toEqual(true);
      });

      test("popReport pops a report off a Moderator's object's activeReport array and returns it", (): void => {
        const testPostObj = new PostModel({
          content: "I am inappropriate!",
          author: "author1",
          reportedInappropriate: true,
          isInappropriate: false,
          isUnresolved: false,
          moderatedBy: "",
          assignedTo: "",
        });

        const testModeratorObj = new ModeratorModel({
          name: "mod1-test",
          activeReport: [testPostObj],
          moderationCount: 0,
          isAvailableForReport: true,
        });

        expect(Array.isArray(testModeratorObj.activeReport)).toEqual(true);
        expect(testModeratorObj.popReport()).toHaveProperty("_id");
        expect(testModeratorObj.popReport()).toEqual(undefined);
      });

      test("pushReport pushes a new post on to a Moderator object's activeReport array ONLY if empty and returns the updated moderator object", (): void => {
        const testPostObj1 = new PostModel({
          _id: new ObjectId("63cecf1be39f7bf75daa01a9"),
          content: "I am inappropriate!",
          author: "author1",
          reportedInappropriate: true,
          isInappropriate: false,
          isResolved: false,
          moderatedBy: "",
          assignedTo: "",
        });

        const testPostObj2 = new PostModel({
          _id: new ObjectId("63cecf1be39f7bf75daa01aa"),
          content: "I am REALLY inappropriate!",
          author: "author1",
          reportedInappropriate: true,
          isInappropriate: false,
          isResolved: false,
          moderatedBy: "",
          assignedTo: "",
        });

        const testModeratorObj = new ModeratorModel({
          _id: new ObjectId("63cecf1be39f7bf75daa01b3"),
          name: "mod1-test",
          activeReport: [],
          moderationCount: 0,
          isAvailableForReport: true,
        });

        expect(Array.isArray(testModeratorObj.activeReport)).toEqual(true);
        expect(testModeratorObj.pushReport(testPostObj1)).toEqual([
          new ObjectId("63cecf1be39f7bf75daa01a9"),
        ]);
        expect(testModeratorObj.activeReport).toHaveLength(1);
        expect(testModeratorObj.pushReport(testPostObj2)).toEqual([
          new ObjectId("63cecf1be39f7bf75daa01a9"),
        ]);
        expect(testModeratorObj.activeReport).toHaveLength(1);
      });

      test("pushReport does NOT push a new post on to a Moderator object's activeReport array if it already contains an object", (): void => {
        const testPostObj1 = new PostModel({
          _id: new ObjectId("63cecf1be39f7bf75daa01a9"),
          content: "I am inappropriate!",
          author: "author1",
          reportedInappropriate: true,
          isInappropriate: false,
          isResolved: false,
          moderatedBy: "",
          assignedTo: "",
        });

        const testPostObj2 = new PostModel({
          _id: new ObjectId("63cecf1be39f7bf75daa01aa"),
          content: "I am REALLY inappropriate!",
          author: "author1",
          reportedInappropriate: true,
          isInappropriate: false,
          isResolved: false,
          moderatedBy: "",
          assignedTo: "",
        });

        const testModeratorObj = new ModeratorModel({
          _id: new ObjectId("63cecf1be39f7bf75daa01b3"),
          name: "mod1-test",
          activeReport: [testPostObj1._id],
          moderationCount: 0,
          isAvailableForReport: true,
        });

        expect(Array.isArray(testModeratorObj.activeReport)).toEqual(true);
        expect(testModeratorObj.pushReport(testPostObj2)).toEqual([
          new ObjectId("63cecf1be39f7bf75daa01a9"),
        ]);
        expect(testModeratorObj.activeReport).toEqual(
          expect.arrayContaining([new ObjectId("63cecf1be39f7bf75daa01a9")])
        );
      });
    });
  });
});
