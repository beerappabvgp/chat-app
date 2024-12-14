import { Chat } from "@/app/components/Chat";

export default function RoomWrapper({
  params,
}: {
  params: { roomId: string };
}) {
  const roomId = params.roomId;
  console.log("RoomId is: ", roomId); 

  return <Chat roomId={roomId} />;
}
