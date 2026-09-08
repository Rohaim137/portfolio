# Business Rules - Content and Application Foundation

## Source and Identity Rules

- **BR-001**: Each project, post, and reading record must declare an explicit `slug`.
- **BR-002**: A slug must contain lowercase ASCII letters, digits, and single hyphens, must start and end with an alphanumeric character, and must not contain consecutive hyphens.
- **BR-003**: The source filename stem must exactly equal its declared slug.
- **BR-004**: Slugs must be unique within their collection. The same slug may exist in different collections because route namespaces differ.
- **BR-005**: Collection file discovery must remain within its configured root and accept only supported Markdown or MDX extensions.

## Validation Rules

- **BR-006**: Missing or invalid required fields are blocking errors.
- **BR-007**: Validation must aggregate all detectable errors across site configuration, content collections, public documents, and present generated data.
- **BR-008**: Every error must include a source path or configuration source; field errors must also include a field path.
- **BR-009**: Error output order must be deterministic.
- **BR-010**: Unknown front-matter fields are rejected unless a schema explicitly declares an extension field.
- **BR-011**: The system must not silently default required content or repair invalid user-authored values.

## Visibility Rules

- **BR-012**: `draft: true` excludes a record from production lists, static slugs, metadata, sitemap output, and direct detail retrieval.
- **BR-013**: Draft inclusion is opt-in for development and tests and is forbidden when production mode is active.
- **BR-014**: `demo: true` is independent of draft state and must survive transformations into summaries and details.
- **BR-015**: Demo records are ordinary published records for routing, sorting, filtering, and metadata, but downstream presentation must disclose demo status.
- **BR-016**: Exactly three demo projects and three demo posts are required only as initial seed acceptance data, not as a permanent build invariant.
- **BR-017**: Empty published collections are valid and must yield empty typed lists.

## Date and Ordering Rules

- **BR-018**: Authored content dates use ISO `YYYY-MM-DD` calendar form unless a field explicitly requires a timestamp.
- **BR-019**: Calendar dates must be validated as real dates and displayed without implicit timezone conversion.
- **BR-020**: Reverse chronological ordering compares normalized calendar values, then title, then slug.
- **BR-021**: Title and slug tie-breakers use a deterministic case-normalized comparison with the original value as the final fallback.
- **BR-022**: Missing optional dates must not be replaced with the build time or file modification time.

## Project Rules

- **BR-023**: A project requires title, slug, summary, featured state, technology list, cover, status, draft state, and demo state where applicable.
- **BR-024**: Technology tags must be non-empty, normalized, and duplicate-free within a record.
- **BR-025**: Repository and live-demo actions exist only for valid configured URLs.
- **BR-026**: Project factual results and metrics are optional and must never be derived or fabricated.
- **BR-027**: Media requires local source data and meaningful alternative text; video additionally requires a poster and muted-default intent.

## Blog Rules

- **BR-028**: A post requires title, slug, description, publication date, draft state, and non-empty body content.
- **BR-029**: Reading time is a derived display estimate and is not accepted from front matter as authoritative.
- **BR-030**: Posts sort newest first using authored publication dates and deterministic tie-breakers.
- **BR-031**: Demo post state must be exposed in both summary and detail models.

## Reading Rules

- **BR-032**: A reading record requires title, slug, status, legitimate source URL, topics, and draft state.
- **BR-033**: Reading status is one of queued, reading, or completed.
- **BR-034**: A record receives an internal detail route only when trimmed publishable body content is non-empty.
- **BR-035**: A metadata-only record uses its external source as its primary destination.
- **BR-036**: Completed dates, ratings, authors, venue, and year remain optional and are never inferred.
- **BR-037**: The application stores links to papers, not unauthorized copyrighted PDFs.

## Public Document Rules

- **BR-038**: A public document appears only when declared in the explicit document manifest.
- **BR-039**: A configured document path must be relative to the approved public document root and must not contain traversal segments.
- **BR-040**: A missing configured document is a blocking validation error.
- **BR-041**: Files present under `public/` but absent from the manifest are never surfaced by document queries.
- **BR-042**: Document metadata must not imply availability when the asset check fails.

## URL and Social Rules

- **BR-043**: Web destinations accept only secure public HTTP URLs unless a field explicitly supports a mail destination.
- **BR-044**: GitHub resolves to active using `https://github.com/Rohaim137`.
- **BR-045**: An absent LinkedIn, X, or email value resolves to pending.
- **BR-046**: A non-empty invalid destination is an error and must not degrade silently to pending.
- **BR-047**: URL validation is syntactic and allowlist-based; Unit 1 performs no network reachability check.

## MDX Rules

- **BR-048**: Body compilation uses only the curated component map.
- **BR-049**: Unsupported component names, imports, exports, or unsafe executable constructs are blocking content errors.
- **BR-050**: Heading extraction must preserve document order and generate deterministic unique anchors.
- **BR-051**: Empty or whitespace-only bodies are treated as absent where body content is optional.

## Metadata and Discovery Rules

- **BR-052**: Every public fixed route has site-derived title and description metadata.
- **BR-053**: Every public detail route derives metadata from its validated record.
- **BR-054**: A route-specific local social image overrides the local default; an external placeholder image is never used.
- **BR-055**: Canonical URLs are emitted only when a valid configured site origin exists.
- **BR-056**: Sitemap output contains fixed public routes and eligible published detail routes only.
- **BR-057**: Unknown, draft, or ineligible detail slugs resolve to not found.

## Contribution Data Rules

- **BR-058**: Unit 1 never performs a GitHub network fetch.
- **BR-059**: Generated contribution data is optional and read-only.
- **BR-060**: Missing generated data returns `null` without failing an ordinary build.
- **BR-061**: Present generated data must validate before use.
- **BR-062**: V1 must not expose a heatmap even when a generated data file happens to exist.

## Error Scenario Outcomes

| Scenario | Outcome |
|---|---|
| Invalid required content | Aggregated blocking validation report |
| Duplicate slug | Blocking errors naming all conflicting files |
| Production draft request | Rejected operation |
| Unknown or excluded slug | `null`, resolved by route to not found |
| Empty collection | Valid empty typed result |
| Missing optional media or metadata | Explicit absence; downstream omission or empty state |
| Missing configured public document | Blocking validation error |
| Missing contribution file | Valid `null` result |
| Unsupported external URL | Blocking field error |

## Rule Validation

- Rules do not require a database, external service, or runtime mutation.
- Demo seeding and long-term demo removal are not contradictory.
- Draft policy is consistent across lists, details, metadata, and discovery.
- URL, file, MDX, and public-document boundaries match approved security and privacy requirements.

## Extension Compliance

All optional extensions are disabled. Extension-specific rules are not applicable; the approved core rules above remain binding.
