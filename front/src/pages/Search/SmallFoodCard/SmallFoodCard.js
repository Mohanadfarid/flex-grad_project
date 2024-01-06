import React from "react";
import styles from "./SmallFoodCard.module.css";
import { useDispatch } from "react-redux";
import { removeFromFavourit } from "../../../features/auth/authSlice";

const SmallFoodCard = ({ foodcategory, foodObject }) => {
  const dispatch = useDispatch();

  const dislikeClickHandller = () => {
    dispatch(
      removeFromFavourit({
        [foodcategory]: foodObject.Food_id,
      })
    );
  };

  return (
    <div className={styles.card}>
      <img src={foodObject.image} alt="food" />
      <div className={styles.name}>{foodObject.Food_name}</div>
      <button onClick={dislikeClickHandller} className={styles.removeBtn}>
        remove
      </button>
    </div>
  );
};

export default SmallFoodCard;
