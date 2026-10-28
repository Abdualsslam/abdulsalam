import { build } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";

// Keep npm run build -- --base=/abdulsalam/ compatible with the Pages workflow.
const args = process.argv.slice(2);
const option = name => {
  const inline = args.find(arg => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};
const base = option("--base") ?? "/";
const mode = option("--mode") ?? "production";
if (!base.startsWith("/") || !base.endsWith("/") || base.includes("..")) {
  throw new Error("Use an absolute deployment base with a trailing slash, such as / or /abdulsalam/.");
}

await build({ base, mode });
const output = resolve("dist");
const serverOutput = resolve("node_modules/.cache/portfolio-ssg");
await build({
  base, mode,
  build: {
    ssr: "src/entry-server.tsx",
    outDir: serverOutput,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
  },
});
const { renderPage, pagePaths, showcasePages, noindex, siteUrl, llmsText } = await import(pathToFileURL(join(serverOutput, "entry-server.mjs")).href);
const template = await readFile(join(output, "index.html"), "utf8");
if (!template.includes("<!--seo-head-->") || !template.includes("<!--app-html-->")) {
  throw new Error("Missing HTML placeholders for SEO or prerendered content.");
}
const canonicals = [];
for (const path of [...pagePaths, `${base}404.html`]) {
  const { headHtml, appHtml, canonical } = renderPage(path);
  const relative = path.slice(base.length);
  const destination = relative === "404.html" ? join(output, relative) : join(output, relative, "index.html");
  const html = template.replace("<!--seo-head-->", () => headHtml).replace("<!--app-html-->", () => appHtml);
  await mkdir(resolve(destination, ".."), { recursive: true });
  await writeFile(destination, html);
  if (canonical && !noindex) canonicals.push(canonical);
}
for (const page of showcasePages) {
  const destination = join(output, page.path, "index.html");
  const html = await readFile(destination, "utf8");
  const seoBlock = /<!--showcase-seo-start-->[\s\S]*?<!--showcase-seo-end-->/;
  if (!seoBlock.test(html)) throw new Error(`Missing showcase SEO placeholder: ${page.path}`);
  await writeFile(destination, html.replace(seoBlock, () => page.headHtml));
  if (page.canonical && !noindex) canonicals.push(page.canonical);
}
const xmlEscape = value => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
if (canonicals.length) {
  await writeFile(join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${canonicals.map(url => `  <url><loc>${xmlEscape(url)}</loc></url>`).join("\n")}\n</urlset>\n`);
}
// Search bots may crawl all public pages. Search visibility and model training
// are separate policies; do not add training-specific directives here.
const sitemapUrl = canonicals.length ? new URL("sitemap.xml", siteUrl).href : null;
await writeFile(join(output, "robots.txt"), `User-agent: *\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n${sitemapUrl ? `\nSitemap: ${sitemapUrl}\n` : ""}`);
if (siteUrl && !noindex) await writeFile(join(output, "llms.txt"), llmsText());
console.log(`Prerendered ${pagePaths.length} pages and 404.html; prepared ${showcasePages.length} standalone showcases. ${noindex ? "Mirror/staging pages are noindex." : `${canonicals.length} canonical URLs in sitemap.xml.`}`);
