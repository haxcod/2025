require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./DB'); // Renamed for clarity
const bankRoutes = require('./routes/bank.routes');
const transactionsRoutes = require('./routes/transaction.routes');
const commentRoutes = require('./routes/comment.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes')
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Built-in body-parser for JSON
app.use(express.urlencoded({ extended: true })); // Built-in body-parser for URL-encoded data
app.use(cors());

// API Routes
bankRoutes(app);
transactionsRoutes(app)
commentRoutes(app)
productRoutes(app)
userRoutes(app)

// Static Files
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err.message || err);
        process.exit(1); // Exit with failure
    }
};

startServer();
