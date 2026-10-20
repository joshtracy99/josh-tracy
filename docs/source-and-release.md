# Source of truth and approved release workflow

## Current source of truth — 20 October 2026

GitHub `joshtracy99/josh-tracy`, branch `main`, now contains the current Trade Workshop website. The old-main/live-source discrepancy was reconciled through [PR #1](https://github.com/joshtracy99/josh-tracy/pull/1), merged as `76975c305d1da1e352f83a32ac44be5bb4efc5ac`, after Josh explicitly approved implementation and deployment.

The reconciled application files exactly match reviewed local source `c1b65d2876290c2276dcb5b8304c6b72d764d36f` (tree `d594a604911fd5e979eb117db9e7f8d2e300a933`). This documentation update records the completed reconciliation; it does not change the application. Recovered design, mobile and SEO history is preserved locally in the review's source-history bundle.

Vercel team: `joshtracy99s-projects` / `team_xReeARkcbfNGK6te00eauDv8`. Project: `thetradeworkshop` / `prj_geTeWu4Ozq1sIkcaw1ez2wnOjJeM`. Public URL: https://www.thetradeworkshop.co.uk/.

## Release rules

1. Start future work from current GitHub main, inspect worktrees/uncommitted changes, and preserve the approved baseline. Use an isolated feature branch.
2. Vercel's existing Git integration builds feature-branch previews and automatically releases main. Therefore pushing or merging into main is a production action and requires Josh's explicit release approval. Approval of one release does not approve later changes.
3. Verify the intended Vercel project/team and exact source commit before any CLI release. Do not let an unrelated working-directory link select another project.
4. Run relevant TypeScript, lint, production-build, browser, mobile, accessibility and functionality checks. Present concrete changes and evidence before seeking release approval.
5. For a staged production check, use `vercel deploy --prod --skip-domain`, test that exact deployment through authenticated `vercel curl`, and retain Deployment Protection. The refinement application was tested in such a production candidate before the reconciliation merge.
6. After an approved main deployment or promotion, verify the actual www domain's deployment ID, commit, sitemap/canonicals/noindex, mobile navigation, phone demonstration and controlled form states. Record the receipt and rollback reference.
7. Keep dependencies, build output, .vercel state and local environments out of source archives/uploads. Never print, commit or publish credentials. This iteration has no database migration.
8. Require owner review before changing branch protections, CI release gates, Git triggers, access controls or integration settings. No such account settings were changed in this release. Main's existing automatic deployment remains active; a platform-enforced manual approval gate is not claimed.

## Operational decisions retained

Public contact details remain private at Josh's request. Resend sender/recipient/API-key setup is deferred; code and mocked tests do not establish actual inbox delivery. See [enquiry delivery](enquiry-delivery.md). Legal policy proposals with unconfirmed facts were kept separate and were not published. The £29 offer and existing legal substance are unchanged.

The preceding production release `dpl_CiXB3EA2eRUJTDAZGWg6otVoh217` remains the pre-refinement rollback reference. Match the latest release to its actual Vercel Git commit and deployment record rather than assuming that a default project alias proves which build serves www.
