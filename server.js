const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let expenses = []; // temporary storage

// Add new expense
app.post("/expense", (req, res) => {
  const { category, amount, date } = req.body;
  expenses.push({ category, amount, date });
  res.json({ message: "Expense added successfully!" });
});

// Get all expenses
app.get("/expenses", (req, res) => {
  res.json(expenses);
});

// Get summary by category
app.get("/summary", (req, res) => {
  const summary = {};
  expenses.forEach(exp => {
    summary[exp.category] = (summary[exp.category] || 0) + exp.amount;
  });
  res.json(summary);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});