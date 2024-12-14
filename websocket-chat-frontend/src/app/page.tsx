// pages/Home.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUsername } from './UserNameContext';

export default function Home() {
  const [localUsername, setLocalUsername] = useState('');
  const { setUsername } = useUsername(); // Get the global setUsername function
  const router = useRouter();

  // Handle username submission
  const handleSubmit = () => {
    if (!localUsername) {
      alert('Please enter your username');
      return;
    }

    // Set the global username
    setUsername(localUsername);

    // Redirect to the main functionality page (with create/join buttons)
    router.push('/chat');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-200">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-400 mb-4">Welcome to ChatSphere</h1>
        <p className="text-lg text-gray-400">Connect, communicate, and collaborate seamlessly</p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
        <label htmlFor="username" className="text-lg block mb-3 font-semibold text-teal-300">
          Enter Your Username:
        </label>
        <input
          type="text"
          id="username"
          value={localUsername}
          onChange={(e) => setLocalUsername(e.target.value)}
          placeholder="Type your username"
          className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {/* Button Section */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 px-4 py-3 rounded-lg bg-teal-500 text-gray-900 font-semibold hover:bg-teal-400 transition-colors"
        >
          Enter Chat
        </button>
      </div>

      {/* Footer Section */}
      <div className="mt-10 text-gray-500 text-sm">
        <p>&copy; 2024 ChatSphere. All rights reserved.</p>
      </div>
    </div>
  );
}
