// Get elements from the DOM
const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalAmountElement = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Current expense index for updating
let editingIndex = -1;

// Display expenses and total amount
function displayExpenses() {
    expenseList.innerHTML = '';
    let totalAmount = 0;

    expenses.forEach((expense, index) => {
        totalAmount += expense.amount;

        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - ${expense.amount} (${expense.category})
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });

    totalAmountElement.textContent = totalAmount;
}

// Add or Update an expense
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newExpense = {
        name: expenseName.value,
        amount: parseFloat(expenseAmount.value),
        category: expenseCategory.value,
    };

    if (editingIndex === -1) {
        // Add new expense
        expenses.push(newExpense);
    } else {
        // Update existing expense
        expenses[editingIndex] = newExpense;
        editingIndex = -1;  // Reset the index
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Reset form fields
    expenseName.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Food';

    // Update displayed expenses
    displayExpenses();
});

// Edit expense
function editExpense(index) {
    const expense = expenses[index];
    expenseName.value = expense.name;
    expenseAmount.value = expense.amount;
    expenseCategory.value = expense.category;

    // Set the editing index
    editingIndex = index;

    // Change form button text
    expenseForm.querySelector('button').textContent = 'Update Expense';
}

// Delete expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Initial display of expenses
displayExpenses();
