// Settings Logic

const SETTINGS_KEY = 'finance_tracker_settings';

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    // Add event listeners for auto-save on change
    const currencySelect = document.getElementById('currency-select');
    const budgetInput = document.getElementById('budget-input');

    if (currencySelect) {
        currencySelect.addEventListener('change', saveSettings);
    }
    if (budgetInput) {
        budgetInput.addEventListener('change', saveSettings);
    }
});

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { currency: 'USD', budget: 1500 };

    const currencySelect = document.getElementById('currency-select');
    const budgetInput = document.getElementById('budget-input');

    if (currencySelect) currencySelect.value = settings.currency;
    if (budgetInput) budgetInput.value = settings.budget;
}

function saveSettings() {
    const currency = document.getElementById('currency-select').value;
    const budget = document.getElementById('budget-input').value;

    const settings = {
        currency,
        budget
    };

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    // Optional: Show a subtle toast notification
}
