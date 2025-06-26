let members = [];
let expenses = [];
let spendingChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize chart if needed or other setup
    initializeChart();
});

function addMember() {
    const memberNameInput = document.getElementById('memberName');
    const memberName = memberNameInput.value.trim();

    if (memberName && !members.includes(memberName)) {
        members.push(memberName);
        renderMemberList();
        updatePayerSelect();
        memberNameInput.value = '';
    } else if (members.includes(memberName)) {
        alert('This member already exists.');
    } else {
        alert('Please enter a member name.');
    }
}

function renderMemberList() {
    const memberList = document.getElementById('memberList');
    memberList.innerHTML = '';
    members.forEach(member => {
        const li = document.createElement('li');
        li.textContent = member;
        memberList.appendChild(li);
    });
}

function updatePayerSelect() {
    const expensePayerSelect = document.getElementById('expensePayer');
    expensePayerSelect.innerHTML = '<option value="">Select Payer</option>'; // Default option
    members.forEach(member => {
        const option = document.createElement('option');
        option.value = member;
        option.textContent = member;
        expensePayerSelect.appendChild(option);
    });
}

function addExpense() {
    const descriptionInput = document.getElementById('expenseDescription');
    const amountInput = document.getElementById('expenseAmount');
    const payerSelect = document.getElementById('expensePayer');

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const payer = payerSelect.value;

    if (description && !isNaN(amount) && amount > 0 && payer) {
        expenses.push({ description, amount, payer });
        renderExpenseList();
        descriptionInput.value = '';
        amountInput.value = '';
        payerSelect.selectedIndex = 0; // Reset payer dropdown
    } else {
        alert('Please fill in all expense fields correctly.');
    }
}

function renderExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description}: $${expense.amount.toFixed(2)} (Paid by ${expense.payer})`;
        expenseList.appendChild(li);
    });
}

function calculateSplit() {
    if (members.length === 0) {
        alert("Please add members first.");
        return;
    }
    if (expenses.length === 0) {
        alert("Please add expenses first.");
        return;
    }

    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const sharePerMember = totalExpenses / members.length;

    let balances = {};
    members.forEach(member => {
        balances[member] = 0;
    });

    expenses.forEach(expense => {
        balances[expense.payer] += expense.amount;
    });

    members.forEach(member => {
        balances[member] -= sharePerMember;
    });

    displayResults(balances, totalExpenses, sharePerMember);
    updateChart(balances); // Or pass data suitable for chart
}

function displayResults(balances, totalExpenses, sharePerMember) {
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = `
        <p>Total Expenses: $${totalExpenses.toFixed(2)}</p>
        <p>Each Member's Share: $${sharePerMember.toFixed(2)}</p>
    `;

    const detailedDebtsDiv = document.getElementById('detailedDebts');
    detailedDebtsDiv.innerHTML = '<h3>Debts:</h3>';

    const debtors = [];
    const creditors = [];

    members.forEach(member => {
        if (balances[member] < 0) {
            debtors.push({ name: member, amount: -balances[member] });
        } else if (balances[member] > 0) {
            creditors.push({ name: member, amount: balances[member] });
        }
    });
    
    if (debtors.length === 0 && creditors.length === 0 && totalExpenses > 0) {
        detailedDebtsDiv.innerHTML += "<p>Everyone is settled up!</p>";
    } else if (totalExpenses === 0 && members.length > 0) {
         detailedDebtsDiv.innerHTML += "<p>No expenses to split.</p>";
    }


    // Simple debt settlement (not fully optimized for minimizing transactions)
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];
        const amountToSettle = Math.min(debtor.amount, creditor.amount);

        if (amountToSettle > 0.005) { // Threshold to avoid tiny amounts
            detailedDebtsDiv.innerHTML += `<p>${debtor.name} owes ${creditor.name} $${amountToSettle.toFixed(2)}</p>`;
        }

        debtor.amount -= amountToSettle;
        creditor.amount -= amountToSettle;

        if (debtor.amount < 0.005) i++;
        if (creditor.amount < 0.005) j++;
    }
}


function initializeChart() {
    const ctx = document.getElementById('spendingChart').getContext('2d');
    if (spendingChartInstance) {
        spendingChartInstance.destroy(); // Destroy previous instance if exists
    }
    spendingChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [], // Member names
            datasets: [{
                label: 'Net Balance (Owed+/Owes-)',
                data: [], // Corresponding balances
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}


function updateChart() {
    if (!spendingChartInstance || members.length === 0) {
        initializeChart(); // Ensure chart is initialized
        // If no members, chart will be empty, which is fine.
    }
    
    const balances = {};
     members.forEach(member => {
        balances[member] = 0;
    });

    expenses.forEach(expense => {
        if(members.includes(expense.payer)){ // Ensure payer is still a current member
             balances[expense.payer] += expense.amount;
        }
    });
    
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const sharePerMember = members.length > 0 ? totalExpenses / members.length : 0;

    const netBalances = members.map(member => {
        const spentByMember = expenses.filter(e => e.payer === member).reduce((sum, e) => sum + e.amount, 0);
        return spentByMember - sharePerMember;
    });

    const backgroundColors = netBalances.map(balance => balance >= 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)');
    const borderColors = netBalances.map(balance => balance >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)');

    spendingChartInstance.data.labels = members;
    spendingChartInstance.data.datasets[0].data = netBalances;
    spendingChartInstance.data.datasets[0].backgroundColor = backgroundColors;
    spendingChartInstance.data.datasets[0].borderColor = borderColors;
    spendingChartInstance.data.datasets[0].label = 'Net Balance (Paid - Share)';
    spendingChartInstance.update();
}
