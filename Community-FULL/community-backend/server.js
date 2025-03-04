// community-backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { Post, Comment, User, Like, Report } = require('./models');

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:8081', // Sesuaikan dengan URL frontend kamu
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'), false);
        }
    },
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// POST endpoint (untuk membuat postingan baru)
app.post('/posts', upload.array('images', 4), async (req, res) => {
    console.log("req.body sebelum multer:", req.body);
    console.log("req.files:", req.files);

    const { text, recipe, userId } = req.body;
    let images = [];

    if (req.files && req.files.length > 0) {
        images = req.files.map(file => `/images/${file.filename}`);
    } else if (req.body.images && Array.isArray(req.body.images) && req.body.images.length > 0) {
        for (const dataUrl of req.body.images) {
            try {
                const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
                if (!matches || matches.length !== 3) {
                    console.error("Invalid data URL:", dataUrl);
                    continue;
                }
                const imageType = matches[1];
                const base64Data = matches[2];
                if (!['image/jpeg', 'image/png', 'image/gif'].includes(imageType)) {
                    console.error("Invalid image type from base64:", imageType);
                    continue;
                }
                const buffer = Buffer.from(base64Data, 'base64');
                const filename = `image-${Date.now()}-${Math.round(Math.random() * 1E9)}.${imageType.split('/')[1]}`;
                const filepath = path.join(__dirname, 'public/images', filename);
                await fs.writeFile(filepath, buffer);
                images.push(`/images/${filename}`);
            } catch (err) {
                console.error("Gagal menyimpan base64 image:", err);
            }
        }
    } else {
        console.log("Tidak ada gambar yang diunggah.");
    }

    if (!text && images.length === 0 && !recipe) {
        return res.status(400).json({ message: 'Posting kosong tidak diizinkan.' });
    }

    try {
        let parsedRecipe = null;
        if (recipe) {
            try {
                parsedRecipe = typeof recipe === 'string' ? JSON.parse(recipe) : recipe;
                if (typeof parsedRecipe.title !== "string" || parsedRecipe.title.trim() === "") {
                    return res.status(400).json({ message: 'Judul resep diperlukan.' });
                }
            } catch (parseError) {
                console.error("Error parsing recipe:", parseError);
                return res.status(400).json({ message: 'Invalid recipe data.' });
            }
        }

        const newPost = await Post.create({
            text,
            images: JSON.stringify(images),
            recipe: parsedRecipe,
            userId, //  Menyimpan userId ke database
        });

        console.log("Post baru dibuat:", newPost.toJSON());
        res.status(201).json(newPost);

    } catch (createError) {
        console.error("Error saat membuat post:", createError);
        res.status(500).json({ message: 'Gagal membuat post', error: createError.message });
    }
});


// GET endpoint (untuk mengambil semua postingan)
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll({
            order: [['createdAt', 'DESC']],
            include: [{ model: User, as: 'user', attributes: ['id','username', 'firstName', 'lastName', 'profileImage'] }], //  Sertakan data user
        });
        res.json(posts);
    } catch (error) {
        console.error("Gagal mengambil postingan:", error);
        res.status(500).json({ message: 'Gagal mengambil postingan', error: error.message });
    }
});

// GET endpoint (untuk mengambil semua komentar untuk postingan tertentu)
app.get('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.findAll({
            where: { postId: postId },
            include: [{ model: User, as: 'user', attributes: ['id','username', 'firstName', 'lastName', 'profileImage'] }], // Sertakan informasi user
            order: [['createdAt', 'DESC']],
        });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
    }
});

// POST endpoint (untuk membuat komentar baru)
app.post('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: 'userId required' });
    }

    if (!text) {
        return res.status(400).json({ message: 'Comment text is required.' });
    }

    try {
        const newComment = await Comment.create({
            text,
            postId,
            userId,
        });
        // Sertakan informasi user saat merespons
        const commentWithUser = await Comment.findByPk(newComment.id, {
            include: [{ model: User, as: 'user', attributes: ['id','username', 'firstName', 'lastName', 'profileImage'] }],
        });

        res.status(201).json(commentWithUser);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Failed to create comment', error: error.message });
    }
});

// GET endpoint untuk mengecek status like user pada post
app.get('/posts/:postId/like/status', async (req, res) => {
    const { postId } = req.params;
    const userId = req.query.userId;  //  Menggunakan req.query

    if (!userId) {
        return res.status(400).json({ message: "userId required" });
    }

    try {
        const existingLike = await Like.findOne({
            where: {
                postId: postId,
                userId: userId,
            },
        });

        res.status(200).json({ liked: !!existingLike });
    } catch (error) {
        console.error('Error checking like status:', error);
        res.status(500).json({ message: 'Failed to check like status', error: error.message });
    }
});

// endpoint untuk menampilkan jumlah like
app.get('/posts/:postId/likes', async (req, res) => {
    const { postId } = req.params;

    try {
      const likeCount = await Like.count({
        where: { postId },
      });

      res.status(200).json({ count: likeCount });
    } catch (error) {
      console.error('Error fetching like count:', error);
      res.status(500).json({ message: 'Failed to fetch like count', error: error.message });
    }
  });

// Like/Unlike a post
app.post('/posts/:postId/like', async (req, res) => {
    const { postId } = req.params;
    const userId = req.body.userId;

    if (!userId) {
        return res.status(400).json({ message: "userId required" });
    }

    try {
        const existingLike = await Like.findOne({
            where: {
                postId: postId,
                userId: userId,
            },
        });

        if (existingLike) {
            await existingLike.destroy();
            res.status(200).json({ message: 'Like removed', liked: false });
        } else {
            await Like.create({
                postId: postId,
                userId: userId,
            });
            res.status(201).json({ message: 'Like added', liked: true });
        }
    } catch (error) {
        console.error('Error liking/unliking post:', error);
        res.status(500).json({ message: 'Failed to like/unlike post', error: error.message });
    }
});

// GET endpoint untuk mengambil data user berdasarkan ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params; // Ambil ID dari route parameter

  try {
      const user = await User.findByPk(id, {
          attributes: ['id', 'username', 'firstName', 'lastName', 'profileImage'], // Pilih kolom yang ingin diambil
      });

      if (!user) {
          return res.status(404).json({ message: 'User not found' }); // Jika user tidak ditemukan
      }

      res.json(user); // Kirim data user sebagai JSON
  } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Failed to fetch user', error: error.message });
  }
});

app.post('/reports', async (req, res) => {
  const { postId, reason, userId, reportedUserId } = req.body; //  <--  Hapus commentId

  // Validasi: Pastikan userId ada
  if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
  }
    if (!reportedUserId) {
        return res.status(400).json({ message: 'reportedUserId is required' });
    }

  // Validasi: Pastikan postId ada.
  if (!postId) { //  <--  Sekarang hanya perlu cek postId
    return res.status(400).json({ message: 'postId is required' });
  }

  // Validasi: Pastikan reason ada dan tidak kosong
  if (!reason) {
      return res.status(400).json({ message: 'reason is required' });
  }

    // Validasi tambahan untuk reason jika pakai ENUM (optional, tapi direkomendasikan):
    // if (reason && !['spam', 'inappropriate', 'hate_speech', 'misinformation', 'other'].includes(reason)) {
    //     return res.status(400).json({ message: 'Invalid reason' });
    // }

  try {
    //  Ambil reportedUserId dari data postingan (jika ada)

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const reportedUserId = post.userId;

    const newReport = await Report.create({
      postId,
      // commentId,  <--  HAPUS INI
      userId,
      reportedUserId,
      reason,
      // status: 'pending',
    });

    res.status(201).json(newReport);

  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Failed to create report', error: error.message });
  }
});
// ...

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});