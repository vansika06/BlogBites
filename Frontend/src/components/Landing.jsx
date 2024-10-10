import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="flex flex-col items-center justify-center space-y-16 bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Text on Top */}
      <div className="space-y-6 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-orange-400 to-rose-500 bg-clip-text text-transparent"
        >
          Explore, Express, and Engage
        </motion.h1>
        <p className="text-xl lg:text-2xl text-gray-300">
          Connect, Create, and Share Your Stories. Your Stories, Our Platform, Endless Possibilities.
        </p>
      </div>

      {/* Zigzag Section */}
      <div className="flex flex-col space-y-16 lg:w-3/4">
        {/* User Login Section (Image on Left, Content on Right) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="flex lg:flex-row flex-col-reverse items-center justify-between space-y-10 lg:space-y-0"
        >
          {/* Image on Left */}
          <div className="lg:w-1/2 w-full">
            <img
              src="https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-23.jpg"
              alt="User illustration"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Content on Right */}
          <div className="lg:w-1/2 w-full text-center lg:text-left space-y-4">
            <h3 className="text-2xl font-semibold text-white">User Login/Signup</h3>
            <p className="text-gray-400">
              Join our community of storytellers. Create and share your unique stories with the world.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500"
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
            </div>
          </div>
        </motion.div>

        {/* NGO Login Section (Content on Left, Image on Right) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="flex lg:flex-row-reverse flex-col-reverse items-center justify-between space-y-10 lg:space-y-0"
        >
          {/* Image on Right */}
          <div className="lg:w-1/2 w-full">
            <img
              src="https://cdn.vectorstock.com/i/500p/14/85/ngo-or-non-governmental-organization-to-serve-vector-50761485.jpg"
              alt="NGO illustration"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Content on Left */}
          <div className="lg:w-1/2 w-full text-center lg:text-left space-y-4">
            <h3 className="text-2xl font-semibold text-white">NGO Login/Signup</h3>
            <p className="text-gray-400">
              Connect with like-minded individuals and promote your mission. Share your initiatives and make a difference.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500"
                onClick={() => navigate('/loginNgo')}
              >
                Login
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-500"
                onClick={() => navigate('/registerNgo')}
              >
                Signup
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Landing;
