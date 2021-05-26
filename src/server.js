import {join} from "path";
import express from 'express';
import soketIO from "socket.io";

const PORT = 4000;
// 원래는 같은 포트에서 2개의 서버를 동시에 동작하게 할 수 없으나, WS와 HTTP는 같은 서버에서 존재할 수 있다.
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req,res) => res.render("home"));

const handleListening = () => console.log(`Server running:https://localhost:${PORT}`);

// server라는 변수에 app.listen()의 기능을 담는다.
const server = app.listen(PORT, handleListening);

// http://localhost:4000/socket.io/socket.io.js 로 소켓 상태 볼 수 있다.
// 위 파일은 기본적으로 프론트엔드 코드인데, SocketIO백엔드와 프론트엔드가 서로 대화할 수 있게 해준다.
const io = soketIO(server);