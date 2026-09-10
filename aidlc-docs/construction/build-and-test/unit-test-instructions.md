# Unit Test Execution Instructions

## Purpose

The Vitest suite verifies content policies and validation, composition services, route models,
interactive components, CMS schema parity, static-server safety, workflow boundaries, repository
audits, and artifact-audit logic without external services.

## Run all tests

```powershell
npm.cmd test
```

The verified baseline is 83 passing tests across 16 files with zero failures.

## Run the coverage gate

```powershell
npm.cmd run test:coverage
```

The verified baseline is:

- Statements: 98.54%
- Branches: 93.58%
- Functions: 97%
- Lines: 99.22%

The enforceable thresholds live in `vitest.config.ts`. A future run is authoritative; do not approve
a change merely because it matches an older test count or percentage.

## Run one area while diagnosing

```powershell
npm.cmd exec -- vitest run tests/content-application-foundation
npm.cmd exec -- vitest run tests/portfolio-experience
npm.cmd exec -- vitest run tests/quality-authoring-delivery
```

Targeted runs help diagnose a failure but do not replace the complete coverage gate.

## Review results

- Pass/fail and assertion details appear in the terminal.
- Coverage output is written to `coverage/` and is ignored by Git.
- The jsdom message `Not implemented: navigation to another Document` is an expected environment
  limitation from a link-interaction test; it is not a failed assertion.

## Fix failures

1. Start with the first failed assertion and its source path.
2. Confirm the failure is not caused by an unsupported local Node.js version or stale dependencies.
3. Repair application code, test fixture, or expectation without lowering safety thresholds.
4. Rerun the focused test, then `npm.cmd run test:coverage`, and finally `npm.cmd run verify`.
