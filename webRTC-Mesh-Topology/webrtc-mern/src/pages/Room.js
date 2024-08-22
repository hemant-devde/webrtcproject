import React, { useEffect ,useCallback} from "react";

import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/peer";

const Roompage = ()=>{
const    {socket }=useSocket();
const {peer , createOffer} = usePeer();

const informAboutNewUSer = useCallback(async (data)=>{
    const {user } =data;
    console.log("new user joined the room " ,user);
    const offer =await createOffer;
    console.log("createOffer :", offer);

    // socket.emit('call-user')
    
},[createOffer,socket])

useEffect( ()=>{
console.log("socket in room ",socket);

socket.on('user-connected' , informAboutNewUSer)
}, [informAboutNewUSer ,socket])



    return (
        <div className="room-page-container">
            <h1>Welcome to room  </h1>
        </div>
    )
}

export default Roompage;