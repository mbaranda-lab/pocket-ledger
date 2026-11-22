# PocketLedger

A personal expense tracker I'm building for CS-319 (Fundamentals of Software Engineering).
Name: Maitri

## What it does
Sprint 1: add an expense (amount, category, date, description) and see it in a list.
Sprint 2: delete an expense, and see the total spent and the total for each category.
Expenses are saved in the browser, so they are still there after a refresh.

## Technologies
- HTML, CSS, and plain JavaScript (no frameworks)
- Browser localStorage for saving data
- Jest for automated tests (needs Node.js)

## Prerequisites
- A web browser (I tested with Chrome)
- Node.js and npm (only needed to run the tests). I used Node v26.13.1 and npm 11.20.0.

## Installation
1. Clone the repo: `git clone https://github.com/mbaranda-lab/pocket-ledger.git`
2. Go into the folder: `cd pocket-ledger`
3. Install the test tool: `npm install`

You only need step 3 if you want to run the tests. The app itself needs no install.

## Configuration
None needed.

## Running the app
Open `index.html` in your browser (double-click it, or run `start index.html` in Git Bash from the pocket-ledger folder).
You should see the PocketLedger page with an Add Expense form and a list that says "No expenses yet."

## Running the automated tests
Run this from the pocket-ledger folder (the one with package.json):

`npm test`

You should see 2 test suites and 15 tests pass.

## Trying the new Sprint 2 features
1. Add two or three expenses in different categories (for example Food and Transportation).
2. Look at the Totals section at the bottom. It shows the total spent and the total for each category.
3. Click Delete next to an expense. It disappears and the totals go down.
4. Refresh the page. The list and totals should still be correct.

## Project structure
- `index.html` - the page
- `script.js` - code for the page only (showing things, clicking buttons)
- `expenses.js` - the logic (validation, add, delete, totals), with no browser code in it
- `tests/` - the automated tests

## Known limitations
- Expenses can't be edited yet.
- No budgets or over-budget warnings yet.
- Data is stored only in this browser, so a different browser or computer won't see it.