# Current source and release workflow

The approved studio is recovered in this repository's local history. GitHub `joshtracy99/josh-tracy` main (`0c84d3f`) still contains the older design and is connected to Vercel's production Git trigger. Do not assume main is the current website.

The baseline for this refinement is `3c99e820380ad76029c96f179971e330bd32b27b`, deployed as `dpl_CiXB3EA2eRUJTDAZGWg6otVoh217` to https://www.thetradeworkshop.co.uk/ on 20 October 2026. The local branch `codex/conversion-refinement` is isolated from that release. Do not merge, push to main or deploy it without Josh's explicit approval.

## Before any release

1. Inspect the production deployment, local branch/commit, all worktrees and uncommitted changes. Compare the actual rendered site with the candidate source. Preserve the current approved snapshot and rollback deployment ID.
2. Confirm Vercel team `joshtracy99s-projects` and project `thetradeworkshop` (`prj_geTeWu4Ozq1sIkcaw1ez2wnOjJeM`). Inspect from the intended checkout; an unrelated working-directory link can choose another project.
3. Run the TypeScript/lint/production build checks and browser QA. Keep dependencies, local environments, `.vercel` and build output out of archives and source uploads. Never log or commit credentials.
4. Present exact changes and validation for approval. A previous deployment approval does not authorise later changes.
5. After explicit approval, build a production deployment with `vercel deploy --prod --skip-domain`, using the confirmed project/team. Check that exact build with authenticated `vercel curl`; retain Deployment Protection.
6. Promote the tested production deployment with `vercel promote <deployment-url>`. Confirm the www domain resolves to it and recheck sitemap, canonical/noindex output, navigation, mobile UI and form failure handling. Do not count an accepted email API call as proof of inbox delivery.
7. Record source commit, deployment ID, public URL and test results. Keep the previous release available for rollback. The site has no database migration in this iteration.

## GitHub reconciliation — prepared locally, not published

Create a separate reconciliation branch from actual GitHub main, place the complete approved current source there, and review the whole old/new diff in a PR. Preserve this recovered history in a local Git bundle. Do not cherry-pick only the newest refinement onto old main: that would omit the approved hero, phone, mobile and SEO work.

The completion review prepares `codex/studio-source-of-truth` in the separate GitHub clone with the current GitHub main as parent and the exact tested refinement tree. Its commit, parent and tree equality are recorded in the review's `source-reconciliation.json`, with a patch against GitHub main and a draft PR description. The recovered development history remains in `source-history.bundle`. This is a local review branch, not a remote PR or production release. A remote push could trigger an automatic preview deployment, so publication waits for explicit approval too.

Once approved, merge the reconciled current source and use that repository as the single maintained source. Protect main with review/check requirements; feature branches should produce preview deployments. Keep production promotion behind explicit owner approval. Configure those protections only after reviewing repository access and the proposed workflow; no GitHub/Vercel trigger settings were changed here.

The review source archive and binary-safe patch are for the stated current baseline. Do not apply the patch blindly to the older GitHub main.
