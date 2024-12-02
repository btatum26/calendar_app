const express = require('express');
const cors = require('cors');
const canvas = require('./routes/canvasAPI.js')

// Set the web server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.get('/', (req, res) => res.send('<h1>MERN Example 2: Server</h1>')); // Home web page

app.use('/api', canvas)

module.exports = app;
