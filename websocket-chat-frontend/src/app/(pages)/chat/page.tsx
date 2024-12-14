'use client';

import { useUsername } from '@/app/UserNameContext';
import { useRouter } from 'next/navigation';

export default function Main() {
  const { username } = useUsername(); // Get the global username
  const router = useRouter();

  // Handle creating a new room
  const handleCreateRoom = () => {
    // Generate a random room ID
    const newRoomId = Math.random().toString(36).substring(2, 10); // Simple random string
    // Redirect to the /join page with roomId as a URL parameter
    router.push(`/join/${newRoomId}`);
  };

  // Handle joining an existing room
  const handleJoinRoom = () => {
    const roomId = prompt('Enter Room ID:');
    if (roomId) {
      router.push(`/join/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-200">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-teal-400 mb-4">Welcome, {username}!</h1>
        <p className="text-lg text-gray-400">Ready to connect with your friends? Create or join a room now!</p>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg space-y-6">
        {/* Button to create a new room */}
        <button
          onClick={handleCreateRoom}
          className="w-full px-6 py-3 rounded-lg bg-teal-500 text-gray-900 font-semibold text-lg hover:bg-teal-400 transition-colors"
        >
          Create a New Room
        </button>

        {/* Button to join an existing room */}
        <button
          onClick={handleJoinRoom}
          className="w-full px-6 py-3 rounded-lg bg-indigo-500 text-gray-900 font-semibold text-lg hover:bg-indigo-400 transition-colors"
        >
          Join an Existing Room
        </button>
      </div>

      {/* Footer Section */}
      <div className="mt-10 text-gray-500 text-sm text-center">
        <p>&copy; 2024 ChatSphere. All rights reserved.</p>
      </div>
    </div>
  );
}
