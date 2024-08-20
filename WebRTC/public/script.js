const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer()
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

navigator.mediaDevices.getUserMedia({
  video: true,
  audio: false
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    console.log("myPeer Call");
    call.answer(stream)
    console.log("After checking call.Anser");
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      console.log("When on call this will print");
      addVideoStream(video, userVideoStream)
      console.log("After adding media to the chanal");
    })
    call.on('close', () => {
      video.remove()
    })
  }).on('error', (err) => {
    console.error('PeerJS Error:', err);
  });

  socket.on('user-connected', userId => {
    console.log("New user connected with ID:", userId)
    connectToNewUser(userId, stream)
  })

  socket.on('user-disconnected', userId => {
    console.log("user-disconned ");
    if (peers[userId]) peers[userId].close()
  })
}).catch(err => {
  console.error('getUserMedia Error:', err);
})

myPeer.on('open', id => {

  console.log("Peer opened with ID:", id)
  socket.emit('join-room', ROOM_ID, id)
})
myPeer.on('error', err => {
  console.error('PeerJS Error:', err);
});

function connectToNewUser(userId, stream) {
  console.log("Connecting to new user:", userId)
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')

  call.on('stream', userVideoStream => {
    console.log("call on : stream");
    addVideoStream(video, userVideoStream)
  })

  call.on('close', () => {
    console.log("call.on close ");
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  console.log("AddVideoStream");
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    console.log("video eventlistner");
    video.play()
  })
  videoGrid.append(video)
}
