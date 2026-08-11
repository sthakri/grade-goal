// GradeGoal calculation engine — pure functions, no DOM access.
// A "category" is { name, weight, score }:
//   weight — % of the total course grade (0–100)
//   score  — your % score in that category (0–100)

function computeGradedWork(categories) {
  let banked = 0;       // sum of weight × score, in course percent-points
  let gradedWeight = 0; // total weight that is already graded
  for (const c of categories) {
    banked += c.weight * c.score;
    gradedWeight += c.weight;
  }
  return { banked, gradedWeight };
}

// Let the tests run under Node too (browsers get the globals for free
// via the <script> tag in tests.html).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { computeGradedWork };
}
