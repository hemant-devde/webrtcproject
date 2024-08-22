import React, {useCallback, useEffect, useState} from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/peer";


const Homepage = () =>{
const    [username , setUsername]=useState('');
const    [roomID , setRoomID]=useState('');
const navigate = useNavigate();
const {socket} =useSocket();
const   {peer}=usePeer();

const handleRoomJoined = useCallback(({roomID})=>{
    console.log(`${username} you joined the room  `);
    // socket.emit('join-room',{username, roomID} );
    navigate(`/room/${roomID}`)
}
, [])

const handleJoinRoom = ()=>{
    
    socket.emit('join-room',{ user :username,roomID} );
}
console.log("socket :", socket);


// const informAboutNewUSer = (data)=>{
//     console.log("new user joined the room " ,data);
//     // socket.emit('call-user')
    
// }

useEffect( ()=>{
    socket.on('joined-room', handleRoomJoined)
    // socket.on('user-connected', informAboutNewUSer );
}, [socket])

    return (


<div className="homepage-container">

<h1>home page</h1>


<div className="form-cantainer">

<input  type="text" value={username}  onChange={e => setUsername(e.target.value)} placeholder="enter your name " /> 
<input  type="text" value={roomID}  onChange={e => setRoomID(e.target.value)} placeholder="enter room Id" /> 

<button onClick={handleJoinRoom}>Join Room</button>
</div>

</div>

    )
}

export default Homepage;