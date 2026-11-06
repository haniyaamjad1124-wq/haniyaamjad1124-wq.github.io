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
  contribution?: number; // share of the project that was mine, 0 to 100
  sections?: {
    title: string;
    body: string[];
    bullets?: string[];
    personas?: { name: string; line: string; needs: string; tone: "yellow" | "orange" | "blue" }[];
  }[];
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
      "The business is curriculum software used in 520 partner schools. A 50-member team works only on retention and post-sales service. They are called Programme Delivery Officers (PDOs). Their calendar runs across an 11-month academic year, and they also carry cross-selling targets. Their productivity metric is the percentage of business value retained from the schools currently in the portfolio.",
    ],
    sections: [
      {
        title: "The problem",
        body: [
          "Several members of the team visit each school, and the higher a school's dropout risk, the more senior the people who visit it. This created a loop of changing, subjective readings of each school's feedback on the programme. Senior management needed a tool that logs each PDO's work and service calendar and runs analytics on that human intelligence.",
        ],
      },
      {
        title: "For the PDO",
        body: [
          "Transparent, real-time updates on retention risk across the client portfolio. Each PDO has a clear dashboard of the services done for every school:",
        ],
        bullets: ["Initial training", "Implementation", "CRC 1", "Reading test", "Retraining", "CRC 2", "Maximization"],
      },
      {
        title: "The solution",
        body: [
          "A business analytics dashboard for the retention team, built on the work the PDOs already do. Every service a PDO delivers becomes a data point, and the dashboard turns those into retention, risk and cross-selling views. It serves three personas with specific needs.",
        ],
        personas: [
          { name: "PDO", tone: "yellow", line: "Visits the schools and rates their risk.", needs: "Their own schools, the services done for each, and the renewal risk they have rated." },
          { name: "Manager", tone: "orange", line: "Leads a region's PDOs.", needs: "Their region's schools, the revenue at risk, and where each PDO stands on services and targets." },
          { name: "Retention head", tone: "blue", line: "Owns the retained business value.", needs: "Retained business value across all 520 schools and 8 states, risk by region over time, and the maximization pipeline." },
        ],
      },
      {
        title: "Impact",
        body: [],
        bullets: [
          "Schools classified by risk rating, updated case by case as each school develops",
          "Retained business value and the maximization pipeline across 520 schools, visible every day",
          "4 hours a week saved per PDO",
          "2,000 hours saved across 50 PDOs in the first ten weeks",
          "3 hours a week saved per manager",
        ],
      },
    ],
    images: [
      { src: "/images/work/crm-admin.webp", caption: "Admin dashboard" },
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
      "The same curriculum software, the same 520 partner schools. Twice a year each PDO runs a classroom review, called the CRC, in every school they look after. They observe each teacher, rate them on 12 criteria, rate what the students in each class can do, and send the principal a report. Head office then collects every school's averages in one consolidated workbook.",
    ],
    sections: [
      {
        title: "The problem",
        body: [
          "The review lived in an Excel workbook. PDOs noted ratings in the classroom, re-typed everything into the workbook in the evening, fixed the formulas, and formatted the principal's report by hand. A back-end team then opened each PDO's file and copied the averages into the head-office workbook. The same ratings were entered three times.",
        ],
      },
      {
        title: "For the PDO",
        body: [
          "Every rating is one tap on the phone, in the classroom. Each review moves through the same steps:",
        ],
        bullets: ["General info", "Teachers", "Students", "Recommendations", "Scores", "Report"],
      },
      {
        title: "The solution",
        body: [
          "A phone-first app that replaces the workbook with the same fields, ratings and maths. Class levels appear on their own from the classes typed for each teacher, and the 2 to 3 page report builds itself, checked against the original workbook. It serves three personas with specific needs.",
        ],
        personas: [
          { name: "PDO", tone: "yellow", line: "Runs the review in the classroom.", needs: "One-tap ratings for each teacher and class, and a report that builds itself before they leave the school." },
          { name: "Principal", tone: "orange", line: "Receives the review.", needs: "A 2 to 3 page report with teacher and student scores, focus areas and good practices observed." },
          { name: "Retention head", tone: "blue", line: "Owns the review across regions.", needs: "Every school's averages in the head-office consolidated workbook, by region, without anyone copying them by hand." },
        ],
      },
      {
        title: "Impact",
        body: [],
        bullets: [
          "About 1,040 reviews a year, 2 per school across 520 schools, no longer pass through Excel",
          "Each PDO downloads their region's consolidated workbook in the head-office layout",
          "Report averages match the workbook's maths, checked against a real school's file",
          "A live demo on made-up data, linked above",
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
