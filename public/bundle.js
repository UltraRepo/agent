// Mock Chat UI initialization since we don't have the actual Syncfusion EJ2 Chat control
document.addEventListener('DOMContentLoaded', function() {
  const chatContainer = document.getElementById('chatContainer');
  
  // Create a simple chat UI
  const chatUI = document.createElement('div');
  chatUI.className = 'chat-ui';
  chatUI.innerHTML = `
    <div class="chat-messages" id="chatMessages" style="height: 80%; overflow-y: auto; padding: 10px; background-color: #f5f5f5; border-radius: 5px;"></div>
    <div class="chat-input" style="display: flex; margin-top: 10px;">
      <input type="text" id="messageInput" placeholder="Ask me anything..." style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
      <button id="sendBtn" style="margin-left: 8px; padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Send</button>
    </div>
  `;
  
  chatContainer.appendChild(chatUI);
  
  // Function to add a message to the chat
  function addMessage(sender, text) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.style.marginBottom = '10px';
    messageElement.style.padding = '8px';
    messageElement.style.borderRadius = '5px';
    
    if (sender === 'user') {
      messageElement.style.backgroundColor = '#e6f7ff';
      messageElement.style.marginLeft = '20%';
    } else {
      messageElement.style.backgroundColor = '#f0f0f0';
      messageElement.style.marginRight = '20%';
    }
    
    messageElement.innerHTML = `<strong>${sender === 'user' ? 'You' : 'UltraRepo Agent'}</strong>: ${text}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  // Add initial message
  addMessage('bot', 'Hello! I am UltraRepo Agent. How can I help you today?');
  
  // Handle sending messages
  document.getElementById('sendBtn').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message) {
      addMessage('user', message);
      messageInput.value = '';
      
      // Simulate a response after a short delay
      setTimeout(function() {
        addMessage('bot', 'I received your message: "' + message + '". This is a prototype, so I cannot provide a real response yet.');
      }, 1000);
    }
  });
  
  // Allow pressing Enter to send a message
  document.getElementById('messageInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      document.getElementById('sendBtn').click();
    }
  });
});

// Handle the help button click
document.getElementById('helpBtn').addEventListener('click', function() {
  document.getElementById('appFrame').src = 'https://docs.openwebui.com/';
}); 