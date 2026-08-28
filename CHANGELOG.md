# Changelog

## v1.0.0 — 2026-08-28

First release. Built in three weeks by a four-person team working
trunk-style: 10 commits on `main`, every feature squash-merged after its
tests went green.

- **Engine** — weighted average, required-final-score solver, honest
  impossible/locked-in outcomes, input validation (#1)
- **UI** — responsive form, category table, live recalculation (#2)
- **Fix** — empty rows no longer trigger validation errors (#3)
- **Scenarios** — save, list, load named grade scenarios (#4)
- **Dark mode** — theme tokens, dark palette, system-preference default (#5)
- **Docs** — GitHub Pages publishing, PR checklist (#8, merge commit)

Known issue: none. Known limitation: scenario export (CSV) was started and
deliberately left in a stash — first candidate for v1.1.
