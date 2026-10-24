export interface PageDefinition {
  path: string;
  title: string;
  number: string;
  group: "work" | "reminiscence" | "about";
  body: string[];
}

export const sections: PageDefinition[] = [
  {
    path: "/work",
    title: "Work",
    number: "01",
    group: "work",
    body: [],
  },
  {
    path: "/reminiscence",
    title: "Reminiscence",
    number: "02",
    group: "reminiscence",
    body: [],
  },
  {
    path: "/about",
    title: "About",
    number: "03",
    group: "about",
    body: [
      "I am a product manager with 3+ years of experience. I have spent more than five years in the education sector, working at the grassroots level across India. My love for product management comes from empathy, pattern recognition and numbers with stories. I build, measure and modify with a mindset of “Keep it simple, so you'll keep doing it”. Product management, to me, is the art of vicarious forecasting.",
      "I am the person aggressively nodding at a nervous speaker and urging an audience to think differently. As a leader, I believe in intentional listening. I operate by spotting a team member's strength and guiding them to lead. Soon enough, when it gets too easy, we explore their weaknesses as the next thing to learn.",
      "My interests are diverse. I love economics and finance for their scope to create and measure impact at the core level. I am also an F1 enthusiast, which stems from my love for data. I enjoy cataloguing luxury fashion and couture, mainly because I look at art as a conversation between indigenous stories, supply chain economics and socio-political lobbying. My quarter-life crisis struck on time, resulting in marathons and HYROX. I believe nothing is unlearnable or off-limits.",
      "I am joining the “tech” party at an opportune time, as we struggle to reconcile supervised LLMs with lived human experience.",
    ],
  },
];

export const resumeUrl: string | null = "/resume.pdf";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  cover?: string;
  body: string[];
}

export const projects: Project[] = [];

export interface RumiMedia {
  id: string;
  title: string;
  kind: "photo" | "video";
  src: string;
  alt?: string;
}

export const rumiMedia: RumiMedia[] = [];

export const rumiArtwork = "/images/india-journey.webp";

export const aboutPortrait = "/images/portrait.png";

// The About book. Every line below is the user's own wording from the biography.
export interface BookPage {
  kicker: string;
  title: string;
  text: string;
}
export const aboutBook: BookPage[] = [
  { kicker: "I", title: "Grassroots", text: "More than five years in the education sector, working at the grassroots level across India." },
  { kicker: "II", title: "Craft", text: "Empathy, pattern recognition and numbers with stories. Keep it simple, so you'll keep doing it." },
  { kicker: "III", title: "Leading", text: "Intentional listening. Spot a team member's strength, guide them to lead. When it gets too easy, the weaknesses are next." },
  { kicker: "IV", title: "Economics", text: "Economics and finance, for their scope to create and measure impact at the core level." },
  { kicker: "V", title: "Data", text: "An F1 enthusiast, which stems from a love for data." },
  { kicker: "VI", title: "Couture", text: "Art as a conversation between indigenous stories, supply chain economics and socio-political lobbying." },
  { kicker: "VII", title: "Endurance", text: "A quarter-life crisis that struck on time. Marathons and HYROX." },
];
