// Logic for Viewing, Editing, and Deleting Records

document.addEventListener('DOMContentLoaded', () => {
    // Only run if the table exists
    if (document.getElementById('transaction-table-body')) {
        initRecordsPage();
    }
});

let currentSearch = '';
let currentCategory = 'All';
let currentSort = 'date-desc';

function initRecordsPage() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortSelect = document.getElementById('sort-select');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            renderRecords();
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentCategory = e.target.value;
            renderRecords();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderRecords();
        });
    }

    renderRecords();
}

function renderRecords() {
    const tbody = document.getElementById('transaction-table-body');
    let records = getRecords();

    // 1. Filtering by Search
    if (currentSearch) {
        records = records.filter(record =>
            record.description.toLowerCase().includes(currentSearch) ||
            record.category.toLowerCase().includes(currentSearch)
        );
    }

    // 2. Filtering by Category
    if (currentCategory !== 'All') {
        records = records.filter(record => record.category === currentCategory);
    }

    // 3. Sorting
    records.sort((a, b) => {
        switch (currentSort) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'amount-desc':
                return b.amount - a.amount;
            case 'amount-asc':
                return a.amount - b.amount;
            case 'category-asc':
                return a.category.localeCompare(b.category);
            case 'category-desc':
                return b.category.localeCompare(a.category);
            default:
                return new Date(b.date) - new Date(a.date);
        }
    });

    tbody.innerHTML = '';

    if (records.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No records found.</td></tr>';
        return;
    }

    records.forEach(record => {
        const row = document.createElement('tr');
        row.dataset.id = record.id;

        // Amount styling
        const isExpense = record.type === 'expense';
        const amountClass = isExpense ? '' : 'style="color: var(--color-primary); font-weight: 600;"'; // Green for income
        const amountPrefix = isExpense ? '' : '+';
        const formattedAmount = `${amountPrefix}${formatCurrency(record.amount)}`;

        // Category Badge - simple mapping for demo, can be expanded
        let badgeClass = 'badge';
        if (record.type === 'expense') badgeClass += ' badge-expense';
        // You could add specific colors for categories if needed

        row.innerHTML = `
            <td data-label="Date">${record.date}</td>
            <td data-label="Description">${record.description}</td>
            <td data-label="Category"><span class="${badgeClass}">${record.category}</span></td>
            <td data-label="Amount" ${amountClass}>${formattedAmount}</td>
            <td data-label="Actions">
                <button class="btn-secondary btn-edit" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Edit</button>
                <button class="btn-danger btn-delete" style="padding: 0.25rem 0.5rem; font-size: 0.75rem; border:none;">Delete</button>
            </td>
        `;

        // Event Listeners for buttons
        row.querySelector('.btn-delete').addEventListener('click', () => handleDelete(record.id));
        row.querySelector('.btn-edit').addEventListener('click', () => handleEdit(row, record));

        tbody.appendChild(row);
    });
}

function handleDelete(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        let records = getRecords();
        records = records.filter(r => r.id !== id);
        saveRecords(records);
        renderRecords();
    }
}

function handleEdit(row, record) {
    // Replace cells with inputs
    row.innerHTML = `
        <td data-label="Date"><input type="date" class="form-input" value="${record.date}" id="edit-date-${record.id}"></td>
        <td data-label="Description"><input type="text" class="form-input" value="${record.description}" id="edit-desc-${record.id}"></td>
        <td data-label="Category">
             <select class="form-select" id="edit-cat-${record.id}">
                <option value="Food" ${record.category === 'Food' ? 'selected' : ''}>Food</option>
                <option value="Books" ${record.category === 'Books' ? 'selected' : ''}>Books</option>
                <option value="Transport" ${record.category === 'Transport' ? 'selected' : ''}>Transport</option>
                <option value="Entertainment" ${record.category === 'Entertainment' ? 'selected' : ''}>Entertainment</option>
                <option value="Fees" ${record.category === 'Fees' ? 'selected' : ''}>Fees</option>
                <option value="Other" ${record.category === 'Other' ? 'selected' : ''}>Other</option>
                <option value="Income" ${record.category === 'Income' ? 'selected' : ''}>Income (General)</option>
                <option value="Salary" ${record.category === 'Salary' ? 'selected' : ''}>Salary</option>
                <option value="Gift" ${record.category === 'Gift' ? 'selected' : ''}>Gift</option>
                <option value="Refund" ${record.category === 'Refund' ? 'selected' : ''}>Refund</option>
                <option value="Investment" ${record.category === 'Investment' ? 'selected' : ''}>Investment</option>
            </select>
        </td>
        <td data-label="Amount"><input type="number" class="form-input" value="${record.amount}" id="edit-amount-${record.id}" step="0.01"></td>
        <td data-label="Actions">
            <button class="btn-primary btn-save" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Save</button>
            <button class="btn-secondary btn-cancel" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">Cancel</button>
        </td>
    `;

    row.querySelector('.btn-save').addEventListener('click', () => saveEdit(record.id));
    row.querySelector('.btn-cancel').addEventListener('click', () => renderRecords());
}

function saveEdit(id) {
    const date = document.getElementById(`edit-date-${id}`).value;
    const description = document.getElementById(`edit-desc-${id}`).value;
    const category = document.getElementById(`edit-cat-${id}`).value;
    const amount = document.getElementById(`edit-amount-${id}`).value;

    // Validation
    if (!descriptionRegex.test(description)) {
        alert('Invalid Description. Only letters and spaces are allowed.');
        return;
    }
    if (!amountRegex.test(amount)) {
        alert('Invalid Amount.');
        return;
    }
    if (!date) {
        alert('Invalid Date.');
        return;
    }

    let records = getRecords();
    const recordIndex = records.findIndex(r => r.id === id);
    if (recordIndex !== -1) {
        records[recordIndex].date = date;
        records[recordIndex].description = description;
        records[recordIndex].category = category;
        records[recordIndex].amount = parseFloat(amount);

        // Update type if category is Income (optional logic, but good for consistency)
        if (category === 'Income') {
            records[recordIndex].type = 'income';
        } else {
            // If it was income and changed to expense category, update type? 
            // Simplification: Keeping original type unless it was explicitly an income category switch. 
            // For now, let's assume the user doesn't change type via category often, OR we should expose type in edit.
            // Given the prompt, "category(will be multiple option))", let's stick to updating these fields.
        }

        saveRecords(records);
        renderRecords();
    }
}
