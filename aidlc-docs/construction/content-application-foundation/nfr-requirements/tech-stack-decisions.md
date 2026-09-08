# Tech Stack Decisions - Content and Application Foundation

## Selection Policy

Use stable, supported releases verified against official sources at implementation time. Pin exact resolved packages through `package-lock.json`, use `npm ci` for clean installation, and avoid prereleases. Compatibility and successful static export take precedence over adopting a newer incompatible major.

## Runtime and Package Management

### Node.js

- **Decision**: Support Node.js 22.12 or newer within supported lines; prefer Node.js 24 LTS for CI and deployment preparation.
- **Local compatibility**: The available Node.js 22.23.2 environment satisfies the baseline and requires no administrator access.
- **Rationale**: Node.js recommends production use of Active or Maintenance LTS lines. On 7 September 2026, Node.js 24 is LTS and Node.js 22 remains LTS.
- **Constraint**: Do not require Node.js 26 Current or an end-of-life line.

### npm

- **Decision**: Use the npm version bundled with the selected Node.js environment and commit `package-lock.json`.
- **Clean install**: `npm ci` is the reproducibility gate.
- **Rationale**: npm is already available in user space and does not require sudo for workspace-local dependencies.

## Application Framework

### Next.js

- **Decision**: Use the supported Next.js 16 Active LTS line, at or above security-patched version 16.3.3 when dependencies are resolved.
- **Mode**: App Router with static export.
- **Rationale**: The official August 2026 security release identifies 16.3.3 as Active LTS and directs users to upgrade to that patch.
- **Constraints**:
  - No visitor dependency on `next start`.
  - No runtime server actions, request-time middleware, or server-only dynamic routes.
  - Build must validate the export output expected by a static host.

### React and React DOM

- **Decision**: Use the stable React 19.2 line supported by the selected Next.js release and pin its current compatible security-patched versions.
- **Rationale**: React's official versions page identifies 19.2 as the latest stable documentation line and lists patched releases.
- **Constraint**: Let the supported Next.js peer range determine the exact compatible patch pair.

## Language

### TypeScript

- **Decision**: Start with the current stable TypeScript compiler supported by Next.js and the lint ecosystem when code generation begins.
- **Verified landscape**: TypeScript 7.0 is stable as of July 2026, while TypeScript 6 compatibility remains relevant for tools that consume the compiler API.
- **Implementation rule**: Attempt the stable TypeScript 7 line first. If an essential stable tool has a declared incompatible peer range, document the evidence and use the latest supported TypeScript 6 patch rather than a prerelease or forced peer override.
- **Configuration**: Strict type checking, no unchecked escape through broad `any`, and no deprecated compiler options carried solely for convenience.

## Styling

### Tailwind CSS

- **Decision**: Use the stable Tailwind CSS 4.3 line with CSS-first theme tokens.
- **Rationale**: Tailwind's official release channel lists 4.3 as the current stable release in May 2026.
- **Constraints**:
  - Brand colors and typography are declared as named tokens.
  - Prohibited default indigo or violet accents are absent.
  - Raw color values remain centralized.
  - Global CSS may express editorial details that utilities would obscure.

## Content Validation and Parsing

### Zod

- **Decision**: Use a stable Zod release for runtime schema validation and inferred TypeScript types.
- **Rationale**: Supports structured issues, discriminated state, and explicit validation at the repository boundary.
- **Constraint**: Wrap library issues in project-owned stable error codes and relative-path diagnostics.

### gray-matter

- **Decision**: Use a stable `gray-matter` release for front-matter extraction.
- **Rationale**: Keeps parsing separate from schema validation and preserves raw body source.
- **Constraint**: YAML parsing does not establish validity; every parsed object passes through a collection schema.

### MDX compilation

- **Decision**: Use stable `next-mdx-remote` React Server Component support or the closest officially compatible stable MDX compiler after a focused compatibility spike during Code Generation.
- **Rationale**: Content lives in collections rather than one route module per file and needs a curated component map.
- **Selection gate**:
  - Compatible with Next.js static export and the selected React version.
  - Supports build-time compilation from strings.
  - Allows rejection of imports, exports, raw scripts, and unsupported component names.
  - Adds no browser runtime compiler.
- **Fallback**: Use a stable unified Markdown pipeline with curated React renderers if the stable MDX option cannot meet the safety and static-export constraints.

## Testing and Quality

### Vitest

- **Decision**: Use stable Vitest 5 for Unit 1 module tests if the resolved Next.js and TypeScript toolchain is compatible.
- **Rationale**: Vitest 5 is the current stable major as of 3 September 2026 and requires Node.js 22.12 or newer, which the local environment satisfies.
- **Environment**: Node environment for content, validation, metadata, and file-source modules.
- **Coverage**: V8 coverage provider, enforcing the selected branch threshold on core Unit 1 modules.

### ESLint

- **Decision**: Use the stable ESLint release and Next.js-supported configuration rather than deprecated framework wrappers.
- **Rationale**: Keeps lint execution explicit and compatible with CI.

### Prettier

- **Decision**: Use a stable Prettier release for deterministic source formatting.
- **Constraint**: Formatting must not rewrite authored Markdown semantics unexpectedly; content formatting scope will be explicit.

## Built-in Platform Capabilities

- Node.js `fs/promises` and `path` for constrained server-only file access
- Standard `URL` parsing for protocol validation
- `Intl` only with explicit locale where display formatting needs it; ordering logic uses deterministic normalization
- Next.js metadata, sitemap, robots, static params, image, and font capabilities where compatible with static export

## Rejected Alternatives

| Alternative | Reason not selected |
|---|---|
| Database or headless CMS API | Violates static simplicity, cost, availability, and ownership requirements |
| Contentlayer | Avoid depending on an additional content build system with uncertain long-term framework compatibility |
| Browser-time Markdown or MDX compilation | Increases client cost and attack surface and undermines static rendering |
| Unvalidated direct front-matter casts | Cannot produce reliable runtime diagnostics or protect route generation |
| Node.js 26 Current | Not an LTS production baseline on the decision date |
| Prerelease framework or compiler packages | Adds unnecessary compatibility risk |
| Jest for Unit 1 | Vitest better matches the selected ESM-oriented modern toolchain and coverage needs |

## Version Verification Sources

- Next.js release and security status: https://nextjs.org/blog
- Node.js release status: https://nodejs.org/en/about/previous-releases
- Tailwind CSS releases: https://tailwindcss.com/blog
- React stable versions: https://react.dev/versions
- TypeScript 7 stable announcement: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/
- Vitest 5 announcement: https://vitest.dev/blog/vitest-5

Exact installed versions will be captured in `package-lock.json` during Unit 1 Code Generation and rechecked against official compatibility and security guidance at that time.

## Extension Compliance

All optional extensions are disabled. Extension-specific stack requirements are not applicable; the approved core security and quality constraints remain enforced.
