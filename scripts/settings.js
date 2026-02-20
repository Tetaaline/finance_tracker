// Settings Logic

const SETTINGS_KEY = 'finance_tracker_settings';

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    // Add event listeners for auto-save on change
    const currencySelect = document.getElementById('currency-select');
    const budgetInput = document.getElementById('budget-input');
    const themeToggle = document.getElementById('theme-toggle');

    if (currencySelect) {
        currencySelect.addEventListener('change', saveSettings);
    }
    if (budgetInput) {
        budgetInput.addEventListener('change', saveSettings);
    }
    if (themeToggle) {
        themeToggle.addEventListener('change', saveSettings);
    }

    // Import / Export Listeners
    const btnExport = document.getElementById('btn-export');
    const btnImportTrigger = document.getElementById('btn-import-trigger');
    const fileImport = document.getElementById('file-import');

    if (btnExport) {
        btnExport.addEventListener('click', handleExport);
    }

    if (btnImportTrigger && fileImport) {
        btnImportTrigger.addEventListener('click', () => fileImport.click());
        fileImport.addEventListener('change', handleImport);
    }
});

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { currency: 'USD', budget: 1500, theme: 'dark' };

    const currencySelect = document.getElementById('currency-select');
    const budgetInput = document.getElementById('budget-input');
    const themeToggle = document.getElementById('theme-toggle');

    if (currencySelect) currencySelect.value = settings.currency;
    if (budgetInput) budgetInput.value = settings.budget;

    // Apply Theme
    if (themeToggle) {
        themeToggle.checked = settings.theme === 'dark';
    }
}

function saveSettings() {
    const currency = document.getElementById('currency-select').value;
    const budget = document.getElementById('budget-input').value;
    const themeToggle = document.getElementById('theme-toggle');
    const theme = themeToggle && themeToggle.checked ? 'dark' : 'light';

    const settings = {
        currency,
        budget,
        theme
    };

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

    // Immediately apply theme globally upon save
    applyThemeGlobally(theme);

    // If we change currency, the dashboard/records view might need refresh if they are on same page, 
    // but typically they are separate pages, so reloading on navigate is fine.
}

function applyThemeGlobally(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }
}

function handleExport() {
    const records = getRecords();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(records, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "finance_records.json");
    dlAnchorElem.click();
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (!Array.isArray(importedData)) {
                throw new Error("Invalid format. Root must be an array.");
            }

            // Basic validation check on first item if it exists
            if (importedData.length > 0) {
                const first = importedData[0];
                if (!first.hasOwnProperty('id') || !first.hasOwnProperty('amount') || !first.hasOwnProperty('date')) {
                    throw new Error("Invalid format. Documents must have id, amount, and date fields.");
                }
            }

            // Save imported data replacing old
            saveRecords(importedData);
            alert("Data imported successfully!");
            // Reset input
            event.target.value = '';
        } catch (error) {
            alert("Error parsing JSON file. Please ensure it's a valid export format. Details: " + error.message);
        }
    };
    reader.readAsText(file);
}
