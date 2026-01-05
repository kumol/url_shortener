const mongoose = require('mongoose');
let connection = mongoose.connect(process.env.DB_URL);

connection.finally(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

module.exports = connection;