import React from 'react'
import './FloatingActionButton.css'

import { AiOutlineMessage } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'

const FloatingActionButton = ( {ShowHideBot, setShowHideBot} ) => {
    return (
    <div>
        <button className={ ShowHideBot ? 'floatBtn' : 'floatBtn activeBtn' } onClick={() => setShowHideBot(!ShowHideBot)}>
            {
                ShowHideBot ? <AiOutlineMessage /> : <AiOutlineClose /> 
            }
        </button>
    </div>
  )
}

export default FloatingActionButton