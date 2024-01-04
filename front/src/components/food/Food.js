import styles from "./food.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourit,
  removeFromFavourit,
} from "../../features/auth/authSlice.js";

export const Food = ({ N = 1, foodObject, cardCategory }) => {
  const dispatch = useDispatch();
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);

  const isCurrentFoodLiked = () => {
    if (
      userData[`fav${cardCategory}`].filter(
        (favitem) => foodObject.Food_id === favitem.Food_id
      ).length > 0
    ) {
      return true;
    }
    return false;
  };

  const CardButton = () => {
    const Liked = isCurrentFoodLiked();
    return (
      <>
        <div
          className={styles.like_container}
          onClick={Liked ? dislikeClickHandller : likeClickHandller}
        >
          <div className={styles.like_text}>{Liked ? "Delete" : "Add"}</div>
          <i className={`${Liked ? "fa-solid" : "fa-regular"} fa-heart`}></i>
        </div>
      </>
    );
  };

  const likeClickHandller = async () => {
    const pickedFood = { breakfast: [], lunch: [], dinner: [] };
    dispatch(
      addToFavourit({ ...pickedFood, [cardCategory]: [foodObject.Food_id] })
    );
  };

  const dislikeClickHandller = () => {
    dispatch(
      removeFromFavourit({
        [cardCategory]: foodObject.Food_id,
      })
    );
  };

  return (
    <div className={styles.food_container}>
      <img src={`${foodObject.image}`} alt="" />
      <p className={styles.name_text}>{foodObject.Food_name}</p>
      <p className={styles.serving_text}>
        serving:
        {`${(foodObject.preferred_serving * N).toFixed(2)} ${
          foodObject.measuring_unit
        }`}
      </p>
      <p className={styles.calories_text}>
        calories {' '}
        {Math.round(foodObject.food_calories_per_preferred_serving * N)}
      </p>

      {isUserLoggedIn && (
        <div>
          <CardButton />
        </div>
      )}
    </div>
  );
};

export default Food;
