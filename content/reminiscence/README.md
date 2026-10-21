# Adding writing to Reminiscence

Reminiscence is an empty structure for Haniya's photos, videos and long-form essays. No personal post, project, biography or portrait is invented.

Copy `POST_TEMPLATE.md` to a new Markdown file here. Write your essay, fill in title, date (`YYYY-MM-DD`), category and excerpt, and set `draft: false` when ready. Drafts remain unpublished. Run `pnpm content`, then `pnpm build:static`, to regenerate the index, page manifest and reading pages at `/reminiscence/your-slug`.

Photo and video entries live in `client/src/data/sections.ts` under `rumiMedia`; projects live in `projects`; About text lives in its empty `body` array. Add only Haniya-supplied content. The current media, projects, bodies and published-post index are empty.

Supported essay formatting: paragraphs, headings, bullet lists, bold, italic, HTTP/HTTPS and site-relative links, and fenced code blocks. Raw HTML is escaped. This is a code/content-file workflow, not a browser CMS.
