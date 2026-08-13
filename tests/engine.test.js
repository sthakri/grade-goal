// GradeGoal engine tests. Runs in two places:
//   - Browser: open tests.html (loads js/engine.js first, then this file)
//   - Terminal: node tests/engine.test.js
(function () {
  'use strict';

  // Under Node, pull the engine's functions into scope. In the browser
  // they are already global because tests.html loads engine.js first.
  if (typeof document === 'undefined' && typeof require === 'function') {
    Object.assign(globalThis, require('../js/engine.js'));
  }

  const tests = [];
  function test(name, fn) { tests.push({ name, fn }); }
  function assertEquals(actual, expected) {
    if (actual !== expected) {
      throw new Error('expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual));
    }
  }
  function assertClose(actual, expected, tol) {
    tol = (tol === undefined) ? 1e-9 : tol;
    if (Math.abs(actual - expected) > tol) throw new Error('expected ~' + expected + ', got ' + actual);
  }
  function assertTrue(cond, msg) { if (!cond) throw new Error(msg || 'expected true'); }

  // ---------------------------------------------------------------- tests --

  test('computeGradedWork sums weighted scores', () => {
    const r = computeGradedWork([
      { name: 'Homework', weight: 20, score: 90 },
      { name: 'Quizzes', weight: 10, score: 60 },
    ]);
    assertClose(r.banked, 20 * 90 + 10 * 60);
    assertClose(r.gradedWeight, 30);
  });

  test('currentAverage divides banked points by graded weight', () => {
    const avg = currentAverage([
      { name: 'Homework', weight: 20, score: 90 },
      { name: 'Quizzes', weight: 10, score: 60 },
    ]);
    assertClose(avg, (20 * 90 + 10 * 60) / 30);
  });

  test('requiredFinalScore: straightforward case', () => {
    const r = requiredFinalScore([{ name: 'Coursework', weight: 50, score: 80 }], 50, 70);
    assertClose(r.needed, 60);
  });

  test('requiredFinalScore: impossible target is flagged', () => {
    const r = requiredFinalScore([{ name: 'Coursework', weight: 50, score: 80 }], 50, 95);
    assertEquals(describeOutcome(r).status, 'impossible');
  });

  test('requiredFinalScore: locked-in target is flagged', () => {
    const r = requiredFinalScore([{ name: 'Coursework', weight: 80, score: 100 }], 20, 80);
    assertEquals(describeOutcome(r).status, 'locked-in');
    assertClose(r.needed, 0);
  });

  test('categories with ungraded scores are skipped', () => {
    const r = computeGradedWork([
      { name: 'Homework', weight: 20, score: 90 },
      { name: 'Project', weight: 30, score: null },
      { name: 'Lab', weight: 10, score: '' },
    ]);
    assertClose(r.banked, 1800);
    assertClose(r.gradedWeight, 20);
  });

  test('describeOutcome message includes the needed score', () => {
    const r = requiredFinalScore([{ name: 'Coursework', weight: 50, score: 80 }], 50, 70);
    assertTrue(describeOutcome(r).message.indexOf('60') !== -1, 'message should mention 60');
  });

  // --------------------------------------------------------------- runner --

  const results = tests.map(({ name, fn }) => {
    try { fn(); return { name, pass: true }; }
    catch (e) { return { name, pass: false, error: e.message }; }
  });

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      const list = document.getElementById('test-results');
      const summary = document.getElementById('test-summary');
      for (const r of results) {
        const li = document.createElement('li');
        li.className = r.pass ? 'pass' : 'fail';
        li.textContent = (r.pass ? '✓ ' : '✗ ') + r.name + (r.pass ? '' : ' — ' + r.error);
        list.appendChild(li);
      }
      const failed = results.filter((r) => !r.pass).length;
      summary.textContent = failed === 0
        ? results.length + ' tests, all green ✅'
        : failed + '/' + results.length + ' tests FAILED ❌';
      summary.className = failed === 0 ? 'green' : 'red';
    });
  } else {
    let failed = 0;
    for (const r of results) {
      console.log((r.pass ? '  ✓ ' : '  ✗ ') + r.name + (r.pass ? '' : ' — ' + r.error));
      if (!r.pass) failed++;
    }
    console.log(failed === 0 ? results.length + ' tests, all green' : failed + '/' + results.length + ' FAILED');
    if (typeof process !== 'undefined') process.exitCode = failed === 0 ? 0 : 1;
  }
})();
