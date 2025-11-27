import React, { useEffect } from "react";
import styles from "./LittleMenuSection.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchingLittleMenu } from "../../store/api/api";
import {
  gettAllInfo,
  setActiveCategory,
} from "../../store/littleMenuSlice/littleMenuSlice";
import { starRating } from "../Images";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import {
  getAllPagination,
  setInfoAboutPagination,
} from "../../store/PaginationSlice/paginationSlice";
import Aos from "aos";
import { notifyForError } from "../../helpers/notifyUser";
import { sendingWatchList } from "../../helpers/sendData";
import { ROUTES } from "../../Routes";

const LittleMenuSection = () => {
  const dispatch = useDispatch();
  const { data, loading, activeCategory } = useSelector(gettAllInfo);
  const { slicedData } = useSelector(getAllPagination);
  const userInfo = localStorage.getItem("userInfo");
  const categories = ["BBQ", "pizza", "sushi", "desserts top", "coffee drink"];
  const buttonNames = ["All Category", "Dinner", "Lunch", "Dessert", "Drink"];
  useEffect(() => {
    dispatch(fetchingLittleMenu("BBQ"));
    dispatch(setActiveCategory("BBQ"));
    Aos.init({ duration: 800 });
  }, []);

  useEffect(() => {
    dispatch(
      setInfoAboutPagination({
        data: data,
        postsPerPage: 6,
        currentPage: 1,
      })
    );
  }, [data]);

  const handleClick = (type) => {
    if (type !== activeCategory) {
      dispatch(fetchingLittleMenu(type));
      dispatch(setActiveCategory(type));
    }
  };
  return (
    <div className={styles.littleMenuSec} data-aos="fade-up">
      <p className={styles.mainText}>Our popular Menu</p>
      <div className={styles.foodType}>
        {categories?.map((each, ind) => {
          return (
            <button
              key={ind}
              className={`${styles.button} ${
                activeCategory === each ? styles.activeBtn : ""
              }`}
              onClick={() => handleClick(each)}
            >
              {buttonNames[ind]}
            </button>
          );
        })}
      </div>
      <div className={styles.allMenu}>
        {loading ? (
          <div className={styles.allLoaders}>
            <div className={styles.firstLine}>
              <span className={styles.loader}></span>
              <span className={styles.loader}></span>
              <span className={styles.loader}></span>
            </div>
            <div className={styles.firstLine}>
              <span className={styles.loader2}>L &nbsp; ading</span>
            </div>
          </div>
        ) : (
          slicedData?.map((each, index) => {
            let ingredients = each.ingredients.slice(0, 4);
            return (
              <div key={index} className={styles.eachMenu} data-aos="fade-up">
                <img src={each.image} alt="img" className={styles.mealImg} />
                <div className={styles.infoOfMeal}>
                  <h2>{each.label}</h2>
                  <div className={styles.stars}>
                    <span>Rate:</span>
                    {each.starrArr?.map((_, i) => {
                      return <img key={i} src={starRating} alt="star" />;
                    })}
                  </div>
                  <div className={styles.ingredients}>
                    <h3>Ingredients:</h3>
                    <div className={styles.ingredientsName}>
                      {ingredients.map((elm, ind) => {
                        return <p key={ind}>{elm.food},</p>;
                      })}
                    </div>
                  </div>
                  <div className={styles.priceAndOrderNow}>
                    <div className={styles.priceBox}>
                      <span>Price:</span>
                      <p> ${each.price}</p>
                    </div>
                    {userInfo ? (
                      <button
                        onClick={() => {
                          sendingWatchList(dispatch, each);
                        }}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <Link
                        to={`/${ROUTES.LOGIN}`}
                        onClick={() =>
                          notifyForError("Login required to add to cart.")
                        }
                        className={styles.goLogin}
                      >
                        Add to Cart
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination length={data.length} />
    </div>
  );
};

export default LittleMenuSection;
