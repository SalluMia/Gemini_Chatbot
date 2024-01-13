// HomePage.jsx
import React, { useState } from 'react';
import ChatBox from '../Components/ChatBox';
import Prompts from '../Components/Prompts';

function HomePage() {
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handleSelectPrompt = (promptTitle) => {
    setSelectedPrompt(promptTitle);
  };

  return (
    <div id="home">
      <div className="flex flex-row ">
        
        <div className='w-2/3 overflow-y-auto'>
          <Prompts onSelectPrompt={handleSelectPrompt} />
        </div>
        <div className='w-2/6'>
          <ChatBox initialPrompt={selectedPrompt} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
