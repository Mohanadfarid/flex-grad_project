import React from "react";
import Food from "../../../components/food/Food";
import { useSelector } from "react-redux";
export const Result = ({
  foodcategory,
  searchResult,
  searchCategory,
  setUserData,
}) => {
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);
  return (
    <>
      {searchResult
        ? searchResult.map((fooditem, index) => {
            return (
              <div>
                {searchCategory === "breakfast" ? (
                  <Food
                    key={index}
                    cardCategory={searchCategory}
                    foodObject={{
                      id: fooditem.Food_id,
                      name: fooditem.Food_name,
                      serving: `${fooditem.preferred_serving} ${fooditem.measuring_unit}`,
                      calories: fooditem.food_calories_per_preferred_serving,
                      url: fooditem.image,
                      category: fooditem.category,
                    }}
                  />
                ) : (
                  ""
                )}

                {searchCategory === "lunch" ? (
                  <Food
                    key={index}
                    cardCategory={searchCategory}
                    foodObject={{
                      id: fooditem.Food_id,
                      name: fooditem.Food_name,
                      serving: `${fooditem.preferred_serving} ${fooditem.measuring_unit}`,
                      calories: fooditem.food_calories_per_preferred_serving,
                      url: fooditem.image,
                      category: fooditem.category,
                    }}
                  />
                ) : (
                  ""
                )}

                {searchCategory === "dinner" ? (
                  <Food
                    key={index}
                    cardCategory={searchCategory}
                    foodObject={{
                      id: fooditem.Food_id,
                      name: fooditem.Food_name,
                      serving: `${fooditem.preferred_serving} ${fooditem.measuring_unit}`,
                      calories: fooditem.food_calories_per_preferred_serving,
                      url: fooditem.image,
                    }}
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })
        : ""}
    </>
  );
};
