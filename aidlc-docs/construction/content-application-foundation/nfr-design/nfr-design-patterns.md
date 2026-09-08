# NFR Design Patterns - Content and Application Foundation

## Design Goal

Meet Unit 1's scale, performance, availability, security, reproducibility, maintainability, and diagnostic requirements using build-time patterns only. No runtime database, queue, worker, network service, or distributed cache is introduced.

## Resilience Patterns

### Atomic validation gate

All collection discovery and validation produces an in-memory candidate result plus an ordered diagnostic set. The candidate becomes available to compilation and route generation only when the blocking diagnostic set is empty.

**Effect**:

- Invalid required content cannot produce an accepted partial manifest.
- Source files remain unchanged.
- Existing deployed static output is unaffected by a failed future build.
- Empty collections and absent optional data remain successful typed results.

**Covers**: U1-NFR-010 through U1-NFR-015, U1-NFR-028 through U1-NFR-030.

### No retry for deterministic local failures

Parsing, schema, slug, path, document, and compilation errors are deterministic for the same source. They fail once with corrective diagnostics rather than consuming time through retries.

Retries are reserved for a future external adapter and are outside Unit 1. Unit 1 has no network operation that benefits from retry.

### Explicit absence pattern

Optional collections, media, metadata, reading bodies, production origin, and generated contribution data are represented by typed empty collections or explicit optional values.

This separates three conditions:

- valid absence
- invalid required input
- unexpected internal failure

The caller can render an empty state, resolve not found, or stop the build without interpreting exception text.

### Last-known-good deployment boundary

Unit 1 produces a new artifact only after successful validation and build. Deployment is external and separately approved, so a failed local or CI build never replaces an already published artifact.

## Scalability Patterns

### Single-pass collection discovery

Each configured collection root is enumerated once per build. Files are normalized into ordered source descriptors and handed to parsing through a bounded work scheduler.

**Complexity target**: Linear in file count plus source size.

### Slug index

Each collection builds a `Map<Slug, SourceDescriptor[]>` during validation.

- Unique entries produce one record lookup.
- Duplicate entries produce one diagnostic that identifies every conflicting path.
- Detail lookup and static slug generation reuse the same index.

This avoids pairwise duplicate scans.

### Bounded parallel processing

Independent parsing and compilation jobs run with a fixed concurrency ceiling derived from a conservative small default, not unbounded `Promise.all` over the whole repository.

Results are restored to deterministic source order after parallel work. Concurrency affects elapsed time, never output ordering or error ordering.

### View-model aggregation

Home and index queries reuse collection results. They do not trigger a separate full scan for featured, latest, filters, metadata, and static slugs.

**Covers**: U1-NFR-001 through U1-NFR-005.

## Performance Patterns

### Build-scoped memoization

The composition root owns a cache whose lifetime is one process or one explicit build context.

Cache keys contain:

- normalized collection and source path
- content fingerprint
- relevant compilation options
- curated component-map version

Cache values may contain parsed front matter, validated entities, compiled bodies, heading outlines, and reading-time results.

The cache is not application persistence. A new process may rebuild everything from source.

### Content fingerprinting

Fingerprints derive from source bytes and stable compilation options, not modification time alone. This prevents stale results when timestamps are preserved or rewritten.

### One compilation per eligible source

Metadata, summaries, details, and static route generation share the validated or compiled record rather than compiling the body independently for each consumer.

### Separate correctness and capacity suites

- Normal tests use small focused fixtures for fast feedback.
- An opt-in benchmark or dedicated CI job generates deterministic envelope fixtures.
- The benchmark excludes dependency installation and records runtime, fixture size, machine context, and elapsed time.
- Benchmark fixtures never enter production content collections.

**Covers**: U1-NFR-006 through U1-NFR-009.

## Availability Patterns

### Static independence

All visitor-facing output is built ahead of time. Pages do not depend on CMS, file-system, GitHub, or application-server availability after deployment.

### Degraded optional input

- Empty collections yield empty models.
- Missing optional media yields absent presentation fields.
- Missing contribution data yields `null`.
- Missing optional profile sections remain omitted.

Required-content errors remain blocking so availability is not achieved through misleading or malformed output.

## Security Patterns

### Boundary validation

Unsafe input is rejected before domain entities are created.

Boundary sequence:

1. normalize configured root
2. resolve candidate path
3. verify containment
4. read supported source type
5. parse untrusted structure
6. validate schema and URL protocols
7. inspect allowed MDX constructs
8. construct safe typed entity

Downstream services operate on safe domain values and do not repeat ad hoc checks.

### Path containment

Path access uses normalized absolute roots internally, rejects traversal segments, and verifies that resolved candidates remain within the configured root. Diagnostics expose workspace-relative paths.

Symlink handling must not allow a real path to escape an approved root.

### URL allowlist

- Public web links: secure HTTP only.
- Mail: accepted only through the dedicated email destination field.
- Script, data, file, and other protocols: rejected.
- Unit 1 performs no network reachability checks.

### Curated MDX capability

The compilation boundary accepts only declared presentation components. It rejects imports, exports, script elements, executable URLs, raw unsafe HTML, and undeclared JSX components.

The component registry is application-owned and versioned. Content cannot dynamically choose a module to import.

### Data minimization

Route models contain only presentation data. They exclude:

- source absolute paths
- environment values
- tokens and secrets
- service instances
- raw parser objects
- diagnostic internals

### Explicit public-document manifest

Document queries never enumerate the public directory for publication. Configured paths must remain within the document root and exist before the build is accepted.

**Covers**: U1-NFR-016 through U1-NFR-023.

## Reliability and Reproducibility Patterns

### Pure transformation core

Parsing adapters perform I/O, then pure functions validate, normalize, sort, group, derive, and map entities. Tests exercise the pure core without disk or network variability.

### Deterministic comparators

Ordering uses explicit normalized field comparisons and stable tie-breakers. It does not depend on unspecified file-system enumeration order or process locale.

### Calendar-date value object

Authored `YYYY-MM-DD` values are parsed as year, month, and day components, validated, and formatted without conversion through a local-time instant.

### Controlled environment inputs

Build mode and optional site origin enter through a validated configuration boundary. Tests inject values explicitly rather than reading ambient process state throughout the domain.

**Covers**: U1-NFR-024 through U1-NFR-030.

## Maintainability Patterns

### Layered ports and adapters

- Ports define file source, validator, compiler, repository, query, metadata, and optional contribution-data interfaces.
- Adapters implement file-system and compiler integration.
- Domain transformations remain library-independent.
- Route composition imports services through one server-only composition root.

### Stable project error vocabulary

External library errors are converted to `ContentError` values with stable project codes. Tests assert project behavior rather than validation-library message wording.

### Test pyramid for Unit 1

- Many pure rule tests for slugs, dates, visibility, ordering, URLs, paths, and mappings
- Adapter tests using temporary directories
- Service integration tests across discovery, validation, compilation, and query assembly
- One minimal and one capacity-envelope static build verification

### Coverage gate scope

The 90 percent branch threshold applies to core validation, visibility, ordering, slug, destination, document, and metadata modules. Generated configuration, trivial type exports, and framework route declarations are reported but need not distort the core threshold.

**Covers**: U1-NFR-031 through U1-NFR-038.

## Diagnostic Patterns

### Diagnostic collector

Expected content errors enter a collector rather than throwing immediately. The collector normalizes, sorts, groups, and formats diagnostics at the operation boundary.

### Layered error behavior

- Expected content problem: structured diagnostic, no stack trace required.
- Unexpected adapter or internal fault: contextual error with cause preserved; stack visible in development.
- Missing eligible record: typed `null`, not an exception.

### Safe path display

Internals may use absolute paths for containment, but normal diagnostic output displays workspace-relative paths to avoid machine-specific leakage and noise.

**Covers**: U1-NFR-039 through U1-NFR-043.

## Static Compatibility Patterns

- Mark file and content service entrypoints server-only.
- Resolve content during build-rendered route execution.
- Generate public params from validated published slugs.
- Keep client-island props serializable.
- Avoid runtime middleware, actions, headers, or request-dependent rendering.
- Gate canonical metadata on a configured site origin.

**Covers**: U1-NFR-044 through U1-NFR-047.

## Verification Matrix

| Pattern | Primary verification |
|---|---|
| Atomic validation gate | Multi-error integration test and absence of partial manifest |
| Single-pass index | Instrumented source test and capacity benchmark |
| Bounded concurrency | Concurrency-limit unit test and deterministic-order repetition |
| Build memoization | Compiler call-count test with repeated consumers |
| Path containment | Traversal and symlink escape tests |
| URL allowlist | Protocol table tests |
| Curated MDX | Rejected import, script, raw HTML, and undeclared-component fixtures |
| Pure deterministic core | Timezone, locale, file-order, and repeated-run tests |
| Diagnostics collector | Stable snapshot of grouped project-owned error codes |
| Static compatibility | Full export and output inspection |

## Extension Compliance

All optional extensions are disabled. Extension-specific NFR patterns are not applicable; approved core resilience, security, and test patterns remain binding.
