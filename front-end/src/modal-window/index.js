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

  onEnterHandle = event => {
    if (event.key === 13 || event.which === 13) {
      const { userName, key } = this.state;
      this.props.onKeyChanged(key);
      this.props.onUserNameChanged(userName);
    }
  };

  render() {
    return (
      <div className={styles.modalWindow}>
        <div>
          <div className={styles.content}>Username:</div>
          <input
            autoFocus
            required
            name="userName"
            className={styles.moduleInput}
            onKeyUp={this.onEnterHandle}
            onChange={this.onInputChange}
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.content}>Secret Key:</div>
          <input
            required
            name="key"
            className={styles.moduleInput}
            onKeyUp={this.onEnterHandle}
            onChange={this.onInputChange}
          />
        </div>
      </div>
    );
  }
}

export default ModalWindow;
