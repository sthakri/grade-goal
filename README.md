# 🎯 GradeGoal

**What do I need on my final exam?** GradeGoal answers exactly that: enter
your graded work so far, pick your target letter grade, and see the score
you need on the final — including the honest cases ("already locked in",
"not achievable even with a perfect final").

## Use it

Open `index.html` in any browser. No install, no build, no accounts.

- **Save scenarios** — keep "MATH 101" and "HIST 210" side by side, load
  them back with one click (stored locally in your browser)
- **Dark mode** — follows your system preference, toggle in the corner
- **Self-checking** — open `tests.html` to run the engine's test suite

## How this repo was built

This project is a working demo of how a modern team uses git — the
Meta-style, trunk-based flavor: short-lived feature branches, small
commits, tests green before anything lands, one squashed commit per
feature on `main`, and broken code never merges.

- The full story: [WORKFLOW-GUIDE.md](WORKFLOW-GUIDE.md)
- The team: [TEAM.md](TEAM.md)
- The rules: [CONTRIBUTING.md](CONTRIBUTING.md)

## Project layout

```
index.html          the app
tests.html          in-browser test runner ("green before merge")
js/engine.js        pure calculation functions (no DOM)
js/app.js           UI wiring
js/storage.js       scenario persistence (localStorage)
css/                styles (theme tokens + dark palette)
tests/              the test suite (browser + node)
docs/               publishing & review docs
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
