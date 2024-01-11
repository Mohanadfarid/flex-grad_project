import styles from "./nav.module.css";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData } from "../../features/auth/authSlice.js";

export const Nav = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);
  const [show_nav_on_mobile, setshow_nav_on_mobile] = useState(false);

  const logoutHandller = () => {
    console.log(" i was clicked");
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <nav
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

      <NavLink
        to="/"
        className={`${styles.navLink} ${show_nav_on_mobile ? styles.show : ""}`}
      >
        Home
      </NavLink>

      {isUserLoggedIn && (
        <NavLink
          to="/profile"
          className={` ${styles.navLink} ${
            show_nav_on_mobile ? styles.show : ""
          }`}
        >
          {userData.name}
        </NavLink>
      )}

      {isUserLoggedIn && (
        <NavLink
          to="/dietplan"
          className={`${styles.navLink}${
            show_nav_on_mobile ? styles.show : ""
          }`}
        >
          Diet Plan
        </NavLink>
      )}

      {isUserLoggedIn && (
        <NavLink
          to="/favorite"
          className={` ${styles.navLink}${
            show_nav_on_mobile ? styles.show : ""
          }`}
        >
          My Favorite Food
        </NavLink>
      )}

      <NavLink
        to="/search"
        className={`${styles.navLink} ${show_nav_on_mobile ? styles.show : ""}`}
      >
        Search
      </NavLink>

      <div className={styles.getstarted}>
        {isUserLoggedIn ? (
          <button
            className={`${styles.login_logout} ${
              show_nav_on_mobile ? styles.show : ""
            }`}
          >
            <div onClick={logoutHandller}>Logout</div>
          </button>
        ) : (
          <NavLink
            className={`${styles.login_logout} ${
              show_nav_on_mobile ? styles.show : ""
            }`}
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};
