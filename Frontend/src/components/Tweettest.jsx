import React from 'react';

const Tweet = () => {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full" src="https://th.bing.com/th/id/OIP.roeJGz3eeyhxK3XRQ0LxpQAAAA?rs=1&pid=ImgDetMain" alt="Profile" />
          <div className="ml-3">
            <div className="flex items-center">
              <span className="text-lg font-bold">Dillion</span>
              <svg className="h-5 w-5 text-blue-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.52 3.59a2.8 2.8 0 0 1 4.96 0l.97 1.63 1.88-.39a2.8 2.8 0 0 1 3.3 3.3l-.4 1.88 1.64.97a2.8 2.8 0 0 1 0 4.96l-1.63.97.39 1.88a2.8 2.8 0 0 1-3.3 3.3l-1.88-.4-.97 1.64a2.8 2.8 0 0 1-4.96 0l-.97-1.63-1.88.39a2.8 2.8 0 0 1-3.3-3.3l.4-1.88-1.64-.97a2.8 2.8 0 0 1 0-4.96l1.63-.97-.39-1.88a2.8 2.8 0 0 1 3.3-3.3l1.88.4.97-1.64zm7.35 5.64-6.3 6.3-2.67-2.67a1 1 0 1 0-1.42 1.42l3.38 3.37a1 1 0 0 0 1.42 0l7-7a1 1 0 0 0-1.42-1.42z" />
              </svg>
            </div>
            <span className="text-gray-500">@dillionverma</span>
          </div>
        </div>
        <p className="mt-4 text-gray-800">
          Companies spend $30,000+ and several weeks to build beautiful landing pages 
          like @linear, @wavepha, and @reflectnotes ✨ I built @reactjs + @tailwindcss 
          components for you to do the same in hours, starting at just $29 Pre-order link + 
          demo below 👇 #buildinpublic @buildspace
        </p>
        <div className="mt-4">
          <img 
            className="w-full h-64 object-cover rounded-lg" 
            src="https://th.bing.com/th/id/OIP.roeJGz3eeyhxK3XRQ0LxpQAAAA?rs=1&pid=ImgDetMain" 
            alt="Tweet image" 
          />
        </div>
        <div className="mt-4 flex justify-between text-gray-500">
          <span>💬 20</span>
          <span>🔁 30</span>
          <span>❤️ 100</span>
          <span>📤 Share</span>
        </div>
      </div>
    </div>
  );
};

export default Tweet;