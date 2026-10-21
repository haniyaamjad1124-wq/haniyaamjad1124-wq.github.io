import fs from "node:fs";
import path from "node:path";

const directory = path.resolve("content/reminiscence");
const escapeHtml = value =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
function inline(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/(?!\/)[^\s)]+)\)/g,
      '<a href="$2">$1</a>'
    );
}
function markdown(source) {
  const output = [];
  let paragraph = [],
    list = [],
    code = null;
  const flush = () => {
    if (paragraph.length) {
      output.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
    if (list.length) {
      output.push(
        `<ul>${list.map(item => `<li>${inline(item)}</li>`).join("")}</ul>`
      );
      list = [];
    }
  };
  for (const line of source.split("\n")) {
    if (line.startsWith("```")) {
      flush();
      if (code === null) code = [];
      else {
        output.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = null;
      }
      continue;
    }
    if (code !== null) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flush();
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flush();
      const level = Math.max(2, heading[1].length);
      output.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    if (line.startsWith("- ")) {
      if (paragraph.length) flush();
      list.push(line.slice(2));
      continue;
    }
    if (list.length) flush();
    paragraph.push(line.trim());
  }
  flush();
  if (code !== null) throw new Error("Unclosed code block in a blog post.");
  return output.join("\n");
}
const posts = [];
for (const file of fs
  .readdirSync(directory)
  .filter(file => file.endsWith(".md") && file !== "README.md")) {
  const source = fs.readFileSync(path.join(directory, file), "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Missing frontmatter in ${file}`);
  const fields = Object.fromEntries(
    match[1]
      .split("\n")
      .filter(Boolean)
      .map(line => {
        const separator = line.indexOf(":");
        if (separator < 1) throw new Error(`Invalid frontmatter in ${file}`);
        return [
          line.slice(0, separator).trim(),
          line
            .slice(separator + 1)
            .trim()
            .replace(/^['"]|['"]$/g, ""),
        ];
      })
  );
  if (fields.draft !== "false") continue;
  const slug = fields.slug || file.replace(/\.md$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new Error(`Invalid slug in ${file}`);
  for (const required of ["title", "date", "category", "excerpt"])
    if (!fields[required]) throw new Error(`${required} missing in ${file}`);
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(fields.date) ||
    Number.isNaN(Date.parse(fields.date))
  )
    throw new Error(`Invalid date in ${file}`);
  if (!match[2].trim()) throw new Error(`Published post ${file} has no body.`);
  if (posts.some(post => post.slug === slug))
    throw new Error(`Duplicate post slug ${slug}`);
  posts.push({
    slug,
    title: fields.title,
    date: fields.date,
    category: fields.category,
    excerpt: fields.excerpt,
    html: markdown(match[2]),
  });
}
posts.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(
  "client/src/data/posts.json",
  JSON.stringify(posts, null, 2) + "\n"
);
const routes = [
  ["/", "Entrance"],
  ["/work", "Work"],
  ["/reminiscence", "Reminiscence"],
  ["/about", "About"],
];
fs.writeFileSync(
  "client/public/manus-routes.json",
  JSON.stringify(
    { routes: routes.map(([path, title]) => ({ path, title })) },
    null,
    2
  ) + "\n"
);
console.log(
  `Content ready: ${posts.length} personal blog posts, ${routes.length} page routes.`
);
