const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Config
require('dotenv').config();

// initialize express
const app = express();

// port
const port = process.env.PORT || 3006;

// cors different browser
app.use(cors());
app.use(express.json());

//mongo db connection
const uri = process.env.atlasUri
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// check connection
const connections = mongoose.connection;
connections.once('open', () => {
    console.log('Mongodb connected successfully');
});

// routes
const userRoutes = require('./routes/users');
const exerciseRoutes = require('./routes/exercises');

// request route from front end
app.use('/exercises',exerciseRoutes);
app.use('/users', userRoutes);

// backend init
app.listen(port, (req, res) => {
    console.log(`listening on http://localhost:${port}`);
});
