# Red Team / Blue Team merge gates

This repository uses GitHub Actions jobs as automatic merge gates for changes targeting `main`.

## Gate model

- **Red Team**: attacker/regression gate. It checks patch whitespace, scans added lines for obvious hardcoded secrets, and blocks critical dependency vulnerabilities.
- **Blue Team**: deploy-readiness gate. It installs dependencies with `npm ci` and runs `npm run check`.
- **Deployment Readiness**: fail-closed aggregator. It passes only when both Red Team and Blue Team succeeded.

## Recommended flow

1. Create a feature branch.
2. Open a pull request to `main`.
3. Let the Red Team, Blue Team, and Deployment Readiness jobs run.
4. Enable auto-merge on the PR.
5. GitHub merges only after all required checks pass.

Avoid direct pushes to `main`; they bypass the PR review surface and make failed gates reactive instead of preventive.

## Required status checks

When branch protection is enabled for `main`, require these contexts:

- `Red Team`
- `Blue Team`
- `Deployment Readiness`

Do not require manual reviews if the intended policy is fully automatic merge after the three gates pass.
