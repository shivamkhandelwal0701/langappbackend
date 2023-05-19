const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/langappdatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('mongodb connected successfully')
}).catch((err) => {
  console.log('connection failed', err)
});

app.use('/signup', signupRoute);
app.use('/login', loginRoute);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
