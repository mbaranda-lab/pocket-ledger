// PocketLedger - page code
// the logic is in expenses.js

// get the stuff from the page
var form = document.getElementById("expenseForm");
var amountBox = document.getElementById("amount");
var categoryBox = document.getElementById("category");
var dateBox = document.getElementById("date");
var descBox = document.getElementById("description");
var errorMsg = document.getElementById("errorMsg");
var expenseList = document.getElementById("expenseList");

// this storage uses the browser's localStorage
var storage = {
  load: function () {
    var saved = localStorage.getItem("expenses");
    if (saved == null) {
      return [];
    }
    return JSON.parse(saved);
  },
  save: function (expenses) {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
};

// show all the expenses on the page
function showExpenses() {
  var expenses = getExpenses(storage);
  expenseList.innerHTML = "";

  if (expenses.length == 0) {
    expenseList.innerHTML = "<li>No expenses yet.</li>";
    return;
  }

  for (var i = 0; i < expenses.length; i++) {
    var item = document.createElement("li");
    item.textContent = "$" + expenses[i].amount.toFixed(2) + " - " +
      expenses[i].category + " - " + expenses[i].date + " - " +
      expenses[i].description + " ";

    // delete button for this expense
    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("data-index", i);
    deleteBtn.addEventListener("click", function () {
      var index = parseInt(this.getAttribute("data-index"));
      deleteExpense(storage, index);
      showExpenses();
    });

    item.appendChild(deleteBtn);
    expenseList.appendChild(item);
  }
}

// runs when the user clicks Add Expense
form.addEventListener("submit", function (event) {
  event.preventDefault();
  errorMsg.textContent = "";

  var amount = parseFloat(amountBox.value);
  var category = categoryBox.value;
  var date = dateBox.value;
  var description = descBox.value.trim();

  var error = validateExpense(amount, date, description);
  if (error != "") {
    errorMsg.textContent = error;
    return;
  }

  addExpense(storage, {
    amount: amount,
    category: category,
    date: date,
    description: description
  });

  form.reset();
  showExpenses();
});

showExpenses();