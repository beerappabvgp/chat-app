import { JoinRoom } from "@/app/components/roomManagement";

export default function JoinRoomWrapper({
    params,
  }: {
    params: { roomId: string };
  }) {
    const { roomId } = params;
    console.log("RoomId is: ", roomId); 
    return (
        <div>
            <JoinRoom roomId={roomId}/>
        </div>
    );
}