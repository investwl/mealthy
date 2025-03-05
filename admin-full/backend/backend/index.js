require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// 1. Get all foods
app.get("/foods", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM foods");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 2. Get a single food by ID
app.get("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM foods WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 3. Add a new food item
app.post("/foods", async (req, res) => {
  try {
    const { name, calories } = req.body;
    const result = await pool.query(
      "INSERT INTO foods (name, calories) VALUES ($1, $2) RETURNING *",
      [name, calories]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 4. Update a food item
app.put("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, calories } = req.body;
    await pool.query(
      "UPDATE foods SET name = $1, calories = $2 WHERE id = $3",
      [name, calories, id]
    );
    res.send("Food item updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// 5. Delete a food item
app.delete("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM foods WHERE id = $1", [id]);
    res.send("Food item deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
