import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db, contactsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const secret = process.env.SESSION_SECRET;
  const auth = req.headers["authorization"];
  if (!secret || !auth || auth !== `Bearer ${secret}`) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.get("/admin/contacts", authMiddleware, async (req, res) => {
  try {
    const contacts = await db
      .select()
      .from(contactsTable)
      .orderBy(desc(contactsTable.createdAt));
    req.log.info({ count: contacts.length }, "Admin fetched contacts");
    res.json({ contacts });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch contacts");
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

export default router;
