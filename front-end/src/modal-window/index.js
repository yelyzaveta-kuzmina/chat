import React from "react";
import styles from "./styles.module.scss";

class ModalWindow extends React.Component {
  onUsernameHandle = event => {
    if (event.key === 13 || event.which === 13) {
      this.props.onUserNameChanged(event.target.value);
    }
  };

  onKeyHandle = event => {
    if (event.key === 13 || event.which === 13) {
      this.props.onKeyChanged(event.target.value);
    }
  };

  render() {
    return (
      <div className={styles.modalWindow}>
        <div>
          <div className={styles.content}>Username: </div>
          <input
            autoFocus
            required
            className={styles.moduleInput}
            onKeyUp={this.onUsernameHandle}
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.content}>Secret Key : </div>
          <input
            required
            className={styles.moduleInput}
            onKeyUp={this.onKeyHandle}
          />
        </div>
      </div>
    );
  }
}

export default ModalWindow;
