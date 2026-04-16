import express from "express";
import cors from "cors";
import { createExternalRouter } from "./modules/external/external.controller";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(createExternalRouter());

  return app;
}

