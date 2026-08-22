# Pull-Request Checklist

What Maya checks before pressing the merge button (and what the team
checks before requesting review):

- [ ] Branch is **up to date with `main`** (rebase if not)
- [ ] `node tests/engine.test.js` / `tests.html` — **all green**
- [ ] Conventional-Commits title that describes the whole change
- [ ] Scope matches the branch name; unrelated changes get their own PR
- [ ] No stray console.log / debug code / commented-out experiments
- [ ] Works in the browser: open `index.html`, try the form
- [ ] Dark mode still readable if UI changed
- [ ] README/docs updated when behavior changed

If anything on this list fails, the PR waits. Broken code never lands on
`main` — that is the one rule with no exceptions.
