import React, { useState } from 'react'
import { Chatbot } from 'react-chatbot-kit'

import 'react-chatbot-kit/build/main.css'
import './ChatBot.css'

import FloatingActionButton from './FloatingActionButton'

import MessageParser from './MessageParser'
import ActionProvider from './ActionProvider'
import config from './Config'

const ChatBotWidget = () => {
    const [ShowHideBot, setShowHideBot] = useState(true)

    return (
        <>
            <div style={{display: ShowHideBot ? 'none' : 'flex' }}>
                <Chatbot 
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />

            </div>
            <FloatingActionButton ShowHideBot={ShowHideBot} setShowHideBot={setShowHideBot}/>
        </>
    )
}

export default ChatBotWidget