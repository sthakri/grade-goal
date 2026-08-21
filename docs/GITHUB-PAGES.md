# Publishing GradeGoal with GitHub Pages

The repo ships with a Pages workflow (`.github/workflows/deploy.yml`), so
publishing is a one-time setting:

1. Push the repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. The workflow publishes the whole repo — `index.html`
   becomes the site root.
4. Your site appears at `https://<user>.github.io/<repo>/`.

No build step: the app is plain HTML/CSS/JS on purpose, so Pages serves it
as-is.

Notes:
- `tests.html` is published too — classmates can run the suite in the
  browser, which is a nice way to show the "green before merge" rule.
- Every squash-merged PR redeploys automatically; the deploy commit is the
  PR's single squashed commit.
