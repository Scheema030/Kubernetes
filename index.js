const express = require('express');
const mysql = require('mysql2');
const mongoose = require('mongoose');

const app = express();

// MySQL connection
const mysqlConnection = mysql.createConnection({
    host: 'mysql-container',
    user: 'root',
    password: 'root',
    database: 'testdb'
});

mysqlConnection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// MongoDB connection
mongoose.connect('mongodb://mongodb-container:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Express route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
