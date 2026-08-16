// GradeGoal UI wiring: reads the form, calls the engine, renders the result.
(function () {
  'use strict';

  const DEFAULT_CATEGORIES = [
    { name: 'Homework', weight: 20, score: 92 },
    { name: 'Quizzes', weight: 10, score: 88 },
    { name: 'Midterm', weight: 20, score: 81 },
  ];

  const rowsBody = document.getElementById('category-rows');
  const resultBox = document.getElementById('result');

  function rowMarkup(name, weight, score) {
    return (
      '<td><input type="text" aria-label="Category name"></td>' +
      '<td><input type="number" min="0" max="100" aria-label="Weight"></td>' +
      '<td><input type="number" min="0" max="100" aria-label="Score"></td>' +
      '<td><button class="remove-row" aria-label="Remove category">✕</button></td>'
    );
  }

  function appendRow(category) {
    const tr = document.createElement('tr');
    tr.innerHTML = rowMarkup();
    const inputs = tr.querySelectorAll('input');
    inputs[0].value = category ? category.name : '';
    inputs[1].value = category ? category.weight : '';
    inputs[2].value = (category && category.score !== null) ? category.score : '';
    rowsBody.appendChild(tr);
  }

  function renderRows(categories) {
    rowsBody.innerHTML = '';
    categories.forEach(appendRow);
  }

  function readCategories() {
    return Array.from(rowsBody.querySelectorAll('tr'))
      .filter((tr) => {
        // A freshly added, still-empty row is invisible to the engine —
        // it must not trigger validation errors mid-typing.
        const inputs = tr.querySelectorAll('input');
        return inputs[0].value !== '' || inputs[1].value !== '' || inputs[2].value !== '';
      })
      .map((tr) => {
        const inputs = tr.querySelectorAll('input');
        return {
          name: inputs[0].value.trim() || 'Category',
          weight: inputs[1].value === '' ? '' : Number(inputs[1].value),
          score: inputs[2].value === '' ? '' : Number(inputs[2].value),
        };
      });
  }

  function readNumber(id) {
    const v = document.getElementById(id).value;
    return v === '' ? '' : Number(v);
  }

  function update() {
    const finalWeight = readNumber('final-weight');
    const target = readNumber('target-grade');
    const categories = readCategories();

    const errors = validateInputs(categories, finalWeight);
    if (errors.length > 0) {
      resultBox.className = 'result';
      resultBox.innerHTML = errors.map((e) => '<p class="error">' + e + '</p>').join('');
      return;
    }

    const outcome = describeOutcome(requiredFinalScore(categories, finalWeight, target));
    resultBox.className = 'result ' + outcome.status;
    resultBox.innerHTML = '<span class="big">' + outcome.message + '</span>';
  }

  renderRows(DEFAULT_CATEGORIES);
  update();

  document.getElementById('add-row').addEventListener('click', () => {
    appendRow(null);
    update();
  });

  rowsBody.addEventListener('click', (e) => {
    if (e.target.matches('.remove-row')) {
      e.target.closest('tr').remove();
      update();
    }
  });

  // 'input' fires on every keystroke, so the answer updates as you type
  // ('change' only fires when a field loses focus — feels broken).
  rowsBody.addEventListener('input', update);
  document.getElementById('final-weight').addEventListener('input', update);
  document.getElementById('target-grade').addEventListener('change', update);
})();
