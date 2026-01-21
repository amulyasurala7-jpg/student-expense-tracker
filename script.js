document.getElementById("expenseForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;

  await fetch("http://localhost:3000/expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, amount, date })
  });

  loadExpenses();
  loadSummary();
});

async function loadExpenses() {
  const res = await fetch("http://localhost:3000/expenses");
  const data = await res.json();
  const list = document.getElementById("expenseList");
  list.innerHTML = "";
  data.forEach(exp => {
    const li = document.createElement("li");
    li.textContent = `${exp.category} - ₹${exp.amount} on ${exp.date}`;
    list.appendChild(li);
  });
}

async function loadSummary() {
  const res = await fetch("http://localhost:3000/summary");
  const data = await res.json();
  const list = document.getElementById("summaryList");
  list.innerHTML = "";
  for (let cat in data) {
    const li = document.createElement("li");
    li.textContent = `${cat}: ₹${data[cat]}`;
    list.appendChild(li);
  }
}

loadExpenses();
loadSummary();