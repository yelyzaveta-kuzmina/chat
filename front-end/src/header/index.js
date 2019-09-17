import React from "react";
import styles from "./styles.module.scss";

const Header = ({ userName }) => {
  return <div className={styles.header}>Hello {userName}!</div>;
};

export default Header;
