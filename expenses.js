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

// delete the expense at this position in the list
// returns true if it worked, false if the position doesn't exist
function deleteExpense(storage, index) {
  var expenses = storage.load();
  if (isNaN(index) || index < 0 || index >= expenses.length) {
    return false;
  }
  expenses.splice(index, 1);
  storage.save(expenses);
  return true;
}

// round to 2 decimals so we don't get numbers like 12.300000000000001
function roundMoney(number) {
  return Math.round(number * 100) / 100;
}

// add up the amounts for each category
// example result: { Food: 12.5, Utilities: 40 }
function getCategoryTotals(storage) {
  var expenses = storage.load();
  var totals = {};

  for (var i = 0; i < expenses.length; i++) {
    var category = expenses[i].category;
    if (totals[category] == undefined) {
      totals[category] = 0;
    }
    totals[category] = roundMoney(totals[category] + expenses[i].amount);
  }

  return totals;
}

// add up everything the user spent
function getTotalSpent(storage) {
  var expenses = storage.load();
  var total = 0;

  for (var i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }

  return roundMoney(total);
}

// this lets the tests use the functions (only runs in Node, not the browser)
if (typeof module !== "undefined") {
  module.exports = {
    validateExpense: validateExpense,
    getExpenses: getExpenses,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    getCategoryTotals: getCategoryTotals,
    getTotalSpent: getTotalSpent
  };
}