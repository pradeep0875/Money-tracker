const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Ensure mongoose is required here
const Transaction = require('./models/Transaction.js');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json()); // Ensure the server can parse JSON request bodies

app.get('/api/test', (req, res) => {
    res.json('test ok3');
});

app.post('/api/transaction', async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const { name, description, datetime, price } = req.body;
        const transaction = await Transaction.create({ name, description, datetime, price });
        res.json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/transactions', async (req, res) => { // Corrected syntax error
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
