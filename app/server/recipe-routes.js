const express = require("express");
const router = express.Router();
const pool = require("./db"); // Uses your db.js connection
const recipeController = require("../controllers/recipe-controller");

router.get("/recipes", recipeController.getAllRecipes);
router.get("/recipes/:recipe_id", recipeController.getRecipeById);
router.post("/recipes", recipeController.createRecipe);
router.put("/recipes/:recipe_id", recipeController.updateRecipe);
router.delete("/recipes/:recipe_id", recipeController.deleteRecipe);


module.exports = router;

// code dibawah ini kalau ga pakai controller


// // GET /api/recipes - Retrieve all recipes
// router.get("/recipes", async (req, res, next) => {
//   try {
//     const query = "SELECT * FROM recipes";
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (error) {
//     next(error);
//   }
// });

// // GET /api/recipes/:recipe_id - Retrieve a single recipe by its ID
// router.get("/recipes/:recipe_id", async (req, res, next) => {
//   try {
//     const { recipe_id } = req.params;
//     const query = "SELECT * FROM recipes WHERE recipe_id = $1";
//     const result = await pool.query(query, [recipe_id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// });

// // POST /api/recipes - Create a new recipe
// router.post("/recipes", async (req, res, next) => {
//   try {
//     const { title, description, ingredients, instructions, image_url, calories } = req.body;
//     const query = `
//       INSERT INTO recipes (title, description, ingredients, instructions, image_url, calories)
//       VALUES ($1, $2, $3, $4, $5, $6)
//       RETURNING *
//     `;
//     const result = await pool.query(query, [title, description, ingredients, instructions, image_url, calories]);
//     res.status(201).json(result.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// });

// // PUT /api/recipes/:recipe_id - Update an existing recipe
// router.put("/recipes/:recipe_id", async (req, res, next) => {
//   try {
//     const { recipe_id } = req.params;
//     const { title, description, ingredients, instructions, image_url, calories } = req.body;
//     const query = `
//       UPDATE recipes
//       SET title = $1, description = $2, ingredients = $3, instructions = $4, image_url = $5, calories = $6
//       WHERE recipe_id = $7
//       RETURNING *
//     `;
//     const result = await pool.query(query, [title, description, ingredients, instructions, image_url, calories, recipe_id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }
//     res.json(result.rows[0]);
//   } catch (error) {
//     next(error);
//   }
// });

// // DELETE /api/recipes/:recipe_id - Delete a recipe
// router.delete("/recipes/:recipe_id", async (req, res, next) => {
//   try {
//     const { recipe_id } = req.params;
//     const query = "DELETE FROM recipes WHERE recipe_id = $1 RETURNING *";
//     const result = await pool.query(query, [recipe_id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }
//     res.json({ message: "Recipe deleted successfully" });
//   } catch (error) {
//     next(error);
//   }
// });

