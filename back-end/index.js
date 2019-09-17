const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const messages = []; // { user: '', message: '' }

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/message", (request, response) => {
  const message = request.body;
  console.log(message);
  messages.push({
    ...message,
    time: new Date().toLocaleString()
  });
  response.status(200).send();
});

app.get("/messages", (request, response) => {
  response.send(messages);
});

app.listen(PORT, () => console.log(`The app listening on port ${PORT}!`));
