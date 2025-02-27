require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Ensure db.js exists
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Get all users from the database
app.get("/users", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err); // pass errors to the global error handler
  }
});

// Insert a new user into the database
app.post("/users", async (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, password, first_name, last_name]
    );
    res.json(result.rows[0]); // return the inserted user
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err); // pass errors to the global error handler
  }
});

// Get all foods from the database
app.get("/foods", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM foods");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err);
  }
});

// Get a single food by ID
app.get("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM foods WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err);
  }
});

// Add a new food item
app.post("/foods", async (req, res) => {
  try {
    const { name, calories } = req.body;
    const result = await pool.query(
      "INSERT INTO foods (name, calories) VALUES ($1, $2) RETURNING *",
      [name, calories]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err);
  }
});

// Update a food item
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
    console.error(err.message); // biar keliatan di console errornya apa
    next(err);
  }
});

// Delete a food item
app.delete("/foods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM foods WHERE id = $1", [id]);
    res.send("Food item deleted");
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err);
  }
});

// **Meal Planner**: Add a meal (either a recipe or individual foods)
app.post("/meal_planner", async (req, res, next) => {
  const { user_id, food_id, recipe_id, meal_time, meal_date } = req.body;

  // If both food_id and recipe_id are provided, we can prioritize the recipe_id (just for simplicity)
  if (food_id && recipe_id) {
    return res.status(400).send("Please provide either a food_id or a recipe_id, not both.");
  }

  try {
    if (food_id) {
      // Add individual food to the meal planner
      const result = await pool.query(
        "INSERT INTO meal_planner (user_id, food_id, meal_time, meal_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, food_id, meal_time, meal_date]
      );
      res.json(result.rows[0]); // return the added food meal planner entry
    } else if (recipe_id) {
      // Add entire recipe to the meal planner
      const result = await pool.query(
        "INSERT INTO meal_planner (user_id, recipe_id, meal_time, meal_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [user_id, recipe_id, meal_time, meal_date]
      );
      res.json(result.rows[0]); // return the added recipe meal planner entry
    } else {
      res.status(400).send("Please provide either a food_id or a recipe_id.");
    }
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err); // pass errors to the global error handler
  }
});

// **Post Comments**: Add a comment to a post
app.post("/post_comments", async (req, res, next) => {
  const { user_id, post_id, comment_text } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO post_comments (user_id, post_id, comment_text) VALUES ($1, $2, $3) RETURNING *",
      [user_id, post_id, comment_text]
    );
    res.json(result.rows[0]); // return the added comment
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err); // pass errors to the global error handler
  }
});

// **Post Likes**: Add a like to a post
app.post("/post_likes", async (req, res, next) => {
  const { user_id, post_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO post_likes (user_id, post_id) VALUES ($1, $2) RETURNING *",
      [user_id, post_id]
    );
    res.json(result.rows[0]); // return the added like
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err); // pass errors to the global error handler
  }
});

// **Community Posts**: Add a new post
app.post("/community_posts", async (req, res, next) => {
  const { user_id, title, description, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO community_posts (user_id, title, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, title, description, image_url]
    );
    res.json(result.rows[0]); // return the added post
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err); // pass errors to the global error handler
  }
});

// **Meal Planner**: Fetch meals from the meal planner
app.get("/meal_planner", async (req, res, next) => {
  const { user_id } = req.query; // Assume the query parameter is user_id to fetch their meal plan
  try {
    const result = await pool.query(
      "SELECT * FROM meal_planner WHERE user_id = $1",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err); // pass errors to the global error handler
  }
});

// for recipes
app.get("/recipes", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err);
  }
});

// Global error handler (before app.listen)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const pool = require("./db"); // Ensure db.js exists
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Fetch all recipes from the database
// app.get("/api/recipes", async (req, res, next) => {
//   try {
//     const result = await pool.query("SELECT * FROM recipes");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     next(err);
//   }
// });

// // Global error handler (before app.listen)
// app.use((err, req, res, next) => {
//   console.error("Unhandled Error:", err.stack);
//   res.status(500).send("Something went wrong!");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });