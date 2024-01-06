import React from "react";
import Food from "../../../components/food/Food";
export const Result = ({ searchResult, searchCategory }) => {
  return (
    <>
      {searchResult.map((fooditem, index) => {
        return (
          <Food
            key={index}
            cardCategory={searchCategory}
            foodObject={fooditem}
          />
        );
      })}
    </>
  );
};
