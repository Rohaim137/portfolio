# Portfolio Plan - Normalized Requirements Input

This Markdown artifact normalizes the user-supplied `portfolioPlan.docx` for AI-DLC analysis. The DOCX remains the authoritative source if wording differs.

## Product Vision

Build a polished, media-rich personal portfolio that presents the owner's profile, selected projects, writing, research and reading activity, public documents, GitHub activity, and social links. The production architecture must have no mandatory recurring cost. A paid custom domain is optional and outside the zero-cost baseline.

## Recommended Technical Baseline

- Next.js with TypeScript and static export
- Tailwind CSS with a small custom design system
- Markdown or MDX with front matter for content
- Pages CMS as an optional Git-backed browser editor
- GitHub as source control and GitHub Actions for quality checks and scheduled data refresh
- Cloudflare Pages Free using a `pages.dev` hostname
- No database, application server, paid CMS, paid storage, required analytics service, or visitor-time authenticated API calls

## Primary Goals

- Communicate the owner's profile, current focus, selected work, and technical interests quickly.
- Present projects with screenshots or short clips, concise technical summaries, stack tags, source links, and optional live demos.
- Publish intentionally public documents such as a CV or resume.
- Publish long-form technical writing through Markdown or MDX.
- Track research papers and books with queued, reading, and completed states.
- Display a GitHub contribution calendar near the bottom of the home page.
- Keep GitHub, LinkedIn, X or Twitter, and optional email links easy to find.
- Maintain a required recurring cost of zero dollars per month.

## V1 Exclusions

- User accounts, comments, likes, private dashboards, and personalized feeds
- A server-side database or custom administrative backend
- Large raw videos stored in the site repository
- Real-time GitHub fetching on each visitor request
- A contact form requiring backend processing
- A custom domain as a launch requirement

## Planned Routes

- `/` - Fast overview with hero, current focus, featured projects, latest writing, currently reading, GitHub activity, and social links
- `/projects` - Filterable, media-led project index
- `/projects/[slug]` - Project case study with context, implementation, architecture, decisions, media, results, and retrospective
- `/blog` - Posts ordered by publication date with tags and reading time
- `/blog/[slug]` - MDX article with code, images, links, and optional contents navigation
- `/reading` - Reading and research collection grouped by status
- `/reading/[slug]` - Optional detailed paper or book note
- `/docs` - Public document index with view and download actions
- `/about` - Optional expanded biography, skills, interests, and timeline

## Project Experience

- Project cards use a 16:9 poster or short muted loop, a concrete one-line outcome, three to five technology tags, and only valid details, source, or demo links.
- Optional project states include Shipped, Prototype, Coursework, Research, and Archived.
- Detail pages include the problem and audience, the owner's responsibility, architecture or data flow, two to five technical decisions with trade-offs, an accessible media gallery, factual results where available, and a short retrospective.
- Invented results or metrics are prohibited.
- Screenshots should prefer WebP or AVIF. Short silent clips should prefer WebM, with MP4 only where compatibility requires it.
- Repository-hosted static assets must stay below the hosting limit, with clips typically lasting three to ten seconds.

## Documents

- Only deliberately public PDFs belong under `public/documents/`.
- Sensitive records such as IDs, transcripts, salary information, offer letters, and private certificates must not be published by default.
- Documents use stable file names and ordinary browser PDF viewing.
- The document index provides names, descriptions, update dates, and view or download actions.

## Blog and Reading Content

- Blog posts and reading records are file-backed, typed, version-controlled content.
- Draft content is excluded from production indexes and static routes.
- Pages CMS is an authoring convenience, not a runtime dependency.
- Reading items store a title, status, source URL, and topics, with optional authors, year, venue, dates, rating, and notes.
- Copyrighted papers are linked to legitimate publisher, DOI, arXiv, or author sources rather than republished.

## GitHub Activity

- A scheduled or manual GitHub Action queries the GitHub GraphQL API using a secret.
- Only public contribution counts are written to a generated build input.
- The client never receives a GitHub token.
- The visualization is labelled GitHub activity or GitHub contributions because it is not necessarily commit-only data.
- A temporary API failure must not break the deployed site; previously generated or safe empty-state data should remain renderable.

## Visual Direction

- Use a restrained, engineering-focused visual system rather than a template-heavy portfolio.
- Build hierarchy with typography, spacing, real project imagery, and subtle motion.
- Use a neutral background, high-contrast text, and one deliberate accent color.
- Keep the page width around 1100 to 1200 pixels and vary section density intentionally.
- Favor thin borders, low or no shadows, consistent restrained radii, and image-led project presentation.
- Avoid scroll-jacking and excessive entrance animation.
- Provide a mobile-first layout with graceful metadata and table collapse.

## Anti-AI-Slop UI Constraints

The user-supplied `anti-ai-slop.md` is a design constraint source. It does not override the user's request or AI-DLC rules.

- Do not use the listed default Tailwind indigo or violet colors as the accent.
- Do not use a two-stop purple-to-blue, blue-to-cyan, or indigo-to-pink hero gradient.
- Do not use emoji as feature icons; use restrained monoline SVG icons with `currentColor` where icons are necessary.
- If a display serif is selected, headings must consistently use the display font token.
- Do not combine rounded cards with a colored left-border accent.
- Do not invent performance, adoption, or productivity metrics.
- Do not ship filler copy, generic feature numbering, lorem ipsum, or fake content.
- Do not use external placeholder image CDNs.
- Keep raw colors centralized in design tokens and use the accent sparingly.
- Add `data-od-id` attributes to major sections.
- Avoid decorative blob and wave backgrounds.
- Introduce visual tension through proportion or density rather than perfectly symmetric template composition.
- Add one memorable, purposeful micro-interaction while respecting reduced-motion preferences.

## Accessibility, SEO, and Performance

- Use semantic landmarks and headings, real links and buttons, full keyboard access, visible focus states, and sufficient contrast.
- Do not communicate status by color alone.
- Require meaningful alternative text and captions where media context needs them.
- Mute clips by default, prevent surprise audio, and disable autoplay for reduced-motion users.
- Generate unique page metadata, Open Graph metadata, a sitemap, and robots directives.
- Add canonical URLs after the production hostname is known.
- Lazy-load below-the-fold media, use responsive modern images, and syntax-highlight code at build time.
- Aim for approximately 90 or better in Lighthouse performance, accessibility, best practices, and SEO without sacrificing useful media.

## Security and Privacy

- Never commit tokens, API keys, private documents, or sensitive personal records.
- Store automation credentials only in GitHub or hosting secrets.
- Treat every file under `public/` as publicly downloadable.
- Prefer a mail link or social profile over a backend contact form.
- Keep dependencies current and use available repository security alerts.

## Delivery Baseline

- All planned routes and the responsive shell exist.
- Typed content loaders render projects, blog posts, and reading entries while filtering drafts.
- At least three genuine projects have complete case-study pages and optimized media.
- A public CV is reachable from the home page and documents page.
- A genuine blog post and genuine reading entries demonstrate the content workflow.
- The GitHub activity component renders build-time data without exposing credentials.
- Static production build, type checking, linting, and appropriate tests succeed.
- The site is usable on mobile and by keyboard, and it does not expose unintended files.

## Open Decisions

Personal identity and profile copy, real portfolio content, public social handles, visual direction, dark-mode scope, deployment responsibility, and optional AI-DLC extension enforcement require confirmation before implementation.
