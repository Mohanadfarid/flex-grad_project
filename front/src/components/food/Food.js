import styles from "./food.module.css";
import * as Apis from "../../api_handller.js";
import { useSelector } from "react-redux";

export const Food = ({ foodObject, cardCategory }) => {
  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);

  const isCurrentFoodLiked = () => {
    if (
      userData[`fav${cardCategory}`].filter(
        (favitem) => foodObject.id === favitem.Food_id
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
    if (cardCategory === "breakfast") {
      const temp_userInfo = await Apis.putData(`${userData._id}/pickfood`, {
        breakfast: [foodObject.id],
        lunch: [],
        dinner: [],
      });
    } else if (cardCategory === "lunch") {
      const temp_userInfo = await Apis.putData(`${userData._id}/pickfood`, {
        breakfast: [],
        lunch: [foodObject.id],
        dinner: [],
      });
    } else if (cardCategory === "dinner") {
      const temp_userInfo = await Apis.putData(`${userData._id}/pickfood`, {
        breakfast: [],
        lunch: [],
        dinner: [foodObject.id],
      });
    }
  };

  const dislikeClickHandller = async () => {
    const temp_userInfo = await Apis.putData(`${userData._id}/removefood`, {
      cardCategory: foodObject.id,
    });
  };

  return (
    <div className={styles.food_container}>
      <img src={`${foodObject.url}`} alt="" />
      <p className={styles.name_text}>{foodObject.name}</p>
      <p className={styles.serving_text}>serving: {foodObject.serving}</p>
      <p className={styles.calories_text}>
        calories {Math.round(foodObject.calories)}
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
