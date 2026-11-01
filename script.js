// PocketLedger - Sprint 1
// add an expense and show the list

// get the stuff from the page
var form = document.getElementById("expenseForm");
var amountBox = document.getElementById("amount");
var categoryBox = document.getElementById("category");
var dateBox = document.getElementById("date");
var descBox = document.getElementById("description");
var errorMsg = document.getElementById("errorMsg");
var expenseList = document.getElementById("expenseList");

// get saved expenses from localStorage
function loadExpenses() {
  var saved = localStorage.getItem("expenses");
  if (saved == null) {
    return [];
  }
  return JSON.parse(saved);
}

// save expenses to localStorage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// show all the expenses on the page
function showExpenses() {
  var expenses = loadExpenses();
  expenseList.innerHTML = "";

  // if there are none, show a message
  if (expenses.length == 0) {
    expenseList.innerHTML = "<li>No expenses yet.</li>";
    return;
  }

  for (var i = 0; i < expenses.length; i++) {
    var item = document.createElement("li");
    item.textContent = "$" + expenses[i].amount.toFixed(2) + " - " +
      expenses[i].category + " - " + expenses[i].date + " - " +
      expenses[i].description;
    expenseList.appendChild(item);
  }
}

// runs when the user clicks Add Expense
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  errorMsg.textContent = "";

  var amount = parseFloat(amountBox.value);
  var category = categoryBox.value;
  var date = dateBox.value;
  var description = descBox.value.trim();

  // check the inputs
  if (isNaN(amount) || amount <= 0) {
    errorMsg.textContent = "Please enter an amount greater than 0.";
    return;
  }
  if (date == "") {
    errorMsg.textContent = "Please pick a date.";
    return;
  }
  if (description == "") {
    errorMsg.textContent = "Please enter a description.";
    return;
  }

  // make the new expense and save it
  var newExpense = {
    amount: amount,
    category: category,
    date: date,
    description: description
  };

  var expenses = loadExpenses();
  expenses.push(newExpense);
  saveExpenses(expenses);

  form.reset();
  showExpenses();
});

// show saved expenses when the page first loads
showExpenses();