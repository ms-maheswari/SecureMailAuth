// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Assistant';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm your ${botName}, Enter 'help' to proceed`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#006eff',
    },
    chatButton: {
      backgroundColor: '#006eff',
    },
  },
};

export default config;