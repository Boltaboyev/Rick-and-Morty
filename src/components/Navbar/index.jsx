import React from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/img/logo.png"

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div
      className={styles["container"]}
    >
      <img className={styles["img"]} src={logo} alt="" />
      <div className={styles["wrap"]}>
        <NavLink className={styles["item"]} to={"/"}>
          Episodes
        </NavLink>
        <NavLink className={styles["item"]} to={"/characters"}>
          Characters
        </NavLink>
        <NavLink className={styles["item"]} to={"/location"}>
          Location
        </NavLink>
        <button className={styles["btn"]}>Todo</button>
      </div>
    </div>
  );
};

export default Navbar;
