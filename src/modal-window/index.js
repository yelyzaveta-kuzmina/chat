import React from "react";
import styles from "./styles.module.scss";

class ModalWindow extends React.Component {
  onKeyUpHandle = event => {
    if (event.key === 13 || event.which === 13) {
      this.props.onUserNameChanged(event.target.value);
    }
  };

  render() {
    return (
      <div className={styles.modalWindow}>
        <div className={styles.content}>Please, enter your nickname: </div>
        <input
          autoFocus
          className={styles.moduleInput}
          onKeyUp={this.onKeyUpHandle}
        />
      </div>
    );
  }
}

export default ModalWindow;
