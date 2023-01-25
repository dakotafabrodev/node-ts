import request from "supertest";
import app from "../src/index";
import connectToMongoDB from "../src/db";
import { text } from "body-parser";

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
});
