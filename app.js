const express = require('express');
const { Pool } = require('pg');
const usersRouter = require('./routes/users');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'my_database',
  password: '',
  port: 5000,
});

app.use(express.json());
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
