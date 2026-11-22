// expenses.js
// This file has the logic only (nothing about the page).
// The storage is passed in, so this code doesn't depend on localStorage.

// check the inputs, returns an error message or "" if everything is ok
function validateExpense(amount, date, description) {
  if (isNaN(amount) || amount <= 0) {
    return "Please enter an amount greater than 0.";
  }
  if (date == "") {
    return "Please pick a date.";
  }
  if (description.trim() == "") {
    return "Please enter a description.";
  }
  return "";
}

// get all the saved expenses
function getExpenses(storage) {
  return storage.load();
}

// add a new expense and save it
function addExpense(storage, expense) {
  var expenses = storage.load();
  expenses.push(expense);
  storage.save(expenses);
}

// this lets the tests use the functions (only runs in Node, not the browser)
if (typeof module !== "undefined") {
  module.exports = {
    validateExpense: validateExpense,
    getExpenses: getExpenses,
    addExpense: addExpense
  };
}