const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.API_PORT || 8888;
const expressjwt = require('express-jwt');

const jwtCheck = expressjwt({
  secret: "mykey"
});


app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Serving is running on port ${PORT}.`);
});
// anyone can see this route, as its public
app.get('/asset', (req, res) => {
  res.status(200).send("Everybody can see this");
});

//checking to see if signature that was provided to user after providing credentials matches
app.get("/asset/secret", jwtCheck, (req, res) => {
  res.status(200).send(`Only logged in people can see me !`);
});
//catchall route
app.get("*", (req, res)=> {
  res.sendStatus(404);
});
