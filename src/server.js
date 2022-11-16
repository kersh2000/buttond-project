require('./db/connection');
const express = require('express');
const userRouter = require('./routes/user');

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('public'));

app.use('/user', userRouter);

app.get('/', async (req, res) => {
  res.status(200).send('Homepage.');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});