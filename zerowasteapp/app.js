const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect to Database
mongoose.connect(config.database, { useNewUrlParser: true , useUnifiedTopology: true, useFindAndModify: false });

// On Connection
mongoose.connection.on('connected', () => {
    console.log(`Connected to ${config.name} database`);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
});

const app = express();

const users = require('./routes/users');
<<<<<<< HEAD
const categories = require('./routes/categories');
=======
// const categories = require('./routes/categories');
>>>>>>> 83353720f7f792dd43f6ada05b515ff8c1fa8115

// Port Number
const port = 3000;

// Cors Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Password Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
<<<<<<< HEAD
app.use('/categories', categories);
=======
// app.use('/categories', categories);
>>>>>>> 83353720f7f792dd43f6ada05b515ff8c1fa8115

// Index Route
app.get('/', (req, res) => {
    res.send("Invalid Endpoint")
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port ' +port);
});