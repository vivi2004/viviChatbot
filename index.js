var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatbot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema
const MessageSchema = new mongoose.Schema({
  userMessage: String,
  chatbotResponse: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

// Routes
app.get('/', function (req, res) {
  res.render('pages/index');
});

app.get('/about', function (req, res) {
  res.render('pages/about');
});

app.get('/contact', function (req, res) {
  res.render('pages/contact');
});

// Route to save messages
app.post('/messages', async (req, res) => {
  const { userMessage, chatbotResponse } = req.body;
  const message = new Message({ userMessage, chatbotResponse });
  await message.save();
  res.send(message);
});

// Route to get chatbot response
app.post('/get-response', async (req, res) => {
  const { userMessage } = req.body;
  const message = await Message.findOne({ userMessage: new RegExp(`^${userMessage}$`, 'i') });

  if (message) {
    res.send({ chatbotResponse: message.chatbotResponse });
  } else {
    res.send({ chatbotResponse: "I didn't understand that." });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is live on port ${port}!`);
}).on('error', (err) => {
  console.error(`Failed to start server: ${err}`);
});