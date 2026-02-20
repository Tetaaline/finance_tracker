# Finance Tracker

is a fully client-side web application designed to help students manage finances by tracking income, expenses, and spending trends with an intuitive, responsive interface.

Built with HTML5, CSS3, and Vanilla JavaScript, the application demonstrates best practices in frontend development, DOM manipulation, data persistence, accessibility, and client-side validation.

## Features

- **Dashboard Statistics:** View Total Balance, Total Income, Total Expenses, Total Records, Sum of All Values, Top Category.
- **Spending Trends:** Visual 7-day spending chart utilizing Chart.js.
- **Transaction Management:** Add new records (Income or Expense), edit existing records, and delete records seamlessly.
- **Live Search, Sorting & Filtering:** Quickly search descriptions/categories, filter transactions by category, and sort dynamically by date, name, or amount.
- **Settings:** Customizable budget targets, theme toggling, and multi-currency support (USD, EUR, GBP) with automatic conversions.
- **Data Persistence:** Uses the browser's `localStorage` to save all input data automatically. No backend database required.
- **Import/Export Data:** Fully supports exporting your transaction history as a JSON file, and importing it back to restore or transfer data.

## Regex Catalog

The application uses Regular Expressions (RegExp) to aggressively validate user input on the Add and Edit forms.

| Field | Pattern | Explanation | Valid Example | Invalid Example |
|---|---|---|---|---|
| **Description** | `/^[a-zA-Z ]+$/` | Accepts only alphabetic characters and spaces. Prevents symbols or numbers. | `Grocery Shopping` | `Groceries 123!` |
| **Amount** | `/^(0\|[1-9]\d*)(\.\d{1,2})?$/` | Positive numeric values (no leading zeros unless zero) with up to two decimal places. | `150.50`, `45` | `-10`, `05.5` |
| **Category** | `/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/`| Alphabetic words optionally separated by spaces or hyphens. | `Dining Out` | `Cat@gory!` |
| **Currency** | `/^\S(?:.*\S)?$/` | Validates strings with no leading or trailing whitespace. | `USD` | ` USD ` |

## Accessibility & Responsive Design

-Semantic HTML5 (<header>, <nav>, <main>, <section>)
-ARIA labels for interactive elements
-Full keyboard navigation (Tab/Shift+Tab, Enter/Space, arrow keys)
-Focus outlines and visible indicators
-High color contrast in Dark/Light themes
-Responsive layout for desktop, tablet, and mobile


## How to Run & Test

Since this is a client-side vanilla JavaScript/HTML/CSS application with no backend or build steps:

### Running the Application
1. Simply clone or download the repository to your local machine.
2. Open `index.html` directly in any modern web browser.

### Running Tests (Manual)
There are no automated testing pipelines configured. Verification is performed via manual user flows:
1. **Adding Data:** Go to 'Add New', attempt to submit empty items or incorrect formats to test **regex validation**. Verify it prevents bad submissions. Add valid data and see it show up in 'Records'.
2. **Filtering/Sorting:** On the 'Records' page, type in the search bar to ensure live filtering works. Toggle the Sort dropdown and observe changes in ordering.
3. **Persistency check:** Add an item, then refresh the page. Ensure the item is still listed (localStorage is working).
4. **Export/Import:** Go to 'Settings', Export the data to a JSON file. Delete a record, then Import the JSON file back to ensure restoration works seamlessly.
5. **Theme Switch:** Toggle the Theme option in Settings and confirm colors apply globally across all pages.

-Email: a.teta2@alustudent.com
-Github pages url:https://tetaaline.github.io/finance_tracker/
-Demo:https://youtu.be/JjaPHWQ6l0w


