# Performance Test Instructions

## Purpose

The capacity test verifies that the content-validation and static-generation path remains practical
with 750 generated records. It is a build-capacity benchmark, not a production traffic load test,
because the deliverable is static files served by the selected host or CDN.

## Requirement

- Validate 250 projects, 250 posts, and 250 reading records.
- Include 1,000 media references across the generated fixtures.
- Complete validation and the production build within 120,000 milliseconds.
- Exclude dependency-installation time from the measured result.
- Create fixtures only in temporary storage and leave repository content unchanged.

## Run the benchmark

```powershell
npm.cmd run benchmark:content -- --run
```

The `--run` flag is required to prevent accidental expensive execution. The verified Windows result
using Node.js 24.19.0 was:

- 750 of 750 records validated
- Fixture generation: 159.34 ms
- Validation: 243.32 ms
- Production build: 7,568.28 ms
- Measured total: 7,811.60 ms
- Threshold: 120,000 ms
- Status: Pass

## Interpret results

The command prints structured JSON containing environment, fixture counts, timings, threshold, and
pass state. Machine-to-machine timing will vary; the threshold and successful artifact generation
are the acceptance boundary. If it fails:

1. Confirm no unrelated CPU, disk, or antivirus contention dominated the run.
2. Repeat once on the same locked dependency graph.
3. Investigate validation, MDX compilation, media-reference expansion, or static route generation.
4. Optimize the measured bottleneck and rerun the canonical verifier plus benchmark.

## Browser performance evidence

The application uses static generation, local media, responsive image handling, lazy loading,
build-time code highlighting, and route-specific client behavior. Lighthouse score capture on the
eventual production-like preview remains a deployment-preparation evidence item because CDN
behavior, approved origin, and network conditions are not represented by this local capacity
benchmark.
