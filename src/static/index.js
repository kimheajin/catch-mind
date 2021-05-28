const socket = io("/");

// socket의 hello가 실행이 되고, 결과적으로 아래의 문구가 콘솔에 출력되게 된다.
// socket.on("hello", () => console.log("somebody said hello"));
function sendMessage(message){
    socket.emit("newMessage", {message});
    console.log(`You: ${message}`);
}


function setNickname(nickname){
    socket.emit("setNickname", {nickname});
}

function handleMessageNotif(data){
    const {message, nickname} =data;
    console.log(`${nickname} : ${message}`);
}

socket.on("messageNotif", handleMessageNotif)
// setTimeout(() => socket.emit("helloGuys"), 4000);
