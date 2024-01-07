import styles from "./nav.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Apis from "../../api_handller.js";
import { useSelector } from "react-redux";

export const Nav = ({ currentPage }) => {
  let navigate = useNavigate();
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);
  const [show_nav_on_mobile, setshow_nav_on_mobile] = useState(false);

  const logoutHandller = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userData", "");
    Apis.getData("logout");
    navigate("/");
    window.location.reload(false);
  };
  const logout_btn = <button onClick={logoutHandller}>Logout</button>;
  return (
    <div
      className={`${styles.nav_body} ${
        show_nav_on_mobile ? styles.expand : ""
      }`}
    >
      <i
        className={`${
          show_nav_on_mobile ? "fa-solid fa-xmark" : "fa-solid fa-bars"
        } ${styles.expand_icon}`}
        onClick={() => {
          setshow_nav_on_mobile(!show_nav_on_mobile);
        }}
      ></i>

      <Link
        to="/"
        className={`${styles.navLink} ${
          currentPage === "home" ? `${styles.active}` : ""
        } ${show_nav_on_mobile ? styles.show : ""}`}
      >
        Home
      </Link>

      {isUserLoggedIn && (
        <Link
          to="/profile"
          className={`${styles.navLink} ${
            currentPage === "profile" ? `${styles.active}` : ""
          } ${show_nav_on_mobile ? styles.show : ""}`}
        >
          {userData.name}
        </Link>
      )}

      {isUserLoggedIn && (
        <Link
          to="/dietplan"
          className={`${styles.navLink} ${
            currentPage === "dietplan" ? `${styles.active}` : ""
          } ${show_nav_on_mobile ? styles.show : ""}`}
        >
          Diet Plan
        </Link>
      )}

      {isUserLoggedIn && (
        <Link
          to="/favorite"
          className={`${styles.navLink} ${
            currentPage === "favorite" ? `${styles.active}` : ""
          } ${show_nav_on_mobile ? styles.show : ""}`}
        >
          My Favorite Food
        </Link>
      )}

      <Link
        to="/search"
        className={`${styles.navLink} ${
          currentPage === "search" ? `${styles.active}` : ""
        } ${show_nav_on_mobile ? styles.show : ""}`}
      >
        Search
      </Link>

      <div className={styles.getstarted}>
        {isUserLoggedIn ? (
          <Link
            className={`${styles.login_logout} ${
              show_nav_on_mobile ? styles.show : ""
            }`}
            to="/profile"
          >
            {logout_btn}
          </Link>
        ) : (
          <Link
          onClick={()=>{console.log('login was clicked ')}} //debug code to be reomved later
            className={`${styles.login_logout} ${
              show_nav_on_mobile ? styles.show : ""
            }`}
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
