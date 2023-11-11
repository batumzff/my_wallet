const formGelir = document.querySelector(".income-form");
const incomeValue = document.querySelector("#income");
const totalIncome = document.querySelector(".incomes--prices");
const formGider = document.querySelector(".expense-form");
const date = document.querySelector(".date");
const expenseValue = document.querySelector("#expense");
const expenseArea = document.querySelector(".area");
const mainTable = document.querySelector(".expenseTable");

const totalExpenses = document.querySelector(".expenses--prices");
const totalBudgets = document.querySelector(".budgets--prices");
let gelirler = 0;
let expenseArray = [];

formGelir.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(incomeValue.value);

  localStorage.setItem("gelirler", gelirler);
  formGelir.reset();
  calculateExpense();
});
window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler"));
  calculateExpense();
  expenseArray = JSON.parse(localStorage.getItem("expenses")) || [];
});

formGider.addEventListener("submit", (e) => {
  e.preventDefault();
  if (expenseArea.value && expenseValue.value) {
    const newRow = document.createElement("tr");
    const expenseDate = document.createElement("td");
    const expenseAlani = document.createElement("td");
    const expenseCount = document.createElement("td");
    const expenseProcess = document.createElement("td");

    expenseDate.textContent =
      date.value || `${new Date().toISOString().slice(0, 10)}`;
    expenseAlani.textContent = expenseArea.value;
    expenseCount.textContent = expenseValue.value;
    expenseProcess.textContent = "❌";
    expenseProcess.classList.add("erase");
    expenseProcess.style.cursor = "pointer";

    mainTable.lastElementChild.appendChild(newRow);
    newRow.appendChild(expenseDate);
    newRow.appendChild(expenseAlani);
    newRow.appendChild(expenseCount);
    newRow.appendChild(expenseProcess);

    const newHarcama = {
      date: date.value || `${new Date().toISOString().slice(0, 10)}`,
      alan: expenseArea.value,
      count: expenseValue.value,
    };
    expenseArray.push(newHarcama);
    localStorage.setItem("expenses", JSON.stringify(expenseArray));

    calculateExpense();

    formGider.reset();
  } else {
    alert("Lütfen verilen alanları doldurunuz!");
  }
});
let giderler = 0;
let kalan = 0;

const calculateExpense = () => {
  totalIncome.textContent = gelirler;

  giderler += Number(expenseValue.value);

  totalExpenses.textContent = giderler;
  kalan = gelirler - giderler;
  totalBudgets.textContent = kalan;
};

document.querySelector(".clear").addEventListener("click", (e) => {
  console.log(e.target);
  e.target.querySelector(
    ".expenseTable"
  ).lastElementChild.innerHTML = "";
  
  gelirler = 0;

  localStorage.clear();

  totalBudgets.textContent = "0.00";
  totalExpenses.textContent = "0.00";
  totalIncome.innerHTML = "0.00";
});

mainTable.addEventListener("click", (e) => {
  if ((e.target.classList.contains("erase") )) {
    e.target.parentNode.remove();
    giderler = giderler - Number(e.target.previousElementSibling.textContent);
    kalan = gelirler - giderler;

    calculateExpense();
  }
});
