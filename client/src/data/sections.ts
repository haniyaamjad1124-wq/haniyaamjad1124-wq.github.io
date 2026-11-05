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
    path: "/play",
    title: "Play",
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
      "As a leader, I believe in intentional listening. I operate by spotting a team member's strength and guiding them to lead. Soon enough, when it gets too easy, we explore their weaknesses as the next thing to learn.",
      "My interests are diverse. I love economics and finance for their scope to create and measure impact at the core level. I am also an F1 enthusiast, which stems from my love for data. I enjoy cataloguing luxury fashion and couture, mainly because I look at art as a conversation between indigenous stories, supply chain economics and socio-political lobbying. My quarter-life crisis struck on time, resulting in marathons and HYROX. I believe nothing is unlearnable or off-limits.",
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
  sections?: { title: string; body: string[]; bullets?: string[] }[]; // discovery, competition, design, execution, validation
  images?: { src: string; caption: string }[]; // further images on the project page, in order
  caseStudyUrl?: string; // "Full case study" pill, opens in a new tab
  demoUrl?: string;      // "Try the live demo" pill under the Goal, opens in a new tab
  demoNote?: string;     // muted line under that pill
}
export const projects: Project[] = [
  {
    slug: "pdo-crm",
    title: "PDO CRM - Retention CRM",
    client: "PDO CRM",
    project: "Retention and sales CRM for field trainers",
    year: "2026",
    tags: ["EdTech", "Internal tool"],
    cover: "/images/work/pdo-crm-cover.jpg",
    role: "Product Manager",
    goal: [
      "A phonics programme with 520 partner schools tracked renewals, upsell pitches and quality visits in monthly spreadsheets, so a school at risk surfaced too late to act. I designed and built a role-based CRM. A field trainer logs a school visit in about a minute and rates its renewal risk, and the revenue at risk updates for the trainer, the region and head office. It covers retention, a demo-to-conversion sales pipeline, reading-test reports and a visit calendar, across three portals on one back end, for 520 schools in 8 states and about Rs 20 crore of business value.",
    ],
    sections: [
      {
        title: "Customer discovery",
        body: [
          "The users are the programme delivery officers, the 40 trainers who visit our 520 partner schools across 8 states. Sitting with them showed three problems.",
        ],
        bullets: [
          "A school's renewal status lived in a monthly sheet, so a school moving through the dropout stages was caught at the eleventh hour, usually at renewal.",
          "Nobody could see revenue at risk by region.",
          "A visit planned in one sheet was never reconciled with the service logged in another.",
        ],
      },
      {
        title: "Competitive analysis",
        body: [
          "Vendors selling English and phonics programmes into schools compete on content and teacher training at the point of sale. Post-sale service, the quality visits and the renewal follow-up, runs on spreadsheets and chat groups. Generic CRMs model leads and deals, not a trainer's school visit or a renewal-risk rating per school.",
        ],
      },
      {
        title: "Product design and UX",
        body: [],
        bullets: [
          "One form logs a visit in about a minute: the school, what was done, the renewal risk, the next step.",
          "Risk and revenue at risk roll up live for the trainer, the region and head office.",
          "Three portals on one back end, for trainers, managers and admin, each seeing only its own schools.",
          "The calendar marks a planned visit done when the service is logged, so there is one record instead of two.",
        ],
      },
      {
        title: "Product and tech execution",
        body: [
          "Live and in daily use by the 40-person team across 520 schools. I designed the workflow, the screens and the data model, and built it. One release shipped the visit log, the renewal-risk roll-ups, the demo-to-conversion pipeline, reading-test reports, the visit calendar and an audit trail of every change.",
        ],
      },
      {
        title: "Product-market validation",
        body: [],
        bullets: [
          "Every service delivered since launch is logged in it.",
          "By a conservative count it saves each trainer about three hours a month, roughly 270 hours in the first ten weeks.",
          "In appraisal season the log replaced self-reported sheets.",
          "Managers open one screen for revenue at risk by region instead of waiting for the month's sheets.",
        ],
      },
    ],
    images: [
      { src: "/images/work/crm-admin.webp", caption: "Admin dashboard, all regions" },
      { src: "/images/work/crm-calendar.webp", caption: "Visit calendar" },
      { src: "/images/work/crm-timeline.webp", caption: "School timeline" },
      { src: "/images/work/crm-admin-regions.webp", caption: "Risk by region" },
    ],
  },
  {
    slug: "crc",
    title: "CRC - Classroom review",
    client: "CRC",
    project: "Phone-first classroom review and report",
    year: "2026",
    tags: ["EdTech", "Mobile web", "Live demo"],
    cover: "/images/work/crc-cover.jpg",
    role: "Product Manager",
    demoUrl: "https://mikids-crc-demo.vercel.app/",
    demoNote: "Made-up data. Pick a name on the sign-in page; entries reset from time to time.",
    goal: [
      "Twice a year each school gets a classroom review: a trainer rates every teacher and class level, then re-types it all into Excel and formats a report by hand. I replaced the workbook with a phone-first app used in the classroom. Every rating is one tap, the class levels appear on their own from the classes typed, and the two-to-three page report builds itself with the workbook's exact maths. Each trainer downloads their region's consolidated Excel in the head-office layout, so nobody copies averages by hand any more.",
    ],
    sections: [
      {
        title: "Customer discovery",
        body: [
          "Same users, the programme delivery officers, during the classroom review each school gets twice a year. Watching one: the trainer rates six to twelve teachers and every class level in notes, types it all into the review workbook in the evening, fixes the formulas, and formats a report for the principal by hand. Head office then copies each trainer's averages into a consolidated workbook.",
          "Three re-entries of the same ratings, and the report reaches the school days after the visit.",
        ],
      },
      {
        title: "Competitive analysis",
        body: [
          "Vendors in this segment rarely tool their post-sale service; a structured classroom review is a differentiator very few ship. Survey builders capture ratings but not the workbook's scoring maths, the class-level structure or the printed report. Classroom observation platforms built for teacher evaluation abroad are priced and designed for school districts, not for a vendor's trainer on a phone in an LKG classroom.",
        ],
      },
      {
        title: "Product design and UX",
        body: [
          "A phone-first web app used inside the classroom. Every rating is one tap on a four-way toggle; Set all fills a card so the trainer changes only the exceptions. Class levels appear on their own from the classes typed for each teacher.",
          "The two-to-three page report builds itself from the workbook's exact maths and was checked against the original Excel. Each trainer downloads their region's consolidated Excel in the head-office layout.",
        ],
      },
      {
        title: "Product and tech execution",
        body: [
          "Shipped. Flask and SQLite behind the same login and role rules as the CRM; the whole client is one HTML file, so it loads on any phone. Report maths verified against a real workbook, 36 access-rule tests, and a public demo on made-up data that you can tap through from this page.",
        ],
      },
      {
        title: "Product-market validation",
        body: [
          "Internal, so validation is usage, not sales. Twice-yearly reviews across 520 schools mean about a thousand reports a year that no longer pass through Excel.",
          "The addressable base is the same 3.3 lakh private unaided schools counted by UDISE+ 2023-24, each of which buys programmes that need a service visit, and the same India edtech market that industry estimates put near USD 8.9 billion in 2025.",
        ],
      },
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
