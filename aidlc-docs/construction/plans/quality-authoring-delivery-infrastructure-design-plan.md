# Infrastructure Design Plan - Quality, Authoring, and Delivery Preparation

## Unit Context

- **Unit**: Unit 3 - Quality, Authoring, and Delivery Preparation
- **Prerequisites**: Approved Unit 3 NFR Requirements and NFR Design
- **Infrastructure scope**: GitHub Actions validation, protected release context, Cloudflare Pages static hosting, Direct Upload, smoke verification, and rollback
- **Application runtime**: Static assets only
- **Mandatory deployment gate**: Ask for explicit permission immediately before the final external upload or publish action

## Planning Checklist

- [x] Read approved Unit 3 NFR and logical-component designs.
- [x] Identify every component requiring external or CI infrastructure.
- [x] Verify Cloudflare Pages static export and Direct Upload constraints from primary documentation.
- [x] Evaluate deployment environment, compute, storage, messaging, networking, monitoring, and shared infrastructure.
- [x] Generate targeted infrastructure questions.
- [x] Apply delegated answers and resolve all ambiguity.
- [x] Generate the infrastructure design.
- [x] Generate the deployment architecture.
- [x] Determine shared infrastructure is not applicable to this single static project.
- [x] Validate content, traceability, approval boundaries, and extension status.
- [x] Obtain explicit approval of Unit 3 Infrastructure Design.

## Question 1 - Deployment Environment

Which environments should the delivery design define?

A) Local verification, GitHub pull-request CI, optional manual Cloudflare preview, and manually approved Cloudflare production (recommended)

B) Production only

C) Separate always-on development, test, staging, and production servers

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 2 - Compute Infrastructure

What compute should build and serve the portfolio?

A) Ephemeral GitHub-hosted Ubuntu runners build and test; Cloudflare's static edge serves immutable assets with no application compute (recommended)

B) A persistent virtual machine runs Next.js continuously

C) A Kubernetes cluster builds and serves the application

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 3 - Storage Infrastructure

Where should authoritative and transient artifacts live?

A) GitHub stores source and history, short-retention private Actions artifacts carry `out`, and Cloudflare stores deployed static assets; no database or object store is added (recommended)

B) Add a managed database for authored content

C) Upload source and secrets into a public object bucket

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 4 - Messaging Infrastructure

Does this deployment need a queue, event bus, webhook service, or scheduler?

A) No; synchronous CI dependencies and manual release dispatch cover the approved workflow (recommended)

B) Add a queue for every content commit

C) Add a webhook receiver to the public application

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 5 - Networking Infrastructure

What network topology should production use?

A) Cloudflare-managed HTTPS and edge delivery for the Pages origin, with an optional approved custom domain and no load balancer, API gateway, private network, or open application port (recommended)

B) Expose a public Node.js server directly

C) Add a multi-region application network

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 6 - Monitoring Infrastructure

What operational evidence is appropriate at launch?

A) GitHub workflow logs, Cloudflare deployment status, deterministic HTTPS smoke checks, and manual review without visitor tracking (recommended)

B) Add browser analytics and session replay

C) Claim uptime without collecting evidence

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 7 - Resource Isolation

How should production credentials and configuration be isolated?

A) Use a protected GitHub production environment with least-privilege secrets and non-secret variables unavailable to pull-request jobs (recommended)

B) Use repository-wide plaintext configuration

C) Share credentials with browser code

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 8 - Release Trigger

How should the final deployment begin?

A) A manual release workflow or locally reviewed Wrangler command after the user grants explicit permission; never an automatic push trigger (recommended)

B) Every commit deploys automatically

C) The CMS deploys immediately after save

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 9 - Rollback

Which infrastructure rollback mechanism should be available?

A) Preserve Cloudflare deployment history and the known-good Git commit, with a documented rollback or known-good redeploy path (recommended)

B) Delete earlier deployments immediately

C) Restore from a database snapshot

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Question 10 - Shared Infrastructure

Should resources be shared with other applications or tenants?

A) No; use one isolated Pages project and one protected GitHub environment for this portfolio, with no shared runtime resources (recommended)

B) Share credentials and deployment targets across unrelated repositories

C) Create a multi-tenant application platform

D) Other (please describe after the [Answer]: tag below)

[Answer]: A

## Decision Record

The user delegated project questions and approved a controlled Cloudflare deployment, while explicitly requiring permission immediately before the final step. Option A was selected for all ten questions. The design uses ephemeral CI, Direct Upload, static edge delivery, short-lived build artifacts, environment-scoped credentials, and no runtime compute or shared infrastructure.

## Outputs

- `aidlc-docs/construction/quality-authoring-delivery/infrastructure-design/infrastructure-design.md`
- `aidlc-docs/construction/quality-authoring-delivery/infrastructure-design/deployment-architecture.md`

## Shared Infrastructure Decision

`aidlc-docs/construction/shared-infrastructure.md` is not created because this project has no shared database, network, queue, cache, compute platform, tenant boundary, or cross-application credential.

## Validation Notes

- Every mandatory infrastructure category is covered by one targeted question.
- All answers are valid and unambiguous.
- No Mermaid or ASCII diagram is present.
- No resource is created, connected, mutated, or deployed by these design artifacts.
- Optional extensions remain disabled and are not applicable.
