const express = require('express');
const argon2 = require('argon2');
const randomBytes = require('randombytes');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const { Admin } = require('./models/admin');

const app = express();
const port = 4000;

const secret = process.env.JWT_SECRET;
//const isAuthenticated = expressJWT({ secret }); 




//makes possible post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

//login funciton plus authentication function
app.post('/api/v1/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const { token } = await authenticate({ name, password });
    return (res.send({ token }));
  } catch (err) {
    return (res.status(401).send(err));
  }
});

const authenticate = async ({ name, password }) => {
  const user = await Admin.findOne({ where: { name } });
  if (!user) {
    throw new Error('User not found.');
  }
  const isPasswordCorrect = await argon2.verify(user.password, password);
  if (!isPasswordCorrect) {
    throw new Error('Wrong password.');
  }
  const payload = {
    id: user.id,
  };
  return {
    token: jwt.sign(payload, secret, { expiresIn: '12h' }),
  };
};



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
