import React from 'react';
import { useParams } from 'react-router';
import { SocketContext } from '../../context/SocketContext';
import { decrypt, encrypt } from '../../utilities/encryption';
import styles from './ChatRoom.module.css';

const ChatRoom = (props) => {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const socket = React.useContext(SocketContext);
  const { username, room } = useParams();
  const chat_bottom_ref = React.useRef(null);

  React.useEffect(() => {
    // if user sent message then decrypt and add
    socket.on('message', (data) => {
      const text_decrypted = decrypt(data.text);
      const data_after_decryption = {
        username: data.username,
        text: text_decrypted,
        time: data.time,
      };
      // console.log(messages, "general");
      setMessages((prev) => [...prev, data_after_decryption]);
    });

    // if general messages then directly add
    socket.on('general_message', (data) => {
      // console.log(data);
      // console.log(messages, "general");
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  const scroll_to_chat_bottom = () => {
    let to_move =
      chat_bottom_ref.current.scrollHeight -
      chat_bottom_ref.current.clientHeight;
    chat_bottom_ref.current.scrollTo(0, to_move);
  };

  const handleSend = () => {
    if (text !== '') {
      const encrypted_message = encrypt(text);
      socket.emit('message', encrypted_message);
      setText('');
    }
    scroll_to_chat_bottom();
  };

  return (
    <div className={styles.container}>
      <div className={styles.username}>
        <h2>
          <span>{room} Group</span>
        </h2>
      </div>
      <div className={styles.chat_message} ref={chat_bottom_ref}>
        {messages.map((i, index) => {
          if (i.username !== username) {
            return (
              <div className={styles.message} key={index}>
                <span>{i.username}</span>
                <p>{i.text}</p>
                <span>{i.time}</span>
              </div>
            );
          } else {
            return (
              <div className={styles.message_right} key={index}>
                <span>You</span>
                <p>{i.text} </p>
                <span>{i.time}</span>
              </div>
            );
          }
        })}
      </div>
      <div className={styles.send}>
        <input
          placeholder='Type your message'
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export { ChatRoom };
