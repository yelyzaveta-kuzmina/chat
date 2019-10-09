const mongoose = require("mongoose");

const MONGO_URL = "mongodb://localhost:27017/chat";

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

var messageSchema = new mongoose.Schema({
  message: String,
  userName: String,
  key: String
});

const MessageModel = mongoose.model("Message", messageSchema);

const getAllMessages = async () => {
  const messages = await MessageModel.find();
  return messages;
};

const addMessage = async message => {
  return new MessageModel(message).save();
};

module.exports = {
  getAllMessages,
  addMessage
};
