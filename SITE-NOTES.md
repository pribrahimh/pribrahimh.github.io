# Site notes

## Palette

Defined as CSS custom properties in `:root {}` at the top of `style.css`. Change them there - nowhere else.

| Variable | Value | Role |
|---|---|---|
| `--col-bg` | `#edf0f4` | Page background - cool blue-gray, monitoring dashboard light mode |
| `--col-surface` | `#ffffff` | Cards and panels |
| `--col-border` | `#c8d3de` | Lines, dividers, table borders |
| `--col-text` | `#1b2836` | Body text - dark navy-black |
| `--col-muted` | `#637384` | Metadata, labels, secondary text |
| `--col-accent` | `#1b5fa8` | Blue - links, active states, left-border accents |
| `--col-accent-light` | `#e8f0fb` | Pale blue for tags and hover backgrounds |
| `--col-status` | `#1a9955` | Green for the "available" status dot |
| `--col-status-bg` | `#e8f7ee` | Status badge background |

**Why this palette:** The background and muted colors read as "professional monitoring tool in daylight mode" - the same visual register as Grafana light or a network status dashboard. The blue accent references operational infrastructure (link active, system healthy) without being the default browser blue. Going light was deliberate: most security/tech portfolios default to dark, and a cool light palette stands out without being conspicuous.

## Typography

Three faces, loaded from Google Fonts in `style.css`:

- **Sora** (display) - geometric, slightly rounded, used for the hero name, page headings and card titles. Confident without being editorial. Contrasts well with Inter at large sizes.
- **Inter** (body) - the reliable workhorse. Excellent readability at small sizes.
- **JetBrains Mono** (metadata) - purpose-built for reading technical data. Used for dates, labels, status badges, section rule labels, tags and contact labels. This is the personality element of the site: it makes section headers feel like log annotations and dates feel like timestamps.

Type scale uses `clamp()` so headings scale between mobile and desktop without breakpoints.

## Signature motif

Every major section on every page opens with:

```html
<div class="section-rule"><span>label text</span></div>
```

This renders as a lowercase monospace label followed by a 1px horizontal rule extending to the right edge. Drawn from console log section delimiters. The label is always lowercase, always in JetBrains Mono, always muted. The rule is always `--col-border`.

Use this consistently. Do not skip it on new sections. Do not add anything decorative around it.

## How to add a project

1. Open `projects.js`.
2. Copy one of the commented-out example objects at the bottom of the `PROJECTS` array.
3. Fill in all fields. Use `null` for `repo` or `demo` if not applicable.
4. Set `featured: true` on at most one project (this controls what shows on `index.html`).
5. Save `projects.js`.
6. Open `projects.html` and update the static HTML fallback inside `<div id="projects-grid">`. This is the version shown when JavaScript is disabled - keep it in sync.
7. If you changed the featured project, also update the static HTML in `index.html` inside `<div id="projects-featured">`.

The static fallback and the JS-rendered version show the same content. The JS version is generated from the data object, which is the canonical source.

## How to deploy to GitHub Pages

1. Create a new repository at github.com (e.g. `pribrahimh.github.io` for a user site, or `portfolio` for a project site).
2. Push all files in this directory to the `main` branch.
3. In the repository settings, go to Pages, set source to "Deploy from a branch", branch to `main`, folder to `/` (root).
4. GitHub Pages will serve the site at `https://pribrahimh.github.io` (user site) or `https://pribrahimh.github.io/portfolio` (project site).

No build step, no configuration file needed. The site is plain HTML/CSS/JS and works directly from the file system.

**Custom domain:** If you have a domain, add a `CNAME` file to the repo root containing your domain name (e.g. `ibrahimhassan.dev`), then point your DNS to GitHub Pages. Instructions at docs.github.com/pages/configuring-a-custom-domain.

## TODO list

Every unfilled placeholder in the site. Nothing should ship with these open unless it is intentional.

| Location | TODO |
|---|---|
| `projects.js` line ~27 | Confirm the exact year the IoT Blockchain System was built |
| `about.html` - Certifications | Add the year CompTIA A+ was awarded |
| `contact.html` - Availability | Update the availability note as circumstances change (graduation date, preferred start date, whether full-time is available) |
| `about.html` - Interests | An interests section is commented out at the bottom of the education page. Add content and uncomment it when ready |
| All pages | No profile photo is included. If a photo is added, use an `<img>` with descriptive `alt` text. Place it in the hero on `index.html` |
| All pages | No Open Graph / social preview image (`og:image` meta tag). Add one if the site will be shared on LinkedIn or elsewhere |
| All pages | No downloadable PDF CV link. Add one to the contact page and/or the hero if a PDF version is produced |
