import React, { useState } from 'react';
import { Send, FileImage, CheckCheck, CircleCheck, UserPlus, Menu } from 'lucide-react';

const Avatar = ({ children }) => (
  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
    {children}
  </div>
);

const Button = ({ children, className, onClick }) => (
  <button className={`p-2 rounded ${className}`} onClick={onClick}>
    {children}
  </button>
);

const Messagecontainer = () => {
  const [inputMsg, setInputMsg] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  // Dummy data
  const conversations = [
    { id: 1, username: 'Alice', lastMsg: 'Hey, how are you?', online: true },
    { id: 2, username: 'Bob', lastMsg: 'Can we meet tomorrow?', online: false },
    { id: 3, username: 'Charlie', lastMsg: 'Thanks for your help!', online: true },
  ];

  const friendRequests = [
    { id: 1, username: 'David', avatar: 'D' },
    { id: 2, username: 'Emma', avatar: 'E' },
  ];

  const messages = [
    { id: 1, message: 'Hi there!', sentBy: 'user', seen: true },
    { id: 2, message: 'Hello! How can I help you today?', sentBy: 'other', seen: true },
    { id: 3, message: 'I have a question about the project.', sentBy: 'user', seen: true },
    { id: 4, message: 'Sure, go ahead and ask. Idevm here to help!', sentBy: 'other', seen: false },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col ${showSidebar ? 'fixed inset-0 z-50' : 'hidden md:flex'}`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Chats</h2>
          <Button className="md:hidden" onClick={() => setShowSidebar(false)}>
            <Menu size={24} />
          </Button>
        </div>
        {/* Friend Requests */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium mb-2">Friend Requests</h3>
          {friendRequests.map(({ id, username, avatar }) => (
            <div key={id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Avatar>{avatar}</Avatar>
                <span className="ml-2">{username}</span>
              </div>
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                <UserPlus size={16} />
              </Button>
            </div>
          ))}
        </div>
        {/* Conversations List */}
        <div className="flex-grow overflow-y-auto">
          {conversations.map(({ id, username, lastMsg, online }) => (
            <div key={id} className="flex items-start p-4 hover:bg-gray-200 cursor-pointer">
              <Avatar>{username[0]}</Avatar>
              {online && <CircleCheck fill='green' size={10} className="ml-1" />}
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-medium text-gray-900">{username}</h3>
                <div className="flex items-center">
                  <CheckCheck size={16} className="mr-1" />
                  <p className="text-gray-500 text-sm truncate">{lastMsg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex h-16 items-center border-b px-4 bg-white">
          <Button className="mr-2 md:hidden" onClick={() => setShowSidebar(true)}>
            <Menu size={24} />
          </Button>
          <h1 className="text-xl font-semibold">Chat with Alice</h1>
        </div>

        {/* Chat Messages */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sentBy === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-xs ${
                    msg.sentBy === 'user' ? 'bg-blue-600 text-white' : 'bg-white'
                  } p-3 rounded-lg shadow`}
                >
                  <p className="flex items-center break-words">
                    {msg.message}
                    {msg.sentBy === 'user' && (
                      <CheckCheck size={16} className={`ml-2 ${msg.seen ? 'text-green-400' : 'text-gray-300'}`} />
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t p-4 bg-white">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMsg}
              className="flex-grow appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setInputMsg(e.target.value)}
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send size={20} />
            </Button>
            <Button className="bg-gray-200 hover:bg-gray-300">
              <FileImage size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messagecontainer;