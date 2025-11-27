import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosStatic } from "axios";
import { notifyForError, notifyForSMth } from "../../helpers/notifyUser";
import { ROUTES } from "../../Routes";
import { setEmailManualy } from "../ProfileSlice/ProfileSlice";
import { setUserInfoManualy } from "../ReservationSlice/ReservationSlice";
import { nanoid } from "nanoid";
import { setUserInfo } from "../AuthSlice/AuthSlice";
import {
  DataOflittleMenuType,
  DataOfSearchingMenuType,
  EdamamHit,
  EdamamHitForSearch,
} from "../../types/apiHandlingTypes";
import { ContactFormValuesWithId } from "../../types/formTypes";

const instant = axios.create({
  timeoutErrorMessage: "Error 404",
  timeout: 10000,
  headers: {
    "Edamam-Account-User": "myrestaurant123",
  },
});

function spreedProperties(elm: EdamamHit) {
  return {
    label: elm.recipe.label,
    ingredients: elm.recipe.ingredients,
    image: elm.recipe.images?.REGULAR.url,
  };
}

function spreedPropertiesWidely(elm: EdamamHitForSearch) {
  return {
    label: elm.recipe.label,
    ingredients: elm.recipe.ingredients,
    image: elm.recipe.images?.REGULAR.url,
    calories: elm.recipe.calories,
    totalWeight: elm.recipe.totalWeight,
    cuisineType: elm.recipe.cuisineType,
    dietLabels: elm.recipe.dietLabels,
    mealType: elm.recipe.mealType,
  };
}

const localStorageContacts = axios.create({
  timeoutErrorMessage: "Error 404",
  timeout: 10000,
  baseURL: "http://localhost:8000/usersMessage",
});

export const fetchingLittleMenu = createAsyncThunk<
  DataOflittleMenuType[],
  string,
  { rejectValue: string }
>("littleMenu/fetchingLittleMenu", async (query, { rejectWithValue }) => {
  try {
    const res = await instant.get<{ hits: EdamamHit[] }>(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&diet=balanced&app_id=${process.env.REACT_APP_FOODS_API_ID}&app_key=${process.env.REACT_APP_FOODS_API_KEY}`
    );
    let response = res.data.hits;
    if (response.length > 16) {
      response.length = 12;
    }
    const finalResult: DataOflittleMenuType[] = response.map((elm) => ({
      price: (Math.random() * 55 + 2).toFixed(2),
      starrArr: [...Array(Math.round(Math.random() * 2 + 3))].map(
        (_, i) => i + 1
      ),
      mealId: nanoid(4),
      ...spreedProperties(elm),
    }));
    return finalResult;
  } catch (error: unknown) {
    return rejectWithValue("Error 404");
  }
});

export const sendingMessage = createAsyncThunk<
  string,
  ContactFormValuesWithId,
  { rejectValue: string }
>("ContactUsSlice/sendingMessage", async (data, { rejectWithValue }) => {
  try {
    localStorageContacts({ method: "POST", data: data });
    notifyForSMth("Message was send Successfuly");
    return "Success";
  } catch (error) {
    return rejectWithValue("Smth Went Wrong!");
  }
});

export const fetchingSearchMenu = createAsyncThunk<
  {
    queryName: string;
    data: DataOfSearchingMenuType[];
  },
  string,
  { rejectValue: string }
>("searching/fetchingSearchMenu", async (query, { rejectWithValue }) => {
  try {
    const res = await instant.get<{ hits: EdamamHitForSearch[] }>(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&diet=balanced&app_id=${process.env.REACT_APP_FOODS_API_ID}&app_key=${process.env.REACT_APP_FOODS_API_KEY}`
    );
    let response = res.data.hits;
    const finalResult: DataOfSearchingMenuType[] = response.map((elm) => ({
      starrArr: [...Array(Math.round(Math.random() * 2 + 3))].map((i) => i + 1),
      price: (Math.random() * 55 + 2).toFixed(2),
      mealId: nanoid(4),
      ...spreedPropertiesWidely(elm),
    }));
    return { queryName: query, data: finalResult };
  } catch (error) {
    return rejectWithValue("Error 404");
  }
});

export const fetchingGlobalMenu = createAsyncThunk<
  {
    response: DataOfSearchingMenuType[];
    query: string;
  },
  string,
  { rejectValue: string }
>("menu/fetchingGlobalMenu", async (query, { rejectWithValue }) => {
  try {
    const res = await instant.get<{ hits: EdamamHitForSearch[] }>(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&diet=balanced&app_id=${process.env.REACT_APP_FOODS_API_ID}&app_key=${process.env.REACT_APP_FOODS_API_KEY}`
    );

    let response = res.data.hits;
    const finalResult: DataOfSearchingMenuType[] = response.map((elm) => ({
      price: (Math.random() * 55 + 2).toFixed(2),
      starrArr: [...Array(Math.round(Math.random() * 2 + 3))].map(
        (_, i) => i + 1
      ),
      mealId: nanoid(4),
      ...spreedPropertiesWidely(elm),
    }));
    return { response: finalResult, query };
  } catch (error) {
    return rejectWithValue("Error 404 while getting Result");
  }
});

const localStorageUsers = axios.create({
  baseURL: "http://localhost:8000/users",
  timeout: 10000,
  timeoutErrorMessage: "Too much time for fetching data",
});

// const setingLocalStorageUserinfo = (dispatch, data) => {
//   localStorage.setItem("userInfo", JSON.stringify(data));
//   dispatch(setUserInfo(data));
// };
// const patchingUserDataToLocal = (id, data) => {
//   console.log(data, id);
//   return axios.patch(`http://localhost:8000/users/${id}`, data, {
//     timeout: 10000,
//     timeoutErrorMessage: "Too much time for fetching data",
//   });
// };

// export const creatingUserData = createAsyncThunk(
//   "registration/creatingUserData",
//   (arg, { rejectWithValue }) => {
//     try {
//       localStorageUsers({ method: "POST", data: arg });
//       notifyForSMth("Account Registered Successfuly");
//       return "Success";
//     } catch (error) {
//       return rejectWithValue("Cant Add User to list, PLs try again later");
//     }
//   }
// );

// export const checkingUserExisting = createAsyncThunk(
//   "login/checkingUserExisting",
//   async ({ data, dispatch }, { rejectWithValue }) => {
//     try {
//       const { email, password, navigate } = data;
//       const response = await localStorageUsers({ method: "GET" }).then(
//         (res) => res.data
//       );
//       const lastResult = await response.find(
//         (elm) => elm.email === email && elm.password === password
//       );
//       if (lastResult) {
//         localStorage.setItem("userInfo", JSON.stringify(lastResult));
//         await dispatch(setEmailManualy(email));
//         await dispatch(setUserInfoManualy(lastResult));
//         dispatch(setUserInfo(lastResult));
//         notifyForSMth("You Logged In");
//         navigate(ROUTES.HOME);
//         return true;
//       } else {
//         notifyForError("User not found");
//         return false;
//       }
//     } catch (error) {
//       return rejectWithValue("Error While Checking User");
//     }
//   }
// );

// export const addingReserveTable = createAsyncThunk(
//   "reservation/addingReserveTable",
//   async (obj, { dispatch, rejectWithValue }) => {
//     try {
//       let userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const response = await localStorageUsers().then((res) => res.data);
//       const findedUser = await response.find(
//         (elm) => elm.id === userInfo.id && !elm.reservation
//       );
//       if (findedUser) {
//         const reservation = {
//           reservation: obj,
//         };
//         patchingUserDataToLocal(`${findedUser["id"]}`, reservation);
//         const updatedData = {
//           ...userInfo,
//           reservation: obj,
//         };
//         setingLocalStorageUserinfo(dispatch, updatedData);
//         notifyForSMth("Reservation passed Successfuly");
//         return updatedData;
//       } else {
//         notifyForError(
//           "You have already had reservation, Go to Profile for concelation"
//         );
//         return false;
//       }
//     } catch (error) {
//       return rejectWithValue("Error 404");
//     }
//   }
// );

// export const deletingReservationTime = createAsyncThunk(
//   "reservation/deletingReservationTime",
//   async (_, { dispatch, rejectWithValue }) => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const response = await localStorageUsers({ url: userInfo.id }).then(
//         (res) => {
//           delete res.data.reservation;
//           return res.data;
//         }
//       );
//       localStorageUsers({
//         method: "PUT",
//         data: response,
//         url: userInfo.id,
//       });
//       localStorage.setItem("userInfo", JSON.stringify(response));
//       dispatch(setUserInfo(response));
//       notifyForSMth("Reservation deleted successfuly");
//       return response;
//     } catch (error) {
//       return rejectWithValue("Error while deleting Reservation");
//     }
//   }
// );

// export const updatingProfileInformation = createAsyncThunk(
//   "profile/updatingProfileInformation",
//   async (data, { dispatch, rejectWithValue }) => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (
//         data.userOldPass === userInfo.password &&
//         userInfo.password !== data.userNewPass
//       ) {
//         patchingUserDataToLocal(userInfo.id, {
//           password: data.userNewPass,
//         });
//         userInfo.password = data.userNewPass;
//         setingLocalStorageUserinfo(dispatch, userInfo);
//         notifyForSMth("Password Changed Successfuly");
//       } else if (
//         data.userOldPass === userInfo.password &&
//         userInfo.password === data.userNewPass
//       ) {
//         notifyForError("Password must be different from your current password");
//       } else {
//         notifyForError("The current password is incorrect");
//       }
//     } catch (error) {
//       return rejectWithValue("Error 404");
//     }
//   }
// );

// export const addingWishlistToData = createAsyncThunk(
//   "wishlist/addingWishlistToData",
//   async (wishObj, { dispatch, rejectWithValue }) => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const checkingExistingMeal = await localStorageUsers({
//         method: "GET",
//         url: userInfo.id,
//       }).then((res) => res.data?.wishList);
//       const isExisting = checkingExistingMeal.find(
//         (elm) => elm.name === wishObj.name && elm.calories === wishObj.calories
//       );

//       if (!isExisting) {
//         const updatedWishlist = [...(userInfo.wishList || []), wishObj];
//         let totalCount = updatedWishlist.reduce(
//           (acc, elm) => acc + +elm.price,
//           0
//         );
//         const newUserInfo = {
//           wishList: updatedWishlist,
//           totalCheckPrice: totalCount.toFixed(3),
//         };
//         patchingUserDataToLocal(userInfo.id, newUserInfo);
//         setingLocalStorageUserinfo(dispatch, {
//           ...userInfo,
//           ...newUserInfo,
//         });
//         notifyForSMth("Successfully added to Cart");
//         return updatedWishlist;
//       } else {
//         notifyForError("Item is already on wishlist!");
//         return userInfo.wishList;
//       }
//     } catch (error) {
//       return rejectWithValue("Error while adding Wishlist");
//     }
//   }
// );

// export const deleteWishListFromData = createAsyncThunk(
//   "wishlist/deleteWishListFromData",
//   async (mealId, { dispatch, rejectWithValue }) => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const response = await localStorageUsers({
//         method: "GET",
//         url: userInfo.id,
//       }).then((res) => {
//         return res.data;
//       });
//       const newWishList = response.wishList.filter((elm) => elm.id !== mealId);
//       let totalCount = newWishList.reduce(
//         (acc, elm) => acc + +elm.price * +elm.count,
//         0
//       );
//       const newUserInfo = {
//         wishList: newWishList,
//         totalCheckPrice: totalCount.toFixed(3),
//       };
//       patchingUserDataToLocal(userInfo.id, newUserInfo);
//       setingLocalStorageUserinfo(dispatch, {
//         ...userInfo,
//         ...newUserInfo,
//       });
//       notifyForError("Item Removed from Wishlist");
//       return newWishList;
//     } catch (error) {
//       return rejectWithValue("Error wFhile deleting data from WatchList");
//     }
//   }
// );

// export const changingCountOfItem = createAsyncThunk(
//   "miniBuyingList/changingCountOfItem",
//   async ({ mealId, type }, { dispatch, rejectWithValue }) => {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const response = await localStorageUsers({
//         method: "GET",
//         url: userInfo.id,
//       }).then((res) => {
//         return res.data.wishList;
//       });
//       const result = await response.map((elm) => {
//         if (
//           elm.id === mealId &&
//           elm.count + type > 0 &&
//           elm.count + type <= 10
//         ) {
//           elm.count += +type;
//         }
//         return elm;
//       });
//       let totalCount = result.reduce(
//         (acc, elm) => acc + +elm.price * +elm.count,
//         0
//       );
//       let newUserInfo = {
//         wishList: result,
//         totalCheckPrice: totalCount.toFixed(3),
//       };
//       patchingUserDataToLocal(userInfo.id, newUserInfo);
//       setingLocalStorageUserinfo(dispatch, {
//         ...userInfo,
//         ...newUserInfo,
//       });
//       return "Success";
//     } catch (error) {
//       return rejectWithValue("Error Happened while  changing Count");
//     }
//   }
// );
