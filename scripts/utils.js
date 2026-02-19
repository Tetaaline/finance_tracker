// Shared Utilities and Constants

const CONSTANTS = {
    STORAGE_KEY: 'finance_tracker_records'
};

// Regex Patterns
const descriptionRegex = /^[a-zA-Z0-9 ]+$/;
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
    return JSON.parse(localStorage.getItem('finance_tracker_settings')) || { currency: 'USD', budget: 1500 };
}

function formatCurrency(amount) {
    const settings = getSettings();
    const currencyMap = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£'
    };
    const symbol = currencyMap[settings.currency] || '$';

    return symbol + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
