import React, { useState } from 'react';
import Tests from './Tests';



const Test = () => {
  const [filter, setFilter] = useState('all');

  const posts = [
    { id: 1, type: 'normal', title: 'The Art of Mindfulness', thumbnail: 'mindfulness.jpg', likes: 120, comments: 45, author: 'Emma Watson', content: 'Explore the transformative power of mindfulness...' },
    { id: 2, type: 'trending', title: 'Cryptocurrency Revolution', thumbnail: 'crypto.jpg', likes: 980, comments: 230, author: 'Elon Musk', content: 'The future of finance is here...' },
    { id: 3, type: 'audio', title: 'Podcast: Future of AI', thumbnail: 'ai-podcast.jpg', likes: 340, comments: 89, author: 'Lex Fridman', content: 'Listen to experts discuss the implications of AI...' },
    { id: 4, type: 'video', title: 'Breathtaking Aurora Timelapse', thumbnail: 'aurora.jpg', likes: 1200, comments: 305, author: 'National Geographic', content: 'Watch the mesmerizing dance of the Northern Lights...' },
    { id: 5, type: 'normal', title: 'Gourmet Recipes for Busy Professionals', thumbnail: 'cooking.jpg', likes: 567, comments: 123, author: 'Gordon Ramsay', content: 'Quick and delicious meals for your hectic lifestyle...' },
    { id: 6, type: 'trending', title: 'Space Tourism Takes Off', thumbnail: 'space-tourism.jpg', likes: 2100, comments: 456, author: 'Richard Branson', content: 'The era of civilian space travel has begun...' },
  ];

  const filteredPosts = filter === 'all' ? posts : posts.filter(post => post.type === filter);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="mb-12">
        <h1 className="text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Trending Topics
        </h1>
        <div className="flex flex-wrap gap-4">
          {['all', 'normal', 'trending', 'audio', 'video'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === type
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <div key={post.id} className={`
            ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
            ${index === 3 ? 'md:col-span-2' : ''}
          `}>
            <Tests post={post} featured={index === 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;