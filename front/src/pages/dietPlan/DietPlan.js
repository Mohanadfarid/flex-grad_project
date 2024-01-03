import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Apis from "../../api_handller.js";
import Food from "../../components/food/Food";
import { Nav } from "../../components/nav/Nav";
import styles from "./dietPlan.module.css";
import { useSelector } from "react-redux";

export const DietPlan = ({ currentPage, setcurrentPage, setUserData, IP }) => {

  setcurrentPage("dietplan");
  let navigate = useNavigate();
  useEffect(() => {
    // if (userData.calories < 200) {
    //   navigate("/");
    // }
  });
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);

  const generateDietplanHandller = async () => {
    if (
      JSON.parse(localStorage.getItem("userData")).breakfast.length >= 3 &&
      JSON.parse(localStorage.getItem("userData")).lunch.length >= 3 &&
      JSON.parse(localStorage.getItem("userData")).dinner.length >= 3
    ) {
      console.log("condition true");
      const res = await Apis.getData(`${userData._id}/dietplan`);
      console.log(await res);
      setUserData(await res); //to set the local storage

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
      <Nav
        currentPage={currentPage}
        token={localStorage.getItem("token")}
        userData={
          localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : ""
        }
      />

      <div className={styles.dietPlan_container}>
        {userData.calories > 100 ? (
          <div>
            {userData.dietplan.length > 0 ? (
              <div>
                {" "}
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
                  {console.log(userData.dietplan[0].breakfast)}
                  {JSON.parse(
                    localStorage.getItem("userData")
                  ).dietplan[0].breakfast.map((food, index) => (
                    <Food
                      key={index}
                      cardCategory={"breakfast"}
                      foodObject={{
                        id: food.food_item.Food_id,
                        name: food.food_item.Food_name,
                        serving: `${Math.round(
                          food.food_item.preferred_serving * food.n
                        )} ${food.food_item.measuring_unit}`,
                        calories:
                          food.food_item.food_calories_per_preferred_serving *
                          food.n,
                        url: food.food_item.image,
                        category: food.food_item.category,
                      }}
                    />
                  ))}
                </div>
                <div className={styles.lunch}>
                  <h1>Lunch</h1>
                  <span className={styles.meal_calories}>
                    {calc_calories_for_meal("lunch")}
                  </span>
                  {JSON.parse(
                    localStorage.getItem("userData")
                  ).dietplan[0].lunch.map((food, index) => (
                    <Food
                      key={index}
                      cardCategory={"lunch"}
                      foodObject={{
                        id: food.food_item.Food_id,
                        name: food.food_item.Food_name,
                        serving: `${Math.round(
                          food.food_item.preferred_serving * food.n
                        )} ${food.food_item.measuring_unit}`,
                        calories:
                          food.food_item.food_calories_per_preferred_serving *
                          food.n,
                        url: food.food_item.image,
                        category: food.food_item.category,
                      }}
                    />
                  ))}
                </div>
                <div className={styles.dinner}>
                  <h1>Dinner</h1>
                  <span className={styles.meal_calories}>
                    {calc_calories_for_meal("dinner")}
                  </span>
                  {JSON.parse(
                    localStorage.getItem("userData")
                  ).dietplan[0].dinner.map((food, index) => (
                    <Food
                      key={index}
                      cardCategory={"dinner"}
                      foodObject={{
                        id: food.food_item.Food_id,
                        name: food.food_item.Food_name,
                        serving: `${Math.round(
                          food.food_item.preferred_serving * food.n
                        )} ${food.food_item.measuring_unit}`,
                        calories:
                          food.food_item.food_calories_per_preferred_serving *
                          food.n,
                        url: food.food_item.image,
                        category: food.food_item.category,
                      }}
                    />
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
