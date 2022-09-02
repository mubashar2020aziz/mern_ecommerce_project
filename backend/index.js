const dotenv = require('dotenv').config({ path: './.env' });

const express = require('express');
const app = express();
const router = require('./routes/productRoutes');
const connection = require('./db/database');

const port = process.env.PORT;
app.use(express.json());
app.use('/', router);
connection();
app.listen(port, (req, res) => {
  console.log('server is running:' + port);
});
