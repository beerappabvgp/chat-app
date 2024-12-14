import { Chat } from "@/app/components/Chat";

export default async function RoomWrapper({
  params,
}: {
  params: { roomId: string };
}) {
  const { roomId } = params;
  console.log("RoomId is: ", roomId); 

  return <Chat roomId={roomId} />;
}
