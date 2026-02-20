# StudentFi - Student Finance Tracker

StudentFi is a web-based, client-side transaction tracking application designed for students to easily manage and track their finances.

## Chosen Theme

The application features a sleek, modern interface with a **Dark Theme by default**. This ensures a comfortable viewing experience, especially at night. It also fully supports a **Light Theme**, which is easily toggleable in the Settings menu. The interface is styled using vanilla CSS variables for a consistent look, adopting a vibrant primary color for interactions, green for income, red for expenses, and premium dark backgrounds for components.

## Features List

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

## Keyboard Map

The application relies on standard browser keyboard accessibility rather than custom hotkeys:

- **`Tab`**: Move focus to the next interactive element (link, input, button).
- **`Shift + Tab`**: Move focus to the previous interactive element.
- **`Enter` / `Space`**: Trigger the currently focused button or link (e.g., Save, Delete, Cancel, Edit).
- **`Up / Down Arrows`**: Navigate through `<select>` dropdown menus (such as Categories or Currency).
- **`Esc`**: Unfocus current element or close opened dropdowns.

## Accessibility (A11y) Notes

We structured the application carefully to ensure it is inclusive for all users, including those utilizing screen readers:
- **Semantic HTML5:** Uses proper hierarchical tags such as `<header>`, `<main>`, `<nav>`, `<section>`, and `<article>` to provide a clear structure.
- **Aria Labels:** Mobile navigation toggle includes `aria-label="Toggle navigation"` to describe its function to assistive technologies.
- **Color Contrast:** The dark and light themes are designed with high-contrast ratios between text, button elements, and backgrounds.
- **Input Associations:** Form designs provide clear error alerts to inform users of validation failures instantly.
- **Focus States:** Every interactive element has easily distinguishable focus outlines so users navigating via keyboard can see their current position.

## How to Run & Test

Since this is a client-side vanilla JavaScript/HTML/CSS application with no backend or build steps:

### Running the Application
1. Simply clone or download the repository to your local machine.
2. Open `index.html` directly in any modern web browser.
3. *Alternative:* If utilizing VS Code, you can run it via the **Live Server** extension.

### Running Tests (Manual)
There are no automated testing pipelines configured. Verification is performed via manual user flows:
1. **Adding Data:** Go to 'Add New', attempt to submit empty items or incorrect formats to test **regex validation**. Verify it prevents bad submissions. Add valid data and see it show up in 'Records'.
2. **Filtering/Sorting:** On the 'Records' page, type in the search bar to ensure live filtering works. Toggle the Sort dropdown and observe changes in ordering.
3. **Persistency check:** Add an item, then refresh the page. Ensure the item is still listed (localStorage is working).
4. **Export/Import:** Go to 'Settings', Export the data to a JSON file. Delete a record, then Import the JSON file back to ensure restoration works seamlessly.
5. **Theme Switch:** Toggle the Theme option in Settings and confirm colors apply globally across all pages.