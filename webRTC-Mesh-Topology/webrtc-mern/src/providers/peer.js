import React, {useMemo} from "react";




 const PeerContext = React.createContext(null);


 export const usePeer = ()=> React.useContext(PeerContext); 
export const PeerProvider = (props)=>{
const peer = useMemo(()=> {
    new RTCPeerConnection( {
        iceServers:[{
            urls:["stun:stun.l.google.com:19302" ]
        }]
           
        
    });
}, [])

 const creatOffer = async() =>{
    const Offer = await peer.creatOffer();
    await peer.setLocalDiscription(Offer);
    return Offer;
}

 return (
    <PeerContext.Provider value={{peer,creatOffer}} >
        {props.children}
    </PeerContext.Provider>
)
}


 