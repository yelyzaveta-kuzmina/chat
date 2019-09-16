import React from "react";
import Header from "./header";
import ModalWindow from "./modal-window";
import styles from "./styles.module.scss";

const API_ORIGIN = "http://192.168.0.94:8080";

class App extends React.Component {
  state = { messages: [], input: "", userName: "" };

  componentDidMount() {
    setInterval(this.refetchMessages, 1000);
  }

  refetchMessages = () => {
    fetch(`${API_ORIGIN}/messages`)
      .then(response => response.json())
      .then(messages => {
        this.setState({ messages });
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

  onKeyUpHandle = event => {
    if (event.key === 13 || event.which === 13) {
      fetch(`${API_ORIGIN}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: this.state.input,
          userName: this.state.userName
        })
      });
    }
  };

  render() {
    const { userName } = this.state;

    return (
      <div className={styles.main}>
        <Header />
        {!userName && (
          <ModalWindow onUserNameChanged={this.onUserNameChanged} />
        )}
        <div className={styles.messages}>
          {this.state.messages.map(({ userName, message, time }, index) => (
            <div key={index}>
              {userName}: {message}
              <div>{time}</div>
            </div>
          ))}
        </div>
        <input
          placeholder="Type message"
          onChange={this.onInputChange}
          onKeyUp={this.onKeyUpHandle}
          className={styles.input}
        />
      </div>
    );
  }
}

export default App;
