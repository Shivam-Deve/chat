import './App.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';
const socket = io.connect('http://localhost:5000');
function App() {
  const [message, setMessage] = useState(() => "");
  const [chat, setChat] = useState(() => []);
  const sendChat = e => {
    e.preventDefault();
    socket.emit('chat', { message });
    setMessage("");
  }
  useEffect(() => {
    socket.on('chat', payload => {
      setChat([...chat, payload.message]);
    })
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App</h1>
        <div className="chatBox">
          {chat.map(ch => {
            return (
              <p className='chatBar'>{ch}</p>
            )
          })}
        </div>
        <form onSubmit={sendChat} id='form'>
          <input
            type="text" name="message" placeholder='message'
            value={message}
            id="messageBox"
            onChange={e => {
              setMessage(e.target.value);
            }}
          />
          <button id="send" type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
