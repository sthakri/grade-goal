# WORKFLOW-GUIDE — How Meta-style teams really use git

This repo is a **simulated three-week project** built by a simulated
four-person team (Maya, Diego, Aisha, Tom). Every commit, branch, rebase,
squash, stash, hotfix and tag in this repository was created to demonstrate
— inside GitKraken — how modern product teams actually work, in the style
used at Meta.

Read this file top to bottom, then open the repo in GitKraken and follow
the tour. Everything the guide mentions is really in the history.

---

## 1. How Meta actually works (the research)

Meta's engineering blog describes their source-control culture in the
[Sapling announcement](https://engineering.fb.com/2022/11/15/open-source/sapling-source-control-scalable/)
(Sapling is the git-compatible client they built for their monorepo), and
The Pragmatic Engineer expands on it in
[Stacked Diffs](https://newsletter.pragmaticengineer.com/p/stacked-diffs).
The essentials:

1. **One giant monorepo, trunk-based development.** There are no
   long-lived feature branches. Everyone builds on top of the trunk
   (`main` / `master`).
2. **Small, individual commits ("stacked diffs").** A feature is built as
   a stack of small commits, each one reviewable on its own. The first
   piece goes out for review while the next is still being written.
3. **Amend and reshape constantly.** Commits are edited, folded, split,
   rebased — history is treated as something you sculpt, not a log.
4. **Nothing lands broken.** Changes reach the trunk only after review
   and testing. The trunk is always releasable.
5. **Old history stays clean** — landed work reads as a series of
   purposeful, complete changes.

**Your professor's rule** is the GitHub-flavored version of the same
philosophy: work happens on a branch; the branch's messy WIP commits get
**squashed** into one clean commit; only when the branch is tested and
working does it **merge into `main`**. `main` never sees broken code.

Meta uses Sapling; the rest of the industry does the same things with git
plus GitHub/GitLab. GitKraken is a GUI for exactly those git operations —
which is why this repo is the perfect practice ground.

---

## 2. The story of this repo (read the graph alongside this)

Open the repo in GitKraken. Left panel = branches, center = graph, each
avatar = one of the four engineers. The dates run Aug 10 → Aug 28, 2026.

### Week 1 — foundation

| What | Who | Where to see it |
| --- | --- | --- |
| Scaffold, CONTRIBUTING (the team rules), CI workflow — three small direct commits on `main`, trunk-style | Maya | first three commits, all `main` |
| `feature/calculation-engine`: 6 commits — model, average, solver, test runner, a self-caught `fix:`, validation | Diego | the long lane under `main` |
| `feature/ui-layout`: 4 commits — skeleton, styles, responsive, polish — branched **in parallel** with Diego | Aisha | the second lane |

**Squash-merge #1 and #2:** each feature lane ends in ONE commit on
`main`:
- `feat: calculation engine with tests (#1)`
- `feat: responsive UI layout (#2)`

👉 Look in GitKraken: Diego's lane has 6 commits; `main` received exactly
1. That is a squash. The six WIP commits still exist on
`feature/calculation-engine` (the team keeps merged branches for
reference) — click the lane to inspect the honest messy history.

Then Diego lands two tiny changes **directly on `main`** (small trunk-style
commits): wiring the engine to the UI, and the live-recalc fix.

### Week 2 — the interruption, the hotfix, the rebase

- **Tom** branches `feature/scenario-storage` (2 commits: store module,
  save/list UI).
- **Aisha** branches `feature/dark-mode`, refactors colors into CSS
  tokens, then starts experimenting with a dark palette…
- **A production bug appears**: adding a fresh empty category row makes
  the app scream validation errors.
- **Aisha stashes her unfinished palette** to switch context — see it in
  the story below; GitKraken's Stashes panel is where parked work lives.
- **Maya** cuts `hotfix/empty-weights-crash` from `main`, fixes it with a
  regression test, and squash-merges same-day:
  `fix: empty rows no longer trigger validation errors (#3)`.
- **Tom's branch is now stale** (main moved under him). Before
  continuing he **rebases onto `main`**.

👉 **The rebase, visible twice:**
- The tag **`demo/before-rebase`** pins Tom's branch exactly as it was
  before rebasing. Those two orphaned commits still dangle in the graph —
  compare them with the rebased twins sitting on top of the hotfix: same
  changes, new parent, new hashes.
- Find `demo/before-rebase` in GitKraken's Tags section (left panel).

**The broken-test moment (the professor's favorite rule):** Tom then
commits a refactor that renames the engine helper `gradedWork` — and the
test suite goes **red** (3 of 12 fail). He tagged that exact state:
**`demo/broken-tests`**. Check it out, open `tests.html` or run
`node tests/engine.test.js`, and watch the red.

👉 The point: the broken commit **stayed on the branch**. The very next
commit fixed it, and only then was the branch squash-merged as
`feat: save, list and load named scenarios (#4)` — one commit on `main`,
tested green. **Broken code never landed.** That is the whole rule.

### Week 2½ — Aisha's return (stash + a real conflict)

Aisha comes back to `feature/dark-mode`:

1. **`git stash pop`** — her parked dark-palette WIP reappears exactly as
   she left it.
2. She finishes the palette and adds the theme toggle.
3. `main` moved again (PR #4), so she **rebases onto `main`** — and hits a
   **real merge conflict**: Tom's scenario code and her theme code were
   both appended at the same spot in `js/app.js`. She resolves it by
   keeping **both** changes in order and continues the rebase.

👉 In GitKraken you can't see the conflict itself (it happened during the
rebase), but this is the moment to try it yourself — see §4, Exercise 3.

Her branch squash-merges as `feat: dark mode with system-preference
default (#5)`.

### Week 3 — docs, release

- **Tom** opens `docs/publishing` with two doc commits. This one is
  merged with a **real merge commit** — the only "bubble" on `main`:
  `Merge pull request #8 from sthakri/docs/publishing` (diamond shape in
  GitKraken). Docs-only changes often keep their individual commits;
  code features squash. Now you have both styles in one graph to compare.
- **Maya** ships: release commit `chore: release v1.0.0`, tagged
  **`v1.0.0`** (find it under Tags).
- Maya starts the next feature (CSV export) and **stashes it** — that
  stash is still sitting in the repo. Open **Stashes** in GitKraken's
  left panel: *“WIP: export scenarios as CSV (v1.1 candidate)”*.

---

## 3. GitKraken tour — where to see each concept

| Concept | Where in GitKraken |
| --- | --- |
| Multi-lane graph | The center graph — `main` plus branching lanes that rejoin at every squash/merge |
| 4 developers | Avatar icons on every commit; filter by author in the toolbar (`Author` filter) |
| Squash result | `feat: … (#1)` on `main` = 6 commits flattened into 1; click `feature/calculation-engine` to see the originals |
| Rebase before/after | Tag `demo/before-rebase` (old orphaned lane) vs the rebased commits above it |
| Broken-then-fixed branch | Tag `demo/broken-tests` — check it out, run `tests.html`, see red; next commit is green |
| Merge bubble vs linear | The diamond at `Merge pull request #8…` vs the straight line everywhere else |
| Stash | Left panel → **Stashes** → the CSV-export WIP |
| Tags | Left panel → **Tags** → `v1.0.0`, `demo/before-rebase`, `demo/broken-tests` |
| Hotfix flow | `hotfix/empty-weights-crash` lane, one commit, same-day squash-merge |
| Conventional Commits | Every message: `feat:` / `fix:` / `docs:` / `chore:` / `test:` / `refactor:` |
| PR numbers | The `(#N)` suffixes — what GitHub appends on squash-merge |

**Tip:** in GitKraken, hover a commit for details, click for the diff,
and use `View →` options to toggle file/Folder panels. The graph IS the
story of §2.

---

## 4. Do it yourself (GitKraken exercises)

The repo is yours — break things, that's how the concepts stick. (Work is
pushed to GitHub first, so experiment freely; `git status` tells you
where you are.)

1. **Pop the leftover stash.** Left panel → Stashes → right-click →
   *Pop*. See `js/export.js` appear half-written. Then restore it:
   `git stash push -u -m "CSV export WIP again"` (or stash in GitKraken).
2. **Visit the broken state.** Right-click tag `demo/broken-tests` →
   *Checkout*. Open `tests.html` — red. Right-click `main` → checkout
   back. Nothing was harmed: that is detached HEAD, a safe way to visit
   history.
3. **Create a conflict on purpose.** Branch from `main` as `feature/conflict-demo`;
   edit the first line of `README.md` to something, commit. Then check out
   `main`, change the same line differently, commit. Now rebase the branch
   onto `main` (in GitKraken: drag the branch onto `main` → *Rebase*) and
   resolve the conflict in GitKraken's conflict editor. Delete the branch
   afterwards.
4. **Interactive rebase / squash.** Make a branch with 3 small commits
   (e.g. three edits to a scratch file). In GitKraken: right-click the
   oldest commit → *Interactive Rebase* (or edit the commit list), squash
   the two extra commits into the first, write a proper Conventional
   Commit message. Watch the graph rewrite.
5. **Squash-merge yourself.** Create `feature/scratch`, commit twice,
   then drag the branch onto `main` and pick **Squash and merge**. Note
   `main` gains exactly one commit.
6. **Undo everything.** GitKraken's Undo button (Ctrl+Z) rewinds merges,
   rebases, even conflict resolutions. Try it after exercise 5.

---

## 5. Glossary (one line each)

- **commit** — a snapshot of the project plus who/when/why
- **branch** — a movable label pointing at one commit; where work happens
- **merge** — bring another branch's changes in; creates a bubble with two parents
- **squash(-merge)** — flatten a branch's many commits into one before landing it
- **rebase** — replay your commits on top of another branch; linear history, new hashes
- **stash** — park uncommitted work in a shelf; pop it back later
- **hotfix** — urgent small branch from `main`, fixed and merged immediately
- **tag** — a permanent name on one commit (`v1.0.0`)
- **conflict** — git can't auto-decide between two changes to the same lines; a human chooses
- **trunk-based development** — Meta's style: tiny branches, land often, `main` always works
- **stacked diffs** — Meta's version of small PRs: each small commit reviewed on its own
- **detached HEAD** — visiting an old commit directly, not on any branch
- **Conventional Commits** — `type: description` message style this repo uses

---

## 6. Publish it (optional)

The repo is on GitHub at `sthakri/grade-goal`. To put the app online:
**Settings → Pages → Source: GitHub Actions**, then any push to `main`
deploys. Details in [docs/GITHUB-PAGES.md](docs/GITHUB-PAGES.md).

---

*Simulated team, real git. Every commit in this repo was made with the
team member's name and email so GitKraken shows four distinct people —
check `git log --format='%an %ae'` if you're curious how.*
