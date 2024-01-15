import Food from "../../components/food/Food";
import styles from "./favorite.module.css";
import { Link } from "react-router-dom";
import { Nav } from "../../components/nav/Nav";
import { useSelector } from "react-redux";
import WithGuardFrom from "../../util/WithGuardFrom";
import { CATEGORIES, LOGGEDOUT } from "../../util/constants";

const Favorite = () => {
  const { userData } = useSelector((state) => state.auth);

  const doesUserHaveFavFood =
    userData.favbreakfast.length > 0 ||
    userData.favlunch.length > 0 ||
    userData.favdinner.length > 0;

  const noFavFood = (
    <div className={styles.empty_fav_food_container}>
      <h2 className={styles.text}>
        ops it looks like you haven't added any food yet !
      </h2>
      <Link to={"../search"}>
        <button className={styles.btnnnn}>ADD FOOD NOW</button>
      </Link>
    </div>
  );

  return (
    <>
      <Nav />

      <div className={styles.container}>
        {doesUserHaveFavFood ? (
          <div className={styles.favfood_container}>
            {CATEGORIES.map(
              (category, index) =>
                userData[`fav${category}`].length > 0 && (
                  <div key={index}>
                    <h2>your favorite {category} food</h2>
                    <div className={styles.b_l_c_container}>
                      {userData[`fav${category}`].map((fooditem, index) => (
                        <Food
                          key={index}
                          cardCategory={category}
                          foodObject={fooditem}
                        />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          noFavFood
        )}
      </div>
    </>
  );
};

export default WithGuardFrom(Favorite,LOGGEDOUT);
