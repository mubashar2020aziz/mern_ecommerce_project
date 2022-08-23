import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
const app = express();
import router from './routes/productRoutes.mjs';

const port = process.env.PORT;
app.use(express.json());
app.use('/', router);

app.listen(port, (req, res) => {
  console.log('server is running:' + port);
});
