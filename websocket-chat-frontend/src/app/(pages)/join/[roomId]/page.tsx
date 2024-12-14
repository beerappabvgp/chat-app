import { JoinRoom } from "@/app/components/roomManagement";

// Define the expected type for `params`
interface JoinRoomPageProps {
  params: { roomId: string };
}

// Page component that takes `params` as props
export default function JoinRoomWrapper({
  params,
}: JoinRoomPageProps) {
  const { roomId } = params;  // Extract roomId from params
  console.log("RoomId is: ", roomId); // For debugging purposes
  
  return (
    <div>
      {/* Pass roomId as a prop to JoinRoom component */}
      <JoinRoom roomId={roomId} />
    </div>
  );
}
