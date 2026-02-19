// Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    initChart();
});

function updateDashboard() {
    const records = getRecords();

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach(record => {
        if (record.type === 'income') {
            totalIncome += record.amount;
        } else if (record.type === 'expense') {
            totalExpense += record.amount;
        }
    });

    const totalBalance = totalIncome - totalExpense;

    // Update DOM
    // Check if elements exist before updating to avoid errors if ID is missing
    const balanceEl = document.getElementById('total-balance');
    const incomeEl = document.getElementById('total-income');
    const expenseEl = document.getElementById('total-expenses');

    if (balanceEl) balanceEl.innerText = formatCurrency(totalBalance);
    if (incomeEl) incomeEl.innerText = formatCurrency(totalIncome);
    if (expenseEl) {
        expenseEl.innerText = formatCurrency(totalExpense);

        const settings = getSettings(); // usage of getSettings from utils.js
        if (settings.budget && totalExpense > settings.budget) {
            expenseEl.style.color = 'red';
            expenseEl.title = `Over budget! Limit: ${formatCurrency(parseInt(settings.budget))}`;
            // Optional: Add a warning icon or text
            if (!document.getElementById('budget-warning')) {
                const warning = document.createElement('div');
                warning.id = 'budget-warning';
                warning.style.color = 'red';
                warning.style.fontSize = '0.8rem';
                warning.innerText = `Over Budget (${formatCurrency(parseInt(settings.budget))})`;
                expenseEl.parentNode.appendChild(warning);
            }
        } else {
            // Reset style if under budget
            expenseEl.style.color = 'var(--color-danger)';
            const warning = document.getElementById('budget-warning');
            if (warning) warning.remove();
        }
    }
}



function initChart() {
    const ctx = document.getElementById('spendingChart');
    if (!ctx) return;

    const records = getRecords();

    // Get last 7 days labels
    const labels = [];
    const dataPoints = [];

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateString = d.toISOString().split('T')[0];

        // Format label (e.g., "Mon", "Tue")
        const options = { weekday: 'short' };
        labels.push(new Intl.DateTimeFormat('en-US', options).format(d));

        // Sum expenses for this day
        const dayExpense = records
            .filter(r => r.type === 'expense' && r.date === dateString)
            .reduce((sum, r) => sum + r.amount, 0);

        dataPoints.push(dayExpense);
    }

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Spending',
                data: dataPoints,
                backgroundColor: '#818cf8',
                borderRadius: 4,
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 41, 59, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#cbd5e1',
                    padding: 10,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatCurrency(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(148, 163, 184, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function (value) {
                            return '$' + value;
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
