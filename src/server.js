import {join} from "path";
import express from 'express';
import soketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;
// 원래는 같은 포트에서 2개의 서버를 동시에 동작하게 할 수 없으나, WS와 HTTP는 같은 서버에서 존재할 수 있다.
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));
app.get("/", (req,res) => res.render("home"));

const handleListening = () => console.log(`Server running:https://localhost:${PORT}`);

// server라는 변수에 app.listen()의 기능을 담는다.
const server = app.listen(PORT, handleListening);

// http://localhost:4000/socket.io/socket.io.js 로 소켓 상태 볼 수 있다.
// 위 파일은 기본적으로 프론트엔드 코드인데, SocketIO백엔드와 프론트엔드가 서로 대화할 수 있게 해준다.
const io = soketIO(server);

// io를 변수로 한 이유는 io가 모든 이벤트를 알아야 하기 때문.
// socket은 라우터(혹은 페이지)가 없으며 연결만 존재한다. 
// emit : 기본적으로 이벤트를 보냄. 이벤트를 발생시키고 연결된 소켓에만 이벤트를 보냄, 
// broadcast : 기본적으로 이벤트를 발생시킴. 연결된 Socket을 제외한 모든 Socket에 이벤트를 발생시킴.
//             (해당 Socket이 연결되었다고 다른 Socket에 이벤트를 알림.)

io.on("connection", socket => {
    // socket이 연결될 경우 hello라는 것을 실행시킨다. >index.js확인<
    // setTimeout(()=> socket.broadcast.emit("hello"), 5000);
    // socket.on("helloGuys", ()=> console.log("the Guys joied"));
    socket.on("newMessage", ({ message }) => {
        socket.broadcast.emit("messageNotif", {message, nickname:socket.nickname || "Anon"} );
    });
    socket.on("setNickname", ({nickname}) => {
        socket.nickname = nickname;
    });
});


// setInterval(() => console.log(sockets), 5000);