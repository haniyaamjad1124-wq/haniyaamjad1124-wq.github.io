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
      "I am a product manager with 3+ years of experience. I have spent more than five years in the education sector, working at the grassroots level across India. My love for product management comes from empathy, pattern recognition and numbers with stories. I build, measure and modify with a mindset of “Keep it simple, so you'll keep doing it”. Product management, to me, is the art of vicarious forecasting. As a leader, I believe in intentional listening. I operate by spotting a team member's strength and guiding them to lead. My interests are diverse. I love economics and finance for their scope to create and measure impact at the core level. I am also an F1 enthusiast, which stems from my love for data. I enjoy cataloguing luxury fashion and couture, mainly because I look at art as a conversation between indigenous stories, supply chain economics and socio-political lobbying. My quarter-life crisis struck on time, resulting in marathons and HYROX. I believe nothing is unlearnable or off-limits.",
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
    personas?: { name: string; line: string; needs: string; tone: "yellow" | "orange" | "blue" | "cream" }[];
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
      "Show each school evidential progress on the programme by comparing its beginning-of-year (BOY) and end-of-year (EOY) scores. School management uses this report as a testimonial when deciding whether to renew the programme for the next academic year, so it helps us retain their business.",
    ],
    sections: [
      {
        title: "The problem",
        body: [
          "This was mainly a design problem. The review lived in Excel. PDOs noted the ratings in the classroom, typed them into Excel, and the back-end team recorded the averages in head office's central workbook. Two pain points followed:",
        ],
        bullets: [
          "Management got no visual, digestible view of the data",
          "PDOs entered the same scores three times: in the classroom, in Excel, and for the back-end team",
        ],
      },
      {
        title: "The solution",
        body: [
          "Working from first principles, we removed the workbook altogether. The CRC is now recorded on a phone-first app, with every input made in the app itself. The app calculates the scores and lays out the report on its own, generates it school by school, and exports the averages as a portable Excel file. The back-end team presses Download, and the files sit with them for compliance.",
        ],
      },
      {
        title: "Who uses it",
        body: [
          "Built for four personas: PDO, Manager, Retention head and Channel support officer.",
        ],
        personas: [
          { name: "PDO", tone: "yellow", line: "Records the review in the classroom.", needs: "Enter every rating once, on the phone, and have the report build itself." },
          { name: "Manager", tone: "orange", line: "Leads a region's PDOs.", needs: "See each school's report and how its scores move from BOY to EOY." },
          { name: "Retention head", tone: "blue", line: "Owns retention across the client portfolio.", needs: "Use each school's progress report to support its renewal for the next academic year." },
          { name: "Channel support officer", tone: "cream", line: "Handles company-wide filings.", needs: "Export the averages in Excel with one download, for compliance and company-wide filings." },
        ],
      },
      {
        title: "Impact",
        body: [],
        bullets: [
          "About 1,000 reports generated without Excel",
          "Fewer errors, since every score is entered once",
          "Schools receive a clear, visual report of their progress, and they are happy with what they see",
        ],
      },
    ],
    images: [
      { src: "/images/work/crc-boy-eoy.webp", caption: "BOY vs EOY for the same school: teachers 4.14 to 4.61, students 3.77 to 4.29" },
      { src: "/images/work/crc-report-p2.webp", caption: "Generated report, page 2: student scores by level (BOY)" },
      { src: "/images/work/crc-report-p3.webp", caption: "Generated report, page 3: teacher scores by parameter (BOY)" },
      { src: "/images/work/crc-report.jpg", caption: "The report tab on the phone" },
    ],
  },
  {
    slug: "ken-teams",
    title: "The Ken for Teams - Corporate subscriptions",
    client: "The Ken",
    project: "Corporate subscription concept, prototype and PRD",
    year: "2026",
    tags: ["Media", "Concept", "Prototype"],
    cover: "/images/work/ken-teams-cover.jpg",
    role: "Product Owner concept, solo. Unsolicited, built for a job application.",
    demoUrl: "https://claude.ai/artifact/4FLnd2m8xXuDaaMTbjGMYN",
    demoNote: "Concept prototype, version 1. Onboarding, the bundles and the month-one phone screens work. The buyer's usage view is described below and not built yet. Story titles are placeholders.",
    goal: [
      "The Ken is a subscription business publication from Bengaluru. In October 2026 its founder wrote a tenth-anniversary post: 56 things launched in ten years, 29 of them ended, and subscriber cohorts from Boomers to Gen Z with a dramatic range of preferences and behaviours. The same post opened a Corporate Subscriptions Product Owner role for someone with 2 to 4 years of experience who would own the product and report on it to the founders every month.",
      "I built this as my application. The question I set myself: what should a company get when it buys 40 seats, and how would the Product Owner prove it was working by the first renewal?",
    ],
    sections: [
      {
        title: "The problem",
        body: [
          "A company seat and an individual Premium plan unlock the same 16 products and the same homepage. The job description says account-level and seat-level measurement does not exist today. The buyer can already invite, reassign and revoke seats from an admin dashboard, but nobody can see whether a seat is read. So the buyer who signs a renewal in March has no usage data, The Ken's sales team has none either, and most of the 40 readers never chose The Ken in the first place. Their company did.",
          "Two readers sit on the same plan with nothing in common. A 24-year-old analyst wants charts and company history for a deck due Friday. A 48-year-old business head wants five minutes a day and a sense of where the sector is heading. Neither of them is the person who pays.",
        ],
      },
      {
        title: "Who it is for",
        body: [
          "Three people decide whether a corporate plan is worth it. The buyer was missing from my first version. A founder's-eye review of the prototype pointed that out. The person who renews was not in it.",
        ],
        personas: [
          { name: "Analyst, 24", tone: "yellow", line: "Reads for depth on one sector.", needs: "Sector charts, every story on the companies she tracks, and a first month that does not start from the top of the homepage." },
          { name: "Business head, 48", tone: "orange", line: "Sponsors the plan and reads five minutes a day.", needs: "The daily story first, then the weekly reads, and ideas he can take into a team meeting." },
          { name: "Buyer, HR or L&D", tone: "blue", line: "Raises the PO and decides the renewal.", needs: "See which seats are active next to the seat controls she already has, and renew with evidence instead of a sales call." },
        ],
      },
      {
        title: "The solution",
        body: [
          "Measure first, then route. Week one ships one onboarding question (role) and a seat-usage view that the buyer and The Ken can both see. That alone closes the gap the job description names. Routing comes after, built only from products The Ken already publishes.",
        ],
        bullets: [
          "Four onboarding questions at first login: role, sector, companies tracked, what the reader needs. Every answer changes the bundle.",
          "Two bundles. Sector depth for analysts, with the daily story, Visual Stories and the sector newsletter. Leadership signal for business heads, with the daily story first and the weekly reads around it.",
          "A planned first month, sent week by week, so the seat is not an open archive on day one.",
          "Company dossiers: every published story, chart and episode on a company, on one page. This is a tagging and routing job for product. The newsroom writes nothing new, and the editorial rule stays: no story is shaped for a client.",
          "A usage view for the buyer, next to the seat controls that already exist: regular readers, what they used The Ken for, and the renewal date. More on this below.",
        ],
      },
      {
        title: "What the buyer sees at renewal",
        body: [
          "Renewal and usage are different problems. Usage is how many people are opening the stories. Renewal is whether the company as a whole is willing to renew it for its employees. The employee reads, but the firm pays.",
          "My first answer was opens. But if I go and show HR that 30% of their readers have used The Ken, that is not a very convincing number. So the page the buyer sees before renewal has a number, a voice and a person.",
        ],
        bullets: [
          "The number counts regular readers, not one-time openers: every week for the last two months, 12 out of your 40 employees read the stories.",
          "The voice comes from one question to readers: how many Ken stories helped in your deck or presentation this week?",
          "The person is whoever brought The Ken in, often someone who was an individual subscriber first. When someone in a team meeting says \"Those are good data points, where did you get them?\", they say \"I got it from The Ken.\" The page gives that person something to forward to their boss.",
          "Seats where nobody has opened a single story get reallocated to teams that are more active, before renewal. Some buyers will cut seats anyway, which is why this gets piloted with a few accounts first.",
        ],
      },
      {
        title: "What I got wrong in version 1",
        body: [
          "I asked for a review of the prototype as The Ken's founder would read it and kept the list. The founder's post describes the team's method as hypotheses, shipping, killing, correcting, so this is the correcting part.",
        ],
        bullets: [
          "I built a pricing argument into version 1 and got it backwards. The Ken's group prices are fixed slabs, and they are final, so price is not a lever for product at all. The renewal case is made to the buyer with usage, not to the reader with price.",
          "I dropped seat usage after a reviewer said renewal was the only metric. The job description says measurement does not exist. Building it is the first job, and I moved it to week one.",
          "Three of my five feature ideas (a quarterly outlook, a curated daily brief, dossiers with commentary) were editorial work dressed as product. The outlook and the brief are gone. Dossiers now show only what is already published.",
          "The business head's bundle leaned on The Ken's least regular products. The daily story is the trunk, so it now comes first in both bundles.",
          "I described an admin page as new. The Ken already has one for inviting, reassigning and revoking seats. The gap is usage, not seat management, and the page now says so.",
          "When I was asked what the buyer would see at renewal, my first answer was how many people opened it. 30% opened convinces nobody. Regular readers and what they used The Ken for do.",
          "I had not spoken to a single corporate customer. The personas are composites from the job description and The Ken's own pages, and the PRD puts 20 buyer and reader interviews in the first 30 days.",
        ],
      },
      {
        title: "How it would be judged",
        body: [
          "Corporate plans are annual, so the primary metric moves once a year. The monthly report to the founders runs on leading indicators with thresholds I would own. Targets, not results.",
        ],
        bullets: [
          "Primary: corporate renewal rate, accounts renewed within 30 days of expiry over accounts due, per quarter. Paired with net revenue retention so a renewal with fewer seats shows up.",
          "Month two onwards: seats activated within 14 days of invite (target 70%), seats active in week four (target 50%), buyers who opened the usage page before renewal, and seat-add requests.",
          "Size of the prize, from public numbers: 200 organisations at about 25 seats and the published $100 a seat is roughly $500,000 a year. Ten points of renewal is about $50,000. So year one is measurement and onboarding.",
          "Kill criteria in the PRD: if activated seats do not pass 50% in two quarters, the bundles are wrong and the routing stops.",
        ],
      },
    ],
    images: [
      { src: "/images/work/ken-model.webp", caption: "Current plan against the proposed one, stage by stage" },
      { src: "/images/work/ken-onboarding.webp", caption: "Onboarding: the bundle on the right changes with every answer" },
      { src: "/images/work/ken-journey.webp", caption: "Day one on the analyst's phone, built from her four answers" },
      { src: "/images/work/ken-success.webp", caption: "Renewal rate as the primary metric, paired with net revenue retention" },
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

// Play: a pin board of photos that make the user "me". Each pin is a photo
// with a caption. A pin with a `story` is a card: click it and it flips to
// the story on a coloured back (the persona-card colours).
// Photos go in client/public/images/play/. The entries below are placeholders
// until the user's photos arrive; replace image, alt and caption for each.
// A pin with a `video` is a short clip (10 to 20 s, MP4 H.264, muted). It
// plays on loop while it is on screen and pauses when scrolled away; `image`
// is then its poster frame, shown until the clip starts. See images/play/README.txt.
export interface PlayPin {
  image: string;
  alt: string;
  caption?: string;   // optional; the board shows no captions at the moment
  video?: string;
  story?: { title: string; text: string; tone: "yellow" | "orange" | "blue" | "cream" };
}
export const playBoard: PlayPin[] = [
// Reading order: the board lays pins out left to right, row by row, three across (two on narrow screens).
  { image: "/images/play/img-6693-poster.webp", video: "/images/play/img-6693.mp4", alt: "Clip IMG 6693" },
  { image: "/images/play/web-937d6cdb.webp", alt: "HYROX Delhi, at the finish" },
  { image: "/images/play/cat-with-medal.webp", alt: "Cat with a medal" },
  { image: "/images/play/img-6670-poster.webp", video: "/images/play/img-6670.mp4", alt: "A classroom, on a visit" },
  { image: "/images/play/my-first-students.webp", alt: "My first students" },
  { image: "/images/play/volunteering-1.webp", alt: "Best teacher of the month, Teach For India Chennai" },
  { image: "/images/play/img-3607.webp", alt: "Under a banyan tree" },
  { image: "/images/play/img-6234.webp", alt: "With a street dog on the temple steps" },
  { image: "/images/play/img-2822.webp", alt: "Headstand practice" },
  { image: "/images/play/img-4771.webp", alt: "A courtyard" },
  { image: "/images/play/img-3683.webp", alt: "An empty amphitheatre" },
  { image: "/images/play/img-3979.webp", alt: "A fresco" },
  { image: "/images/play/web-e4692b3a.webp", alt: "A classroom in session" },
  { image: "/images/play/img-3974.webp", alt: "Chepauk under the lights" },
  { image: "/images/play/volunteering.webp", alt: "The volunteering crew" },
  { image: "/images/play/working-with-students.webp", alt: "Working with students" },
  { image: "/images/play/img-6698-poster.webp", video: "/images/play/img-6698.mp4", alt: "A field in the morning fog" },
  { image: "/images/play/mushi.webp", alt: "Mushi" },
];
