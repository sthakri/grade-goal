// GradeGoal calculation engine — pure functions, no DOM access.
// A "category" is { name, weight, score }:
//   weight — % of the total course grade (0–100)
//   score  — your % score in that category (0–100)

function gradedWork(categories) {
  let banked = 0;       // sum of weight × score, in course percent-points
  let gradedWeight = 0; // total weight that is already graded
  for (const c of categories) {
    // Not graded yet — skip it instead of poisoning the math with null.
    if (c.score === null || c.score === undefined || c.score === '') continue;
    // A row with no weight yet must not corrupt the totals.
    if (typeof c.weight !== 'number' || !isFinite(c.weight)) continue;
    banked += c.weight * c.score;
    gradedWeight += c.weight;
  }
  return { banked, gradedWeight };
}

// Current average over graded work only (ungraded categories don't count
// against you). Returns null when nothing is graded yet.
function currentAverage(categories) {
  const { banked, gradedWeight } = gradedWork(categories);
  if (gradedWeight === 0) return null;
  return banked / gradedWeight;
}

// The score you need on the final to finish the course at targetPct.
//   needed        — required final-exam score
//   guaranteedMin — course grade if you score 0 on the final
//   maxPossible   — course grade if you score 100 on the final
function requiredFinalScore(categories, finalWeight, targetPct) {
  const { banked } = gradedWork(categories);
  const needed = (100 * targetPct - banked) / finalWeight;
  return {
    needed,
    guaranteedMin: banked / 100,
    maxPossible: banked / 100 + finalWeight,
  };
}

const fmt = (n) => Math.round(n * 10) / 10;

function describeOutcome(result) {
  if (result.needed > 100) {
    return {
      status: 'impossible',
      message: `Not achievable — even a perfect final only gets you to ${fmt(result.maxPossible)}%.`,
    };
  }
  if (result.needed <= 0) {
    return {
      status: 'locked-in',
      message: `Already locked in — even a 0 on the final keeps you at ${fmt(result.guaranteedMin)}%.`,
    };
  }
  return {
    status: 'ok',
    message: `You need ${fmt(result.needed)}% on the final.`,
  };
}

// Validate user input before calculating. Returns an array of readable
// error messages — an empty array means the input is safe to compute with.
function validateInputs(categories, finalWeight) {
  const errors = [];
  for (const c of categories) {
    if (!(c.weight > 0) || c.weight > 100) {
      errors.push('“' + c.name + '”: weight must be between 0 and 100.');
    }
    if (c.score !== null && c.score !== undefined && c.score !== '' &&
        (!(c.score >= 0) || c.score > 100)) {
      errors.push('“' + c.name + '”: score must be between 0 and 100.');
    }
  }
  if (!(finalWeight > 0) || finalWeight > 100) {
    errors.push('Final exam weight must be between 0 and 100.');
  }
  return errors;
}

// Let the tests run under Node too (browsers get the globals for free
// via the <script> tag in tests.html).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gradedWork, currentAverage, requiredFinalScore, describeOutcome, validateInputs };
}
