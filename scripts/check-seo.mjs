import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

const options = Object.fromEntries(process.argv.slice(2).map(argument => {
  assert.match(argument, /^--(?:base|dir)=.+$/, `Unknown argument: ${argument}`);
  const separator = argument.indexOf("=");
  return [argument.slice(2, separator), argument.slice(separator + 1)];
}));
const base = options.base ?? "/";
assert.match(base, /^\/(?:[^?#]*\/)?$/, "--base must be an absolute path ending in / (for example /abdulsalam/)");
const output = resolve(options.dir ?? "dist");
const sectionIds = ["about", "projects", "skills", "experience", "qualifications", "contact"];

const decode = value => value
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));

function attributes(source) {
  return Object.fromEntries([...source.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)]
    .map(match => [match[1].toLowerCase(), decode(match[2] ?? match[3] ?? match[4])]));
}

function elements(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, "gi"))].map(match => attributes(match[1]));
}

const textContent = html => decode(html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
async function exists(path) {
  try { return await stat(path); } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.name.endsWith(".html")) files.push(path);
  }
  return files;
}

const pages = await htmlFiles(output);
assert(pages.length >= sectionIds.length + 3, "Expected a home page, section pages, project pages, and 404.html");
for (const section of sectionIds) {
  assert(await exists(resolve(output, section, "index.html")), `Missing prerendered section: ${section}`);
}
assert(await exists(resolve(output, "404.html")), "Missing 404.html");

const projectDirectory = resolve(output, "projects");
const projectIds = (await readdir(projectDirectory, { withFileTypes: true }))
  .filter(entry => entry.isDirectory()).map(entry => entry.name);
assert(projectIds.length > 0, "No prerendered project pages found");
const listing = await readFile(resolve(projectDirectory, "index.html"), "utf8");
const projectLinks = elements(listing, "a").map(link => link.href);
for (const id of projectIds) {
  assert(projectLinks.includes(`${base}projects/${id}/`), `Project listing does not link to ${id}`);
}
assert(!/href=["']#projects\//.test(listing), "Project links still use fragments instead of crawlable pages");

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();
const indexingPolicies = new Set();
let homeCanonical;
let canonicalCount = 0;
let assetCount = 0;
const checkedAssets = new Set();
const localOrigin = "https://seo-check.invalid";

for (const file of pages) {
  const name = relative(output, file).split(sep).join("/");
  const html = await readFile(file, "utf8");
  const is404 = name === "404.html";
  const route = name === "index.html" ? base : `${base}${name.replace(/index\.html$/, "")}`;
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  assert(head, `${name}: no document head`);
  assert.match(html, /<html\b[^>]*\blang=["']ar["'][^>]*>/i, `${name}: missing Arabic document language`);
  assert.match(html, /<html\b[^>]*\bdir=["']rtl["'][^>]*>/i, `${name}: missing RTL document direction`);
  assert.match(html, /<div\b[^>]*\bid=["']root["'][^>]*>\s*</i, `${name}: empty client-only root`);
  assert.match(html, /<main\b/i, `${name}: no main content in initial HTML`);
  if (name.endsWith("/index.html")) {
    const segments = name.split("/");
    if (segments[0] === "projects" && segments.length === 3) {
      assert(html.includes(`data-project="${segments[1]}"`), `${name}: requested project content is absent from initial HTML`);
    } else if (segments.length === 2) {
      assert(new RegExp(`<section\\b[^>]*\\bid=["']${segments[0]}["']`).test(html), `${name}: requested section is absent from initial HTML`);
    }
  }
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => textContent(match[1]));
  assert(headings.some(Boolean), `${name}: no text H1 in initial HTML`);
  const title = textContent(head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  assert(title.length >= 5, `${name}: missing page title`);
  assert(!titles.has(title), `${name}: duplicate title: ${title}`);
  titles.add(title);
  const meta = elements(head, "meta");
  const description = meta.find(item => item.name === "description")?.content;
  assert(description?.length >= 30, `${name}: missing or very short description`);
  assert(!descriptions.has(description), `${name}: duplicate description`);
  descriptions.add(description);
  const robotsTags = meta.filter(item => item.name === "robots");
  assert.equal(robotsTags.length, 1, `${name}: expected one robots directive`);
  const robots = robotsTags[0]?.content;
  assert(robots, `${name}: missing robots directive`);
  if (is404) assert.match(robots, /\bnoindex\b/, `${name}: error page must not be indexed`);
  else indexingPolicies.add(/\bnoindex\b/.test(robots));
  assert(meta.some(item => item.property === "og:title" && item.content === title), `${name}: Open Graph title differs from page title`);
  assert(meta.some(item => item.property === "og:description" && item.content), `${name}: missing Open Graph description`);

  const canonicalLinks = elements(head, "link").filter(item => item.rel === "canonical");
  assert(canonicalLinks.length <= 1, `${name}: more than one canonical`);
  if (is404) assert.equal(canonicalLinks.length, 0, `${name}: error page must not have a canonical`);
  if (canonicalLinks.length) {
    const canonical = new URL(canonicalLinks[0].href);
    assert.match(canonical.protocol, /^https?:$/, `${name}: canonical must use HTTP(S)`);
    assert(!canonical.hash && !canonical.search, `${name}: canonical contains a fragment or query`);
    assert(!canonicals.has(canonical.href), `${name}: canonical reused across pages`);
    assert(canonical.pathname.endsWith("/"), `${name}: canonical should end in /`);
    canonicals.add(canonical.href);
    if (name === "index.html") homeCanonical = canonical.href;
    canonicalCount++;
  }

  const schemas = [...head.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(match => attributes(match[1]).type === "application/ld+json");
  assert(schemas.length > 0, `${name}: no structured data`);
  const faqSchemas = [];
  for (const [, source, json] of schemas) {
    const parsed = JSON.parse(json);
    assert(parsed && typeof parsed === "object", `${name}: invalid structured data object`);
    assert.equal(parsed["@context"], "https://schema.org", `${name}: unexpected structured data context`);
    assert(parsed["@graph"] || parsed["@type"], `${name}: structured data has no graph or type`);
    assert(attributes(source).id, `${name}: structured data must have an id for runtime updates`);
    const nodes = parsed["@graph"] ?? [parsed];
    assert(Array.isArray(nodes), `${name}: structured data graph must be an array`);
    faqSchemas.push(...nodes.filter(node => [node["@type"]].flat().includes("FAQPage")));
  }

  if (name === "about/index.html") {
    assert.equal(faqSchemas.length, 1, `${name}: expected one FAQPage matching the visible questions`);
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
    const visibleItems = [...body.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/gi)]
      .filter(match => attributes(match[1]).class?.split(/\s+/).includes("about-faq-item"))
      .map(([, , content]) => ({
        question: textContent(content.match(/<summary\b[^>]*>([\s\S]*?)<\/summary>/i)?.[1] ?? ""),
        answer: textContent(content.match(/<p\b[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? ""),
      }));
    assert(visibleItems.length > 0, `${name}: no FAQ visible in initial HTML`);
    assert(visibleItems.every(item => item.question && item.answer), `${name}: incomplete visible FAQ item`);
    assert.equal(new Set(visibleItems.map(item => item.question)).size, visibleItems.length, `${name}: duplicate visible FAQ questions`);
    const schemaItems = faqSchemas[0].mainEntity;
    assert(Array.isArray(schemaItems), `${name}: FAQ schema must contain a question list`);
    const structuredItems = schemaItems.map(item => {
      assert.equal(item["@type"], "Question", `${name}: FAQ entry must be a Question`);
      assert.equal(item.acceptedAnswer?.["@type"], "Answer", `${name}: FAQ entry must contain an accepted Answer`);
      return { question: textContent(item.name ?? ""), answer: textContent(item.acceptedAnswer.text ?? "") };
    });
    assert.deepEqual(structuredItems, visibleItems, `${name}: FAQ structured data differs from the visible questions and answers`);
  } else assert.equal(faqSchemas.length, 0, `${name}: FAQPage must only appear on the page displaying the FAQ`);

  if (!is404) {
    const anchors = elements(html, "a").map(link => link.href);
    for (const section of sectionIds) {
      assert(anchors.includes(`${base}${section}/`), `${name}: no crawlable link to ${section}`);
    }
  }

  for (const [, tag, source] of html.matchAll(/<([a-z][\w:-]*)\b([^>]*)>/gi)) {
    const attrs = attributes(source);
    const references = [attrs.src, attrs.poster, (tag.toLowerCase() === "a" || tag.toLowerCase() === "link") ? attrs.href : null];
    for (const reference of references) {
      if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) continue;
      const url = new URL(reference, `${localOrigin}${route}`);
      assert(url.pathname.startsWith(base), `${name}: local URL escapes deployment base ${base}: ${reference}`);
      const pathname = decodeURIComponent(url.pathname.slice(base.length));
      const target = resolve(output, pathname);
      assert(!relative(output, target).startsWith(".."), `${name}: local URL leaves output directory: ${reference}`);
      if (checkedAssets.has(target)) continue;
      const targetStat = await exists(target);
      assert(targetStat, `${name}: local URL is missing from build: ${reference}`);
      if (targetStat.isDirectory()) {
        assert(await exists(resolve(target, "index.html")), `${name}: linked directory has no index.html: ${reference}`);
      }
      checkedAssets.add(target);
      assetCount++;
    }
  }
}

assert(canonicalCount === 0 || canonicalCount === pages.length - 1, "Canonical configuration is inconsistent across indexable pages (404 should omit a canonical)");
assert.equal(indexingPolicies.size, 1, "All valid pages must consistently use the same index/noindex policy");
const noindex = indexingPolicies.has(true);
const robots = await readFile(resolve(output, "robots.txt"), "utf8");
assert.match(robots, /User-agent:\s*\*/i, "robots.txt is missing a default crawler group");
const sitemapFile = resolve(output, "sitemap.xml");
const sitemapExists = await exists(sitemapFile);
const robotsSitemaps = [...robots.matchAll(/^Sitemap:\s*(\S+)\s*$/gim)].map(match => match[1]);
if (noindex) {
  assert(!sitemapExists, "A noindex mirror must not generate its own sitemap");
  assert.equal(robotsSitemaps.length, 0, "A noindex mirror must not advertise a sitemap in robots.txt");
} else if (canonicalCount) {
  assert(sitemapExists, "Indexable pages with configured canonical URLs must generate sitemap.xml");
  assert(homeCanonical, "The home page is missing its canonical URL");
  const expectedSitemap = new URL("sitemap.xml", homeCanonical).href;
  assert.deepEqual(robotsSitemaps, [expectedSitemap], "robots.txt must advertise the primary site's sitemap exactly once");
  const sitemap = await readFile(sitemapFile, "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
  assert.equal(new Set(locations).size, locations.length, "Sitemap contains duplicate URLs");
  assert.equal(locations.length, canonicals.size, "Sitemap and canonical page counts differ");
  for (const canonical of canonicals) assert(locations.includes(canonical), `Canonical missing from sitemap: ${canonical}`);
  assert(!locations.some(location => location.includes("404.html")), "Sitemap includes the error page");
}

console.log(`SEO verification passed: ${pages.length} HTML pages, ${projectIds.length} project routes, ${canonicalCount} canonical URLs, ${assetCount} local references, and a consistent ${noindex ? "noindex" : "index"} policy.`);
if (!canonicalCount) console.log("No canonical URLs are configured; set VITE_SITE_URL to the primary public site URL before indexing production.");
