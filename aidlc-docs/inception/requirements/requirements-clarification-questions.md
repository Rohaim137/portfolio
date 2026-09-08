# Portfolio Requirements Clarification Questions

All original answers are complete and use valid choices. Two implementation details remain ambiguous. Please enter one letter after each `[Answer]:` tag.

## Ambiguity 1: Social link placeholders

Question 2 requests placeholders for GitHub, LinkedIn, X, and email. Publishing dummy links such as `href="#"` would create misleading and inaccessible controls, while hiding the destinations would not visibly reserve their intended places.

### Clarification Question 1
How should social destinations without real URLs appear in the initial build?

A) Show clearly disabled labels marked "link pending"; they are not interactive until real URLs are configured

B) Keep the social destinations in a typed configuration file but hide each one from the rendered site until it has a valid URL

C) Use the real GitHub profile `https://github.com/Rohaim137` now and hide LinkedIn, X, and email until their values are provided

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: A

## Ambiguity 2: Unauthenticated GitHub contribution data

Question 8 selects unauthenticated public data. GitHub's supported contribution-calendar GraphQL query requires authentication; scraping the public profile would be fragile and is not suitable as the primary production mechanism.

### Clarification Question 2
Which supported initial behavior should the GitHub activity section use?

A) Ship the secure build-time GraphQL script and workflow, render checked-in data when available, and show an honest empty state until a GitHub token secret is configured

B) Omit the contribution heatmap until authenticated build-time automation is configured, while retaining an ordinary link to the public GitHub profile

C) Replace the heatmap with unauthenticated repository/profile summary information available through supported public GitHub endpoints

X) Other (please describe after the `[Answer]:` tag below)

[Answer]: B
