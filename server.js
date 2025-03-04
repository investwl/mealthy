require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Ensure db.js exists
const app = express();
const PORT = process.env.PORT || 5000;

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

// Login endpoint
app.post("/api/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    // Replace with proper password hashing and comparison
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// Guest user endpoint
app.get("/api/guest", async (req, res, next) => {
  try {
      const result = await pool.query("SELECT * FROM users WHERE user_id = 0"); // Assuming guest user has user_id 0
      if (result.rows.length === 0) {
          return res.status(404).json({ message: "Guest user not found" });
      }
      const guestUser = result.rows[0];
      res.json({
          user_id: guestUser.user_id,
          email: guestUser.email,
          first_name: guestUser.first_name,
          last_name: guestUser.last_name,
          profile_picture: guestUser.profile_picture,
      });
  } catch (err) {
      console.error(err.message);
      next(err);
  }
});

// Registration endpoint
app.post("/api/register", async (req, res, next) => {
  const { email, password } = req.body;
  try {
      // Insert the new user into the database
      const result = await pool.query(
          "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id, email",
          [email, password]
      );

      if (result.rows.length === 0) {
          return res.status(500).json({ message: "Registration failed" });
      }

      // Send the user_id in the response
      const newUser = result.rows[0];
      res.json({
          user_id: newUser.user_id,  // Send the user_id
          message: "Registration successful"
      });

  } catch (err) {
      console.error(err.message);
      next(err);
  }
});


// // Get all foods from the database
// app.get("/foods", async (req, res, next) => {
//   try {
//     const result = await pool.query("SELECT * FROM foods");
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message); // biar keliatan di console errornya apa
//     next(err);
//   }
// });

// // Get a single food by ID
// app.get("/foods/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query("SELECT * FROM foods WHERE id = $1", [id]);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message); // biar keliatan di console errornya apa
//     next(err);
//   }
// });

// // Add a new food item
// app.post("/foods", async (req, res) => {
//   try {
//     const { name, calories } = req.body;
//     const result = await pool.query(
//       "INSERT INTO foods (name, calories) VALUES ($1, $2) RETURNING *",
//       [name, calories]
//     );
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message); // biar keliatan di console errornya apa
//     next(err);
//   }
// });

// // Update a food item
// app.put("/foods/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, calories } = req.body;
//     await pool.query(
//       "UPDATE foods SET name = $1, calories = $2 WHERE id = $3",
//       [name, calories, id]
//     );
//     res.send("Food item updated successfully");
//   } catch (err) {
//     console.error(err.message); // biar keliatan di console errornya apa
//     next(err);
//   }
// });

// Get all foods from the database
app.get("/api/foods", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM foods ORDER BY name ASC"); // Order by name for easier searching
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// Get a single food by NAME
app.get("/api/foods/name/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const result = await pool.query("SELECT * FROM foods WHERE name = $1", [name]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// // Delete a food item
// app.delete("/foods/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await pool.query("DELETE FROM foods WHERE id = $1", [id]);
//     res.send("Food item deleted");
//   } catch (err) {
//     console.error(err.message); // biar keliatan di console errornya apa
//     next(err);
//   }
// });

// Add a new route to handle adding a calorie log entry
app.post("/api/calorie_log", async (req, res, next) => {
  const { user_id, food_id, serving_size, log_date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO calorie_log (user_id, food_id, serving_size, log_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, food_id, serving_size, log_date]
    );
    res.json(result.rows[0]); // return the added calorie log entry
  } catch (err) {
    console.error("Error adding calorie log entry:", err.message);
    next(err); // pass errors to the global error handler
  }
});

// Get calorie log entries for a specific user
app.get("/api/calorie_log", async (req, res, next) => {
  const { user_id } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM calorie_log WHERE user_id = $1 ORDER BY log_date DESC", // Order by date, newest first
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching calorie log entries:", err.message);
    next(err);
  }
});

// Add a new route to handle adding a meal to the meal planner
app.post("/meal_planner", async (req, res, next) => {
  const { user_id, food_id, recipe_id, meal_time, meal_date } = req.body;

  // If both food_id and recipe_id are provided, we can prioritize the recipe_id (just for simplicity)
  if (food_id && recipe_id) {
    return res.status(400).send("Please provide either a food_id or a recipe_id, not both.");
  }

  try {
    // Check if an entry already exists for the given date and meal time
    const existingEntry = await pool.query(
      "SELECT * FROM meal_planner WHERE user_id = $1 AND meal_time = $2 AND meal_date = $3",
      [user_id, meal_time, meal_date]
    );

    if (existingEntry.rows.length > 0) {
      return res.status(400).send("A meal is already planned for this date and time.");
    }

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

// Add a new route to fetch meal plans based on the selected date
app.get("/meal_planner", async (req, res, next) => {
  const { user_id, meal_date } = req.query;
  console.log("Fetching meal plans for user:", user_id, "on date:", meal_date); // Add this line for debugging
  try {
    const result = await pool.query(
      `SELECT mp.*, r.image_url, r.title
       FROM meal_planner mp
       LEFT JOIN recipes r ON mp.recipe_id = r.recipe_id
       WHERE mp.user_id = $1 AND mp.meal_date = $2`,
      [user_id, meal_date]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching meal plans:", err.message);
    next(err);
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


// for recipes
app.get("/api/recipes", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM recipes ORDER by recipe_id ASC;");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message); // biar keliatan di console errornya apa
    next(err);
  }
});

app.get("/api/recipes/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM recipes WHERE recipe_id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// Add a new route to check if a recipe is bookmarked
app.get("/favorite_recipes/check", async (req, res, next) => {
  const { user_id, recipe_id } = req.query;
  try {
    const result = await pool.query(
      "SELECT * FROM favorite_recipes WHERE user_id = $1 AND recipe_id = $2",
      [user_id, recipe_id]
    );
    res.json({ isBookmarked: result.rows.length > 0 });
  } catch (err) {
    console.error("Error checking bookmark:", err.message);
    next(err);
  }
});

// Add a new route to handle bookmarking a recipe
app.post("/favorite_recipes", async (req, res, next) => {
  const { user_id, recipe_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO favorite_recipes (user_id, recipe_id) VALUES ($1, $2) RETURNING *",
      [user_id, recipe_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error bookmarking recipe:", err.message);
    next(err);
  }
});

// Add a new route to fetch bookmarked recipes
app.get("/favorite_recipes", async (req, res, next) => {
  const { user_id } = req.query;
  console.log("Fetching bookmarked recipes for user:", user_id); // Add this line
  try {
    const result = await pool.query(
      "SELECT recipes.* FROM favorite_recipes JOIN recipes ON favorite_recipes.recipe_id = recipes.recipe_id WHERE favorite_recipes.user_id = $1",
      [user_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching bookmarked recipes:", err.message);
    next(err);
  }
});

// Add a new route to delete a bookmarked recipe
app.delete("/favorite_recipes", async (req, res, next) => {
  const { user_id, recipe_id } = req.body;
  try {
    const result = await pool.query(
      "DELETE FROM favorite_recipes WHERE user_id = $1 AND recipe_id = $2",
      [user_id, recipe_id]
    );
    res.json({ success: result.rowCount > 0 });
  } catch (err) {
    console.error("Error deleting bookmark:", err.message);
    next(err);
  }
});

// ini refers ke page kalo mau cek website up ato nggak pas masuk ke ngrok_url
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Global error handler (before app.listen)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

app.use(cors({ origin: '*' })); // Allow all origins for development

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

