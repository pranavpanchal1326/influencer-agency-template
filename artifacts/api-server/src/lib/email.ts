import { Resend } from "resend";
import { logger } from "./logger";

const apiKey = process.env["RESEND_API_KEY"];
const resend = apiKey ? new Resend(apiKey) : null;

export interface ContactPayload {
  id: number;
  name: string;
  brand: string;
  email: string;
  service: string;
  message: string;
  createdAt: string;
}

function html(c: ContactPayload): string {
  const date = new Date(c.createdAt).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Contact Submission</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#EFEDEA;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:48px 24px;">
    <tr>
      <td>
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;margin:0 auto;background:#191919;border:1px solid rgba(239,237,234,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(239,237,234,0.08);">
              <p style="margin:0;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(239,237,234,0.35);">
                ( New Contact Submission · #${String(c.id).padStart(4, "0")} )
              </p>
            </td>
          </tr>

          <!-- Name / Brand -->
          <tr>
            <td style="padding:40px 40px 0;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(239,237,234,0.3);">From</p>
              <p style="margin:0;font-size:26px;font-weight:300;letter-spacing:-0.02em;color:#EFEDEA;">${c.name}</p>
              <p style="margin:4px 0 0;font-size:13px;color:rgba(239,237,234,0.5);letter-spacing:0.02em;">${c.brand}</p>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:28px 40px 0;"><div style="height:1px;background:rgba(239,237,234,0.08);"></div></td></tr>

          <!-- Details grid -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(239,237,234,0.3);">Email</p>
                    <a href="mailto:${c.email}" style="color:#EFEDEA;text-decoration:none;font-size:13px;">${c.email}</a>
                  </td>
                  <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(239,237,234,0.3);">Service</p>
                    <p style="margin:0;font-size:13px;color:#EFEDEA;">${c.service}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><div style="height:1px;background:rgba(239,237,234,0.08);"></div></td></tr>

          <!-- Message -->
          <tr>
            <td style="padding:28px 40px 0;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(239,237,234,0.3);">Message</p>
              <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(239,237,234,0.8);white-space:pre-wrap;">${c.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:36px 40px;">
              <a href="mailto:${c.email}?subject=Re: Your inquiry"
                 style="display:inline-block;border:1px solid rgba(239,237,234,0.4);padding:12px 28px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#EFEDEA;text-decoration:none;">
                Reply to ${c.name} →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 32px;border-top:1px solid rgba(239,237,234,0.08);">
              <p style="margin:0;font-size:10px;color:rgba(239,237,234,0.2);letter-spacing:0.1em;">
                Received ${date}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactNotification(
  payload: ContactPayload,
  notifyEmail: string,
): Promise<void> {
  if (!resend) {
    logger.warn("RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const from = process.env["NOTIFY_FROM"] ?? "Agency <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: notifyEmail,
    replyTo: payload.email,
    subject: `New inquiry from ${payload.name} · ${payload.brand}`,
    html: html(payload),
  });

  if (error) {
    logger.error({ error }, "Failed to send contact notification email");
  } else {
    logger.info({ to: notifyEmail, id: payload.id }, "Contact notification email sent");
  }
}
