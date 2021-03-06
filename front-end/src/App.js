import React from "react";
import Header from "./header";
import ModalWindow from "./modal-window";
import SimpleCrypto from "simple-crypto-js";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

const SECRET_KEY = "top-secret";
const simpleCrypto = new SimpleCrypto(SECRET_KEY);

class App extends React.Component {
  inputRef = React.createRef();
  messagesRef = React.createRef();
  state = {
    messages: [],
    input: "",
    userName: "",
    key: ""
  };

  componentDidMount() {
    setInterval(this.refetchMessages, 1000);
  }

  refetchMessages = () => {
    fetch(`${API_ORIGIN}/messages`)
      .then(response => response.json())
      .then(messages => {
        if (this.state.key === SECRET_KEY) {
          const decodedMessages = messages.map(message => ({
            ...message,
            message: simpleCrypto.decrypt(message.message)
          }));
          this.setState({ messages: decodedMessages }, this.scrollToBottom);
        } else {
          this.setState({ messages }, this.scrollToBottom);
        }
      })
      .catch(error => console.error(error));
  };

  onInputChange = event => {
    this.setState({
      input: event.target.value
    });
  };

  onUserNameChanged = userName => {
    this.setState({ userName });
  };

  onKeyChanged = key => {
    this.setState({ key });
  };

  onKeyUpHandle = event => {
    if (event.key === 13 || event.which === 13) {
      const message = this.state.input;
      const encodedMessage = simpleCrypto.encrypt(message);
      this.setState({ input: "" });
      fetch(`${API_ORIGIN}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: encodedMessage,
          userName: this.state.userName,
          key: this.state.key
        })
      });
    }
  };

  scrollToBottom = () => {
    if (!this.messagesRef.current) {
      return;
    }
    this.messagesRef.current.scroll({
      top: this.messagesRef.current.scrollHeight,
      behavior: "smooth"
    });
  };

  render() {
    const { input, userName, key } = this.state;

    return (
      <div className={styles.main}>
        {!key && !userName && (
          <ModalWindow
            onKeyChanged={this.onKeyChanged}
            onUserNameChanged={this.onUserNameChanged}
          />
        )}
        {userName && <Header userName={userName} />}
        <div ref={this.messagesRef} className={styles.messages}>
          {this.state.messages.map(({ userName, message, time }, index) => (
            <div className={styles.messageBox} key={index}>
              <div className={styles.username}> {userName}:</div>
              <div className={styles.message}>&nbsp;{message}</div>
              <div className={styles.messageTime}>{time}</div>
            </div>
          ))}
        </div>
        <input
          disabled={this.state.key !== "top-secret"}
          id="message"
          placeholder="Type message"
          onChange={this.onInputChange}
          onKeyUp={this.onKeyUpHandle}
          className={styles.input}
          value={input}
        />
      </div>
    );
  }
}

export default App;
