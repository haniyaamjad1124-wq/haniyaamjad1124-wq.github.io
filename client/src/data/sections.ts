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

// Work. One card per project; the user supplies every field.
export interface Project {
  slug: string;          // /work/<slug>/
  title?: string;        // project page heading; defaults to "client, project"
  client: string;        // company or passion project name, shown in ink
  project: string;       // what was done, shown in muted
  year: string;
  tags: string[];        // one or two short words on the image
  cover: string;         // 1920x1440 image under /images/work/
  goal: string[];        // paragraphs on the project page
  role?: string;
  impact?: string;
  images?: { src: string; caption: string }[]; // further images on the project page, in order
  caseStudyUrl?: string; // "Full case study" pill, opens in a new tab
}
export const projects: Project[] = [
  {
    slug: "mikids-pdo-crm",
    title: "MIKIDS PDO CRM - Retention CRM",
    client: "MIKIDS PDO CRM",
    project: "Retention and sales CRM for field trainers",
    year: "2026",
    tags: ["EdTech", "Internal tool"],
    cover: "/images/work/mikids-pdo-crm-cover.jpg",
    goal: [
      "A phonics programme with 517 partner schools tracked renewals, upsell pitches and quality visits in monthly spreadsheets, so schools at risk surfaced too late. I designed and built a role-based CRM where a field trainer logs a school visit in about a minute and rates its renewal risk, and the revenue at risk updates for the trainer, the region and head office. It covers retention, a demo-to-conversion sales pipeline, reading-test reports and a visit calendar that marks a plan done when the service is logged, across three portals on one back end: 517 schools, six regions, about Rs 20 crore of business value.",
    ],
    images: [
      { src: "/images/work/crm-admin.webp", caption: "Admin dashboard, all regions" },
      { src: "/images/work/crm-calendar.webp", caption: "Visit calendar" },
      { src: "/images/work/crm-timeline.webp", caption: "School timeline" },
      { src: "/images/work/crm-admin-regions.webp", caption: "Risk by region" },
    ],
  },
  {
    slug: "mikids-crc",
    title: "MIKIDS CRC - Classroom review",
    client: "MIKIDS CRC",
    project: "Phone-first classroom review and report",
    year: "2026",
    tags: ["EdTech", "Mobile web"],
    cover: "/images/work/mikids-crc-cover.jpg",
    goal: [
      "Twice a year each school gets a classroom review: a trainer rates every teacher and class level, then re-types it all into Excel and formats a report by hand. I replaced the workbook with a phone-first app used in the classroom. Every rating is one tap, the class levels appear on their own from the classes typed, and the two-to-three page report builds itself with the workbook's exact maths. Each trainer downloads their region's consolidated Excel in the head-office layout, so nobody copies averages by hand any more.",
    ],
    images: [
      { src: "/images/work/crc-report.jpg", caption: "Report tab: PDF, consolidated Excel and the report's averages" },
    ],
  },
];

// Rows under the grid: side projects, giving back. Hidden while empty.
export interface ListItem { name: string; sub: string; url: string }
export interface ListBlock { heading: string; intro: string; items: ListItem[] }
export const sideProjects: ListBlock = { heading: "", intro: "", items: [] };
export const community: ListBlock = { heading: "", intro: "", items: [] };


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

// The About book: a picture book of different sides. Images and captions are
// the user's. Empty until the images arrive; the About page hides the book when empty.
export interface BookPage {
  kicker: string;
  title: string;
  image: string;
  caption?: string;
}
export const aboutBook: BookPage[] = [];
// e.g. { kicker: "I", title: "F1", image: "/images/book/01.jpg", caption: "..." }
