'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import Next.js router for redirection
import { useUsername } from '../UserNameContext';

export const JoinRoomForm = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsernameLocal] = useState(''); // Local state for form input
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUsername } = useUsername(); // Use global context setter
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the inputs
    if (!roomId || !username) {
      setErrorMessage('Room ID and Username are required!');
      return;
    }

    // Set username globally
    setUsername(username);

    // Redirect to the Join Room page
    router.push(`/join/${roomId}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Join a Room</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roomId" className="block text-gray-700">Room ID</label>
          <input
            type="text"
            id="roomId"
            name="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Room ID"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)} // Set local state for form input
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter Username"
          />
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Join Room
        </button>
      </form>
    </div>
  );
};
