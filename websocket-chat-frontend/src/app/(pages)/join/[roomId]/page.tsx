'use client';

import { JoinRoom } from "@/app/components/roomManagement";

export default function JoinRoomWrapper({
    params,
  }: {
    params: { roomId: string };
  }) {
    const roomId = params.roomId;
    console.log("RoomId is: ", roomId); 
    return (
        <div>
            <JoinRoom roomId={roomId}/>
        </div>
    );
}