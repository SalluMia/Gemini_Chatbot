import React, { useEffect, useRef, useState } from "react";
import avatar from '../assets/images.jpeg';
import bot from '../assets/bot.png';
import popSound from '../assets/iphone_14_notification.mp3';
const API_Key = "AIzaSyDKDaXGEGxlC0FfWUJahms85PeyVaCreNk"
function ChatBox({ initialPrompt }) {
  console.log(initialPrompt)
  const [inputMessage, setInputMessage] = useState([]);
  const [messages, setMessages] = useState([{ text: "Hey! How can I assist you?", type: "bot" }]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const [audio] = useState(new Audio(popSound));

  // Function to play the sound
  const playPopSound = () => {
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play(); // Play the sound
  };

  const handleInputChange = (e) => {
    setInputMessage([{ text: e.target.value, type: "user" }]);
  };

  useEffect(() => {
    if (initialPrompt) {
      setInputMessage([{ text: initialPrompt, type: "user" }]);
    }
  }, [initialPrompt]);


  const sendMessage = async () => {

    const currentMessage = inputMessage[0]?.text || "";
    // if (currentMessage.trim() === "") return;
    setIsTyping(true);

  
    // Add user message to the chat
    setMessages([...messages, { text: currentMessage, type: "user" }]);
    setInputMessage([]);
  
    try {
      // Fetch response from Gemini API
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_Key,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts:[{ text: currentMessage }],
              }
            ]
          }),
        }
      );
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`API error: ${errorMessage}`);
      }
  
      const data = await response.json();
      console.log("Response Data:", data); // Log the response data
  
      if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
        // Add bot message to the chat without overwriting existing messages
        setMessages(prevMessages => [
          ...prevMessages,
          { text: data.candidates[0].content.parts[0].text.trim(), type: "bot" },
        ]);
        playPopSound();
      } else {
        throw new Error('Unexpected response format');
      }
      setIsTyping(false);

      // Scroll to the bottom of the chat body
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    } catch (error) {
        setIsTyping(false);
      console.error("Error fetching data:", error.message);
      // Handle errors appropriately, e.g., display an error message to the user
    }
  };
  
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);
  
  
  
  return (
    <div
      id="chatbox"
      className="flex flex-col bg-[#181f37] h-screen px-10 border-r-4 border-[#253052] gap-4 justify-center items-center"
    >
       {/* <div>
       <h1 className="text-xl font-bold border-l-4 border-blue-500 px-5 bg-gray-200 py-1"> It will help you generate content tailored to your needs and assist you based on your requirements.</h1>
       </div> */}

      

     <div>
     <div id="chatbox-frame" className=" w-full border-2 border-[#2e4078] rounded-xl shadow-md">
        <div id="chat-header" className="bg-[#253052] px-10 py-5 rounded-t-xl">
          <div className="flex items-center relative gap-4">
            <img src={bot} className="h-16 border-2 border-white rounded-full" alt="" />
          <div>
          <h1 className="font-bold text-white text-xl">Support Chatbot</h1>
          <p className=" text-white animate-pulse ">Online</p>
          </div>
            <div className="circle h-4 w-4 bg-green-400 animate-pulse rounded-full absolute top-1 left-0 border-2 border-white "></div>
          </div>
        </div>
        <div id="chat-body" ref={chatBodyRef} className="flex flex-col gap-4 bg-[#2d3b65] h-96 px-2 py-5 overflow-y-auto relative">
          {isTyping && (
            <div className="flex justify-start absolute bottom-1">
              <p className="px-5 py-2 text-[13px] rounded text-gray-300">Bot Typing...</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.type === "user" ? "flex justify-end  " : "flex justify-start"}
            >
              {message.type === "user" ? (
                <img src={avatar} className="w-8 h-8 rounded-full border border-gray-600  mx-1 object-cover" alt="User Avatar" />
              ) : (
                <img src={bot} className="w-10 h-10 border border-gray-600 mr-1 rounded-full object-cover " alt="Bot Avatar" />
              )}
              <p
                className={`${message.type === "user" ? "bg-gray-100 " : "bg-blue-950 text-gray-400 text-[13px]"} px-5 py-2 text-sm rounded-r-xl rounded-bl-xl`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <div
          id="chat-footer"
          className="flex bg-[#212f57]  px-10 py-5 rounded-b-xl border-0 border-t-2 border-[#253052]"
        >
          <input
            type="text"
            placeholder="Message Bot...."
            className="px-5 py-3 w-full rounded-l-md text-sm bg-[#1F2845] text-white focus:outline-none"
            value={inputMessage[0]?.text || ""}
            onChange={handleInputChange}
          />
          <button
            className="bg-[#1F2845] px-2 rounded-r-md font-bold text-white"
            onClick={sendMessage}
          >
            <i class="fa-solid fa-paper-plane" style={{background:"#2d3b65", padding:'8px 15px', borderRadius:'5px'}}></i>
          </button>
        </div>
      </div>
     </div>
    </div>
  );
}

export default ChatBox;
