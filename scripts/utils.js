// Shared Utilities and Constants

const CONSTANTS = {
    STORAGE_KEY: 'finance_tracker_records'
};

// Regex Patterns
const descriptionRegex = /^[a-zA-Z ]+$/;
const amountRegex = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
const categoryRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
// Note: Currency Regex was mentioned in the prompt but not explicitly used for validation of a specific field,
// assuming it might be for future use or validation of currency symbols if editable.
const currencyRegex = /^\S(?:.*\S)?$/;

function getRecords() {
    const records = localStorage.getItem(CONSTANTS.STORAGE_KEY);
    return records ? JSON.parse(records) : [];
}

function saveRecords(records) {
    localStorage.setItem(CONSTANTS.STORAGE_KEY, JSON.stringify(records));
}

function getSettings() {
    return JSON.parse(localStorage.getItem('finance_tracker_settings')) || { currency: 'USD', budget: 1500, theme: 'dark' };
}

// Ensure theme is applied on all pages when scripts load
(function applyInitialTheme() {
    const settings = getSettings();
    if (settings.theme === 'light') {
        document.body.classList.add('light-mode');
    }
})();

function formatCurrency(amount) {
    const settings = getSettings();
    const currencyMap = {
        'USD': { symbol: '$', rate: 1.0 },
        'EUR': { symbol: '€', rate: 0.93 },
        'GBP': { symbol: '£', rate: 0.79 }
    };

    const config = currencyMap[settings.currency] || currencyMap['USD'];
    const convertedAmount = amount * config.rate;

    return config.symbol + convertedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
