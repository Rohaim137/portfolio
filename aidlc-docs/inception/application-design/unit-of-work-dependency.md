# Unit of Work Dependencies

## Dependency Matrix

| Consumer unit | Unit 1 Foundation | Unit 2 Experience | Unit 3 Quality and Delivery |
|---|---|---|---|
| Unit 1 Foundation | Owns base contracts | No dependency | No dependency |
| Unit 2 Experience | Required | Owns presentation | No dependency during feature construction |
| Unit 3 Quality and Delivery | Required | Required | Owns integrated verification and preparation |

## Required Sequence

1. Complete Unit 1 and stabilize typed content, configuration, metadata, and build contracts.
2. Complete Unit 2 against Unit 1 contracts and produce the full visitor-facing application.
3. Complete Unit 3 against the integrated Unit 1 and Unit 2 application.
4. Run the final Build and Test stage across all units.

No unit is independently deployed, and no external publication occurs in this sequence.

## Unit 1 to Unit 2 Contract

Unit 1 supplies:

- Typed project, post, reading, document, profile, social, media, and metadata models
- Validated published lists and compiled detail records
- Explicit demo, draft, pending, missing, and not-found semantics
- Home and index view models
- Static slugs and metadata inputs
- Curated MDX output and headings

Unit 2 must:

- Treat these contracts as authoritative.
- Avoid parsing raw front matter or reading the file system.
- Pass only serializable models into client islands.
- Preserve every disclosure and visibility state in presentation.

## Units 1 and 2 to Unit 3 Contract

Units 1 and 2 supply:

- Verified local quality commands
- Stable content schemas and authoring directories
- Complete route set and static-export behavior
- Test seams and representative fixtures
- Stable design tokens and detectable anti-slop constraints
- Accessible interaction and media contracts

Unit 3 must:

- Automate the same checks that work locally.
- Avoid introducing host-specific runtime dependencies.
- Execute the user-added static deployment only after integrated verification and explicit action-time approval; do not add a runtime service.
- Preserve the inactive contribution boundary until separately authorized.

## Shared Coordination Points

| Coordination point | Owner | Consumers | Change rule |
|---|---|---|---|
| Content schemas | Unit 1 | Units 2 and 3 | Changes require loader, UI-state, fixtures, CMS, and documentation review |
| Site and social configuration | Unit 1 | Units 2 and 3 | Pending and active states must remain exhaustive |
| Curated MDX components | Unit 1 contract, Unit 2 presentation | Unit 3 authoring docs | Additions require safety, accessibility, and authoring coverage |
| Design tokens | Unit 2 | Unit 3 checks | Prohibited accents and sparse accent use remain enforced |
| Quality commands | Unit 3 | Final Build and Test | CI must match verified local commands |
| Static output path | Unit 1 configuration | Unit 3 host preparation | Host configuration changes require a clean build verification |
| Public document rules | Unit 1 service, Unit 2 UI | Unit 3 documentation | No automatic public directory enumeration |
| Contribution data boundary | Unit 1 contract | Units 2 and 3 | Remains inactive until authenticated build-time flow is separately approved |

## Integration Checkpoints

### Checkpoint 1: Foundation contract verification

- Content schemas accept valid records and reject invalid required fields.
- Draft and demo behavior is proven with isolated fixtures.
- Published slug generation excludes drafts.
- Site configuration produces active and pending destination states.
- Minimal static build succeeds.

### Checkpoint 2: Visitor experience verification

- All routes consume typed services and generate statically.
- Three demo projects and three demo posts render with disclosures.
- Reading and document empty states are truthful.
- Navigation, filters, media, status, and pending destinations work accessibly.
- Anti-slop and responsive reviews pass.

### Checkpoint 3: Delivery readiness verification

- Authoring and CMS fields match content schemas.
- Local checks and CI definitions agree.
- Static output contains no secrets or unintended documents.
- Deployment instructions match the verified artifact and retain a separate approval boundary.

### Final checkpoint: Integrated Build and Test

- Clean dependency installation
- Formatting, linting, type checking, unit and component tests
- Representative accessibility and link checks
- Full static production build
- Artifact inspection and instruction validation

## Change and Rollback Strategy

- Keep each unit independently reviewable in source control when Git becomes available.
- Do not start a dependent unit before the preceding unit's code-generation checkpoint is approved.
- If a Unit 1 contract changes during Unit 2, update its schema tests and all affected consumers in the same approved unit interaction.
- If Unit 3 automation exposes a defect, fix it in the owning unit's code and rerun downstream checks rather than masking it in CI.
- Before deployment, rollback is local through Git. After the separately confirmed release, rollback uses a known-good Git commit or Cloudflare deployment while the failing release is investigated.

## Risk Ownership

| Risk | Primary owner | Verification |
|---|---|---|
| Invalid content or draft leakage | Unit 1 | Schema, service, and static-slug tests |
| Demo content mistaken for genuine work | Unit 2 | Disclosure component and route tests |
| Accessibility or responsive regression | Unit 2 | Automated and manual route checks |
| Private document or secret leakage | Units 1 and 3 | Explicit configuration and artifact inspection |
| Generic AI-template presentation | Unit 2 | Automated detectable checks and visual review |
| CI or host mismatch | Unit 3 | Clean local build using documented commands |

## Dependency Validation

- No circular unit dependency exists.
- Unit 1 is independently verifiable without Unit 2 or Unit 3.
- Unit 2 depends only on stable Unit 1 contracts.
- Unit 3 intentionally evaluates the integrated prior units.
- Every cross-unit coordination point has one primary owner.

## Extension Compliance

All optional extensions are disabled. Extension-specific dependency rules are not applicable; the approved core dependency and risk controls remain mandatory.
