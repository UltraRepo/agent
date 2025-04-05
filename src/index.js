import { ChatUI } from '@syncfusion/ej2-interactive-chat';
import { Splitter } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';
import './style.css';

// Initialize the chat UI
let chatUiInst = new ChatUI({
  headerText: 'UltraRepo Agent',
  headerIconCss: 'chat_agent_avatar',
  user: { 
    id: 'user1', 
    user: 'You', 
    avatarUrl: './images/user.svg' 
  },
  messages: [
    {
      author: { 
        id: 'bot', 
        user: 'UltraRepo Agent', 
        avatarUrl: './images/agent.svg' 
      },
      text: 'Hello! I am UltraRepo Agent. How can I help you today?',
    }
  ],
  headerToolbar: {
    items: [
      {
        template: '<span class="material-icons toolbar-icon">info</span>',
        align: 'Right',
        tooltip: 'Info'
      }
    ]
  },
  enableSendButton: true,
  placeholder: 'Type a message...',
  messageSend: (args) => {
    setTimeout(() => {
      if(args.message.author.id === 'user1') {
        let message = {
          author: { 
            id: 'bot', 
            user: 'UltraRepo Agent', 
            avatarUrl: './images/agent.svg' 
          },
          text: `I received your message: "${args.message.text}". This is a prototype, so I cannot provide a real response yet.`,
        }
        chatUiInst.addMessage(message);
        
        // Add some example suggestions
        chatUiInst.suggestions = [
          'What can you do?',
          'Show documentation',
          'Help me with coding'
        ];
      }
    }, 1000);
  }
});

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the splitter layout for desktop
  if (window.innerWidth >= 768) {
    new Splitter({
      paneSettings: [
        { size: '50%', resizable: true, collapsible: false }, 
        { size: '50%', resizable: true, collapsible: false }
      ],
    }, '#splitter');
  }

  // Append the chat to the container
  chatUiInst.appendTo('#chatContainer');
  
  // Direct DOM modification for the send button
  function modifySendButton() {
    // Try multiple possible selectors to find the send button
    const sendButtons = document.querySelectorAll('.e-send, button.e-send, .e-chat button[type="button"], .e-chat .e-message-editor .e-input-group button');
    
    if (sendButtons.length > 0) {
      sendButtons.forEach(button => {
        // Change the button text directly
        if (button.innerText.toLowerCase().includes('send')) {
          button.innerHTML = '<span>Go</span>';
          button.setAttribute('title', 'Go');
        }
        
        // Adjust width
        button.style.width = '50px';
        button.style.minWidth = '50px';
        
        if (window.innerWidth <= 300) {
          button.style.width = '35px';
          button.style.minWidth = '35px';
        }
      });
      
      console.log('Send button text modified to "Go"');
    } else {
      // If buttons not found immediately, try again after a delay
      console.log('Send button not found, retrying...');
      setTimeout(modifySendButton, 500);
    }
  }
  
  // Run the modification after a short delay to ensure the component is fully rendered
  setTimeout(modifySendButton, 100);
  
  // Handle dark mode toggling using Syncfusion's approach
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    // Check for user's preferred color scheme
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (prefersDarkMode) {
      document.body.classList.add('e-dark-mode');
      themeToggleBtn.querySelector('.material-icons').textContent = 'light_mode';
    }
    
    // Add toggle functionality
    themeToggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('e-dark-mode');
      const isDarkMode = document.body.classList.contains('e-dark-mode');
      themeToggleBtn.querySelector('.material-icons').textContent = isDarkMode ? 'light_mode' : 'dark_mode';
      
      // Re-run send button modification when theme changes
      setTimeout(modifySendButton, 100);
    });
  }
  
  // Custom function to adjust UI for small screens
  function adjustForSmallScreens() {
    if (window.innerWidth <= 190) {
      // Hide sidebar items text if needed
      document.querySelectorAll('.sidebar-nav .nav-item .text').forEach(el => {
        el.style.display = 'none';
      });
      
      // Adjust mobile header to minimum size
      const mobileHeader = document.querySelector('.mobile-header');
      if (mobileHeader) {
        const titleEl = mobileHeader.querySelector('.fw-bold');
        if (titleEl) {
          titleEl.textContent = 'Agent';
        }
      }
      
      // Rerun send button modification
      modifySendButton();
    }
  }
  
  // Run initial adjustment
  adjustForSmallScreens();

  // Handle the help button click
  document.getElementById('helpBtn').addEventListener('click', function() {
    document.getElementById('appFrame').src = 'https://docs.openwebui.com/';
  });

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const chatHistory = document.getElementById('chatHistory');
      
      // Toggle chat history view on small screens
      if (chatHistory.classList.contains('d-none')) {
        chatHistory.classList.remove('d-none');
        chatHistory.classList.add('d-block');
        chatHistory.style.position = 'fixed';
        chatHistory.style.top = '50px';
        chatHistory.style.left = '0';
        chatHistory.style.bottom = '0';
        chatHistory.style.zIndex = '200';
        chatHistory.style.width = '250px';
        
        // Adjust width for very small screens
        if (window.innerWidth <= 300) {
          chatHistory.style.width = '190px';
        }
      } else {
        chatHistory.classList.remove('d-block');
        chatHistory.classList.add('d-none');
        chatHistory.style.position = '';
      }
    });
  }

  // Mobile app panel toggle
  const mobileAppToggle = document.getElementById('mobileAppToggle');
  if (mobileAppToggle) {
    mobileAppToggle.addEventListener('click', function() {
      const appPanel = document.querySelector('.chat-rightContent');
      appPanel.classList.toggle('d-none');
      appPanel.classList.toggle('d-flex');
    });
  }

  // Handle window resize
  window.addEventListener('resize', function() {
    // Run adjustments for small screens
    adjustForSmallScreens();
    
    // Reset mobile menu states on window resize
    if (window.innerWidth >= 768) {
      const chatHistory = document.getElementById('chatHistory');
      chatHistory.classList.remove('d-block');
      chatHistory.classList.add('d-none', 'd-md-block');
      chatHistory.style.position = '';

      const appPanel = document.querySelector('.chat-rightContent');
      appPanel.classList.remove('d-none');
      appPanel.classList.add('d-flex');
    } else {
      const appPanel = document.querySelector('.chat-rightContent');
      appPanel.classList.remove('d-flex');
      appPanel.classList.add('d-none');
    }
    
    // Rerun send button modification on resize
    setTimeout(modifySendButton, 100);
  });

  // Handle chat item clicks
  const chatItems = document.querySelectorAll('.chat-item');
  chatItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      chatItems.forEach(i => i.classList.remove('active'));
      // Add active class to clicked item
      this.classList.add('active');
      
      // On mobile, hide the chat history after selection
      if (window.innerWidth < 768) {
        const chatHistory = document.getElementById('chatHistory');
        chatHistory.classList.remove('d-block');
        chatHistory.classList.add('d-none');
      }
    });
  });
  
  // Create and append CSS with !important rules for send button override
  const customCSS = document.createElement('style');
  customCSS.textContent = `
    .e-chat button[type="button"], .e-send, button.e-send {
      min-width: 50px !important;
      width: 50px !important;
    }
    
    @media (max-width: 300px) {
      .e-chat button[type="button"], .e-send, button.e-send {
        min-width: 35px !important;
        width: 35px !important;
      }
    }
  `;
  document.head.appendChild(customCSS);
});
