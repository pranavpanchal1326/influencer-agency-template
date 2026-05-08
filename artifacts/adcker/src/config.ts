/**
 * ─────────────────────────────────────────────────────────────
 *  AGENCY TEMPLATE CONFIG
 *  Edit the values below to customise the entire site at once.
 * ─────────────────────────────────────────────────────────────
 */
export const config = {
  agency: {
    /** Short name shown in the nav logo and footer */
    name: "Agency Name",
    /** Contact email — shown in the footer, contact modal, and nav overlay */
    email: "hello@youragency.com",
    /** Year shown in the copyright line */
    year: 2025,
    /** One-line description shown in the footer */
    description: "Influencer Marketing Agency",
  },

  social: {
    /** Instagram handle (with @) */
    instagramHandle: "@youragency",
    /** Full Instagram profile URL */
    instagramUrl: "https://www.instagram.com/",
  },

  meta: {
    /** <title> tag — also update index.html manually */
    title: "Agency — The Art of Hacking Social",
    description:
      "An influencer marketing agency specialising in beauty, fashion, and wellness. Authentic, high-impact campaigns that drive real results.",
  },
} as const;
