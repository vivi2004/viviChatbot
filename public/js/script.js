var sendBtn = document.getElementById('sendBtn');
var textbox = document.getElementById('textbox');
var chatContainer = document.getElementById('chatContainer');

var arrayofPossibleMessage = [
  { message: "hi", response: "Hello dear!" },
  { message: "how are you", response: "I am great!" },
  { message: "what is your name", response: "I am a Chatbot." },
  { message: "who made you", response: "The name Vivi made me." },
  {
    message: "How do I make a chocolate cake?",
    response: "To make a chocolate cake, you'll need flour, sugar, cocoa powder, baking powder, eggs, milk, and butter. Mix the ingredients, bake at 350°F (175°C) for 30-35 minutes."
  },
  {
    message: "What is the tallest mountain in the world?",
    response: "The tallest mountain in the world is Mount Everest, which is about 29,029 feet (8,848 meters) tall."
  },
];

function sendMessage(userMessage) {
  var messageElement = document.createElement('div');
  messageElement.style.textAlign = "right";
  messageElement.style.marginRight = "2px";
  messageElement.innerHTML = "<span>You:</span> <span>" + userMessage + "</span>";

  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the bottom
}

function chatbotResponse(userMessage) {
  var chatbotMessage = "I didn't understand that.";

  var result = arrayofPossibleMessage.find(val => val.message.toLowerCase() === userMessage.toLowerCase());
  if (result) {
    chatbotMessage = result.response;
  }

  var messageElement = document.createElement('div');
  messageElement.style.textAlign = "left";
  messageElement.style.marginLeft = "2px";
  messageElement.innerHTML = "<span>Chatbot:</span> <span>" + chatbotMessage + "</span>";

  setTimeout(() => {
    messageElement.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 1000 });

    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll to the bottom

    // Send data to the backend
    fetch('http://localhost:8080/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userMessage, chatbotResponse: chatbotMessage })
    });
  }, 1000);
}

sendBtn.addEventListener('click', function (e) {
  var userMessage = textbox.value.trim();
  if (userMessage === "") {
    alert('Type a message!');
  } else {
    textbox.value = "";
    sendMessage(userMessage);
    chatbotResponse(userMessage);
  }
});

// script.js

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}