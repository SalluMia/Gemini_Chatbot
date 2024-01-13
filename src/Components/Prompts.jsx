import React, { useState } from 'react';
import { saladData } from '../Data/FoodAndVeges'; 

function Prompts({ onSelectPrompt }) {
  const [activeTab, setActiveTab] = useState('tab1');
  const tabs = ['FoodVegeas', 'Sports', 'Education', 'Content Writing', 'Coding'];
  const promptsData = saladData; // Assuming you'll be iterating over this in the future

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div id='prompts' className='flex flex-col justify-start h-screen'>
      <div id="headline">
        <h1 className='text-xl font-bold bg-[#181f37] text-gray-200 px-10 py-5'>Here to Guide Your Culinary & Athletic Adventure: Italian Flavors, Football Fever, or Tech Trends &#129299;</h1>
      </div>

      <div className="bg-gray-100 p-4">
        <div className="flex space-x-2">
          {tabs.map((tab, index) => (
            <button 
              key={index}
              className={`px-4 py-2 rounded-full ${activeTab === `tab${index + 1}` ? 'bg-blue-800 text-white' : 'bg-white text-gray-600 hover:bg-gray-200'} focus:outline-none text-sm font-bold`}
              onClick={() => handleTabClick(`tab${index + 1}`)}
            >
              {tab} {/* You can replace this with icons if you like */}
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 bg-white rounded-md shadow-md">
          {Object.keys(promptsData).map((category, index) => (
            <div key={index} className={`${activeTab === `tab${index + 1}` ? '' : 'hidden'}`}>
              <div className="flex flex-wrap justify-start pl-2 overflow-y-auto gap-2">
                {promptsData[category].prompts.map((prompt, idx) => (
                  <div
                    key={idx}
                    className='w-[30%] hover:bg-white hover:text-black border border-dashed px-5 py-5 cursor-pointer rounded text-sm hover:scale-95 transform transition-transform duration-300 hover:border border-gray-500'
                    onClick={() => onSelectPrompt(prompt.title)}
                  >
                    <h1 className='text-sm font-bold'>{prompt.title}</h1>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Prompts;
