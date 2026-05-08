export interface CaseStudy {
  slug: string;
  name: string;
  tag: string;
  category: string;
  year: string;
  heroImage: string;
  overview: string;
  challenge: string;
  approach: string;
  services: string[];
  results: { value: string; label: string }[];
  gallery: string[];
  quote?: { text: string; author: string; role: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "campaign-01",
    name: "Campaign 01",
    tag: "Beauty · Influencer",
    category: "Influencer Strategy",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&q=85",
    overview:
      "The client wanted to break into the U.S. beauty market with an influencer campaign that felt genuinely human — not transactional. We built a creator ecosystem of 40+ micro and mid-tier influencers whose aesthetics aligned perfectly with the brand DNA.",
    challenge:
      "Entering a saturated beauty market with a brand that consumers hadn't heard of required credibility fast. Traditional paid media wasn't enough — the brand needed authentic voices to carry the story.",
    approach:
      "We identified a network of beauty creators whose followers matched the target demographic and personal style matched the product ethos. Each creator received custom briefing kits, product curation, and a creative direction document — not a script.",
    services: ["Influencer Strategy", "Creator Casting", "Campaign Management", "Reporting & Analytics"],
    results: [
      { value: "42", label: "Creators activated" },
      { value: "8.2M", label: "Impressions" },
      { value: "6.4%", label: "Avg engagement rate" },
      { value: "$1.2M", label: "Earned media value" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85",
      "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1200&q=85",
    ],
    quote: {
      text: "The UGC content pipeline they built is extraordinary. Authentic, high-quality, and consistently aligned with our brand DNA.",
      author: "Client A",
      role: "Creative Lead",
    },
  },
  {
    slug: "campaign-02",
    name: "Campaign 02",
    tag: "Skincare · UGC",
    category: "UGC & Social Strategy",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&q=85",
    overview:
      "The client needed a scalable UGC pipeline that could replace expensive production shoots. We recruited, onboarded, and activated 60+ content creators to produce always-on social assets at a fraction of the cost.",
    challenge:
      "The brand needed a consistent stream of high-quality, on-brand content across Instagram, TikTok, and Pinterest — without the overhead of traditional production. Content had to feel real and relatable, not polished and corporate.",
    approach:
      "We developed a creator-facing brand toolkit: mood boards, ingredient spotlights, tone-of-voice guides, and product usage scenarios. Creators were matched to specific SKUs based on their content style, then briefed with flexible creative latitude.",
    services: ["UGC Recruitment", "Content Production", "Social Media Strategy", "Community Management"],
    results: [
      { value: "60+", label: "UGC creators" },
      { value: "320", label: "Assets delivered / month" },
      { value: "3×", label: "Engagement increase" },
      { value: "68%", label: "Cost reduction vs production" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=85",
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1200&q=85",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=85",
    ],
    quote: {
      text: "They completely transformed how we show up on social. The influencer partnerships felt genuinely authentic — our community noticed and engagement tripled.",
      author: "Client B",
      role: "Marketing Director",
    },
  },
  {
    slug: "campaign-03",
    name: "Campaign 03",
    tag: "Wellness · Social",
    category: "Social Media & Community",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&q=85",
    overview:
      "The client needed a full-service social media partner to manage their channels, develop a content strategy rooted in their brand values, and grow their community across platforms. We handled strategy, content calendar, copywriting, and community management.",
    challenge:
      "The brand had a loyal but stagnant community. Content lacked consistency in voice and visual identity, and engagement was declining. The team needed a strategic overhaul — not just more posts.",
    approach:
      "We audited six months of existing content, benchmarked against competitors, and identified three core content pillars: ingredient education, lifestyle aspiration, and community celebration. A strict brand voice guide and visual template library were built to ensure channel cohesion.",
    services: ["Social Media Strategy", "Community Management", "Content Calendar", "Copywriting"],
    results: [
      { value: "+210%", label: "Follower growth" },
      { value: "4.8%", label: "Engagement rate" },
      { value: "12", label: "Platforms managed" },
      { value: "95%", label: "Client retention" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=85",
      "https://images.unsplash.com/photo-1562967916-eb82221dfb5a?w=1200&q=85",
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85",
    ],
    quote: {
      text: "Breaking into a new market was a game-changer. Their cultural fluency and creator network gave us access to audiences we could never have reached on our own.",
      author: "Client C",
      role: "Head of Brand Partnerships",
    },
  },
  {
    slug: "campaign-04",
    name: "Campaign 04",
    tag: "Fashion · Content",
    category: "Branding & Content",
    year: "2025",
    heroImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=85",
    overview:
      "A rising fashion talent needed a brand identity and content strategy to launch their personal platform. We developed the visual direction, social content system, and influencer collaboration strategy from the ground up.",
    challenge:
      "Launching a personal fashion brand requires more than great aesthetics — it demands a cohesive narrative, consistent posting cadence, and early brand partnerships that build credibility without compromising authenticity.",
    approach:
      "We started with a brand discovery session to articulate the client's aesthetic philosophy, audience personas, and content ambitions. From there we built a full visual identity: color palette, typography system, photography direction, and a 90-day content calendar.",
    services: ["Brand Identity", "Photography Direction", "Content Strategy", "Influencer Outreach"],
    results: [
      { value: "0→50K", label: "Followers in 4 months" },
      { value: "12", label: "Brand partnerships secured" },
      { value: "9.1%", label: "Avg engagement rate" },
      { value: "3", label: "Press features" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=85",
      "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=1200&q=85",
    ],
  },
  {
    slug: "campaign-05",
    name: "Campaign 05",
    tag: "Music · LATAM",
    category: "LATAM Market Strategy",
    year: "2025",
    heroImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=85",
    overview:
      "A major label engaged us to amplify new artist releases across LATAM and the U.S. Hispanic market. We orchestrated influencer campaigns, editorial content, and cross-platform activations that drove streams, awareness, and cultural conversation.",
    challenge:
      "Music promotion in 2025 is hyper-competitive. Standing out requires more than playlist pitching — it requires building cultural moments that audiences want to be part of. The client needed a social-first approach rooted in authentic LATAM culture.",
    approach:
      "For each release, we identified 20–30 relevant creators across TikTok, Instagram, and YouTube — from music reviewers to lifestyle creators with overlapping audiences. We coordinated timed drops, created shareable campaign assets, and managed all creator communications.",
    services: ["LATAM Strategy", "Influencer Coordination", "Campaign Activations", "Cross-Platform Content"],
    results: [
      { value: "5", label: "Artists launched" },
      { value: "22M", label: "Total reach" },
      { value: "4.2M", label: "Stream conversions" },
      { value: "18", label: "Countries reached" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85",
      "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=1200&q=85",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
    ],
  },
  {
    slug: "campaign-06",
    name: "Campaign 06",
    tag: "Creator · Strategy",
    category: "Brand & Growth Strategy",
    year: "2025",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85",
    overview:
      "A creator economy platform hired us to grow their brand presence and drive sign-ups through targeted influencer marketing and social strategy. We developed their positioning, acquisition funnel, and ongoing content engine.",
    challenge:
      "As a B2C2B platform, the client needed to win over both brands and creators simultaneously. Their messaging had to resonate differently with each audience while maintaining a unified brand identity.",
    approach:
      "We built two parallel content tracks: one focused on creator empowerment and one on proven ROI metrics. Influencer partnerships were selected to demonstrate both perspectives authentically.",
    services: ["Brand Positioning", "Social Strategy", "Influencer Marketing", "Growth Campaigns"],
    results: [
      { value: "25K+", label: "User sign-ups" },
      { value: "180", label: "Brand partnerships brokered" },
      { value: "7.3%", label: "Conversion rate" },
      { value: "$3.8M", label: "Platform GMV influenced" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=85",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=85",
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: CaseStudy | null; next: CaseStudy | null } {
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? caseStudies[idx - 1] : null,
    next: idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null,
  };
}
