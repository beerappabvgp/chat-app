import { Chat } from "@/app/components/Chat";

export default async function RoomWrapper({
  params,
}: {
  params: Promise<{roomId: string}>;
}) {
  const roomId = (await params).roomId;
  console.log("RoomId is: ", roomId); 

  return <Chat roomId={roomId} />;
}
