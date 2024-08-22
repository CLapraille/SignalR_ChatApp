import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import WaitingRoom from './components/WaitingRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {

  const[conn, setConnection] = useState();
  const[messageList, setMessageList] = useState([]);

  const joinChatRoom = async (username, chatRoom) => {
    try {
      //initiate a connection
      const conn = new HubConnectionBuilder()
                    .withUrl("http://localhost:5209/chat")
                    .configureLogging(LogLevel.Debug)
                    .build();

      //set up handler
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg1: ", msg);
        setMessageList(messageList =>[...messageList, {username, msg}]);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        console.log("msg2: "+ msg + " username " + username);
        setMessageList(messageList =>[...messageList, {username, msg}]);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {username, chatRoom});

      setConnection(conn);
      
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async(message) => {
    try {
      await conn.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <main>
        <Container>
          <Row class='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>Welcome to the my ChatApp using SingalR !</h1>
            </Col>
          </Row>
          { ! conn 
            ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
            : <ChatRoom messages={messageList} sendMessage={sendMessage}></ChatRoom>
          }
        </Container>
        </main>
    </div>
  );
}

export default App;
