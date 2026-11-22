// tests for the totals in expenses.js

const {
  getCategoryTotals,
  getTotalSpent,
  deleteExpense
} = require("../expenses.js");

// fake storage that keeps the expenses in a normal array
function makeFakeStorage(startingExpenses) {
  let data = startingExpenses || [];
  return {
    load: function () {
      return data;
    },
    save: function (expenses) {
      data = expenses;
    }
  };
}

test("getCategoryTotals: adds up the amounts for each category", function () {
  const storage = makeFakeStorage([
    { amount: 5, category: "Food", date: "2026-11-01", description: "a" },
    { amount: 7.5, category: "Food", date: "2026-11-02", description: "b" },
    { amount: 40, category: "Utilities", date: "2026-11-03", description: "c" }
  ]);
  expect(getCategoryTotals(storage)).toEqual({ Food: 12.5, Utilities: 40 });
});

test("getCategoryTotals: no expenses gives an empty result", function () {
  const storage = makeFakeStorage([]);
  expect(getCategoryTotals(storage)).toEqual({});
});

test("getCategoryTotals: rounds so 0.1 + 0.2 is 0.3", function () {
  const storage = makeFakeStorage([
    { amount: 0.1, category: "Food", date: "2026-11-01", description: "a" },
    { amount: 0.2, category: "Food", date: "2026-11-01", description: "b" }
  ]);
  expect(getCategoryTotals(storage).Food).toBe(0.3);
});

test("getTotalSpent: adds up every expense", function () {
  const storage = makeFakeStorage([
    { amount: 5, category: "Food", date: "2026-11-01", description: "a" },
    { amount: 40, category: "Utilities", date: "2026-11-03", description: "b" }
  ]);
  expect(getTotalSpent(storage)).toBe(45);
});

test("getTotalSpent: no expenses is 0", function () {
  const storage = makeFakeStorage([]);
  expect(getTotalSpent(storage)).toBe(0);
});

test("getCategoryTotals: total goes down after deleting an expense", function () {
  const storage = makeFakeStorage([
    { amount: 5, category: "Food", date: "2026-11-01", description: "a" },
    { amount: 7.5, category: "Food", date: "2026-11-02", description: "b" }
  ]);
  deleteExpense(storage, 0);
  expect(getCategoryTotals(storage)).toEqual({ Food: 7.5 });
});