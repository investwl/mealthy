require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const pool = require("./db"); // Ensure db.js exists
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form data

// Get all users from the database
app.get("/users", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    next(err); // pass errors to the global error handler
  }
});


// Get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recipes');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching recipes');
  }
});

// POST (create) a new recipe
app.post('/api/Recipes', async (req, res) => {
  try {
    let { title, ingredients, instructions, calories, protein, fat, carbs, image } = req.body;

    if (!title || !ingredients || !instructions || !calories || !protein || !fat || !carbs || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (
      typeof calories !== 'number' ||
      typeof protein !== 'number' ||
      typeof fat !== 'number' ||
      typeof carbs !== 'number'
    ) {
      return res.status(400).json({ error: 'Calories, protein, fat, and carbs must be numbers' });
    }

    // Sanitize input
    title = escapeHtml(title.trim());
    ingredients = escapeHtml(ingredients.trim());
    instructions = escapeHtml(instructions.trim());
    image = escapeHtml(image.trim());

    const { rows } = await pool.query(
      'INSERT INTO "Recipes" (title, ingredients, instructions, calories, protein, fat, carbs, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, ingredients, instructions, calories, protein, fat, carbs, image]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// PUT (update) an existing recipe
app.put('/api/Recipes/:id', async (req, res) => {
  try {
    let { id } = req.params; //id jangan di escape
    let { title, ingredients, instructions, calories, protein, fat, carbs, image } = req.body;

    if (!title || !ingredients || !instructions || !calories || !protein || !fat || !carbs || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (
      typeof calories !== 'number' ||
      typeof protein !== 'number' ||
      typeof fat !== 'number' ||
      typeof carbs !== 'number'
    ) {
      return res.status(400).json({ error: 'Calories, protein, fat, and carbs must be numbers' });
    }
      // Sanitize input
    title = escapeHtml(title.trim());
    ingredients = escapeHtml(ingredients.trim());
    instructions = escapeHtml(instructions.trim());
    image = escapeHtml(image.trim());


    const { rows } = await pool.query(
      'UPDATE "Recipes" SET title = $1, ingredients = $2, instructions = $3, calories = $4, protein = $5, fat = $6, carbs = $7, image = $8 WHERE id = $9 RETURNING *',
      [title, ingredients, instructions, calories, protein, fat, carbs, image, id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});



// Delete a recipe
app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM recipes WHERE recipe_id = $1', [id]);
    res.status(200).send('Recipe deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting recipe');
  }
});

// GET all nutrition items
app.get('/nutritions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM nutritions');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST new nutrition item
app.post('/nutritions', async (req, res) => {
  const { title, image, description, list, tip } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO nutritions (title, image, description, list, tip) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, image, description, list, tip]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE nutrition item
app.delete('/nutritions/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM nutritions WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Nutrition not found' });
    }
    res.json({ message: 'Nutrition deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});







// Get all reports
app.get('/reports', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reports');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Get specific report details by ID
// Endpoint to get report details by report ID
app.get('/reports/:id', async (req, res) => {
  const reportId = req.params.id;

  try {
    // Fetch the report and its associated post details
    const result = await pool.query(`
      SELECT reports.id, reports.reporteduserid, reports.reason, reports.status, community_posts.title, community_posts.text, community_posts.image_url
      FROM reports
      JOIN community_posts ON reports.postid = community_posts.post_id
      WHERE reports.id = $1
    `, [reportId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Report not found' });
    }
  } catch (err) {
    console.error('Error fetching report details:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update report status (Mark as Invalid, Resolved, etc.)
app.put('/reports/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedAt = new Date();
  try {
    await pool.query('UPDATE public.reports SET status = $1, updatedat = $2 WHERE id = $3', [status, updatedAt, id]);
    res.status(200).send('Report updated');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Delete a report (resolved post)
app.delete('/reports/:id', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect(); // Use a client from the pool to handle the transaction
  
  try {
    // Start a transaction
    await client.query('BEGIN');

    // Delete the report
    await client.query('DELETE FROM public.reports WHERE id = $1', [id]);

    // Delete the associated post
    await client.query('DELETE FROM public.community_posts WHERE post_id = $1', [id]);

    // Commit the transaction
    await client.query('COMMIT');

    res.status(200).send('Report and associated post deleted');
  } catch (error) {
    // Rollback the transaction in case of error
    await client.query('ROLLBACK');
    console.error(error);
    res.status(500).send('Server Error');
  } finally {
    // Release the client back to the pool
    client.release();
  }
});



// Get all allergy data
app.get('/allergies', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM allergies');
      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error fetching data', error);
      res.status(500).send('Server error');
  }
});


// Update allergy data
app.put('/allergies/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
      await pool.query('UPDATE allergies SET name = $1 WHERE allergy_id = $2', [name, id]);
      res.status(200).send('Data updated successfully');
  } catch (error) {
      console.error('Error updating data', error);
      res.status(500).send('Server error');
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
