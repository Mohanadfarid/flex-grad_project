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
            console.log(fooditem);
            return (
              <div>
                {searchCategory === "breakfast" ? (
                  <Food
                    key={index}
                    cardCategory={searchCategory}
                    foodObject={fooditem}
                  />
                ) : (
                  ""
                )}

                {searchCategory === "lunch" ? (
                  <Food
                    key={index}
                    cardCategory={searchCategory}
                    foodObject={fooditem}
                  />
                ) : (
                  ""
                )}

                {searchCategory === "dinner" ? (
                  <Food
                    key={index}
                    cardCategory={searchCategory}
                    foodObject={fooditem}
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
