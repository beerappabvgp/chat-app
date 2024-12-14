import { JoinRoom } from "@/app/components/roomManagement";

export default async function JoinRoomWrapper({
    params,
  }: {
    params: Promise<{roomId: string}>;
  }) {
    const roomId = (await params).roomId;
    console.log("RoomId is: ", roomId); 
    return (
        <div>
            <JoinRoom roomId={roomId}/>
        </div>
    );
}