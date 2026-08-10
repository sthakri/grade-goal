# How We Work (CONTRIBUTING)

Our workflow is inspired by **trunk-based development** — the style used at
companies like Meta. The idea: `main` is always shippable, work lands in
small reviewed changes, and broken code never reaches `main`.

## The rules

1. **Branch per feature.** Branch names follow `feature/<name>`,
   `fix/<name>`, `hotfix/<name>`, `docs/<name>`. Always branch from a
   fresh `main`.
2. **Commit small and often** on your branch. Use Conventional Commits:
   `feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`, `ci:`, `style:`.
3. **Tests must pass** before a branch can merge. Open `tests.html` —
   everything green, or the branch does not land. CI runs the same checks
   on the remote.
4. **Rebase before merge.** If `main` moved while you worked, rebase your
   branch onto `main` so history stays linear and your changes are proven
   against the latest code.
5. **Squash-merge.** One feature = one commit on `main`. Your WIP commits
   are for you; reviewers see a single squashed commit titled with the
   PR number.
6. **Never merge broken code.** If it doesn't run, doesn't pass tests, or
   isn't finished — it stays on the branch. `main` is always shippable.
7. **Hotfixes** branch from `main`, fix exactly one thing, and squash-merge
   the same day.
8. **At least one reviewer** approves before merge (Maya merges by
   default; anyone can review).

## What this looks like in the graph

`main` is a straight line of squashed feature commits. The messy, honest
work — WIP commits, experiments, caught bugs — lives on the feature
branches, which we keep for reference instead of deleting after merge.
