// Logic for Adding Records

document.addEventListener('DOMContentLoaded', () => {
    // Only run if the form exists (though this script should only be included on add.html)
    if (document.getElementById('add-transaction-form')) {
        initAddPage();
    }
});

function initAddPage() {
    const form = document.getElementById('add-transaction-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddRecord(form);
    });

    // Cancel button
    const cancelBtn = document.querySelector('.btn-secondary');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.location.href = 'records.html';
        });
    }
}

function handleAddRecord(form) {
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;

    // Validation
    if (!descriptionRegex.test(description)) {
        alert('Invalid Description. Only letters and spaces are allowed.');
        return;
    }
    if (!amountRegex.test(amount)) {
        alert('Invalid Amount. Please enter a valid positive number (e.g., 10 or 10.99).');
        return;
    }
    // Date validation (HTML5 date input handles format, but ensure it's not empty)
    if (!date) {
        alert('Please select a date.');
        return;
    }
    if (!categoryRegex.test(category)) { // Should correspond to the select options usually, but good to have
        alert('Invalid Category.');
        return;
    }

    const newRecord = {
        id: Date.now().toString(),
        type,
        description,
        amount: parseFloat(amount),
        date,
        category
    };

    const records = getRecords();
    records.push(newRecord);
    saveRecords(records);

    alert('Transaction added successfully!');
    window.location.href = 'records.html';
}
