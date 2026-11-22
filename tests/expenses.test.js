// tests for expenses.js
// uses a fake storage so the tests don't need a browser

const {
  validateExpense,
  getExpenses,
  addExpense,
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

// ---------- validateExpense ----------

test("validateExpense: valid input gives no error", function () {
  expect(validateExpense(7.5, "2026-11-01", "matcha")).toBe("");
});

test("validateExpense: amount of 0 is rejected", function () {
  expect(validateExpense(0, "2026-11-01", "matcha")).toBe(
    "Please enter an amount greater than 0."
  );
});

test("validateExpense: missing amount (NaN) is rejected", function () {
  expect(validateExpense(NaN, "2026-11-01", "matcha")).toBe(
    "Please enter an amount greater than 0."
  );
});

test("validateExpense: empty date is rejected", function () {
  expect(validateExpense(5, "", "matcha")).toBe("Please pick a date.");
});

test("validateExpense: description with only spaces is rejected", function () {
  expect(validateExpense(5, "2026-11-01", "   ")).toBe(
    "Please enter a description."
  );
});

// ---------- addExpense ----------

test("addExpense: a new expense gets saved", function () {
  const storage = makeFakeStorage([]);
  addExpense(storage, {
    amount: 4.5,
    category: "Food",
    date: "2026-11-01",
    description: "coffee"
  });
  expect(getExpenses(storage).length).toBe(1);
  expect(getExpenses(storage)[0].description).toBe("coffee");
});

// ---------- deleteExpense ----------

test("deleteExpense: removes the expense at that position", function () {
  const storage = makeFakeStorage([
    { amount: 1, category: "Food", date: "2026-11-01", description: "a" },
    { amount: 2, category: "Food", date: "2026-11-01", description: "b" }
  ]);
  const result = deleteExpense(storage, 0);
  expect(result).toBe(true);
  expect(getExpenses(storage).length).toBe(1);
  expect(getExpenses(storage)[0].description).toBe("b");
});

test("deleteExpense: position that doesn't exist changes nothing", function () {
  const storage = makeFakeStorage([
    { amount: 1, category: "Food", date: "2026-11-01", description: "a" }
  ]);
  const result = deleteExpense(storage, 5);
  expect(result).toBe(false);
  expect(getExpenses(storage).length).toBe(1);
});

test("deleteExpense: negative position changes nothing", function () {
  const storage = makeFakeStorage([
    { amount: 1, category: "Food", date: "2026-11-01", description: "a" }
  ]);
  expect(deleteExpense(storage, -1)).toBe(false);
  expect(getExpenses(storage).length).toBe(1);
});