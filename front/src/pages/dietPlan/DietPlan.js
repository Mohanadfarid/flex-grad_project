import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Apis from "../../api_handller.js";
import Food from "../../components/food/Food";
import { Nav } from "../../components/nav/Nav";
import styles from "./dietPlan.module.css";
import { useSelector } from "react-redux";

export const DietPlan = () => {
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);

  const generateDietplanHandller = async () => {
    if (
      userData.breakfast.length >= 3 &&
      userData.lunch.length >= 3 &&
      userData.dinner.length >= 3
    ) {
      const res = await Apis.getData(`${userData._id}/dietplan`); // change later to use redux toolkit
    } else
      alert(
        "you need atleast 3 food items in each category to be able to generate a diet plan"
      );
  };

  const calc_calories_for_meal = (meal) => {
    let total = 0;
    if (meal === "breakfast") {
      userData.dietplan[0].breakfast.forEach((breakfast_element) => {
        total +=
          breakfast_element.n *
          breakfast_element.food_item.food_calories_per_preferred_serving;
      });
    } else if (meal === "lunch") {
      userData.dietplan[0].lunch.forEach((lunch_element) => {
        total +=
          lunch_element.n *
          lunch_element.food_item.food_calories_per_preferred_serving;
      });
    } else if (meal === "dinner") {
      userData.dietplan[0].dinner.forEach((dinner_element) => {
        total +=
          dinner_element.n *
          dinner_element.food_item.food_calories_per_preferred_serving;
      });
    }
    return Math.round(total);
  };

  return (
    <div>
      <Nav currentPage={`dietplan`} />

      <div className={styles.dietPlan_container}>
        {userData.calories > 100 ? (
          <div>
            {userData.dietplan.length > 0 ? (
              <div>
                <h2 className={styles.tcalories}>
                  your total calories{" "}
                  <span className={styles.ncalories}>
                    {Math.round(userData.calories)}
                  </span>
                </h2>
                <div className={styles.breakFast}>
                  <h1>BreakFast</h1>{" "}
                  <span className={styles.meal_calories}>
                    {calc_calories_for_meal("breakfast")}
                  </span>
                  {userData.dietplan[0].breakfast.map((food, index) => (
                    <Food
                      key={index}
                      cardCategory={"breakfast"}
                      foodObject={food.food_item}
                      N={food.n}
                    />
                  ))}
                </div>
                <div className={styles.lunch}>
                  <h1>Lunch</h1>
                  <span className={styles.meal_calories}>
                    {calc_calories_for_meal("lunch")}
                  </span>
                  {userData.dietplan[0].lunch.map((food, index) => (
                    <Food
                      key={index}
                      cardCategory={"lunch"}
                      foodObject={food.food_item}
                      N={food.n}
                    />
                  ))}
                </div>
                <div className={styles.dinner}>
                  <h1>Dinner</h1>
                  <span className={styles.meal_calories}>
                    {calc_calories_for_meal("dinner")}
                  </span>
                  {userData.dietplan[0].dinner.map((food, index) => (
                    <>
                      {console.log(food)}
                      <Food
                        key={index}
                        cardCategory={"dinner"}
                        foodObject={food.food_item}
                        N={food.n}
                      />
                    </>
                  ))}
                </div>
              </div>
            ) : (
              ""
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
        ) : (
          <div className={styles.container_for_calc_calories}>
            <h2 className={styles.calc_calories_first}>
              We need to calculate your calories first before we could generate
              your dietplan
            </h2>{" "}
            <Link to={"../infoForm"}>
              <button>GET STARTED NOW</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DietPlan;
