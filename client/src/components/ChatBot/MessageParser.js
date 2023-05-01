// in MessageParser.js
import React from 'react';
import searchData from './GoogleSearch.js'

const MessageParser = ({ children, actions }) => {
  const parse = async (message) => {
    message = message.toLowerCase()
    message = message.replace(/^\s+|\s+$/gm,'');

    if (message.indexOf('hello') !== -1 || message.indexOf('hi') !== -1 || message.indexOf('hey') !== -1) {
      actions.handleHello();
    } else 
    if(message.indexOf('login') !== -1 || message.indexOf('auth') !== -1){
      actions.handleAuth();
    }else
    if(message.indexOf('help') !== -1){
      actions.handleHelp();
    }else
    if(message.indexOf('questions') !== -1 || message.indexOf('question') !== -1){
      actions.handleQue();
    }else
    if(message.indexOf('otp') !== -1 || message.indexOf('mobile') !== -1){
      actions.handleOtp();
    }else
    if(message.indexOf('bye') !== -1 || message.indexOf('ok') !== -1){
      actions.handleBye();
    }else
    if(message.split(' ').length <= 1){
      actions.handleNeedMore();
    } else
    if(message.includes('who are you') || message.includes('tell about yourself') || message.includes('tell me about your personality') || message.includes('introduce yourself') || message.includes('introduce')){
      actions.introduction();
    }else
    if(message.includes('what you can do') || message.includes('can do') || message.includes('what you do')){
      actions.handleWork();
    }else
    if(message.includes('how are you') || message.includes('how are doing') || message.includes('whats up')){
      actions.handleHow();
    }else
    if(message.includes('good morning') || message.includes('morning')){
      actions.handleGree('M');
    }else
    if(message.includes('good afternoon') || message.includes('afternoon')){
      actions.handleGree('A');
    }else
    if(message.includes('good evening') || message.includes('evening')){
      actions.handleGree('E');
    }else
    if(message.includes('good night') || message.includes('night')){
      actions.handleGree('N');
    }else
    if(message.includes('tell me something') || message.includes('tell me')){
      actions.handleTell();
    }else
    if(message.includes('happy birthday') || message.includes('happy bday')){
      actions.handleBday();
    }else
    if(message.includes('your name') || message.includes('what is your name') || message.includes('call you') || message.includes('call you')){
      actions.handleName();
    }
    else{
      const data = await searchData(message)
      console.log(data);
      actions.handleSearch(data.items[0].snippet);
      // actions.handleSearch(data);
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;