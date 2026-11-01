# PocketLedger

A personal expense tracker I'm building for CS-319 (Fundamentals of Software Engineering).
Name: Maitri

## What it does (Sprint 1)
You can add an expense (amount, category, date, description) and see it in a list.
Expenses are saved in the browser, so they are still there after a refresh.

## Technologies
- HTML, CSS, and plain JavaScript (no frameworks)
- Browser localStorage for saving data

## Prerequisites
- A web browser (I tested with Chrome)
- Nothing else. No install is needed.

## Installation
1. Clone the repo: `git clone https://github.com/mbaranda-lab/pocket-ledger.git`
2. Go into the folder: `cd pocket-ledger`

There are no packages to install.

## Configuration
None needed.

## Running the app
Open `index.html` in your browser (double-click it, or run `start index.html` in Git Bash from the pocket-ledger folder).
You should see the PocketLedger page with an Add Expense form and an empty list that says "No expenses yet."

## Trying the Sprint 1 features
1. Enter an amount (for example 4.50), pick a category, pick a date, and type a description (for example Coffee).
2. Click Add Expense. The expense shows up under My Expenses.
3. Try clicking Add Expense with the amount or description empty. An error message should appear and nothing is added.
4. Refresh the page. Your expenses should still be there.

## Known limitations
- Expenses can't be edited or deleted yet.
- No category totals or budgets yet.
- Data is stored only in this browser, so a different browser or computer won't see it.