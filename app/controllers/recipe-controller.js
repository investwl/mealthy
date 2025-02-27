const pool = require("../db");

// GET all recipes
exports.getAllRecipes = async (req, res, next) => {
    try {
      const query = "SELECT * FROM recipes";
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      next(error);
    }
  };
  
// GET a single recipe by recipe_id
exports.getRecipeById = async (req, res, next) => {
try {
    const { recipe_id } = req.params;
    const query = "SELECT * FROM recipes WHERE recipe_id = $1";
    const result = await pool.query(query, [recipe_id]);
    if (result.rows.length === 0) {
    return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(result.rows[0]);
} catch (error) {
    next(error);
}
};

// POST a new recipe
exports.createRecipe = async (req, res, next) => {
try {
    const { title, description, ingredients, instructions, image_url, calories } = req.body;
    const query = `
    INSERT INTO recipes (title, description, ingredients, instructions, image_url, calories)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;
    const result = await pool.query(query, [title, description, ingredients, instructions, image_url, calories]);
    res.status(201).json(result.rows[0]);
} catch (error) {
    next(error);
}
};

// PUT update an existing recipe
exports.updateRecipe = async (req, res, next) => {
try {
    const { recipe_id } = req.params;
    const { title, description, ingredients, instructions, image_url, calories } = req.body;
    const query = `
    UPDATE recipes
    SET title = $1, description = $2, ingredients = $3, instructions = $4, image_url = $5, calories = $6
    WHERE recipe_id = $7
    RETURNING *
    `;
    const result = await pool.query(query, [title, description, ingredients, instructions, image_url, calories, recipe_id]);
    if (result.rows.length === 0) {
    return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(result.rows[0]);
} catch (error) {
    next(error);
}
};

// DELETE a recipe
exports.deleteRecipe = async (req, res, next) => {
try {
    const { recipe_id } = req.params;
    const query = "DELETE FROM recipes WHERE recipe_id = $1 RETURNING *";
    const result = await pool.query(query, [recipe_id]);
    if (result.rows.length === 0) {
    return res.status(404).json({ message: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
} catch (error) {
    next(error);
}
};