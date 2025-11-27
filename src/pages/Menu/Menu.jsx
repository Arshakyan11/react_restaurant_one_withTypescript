import React, { useEffect, useRef } from "react";
import styles from "./Menu.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import {
  dessertsAndDrinks,
  mealTime,
  priceRanges,
  topCategories,
} from "../../data/menuData";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuInfo,
  setFilterBoxStatus,
  setFilteredDataByPrice,
} from "../../store/MenuSlice/MenuSlice";
import { fetchingGlobalMenu } from "../../store/api/api";
import { starRating } from "../../components/Images";
import { nanoid } from "nanoid";
import {
  getAllPagination,
  setInfoAboutPagination,
} from "../../store/PaginationSlice/paginationSlice";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";
import Aos from "aos";
import { notifyForError } from "../../helpers/notifyUser";
import { sendingWatchList } from "../../helpers/sendData";
import BuyingItemsList from "../../components/BuyingItemsList/BuyingItemsList";

const Menu = () => {
  const dispatch = useDispatch();
  const {
    selectedItems,
    selectedParams,
    filterActivated,
    loading,
    filteredData,
    isOpenFilterBox,
    filterInfo,
  } = useSelector(getAllMenuInfo);

  const isPriceSelected = (min, max) => {
    return filterActivated && filterInfo[0] === min && filterInfo[1] === max;
  };
  const { slicedData } = useSelector(getAllPagination);
  const displayData = filterActivated ? filteredData : slicedData;
  const userInfo = localStorage.getItem("userInfo");
  const h3Ref = useRef();

  useEffect(() => {
    dispatch(fetchingGlobalMenu("BreakFast"));
    Aos.init({ duration: 800 });
  }, []);
  useEffect(() => {
    if (window.innerWidth <= 690) {
      dispatch(setFilterBoxStatus(false));
    }
    // if (displayData.length > 0 && !didPaginate.current) {
    dispatch(
      setInfoAboutPagination({
        data: selectedItems,
        postsPerPage: 9,
        currentPage: 1,
      })
    );
    // }
  }, [selectedItems]);

  const goToTop = () => {
    window.scrollTo({
      top: h3Ref.current.offsetTop - 100,
      behavior: "smooth",
    });
  };
  const handleMenuChoosing = (query) => {
    if (query != selectedParams) {
      dispatch(fetchingGlobalMenu(query));
      goToTop();
    }
  };

  const handleFilteringData = (min, max, filterArg = true) => {
    dispatch(setFilteredDataByPrice({ min, max, filterArg }));
    goToTop();
  };

  return (
    <section className={styles.menuSec}>
      <div className={styles.container}>
        <div className={styles.restaurantMenu}>
          <div className={styles.tutorialMenu}>
            <span>Eriso</span>
            <h2>
              View Our <br /> New Menu
            </h2>
            <p>The freshest ingredients for you every day</p>
          </div>
          <h3 className={styles.menuTitle} ref={h3Ref}>
            Menu
          </h3>
          <div className={styles.filtersAndMeals} data-aos="fade-up">
            <div className={styles.filterBox}>
              <div className={styles.firstLineFilter}>
                <h2>Filters</h2>
                <button
                  onClick={() => dispatch(setFilterBoxStatus(!isOpenFilterBox))}
                >
                  ⬇️
                </button>
              </div>
              {isOpenFilterBox && (
                <div className={styles.forBackground}>
                  <div className={styles.filtersMain}>
                    <ul className={styles.mealTime}>
                      <h2>MealTime</h2>
                      {mealTime.map((elm) => {
                        return (
                          <li
                            key={elm}
                            onClick={() => handleMenuChoosing(elm)}
                            className={
                              selectedParams === elm
                                ? styles.activatedMenuFilter
                                : ""
                            }
                          >
                            {elm}
                          </li>
                        );
                      })}
                    </ul>
                    <ul className={styles.mealTime}>
                      <h2>Top Categories</h2>
                      {topCategories.map((elm) => {
                        return (
                          <li
                            key={elm}
                            onClick={() => handleMenuChoosing(elm)}
                            className={
                              selectedParams === elm
                                ? styles.activatedMenuFilter
                                : ""
                            }
                          >
                            {elm}
                          </li>
                        );
                      })}
                    </ul>
                    <ul className={styles.mealTime}>
                      <h2>Desserts & Drinks</h2>
                      {dessertsAndDrinks.map((elm) => {
                        return (
                          <li
                            key={elm}
                            onClick={() => handleMenuChoosing(elm)}
                            className={
                              selectedParams === elm
                                ? styles.activatedMenuFilter
                                : ""
                            }
                          >
                            {elm}
                          </li>
                        );
                      })}
                    </ul>
                    <ul className={styles.mealTime}>
                      <h2>By Price</h2>
                      {priceRanges.map((elm, ind) => {
                        return (
                          <li
                            key={ind}
                            className={
                              isPriceSelected(elm.min, elm.max)
                                ? styles.activatedMenuFilterPrice
                                : ""
                            }
                            onClick={() =>
                              handleFilteringData(elm.min, elm.max)
                            }
                          >
                            {elm.label}
                          </li>
                        );
                      })}
                      <li onClick={() => handleFilteringData(0, 1000, false)}>
                        Remove the price filter
                      </li>
                    </ul>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(setFilterBoxStatus(!isOpenFilterBox));
                      goToTop();
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            {loading ? (
              <div className={styles.allLoaders}>
                <span className={styles.loader}></span>
                <span className={styles.loader}></span>
                <span className={styles.loader}></span>
                <span className={styles.loader}></span>
                <span className={styles.loader}></span>
              </div>
            ) : (
              <div className={styles.menuBox}>
                <div className={styles.allMenuIngredients}>
                  {displayData?.map((elm) => {
                    const each = elm.recipe;
                    return (
                      <div key={nanoid(4)} className={styles.eachMenu}>
                        <img
                          src={each.images?.REGULAR.url}
                          alt="img"
                          className={styles.mealImg}
                        />
                        <Link
                          className={styles.infoMore}
                          to={`/${ROUTES.MENU}/eachProduct/${each.label}`}
                          state={{ data: elm }}
                        >
                          More Info
                        </Link>
                        <div className={styles.infoOfMeal}>
                          <h2>{each.label}</h2>
                          <div className={styles.stars}>
                            <div className={styles.onlyStars}>
                              {each.starrArr?.map((_, i) => {
                                return (
                                  <img key={i} src={starRating} alt="star" />
                                );
                              })}
                            </div>
                            <p> {each.price}$</p>
                          </div>
                          <div className={styles.onlyWeight}>
                            <p>{each.totalWeight.toFixed(1)}g</p>
                            <p>Weight</p>
                          </div>
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
                    );
                  })}
                </div>
                {/* <Pagination length={displayData.length} /> */}
                <Pagination length={selectedItems.length} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.cartWrapper}>
          <BuyingItemsList />
        </div>
      </div>
    </section>
  );
};

export default Menu;
