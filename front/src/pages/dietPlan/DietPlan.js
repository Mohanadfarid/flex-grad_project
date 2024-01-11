import { Link } from "react-router-dom";
import Food from "../../components/food/Food";
import { Nav } from "../../components/nav/Nav";
import styles from "./dietPlan.module.css";
import { useDispatch, useSelector } from "react-redux";
import { generateDietPlan } from "../../features/auth/authSlice.js";
import LoginGuard from "../../util/LoginGuard.js";

export const DietPlan = () => {
  const dispatch = useDispatch();
  const categories = ["breakfast", "lunch", "dinner"]; // to help render the 3 sections dynamically
  const { userData } = useSelector((state) => state.auth);

  const generateDietplanHandller = async () => {
    if (
      userData.breakfast.length >= 3 &&
      userData.lunch.length >= 3 &&
      userData.dinner.length >= 3
    ) {
      dispatch(generateDietPlan());
    } else
      alert(
        "you need atleast 3 food items in each category to be able to generate a diet plan"
      );
  };

  const calc_calories_for_meal = (meal) => {
    let total = 0;
    userData.dietplan[0][meal].forEach((breakfast_element) => {
      total +=
        breakfast_element.n *
        breakfast_element.food_item.food_calories_per_preferred_serving;
    });
    return Math.round(total);
  };

  const CalculateCaloriesFirst = 
    <div className={styles.container_for_calc_calories}>
      <h2 className={styles.calc_calories_first}>
        We need to calculate your calories first before we could generate your
        dietplan
      </h2>{" "}
      <Link to={"../infoForm"}>
        <button>GET STARTED NOW</button>
      </Link>
    </div>
  

  return (
    <div>
      <Nav />

      <div className={styles.dietPlan_container}>
        {userData.calories > 100 ? (
          <div>
            {userData.dietplan.length > 0 && (
              <div>
                <h2 className={styles.tcalories}>
                  your total calories{" "}
                  <span className={styles.ncalories}>
                    {Math.round(userData.calories)}
                  </span>
                </h2>

                {categories.map((category, index) => (
                  <div key={index} className={styles[category]}>
                    <h1>{category}</h1>{" "}
                    <span className={styles.meal_calories}>
                      {calc_calories_for_meal(category)}
                    </span>
                    {userData.dietplan[0][category].map((food, index) => (
                      <Food
                        key={index}
                        cardCategory={category}
                        foodObject={food.food_item}
                        N={food.n}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div className={styles.gBtnContainer}>
              <button
                className={styles.generateBtn}
                onClick={generateDietplanHandller}
              >
                Generate Diet Plan
              </button>
            </div>
          </div>
        ) : CalculateCaloriesFirst}
      </div>
    </div>
  );
};

export default LoginGuard(DietPlan);
