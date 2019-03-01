const express = require('express');
const app = express()
const PORT = 8888;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const users = [
  {id: 1, username: "clarkKent", password: "superman"},
  {id: 2, username: "bruceWayne", password: "batman"}
];

app.use(bodyParser.json());

app.use(cors);

app.get('/time', ((req, res) => {
  const time = (new Date()).toLocaleTimeString();
  res.status(200).send(`The Time is ${time}`);
}));

app.get('*', ((req, res) => {
  res.sendStatus(404);
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Error. Please enter correct username or password");
    return;
  }

  const user = users.find((u) => {
    return u.username === req.body.username && u.password === req.body.password;
  })

  const token = jwt.sign({
    sub: user.id,
    username: user.username
  }, "mykey", {expiresIn: "3 hours"});

  res.status(200).send({access_token: token})
  })
