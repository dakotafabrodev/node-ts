import request from "supertest";
import app from "../src/index";
import connectToMongoDB from "../src/db";
import { PostModel, ModeratorModel } from "../src/db/db.model";
import { ObjectId } from "mongodb";

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

      expect(Array.isArray(res.body.allReports)).toBe(true);
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
          activeReport: [],
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
