const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { addMessage, getAllMessages } = require("./database");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/message", (request, response) => {
  const message = request.body;
  addMessage(message);
  response.status(200).send();
});

app.get("/messages", async (request, response) => {
  const messages = await getAllMessages();
  response.send(messages);
});

app.listen(PORT, () => console.log(`The app listening on port ${PORT}!`));
