# Logical Components - Content and Application Foundation

## Overview

All components execute in the local or CI build process. None is a required runtime service. Persistent application databases, queues, workers, distributed caches, circuit breakers, and service discovery are intentionally absent.

## BuildContext

**Purpose**: Own validated build mode and process-scoped dependencies.

**Responsibilities**:

- Expose production, development-preview, or test mode.
- Reject draft inclusion in production.
- Own the build-scoped memoization cache and bounded scheduler.
- Provide validated collection roots and optional production origin.

**Lifetime**: One explicit validation or build operation.

## CollectionScanner

**Purpose**: Discover supported content sources once per collection.

**Responsibilities**:

- Enumerate configured roots.
- Filter supported source extensions.
- Normalize and deterministically order source descriptors.
- Hand candidates to `SafeFileReader`.

**NFR contribution**: Linear discovery, deterministic order, constrained scope.

## SafeFileReader

**Purpose**: Read local source and public-document assets without path escape.

**Responsibilities**:

- Normalize roots and candidate paths.
- Verify lexical and real-path containment.
- Reject traversal and escaping symbolic links.
- Return source bytes and workspace-relative diagnostic path.

**NFR contribution**: Path security, safe diagnostics, adapter testability.

## FrontMatterParser

**Purpose**: Separate front matter from body source.

**Responsibilities**:

- Parse supported front-matter syntax.
- Return unknown structured data rather than asserting a domain type.
- Convert parser failures to project error codes.

**NFR contribution**: Library isolation and actionable error semantics.

## SchemaRegistry

**Purpose**: Own validators for site, project, post, reading, document, media, and generated-data inputs.

**Responsibilities**:

- Select the schema by collection.
- Reject unknown or invalid values.
- Emit field-level structured issues.
- Construct validated source models only on success.

**NFR contribution**: Boundary security, maintainable typed contracts.

## ContentPolicyEngine

**Purpose**: Apply project-owned cross-collection rules.

**Responsibilities**:

- Validate slug syntax and filename agreement.
- Build slug indexes and report duplicates.
- Apply draft and demo state.
- Validate calendar semantics, URLs, and media rules.
- Determine reading detail eligibility.

**NFR contribution**: Pure deterministic core and concentrated branch coverage.

## MdxSafetyInspector

**Purpose**: Reject unsupported or unsafe content constructs before compilation.

**Responsibilities**:

- Identify imports, exports, scripts, unsafe raw HTML, executable URLs, and undeclared JSX components.
- Report file and source-location context where available.
- Version the approved component-name set.

**NFR contribution**: Curated capability boundary.

## MdxCompilerAdapter

**Purpose**: Compile approved source through the selected stable MDX stack.

**Responsibilities**:

- Accept inspected source and curated component options.
- Return compiled content, headings, and reading-time inputs.
- Convert compiler failures to project diagnostics.
- Never ship a compiler into the browser.

**NFR contribution**: Static performance and library isolation.

## BuildMemo

**Purpose**: Avoid repeated work during one build.

**Responsibilities**:

- Key results by path, source fingerprint, options, and component-map version.
- Cache parsed, validated, compiled, and derived results.
- Expose test instrumentation for hit, miss, and compiler-call assertions.
- Discard state when the build context ends.

**NFR contribution**: Performance without persistent infrastructure.

## BoundedWorkScheduler

**Purpose**: Control independent parse and compile concurrency.

**Responsibilities**:

- Apply a fixed configurable ceiling.
- Preserve input identity for deterministic result reconstruction.
- Await every scheduled result needed for aggregated diagnostics.
- Avoid unbounded resource consumption.

**NFR contribution**: Scale and predictable resource use.

## DiagnosticCollector

**Purpose**: Aggregate expected authoring and configuration errors.

**Responsibilities**:

- Accept `ContentError` values from every boundary.
- Normalize relative paths and field paths.
- Sort by collection, file, field, and stable code.
- Group and format concise terminal output.
- Throw or return one blocking report at the operation boundary.

**NFR contribution**: Atomic failure and diagnostic usability.

## ContentRepositories

**Purpose**: Provide project, blog, reading, and document collection behavior.

**Responsibilities**:

- Coordinate discovery, parsing, validation, policy, and compilation.
- Return published summaries and eligible details.
- Reuse slug indexes and memoized results.
- Expose production-safe static slugs.

**NFR contribution**: One compilation per source and stable service boundaries.

## PortfolioQueryService

**Purpose**: Assemble presentation-ready home and index models.

**Responsibilities**:

- Request already validated repository results.
- Select featured and latest subsets.
- Preserve empty collections and explicit state.
- Return serializable models only.

**NFR contribution**: Prevent repeated collection scans and secret leakage.

## MetadataAndDiscoveryService

**Purpose**: Produce page metadata, sitemap, robots, and canonical decisions.

**Responsibilities**:

- Derive metadata from validated entities.
- Select local social assets.
- Generate discovery entries from published routes.
- Gate canonicals on a valid configured origin.

**NFR contribution**: Determinism, static compatibility, and no external placeholder dependency.

## PublicDocumentVerifier

**Purpose**: Verify explicitly configured public assets.

**Responsibilities**:

- Validate document-root containment.
- Confirm asset existence.
- Report missing configured assets as blocking errors.
- Never enumerate files for automatic publication.

**NFR contribution**: Privacy and artifact correctness.

## ContributionDataReader

**Purpose**: Preserve a dormant future generated-data boundary.

**Responsibilities**:

- Return `null` when generated data is absent.
- Validate present data without network access.
- Remain unused by V1 presentation models.

**NFR contribution**: Optional-data resilience and credential isolation.

## CapacityBenchmarkHarness

**Purpose**: Verify the stated content envelope without slowing ordinary tests.

**Responsibilities**:

- Generate deterministic temporary fixtures for 250 records per collection and 1,000 media references.
- Run validation and production build timing without dependency installation.
- Record environment and elapsed-time context.
- Remove or isolate temporary data from application content.

**NFR contribution**: Repeatable performance regression evidence.

## Logical Interaction Sequence

1. `BuildContext` initializes validated roots, mode, scheduler, memo, and diagnostic collector.
2. `CollectionScanner` discovers each collection once.
3. `SafeFileReader` and `FrontMatterParser` produce raw sources.
4. `SchemaRegistry` and `ContentPolicyEngine` validate structure and cross-record rules.
5. `MdxSafetyInspector` approves eligible bodies.
6. `MdxCompilerAdapter` compiles through `BoundedWorkScheduler` and `BuildMemo`.
7. `ContentRepositories` expose typed published data and static slugs.
8. `PortfolioQueryService` and `MetadataAndDiscoveryService` assemble static route inputs.
9. `DiagnosticCollector` either releases the complete valid result or reports an atomic ordered failure.

## Dependency Rules

- `BuildContext` owns instances but contains no domain rules.
- Adapters depend on project ports and error types.
- The policy engine depends only on domain value objects and pure utilities.
- Repositories coordinate ports but do not format terminal diagnostics.
- Queries consume repositories, not file-system adapters.
- Route code consumes queries and metadata services, not Unit 1 internals.
- Client components cannot import any component in this document.

## Components Explicitly Not Required

| Component | Reason |
|---|---|
| Database | Repository files are the source of truth and the scale envelope is small |
| Distributed cache | Build-scoped memoization removes repeated local work |
| Queue or worker service | Bounded in-process concurrency is sufficient |
| Circuit breaker | Unit 1 performs no network operation |
| Runtime retry controller | Deterministic local failures do not benefit from retries |
| Monitoring service | Unit 1 is build-time; CI output and benchmark artifacts provide evidence |
| Authentication or authorization | No user-facing mutation or private dashboard exists |

## NFR Coverage Matrix

| Requirement area | Logical components |
|---|---|
| Scale and performance | CollectionScanner, Slug indexes in ContentPolicyEngine, BoundedWorkScheduler, BuildMemo, CapacityBenchmarkHarness |
| Availability | Atomic result boundary, explicit absence, repositories, ContributionDataReader |
| Security and privacy | SafeFileReader, SchemaRegistry, MdxSafetyInspector, PublicDocumentVerifier, serializable query models |
| Reliability | ContentPolicyEngine, DiagnosticCollector, BuildContext, deterministic repositories |
| Maintainability and tests | Ports and adapters, project error vocabulary, in-memory or temporary test seams |
| Diagnostics | DiagnosticCollector and contextual adapters |
| Static compatibility | PortfolioQueryService, MetadataAndDiscoveryService, server-only composition root |

## Extension Compliance

All optional extensions are disabled. Extension-specific logical components are not applicable; approved core resilience, security, and quality components remain required.
