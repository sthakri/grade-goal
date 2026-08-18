// Scenario storage: save the current form state under a name, list saved
// scenarios, load them back. Backed by localStorage.
const ScenarioStore = {
  KEY: 'gradegoal.scenarios.v1',

  list() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch (e) {
      return [];
    }
  },

  persist(scenarios) {
    localStorage.setItem(this.KEY, JSON.stringify(scenarios));
  },

  // Insert-or-update by name; newest first.
  save(name, state) {
    const scenarios = this.list();
    const entry = { name, savedAt: new Date().toISOString(), state };
    const existing = scenarios.findIndex((s) => s.name === name);
    if (existing === -1) scenarios.unshift(entry);
    else scenarios[existing] = entry;
    this.persist(scenarios);
    return entry;
  },

  find(name) {
    return this.list().find((s) => s.name === name) || null;
  },

  remove(name) {
    this.persist(this.list().filter((s) => s.name !== name));
  },
};

// Node export so tests can use the store too (browsers get the global
// const for free via the <script> tag).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ScenarioStore };
}
