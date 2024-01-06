import React, { useState } from "react";
import styles from "./search.module.css";
import { Nav } from "../../components/nav/Nav";
import * as Apis from "../../api_handller.js";
import SmallFoodCard from "./SmallFoodCard/SmallFoodCard";
import { Result } from "./Result/Result";
import { useSelector } from "react-redux";

const Search = () => {
  const categories = ["breakfast", "lunch", "dinner"];

  const { userData, isUserLoggedIn } = useSelector((state) => state.auth);

  const [input, setinput] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [searchCategory, setsearchCategory] = useState("breakfast");

  const inputHandller = async (e) => {
    e.preventDefault();
    setinput(e.target.value);
    const result = await Apis.getData(`search/${e.target.value}`);
    setsearchResult(await result);
  };

  const setSearchCategoryHandler = (category) => {
    setsearchCategory(category);
    setinput("");
    setsearchResult([]);
  };

  return (
    <div className={styles.container}>
      <Nav currentPage={"search"} />

      <div className={styles.pageBody}>
        <div className={styles.mainContent}>
          <h2>start adding your favorite food now !</h2>
          <div className={styles.formController}>
            <input
              autoFocus
              required
              className={styles.search_bar}
              value={input}
              placeholder="Search For Food..."
              type="text"
              onChange={inputHandller}
            ></input>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          {/* showing the categoris if the user is loggedin */}
          {isUserLoggedIn && (
            <div>
              <h2 className={styles.text1}>
                where would you like to add your food to?
              </h2>
              <div className={styles.btns_container}>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`${styles.btn} ${
                      searchCategory === category ? styles.chosen : ""
                    }`}
                    onClick={() => {
                      setSearchCategoryHandler(category);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className={styles.note}>
            note make sure you are logged in so you can add or remove food
          </p>

          <div className={styles.search_Result_Container}>
            {searchResult?.length > 0 && (
              <Result
                searchResult={searchResult}
                searchCategory={searchCategory}
              />
            )}
          </div>
        </div>

        {isUserLoggedIn && (
          <div className={`${styles.rSlider} ${styles.hideFromMobile}`}>
            <h3 className={styles.favheadder}>
              your favorite {searchCategory} food
            </h3>

            {userData[`fav${searchCategory}`].map((fooditem, idx) => (
              <SmallFoodCard
                key={idx}
                foodObject={fooditem}
                foodcategory={searchCategory}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
