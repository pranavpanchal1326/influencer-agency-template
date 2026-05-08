import { Router, type IRouter } from "express";
import { db, contactsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { sendContactNotification } from "../lib/email";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid submission" });
    return;
  }

  try {
    const [row] = await db
      .insert(contactsTable)
      .values(parsed.data)
      .returning({
        id: contactsTable.id,
        createdAt: contactsTable.createdAt,
      });

    req.log.info({ id: row.id }, "Contact form submitted");

    const notifyEmail = process.env["NOTIFY_EMAIL"];
    if (notifyEmail) {
      sendContactNotification(
        {
          id: row.id,
          createdAt: row.createdAt.toISOString(),
          ...parsed.data,
        },
        notifyEmail,
      ).catch((err) => req.log.error({ err }, "Email notification failed"));
    }

    res.status(201).json({ ok: true, id: row.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ error: "Failed to save submission" });
  }
});

export default router;
