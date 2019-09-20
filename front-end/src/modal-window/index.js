import React from "react";
import styles from "./styles.module.scss";

class ModalWindow extends React.Component {
  state = {
    userName: "",
    key: ""
  };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = event => {
    const { userName, key } = this.state;
    event.preventDefault();
    this.props.onKeyChanged(key);
    this.props.onUserNameChanged(userName);
  };

  render() {
    return (
      <div className={styles.modalWindow}>
        <form onSubmit={this.onSubmit}>
          <div>
            <div className={styles.content}>Username:</div>
            <input
              autoFocus
              required
              name="userName"
              className={styles.moduleInput}
              onChange={this.onInputChange}
            />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.content}>Secret Key:</div>
            <input
              required
              name="key"
              className={styles.moduleInput}
              onChange={this.onInputChange}
            />
          </div>
          <input style={{ display: "none" }} type="submit" />
        </form>
      </div>
    );
  }
}

export default ModalWindow;
