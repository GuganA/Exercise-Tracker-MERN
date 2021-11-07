const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Config
require('dotenv').config();

// initialize express
const app = express();

// port
const port = process.env.PORT || 3006;

app.use(cors());
app.use(express.json());

//mongo db
const uri = process.env.atlasUri
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connections = mongoose.connection;
connections.once('open', () => {
    console.log('Mongodb connected successfully');
});

// routes
const userRoutes = require('./routes/users');
const exerciseRoutes = require('./routes/exercises');

app.use('/exercises',exerciseRoutes);
app.use('/users', userRoutes);

app.listen(port, (req, res) => {
    console.log(`listening on http://localhost:${port}`);
});