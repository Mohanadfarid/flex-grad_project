import Food from "../../components/food/Food";
import styles from "./favorite.module.css";
import { Link } from "react-router-dom";
import { Nav } from "../../components/nav/Nav";
import { useSelector } from "react-redux";

const Favorite = ({ currentPage, setcurrentPage, setUserData }) => {
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);
  setcurrentPage("favorite");
  return (
    <div>
      <Nav
        currentPage={currentPage}
        token={localStorage.getItem("token")}
        userData={
          localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : ""
        }
      />

      <div className={styles.container}>
        {userData.favbreakfast.length === 0 &&
        userData.favlunch.length === 0 &&
        userData.favdinner.length === 0 ? (
          <div className={styles.empty_fav_food_container}>
            <h2 className={styles.text}>
              ops it looks like you haven't added any food yet !
            </h2>
            <Link to={"../search"}>
              <button className={styles.btnnnn}>ADD FOOD NOW</button>
            </Link>
          </div>
        ) : (
          <div className={styles.favfood_container}>
            <h2>your favorite breakfast food</h2>
            <div className={styles.b_l_c_container}>
              {userData.favbreakfast.map((fooditem, index) => {
                return fooditem ? (
                  <Food
                    key={index}
                    cardCategory={"breakfast"}
                    foodObject={fooditem}
                  />
                ) : (
                  ""
                );
              })}
            </div>
            <h2>your favorite lunch food</h2>
            <div className={styles.b_l_c_container}>
              {userData.favlunch.map((fooditem, index) => {
                return fooditem ? (
                  <Food
                    key={index}
                    cardCategory={"lunch"}
                    foodObject={fooditem}
                  />
                ) : (
                  ""
                );
              })}
            </div>
            <h2>your favorite dinner food</h2>
            <div className={styles.b_l_c_container}>
              {userData.favdinner.map((fooditem, index) => {
                return fooditem ? (
                  <Food
                    key={index}
                    cardCategory={"dinner"}
                    foodObject={fooditem}
                  />
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
