import { Request, Response, Router } from "express";
import { ExternalService } from "./external.service";

export function createExternalRouter(): Router {
  const router = Router();
  const service = new ExternalService();

  router.get("/external-data", async (req: Request, res: Response) => {
    const base = (req.query.base as string) || "EUR";
    const target = (req.query.target as string) || "USD";
    const amount = req.query.amount ? Number(req.query.amount) : 100;
    if (!Number.isFinite(amount)) {
      return res.status(400).json({ message: "amount must be a valid number" });
    }

    try {
      const result = await service.getExternalData(base, target, amount);
      return res.json(result);
    } catch (error: any) {
      return res.status(502).json({
        message: "Failed to fetch external data",
        details: error.message,
      });
    }
  });

  return router;
}

