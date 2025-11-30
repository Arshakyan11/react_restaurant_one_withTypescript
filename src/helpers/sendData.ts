import { nanoid } from "nanoid";
import {
  addingReserveTable,
  addingWishlistToData,
  checkingUserExisting,
  creatingUserData,
  sendingMessage,
  updatingProfileInformation,
} from "../store/api/api";
import { ROUTES } from "../Routes";
import { AppDispatch } from "../store/store";
import {
  CheckUserSendingDataType,
  ContactFormValuesTypes,
  CreateUserDataType,
  FormHelpers,
  ReserveTableInfoType,
  SendingWatchListTyoe,
  UpdateDataOnProfileType,
} from "../types/formTypes";
import { NavigateFunction } from "react-router-dom";
import { WishList } from "../types";

export const createDataContact = (
  e: ContactFormValuesTypes,
  form: FormHelpers,
  dispatch: AppDispatch
) => {
  const { name, lastname, email, subject, message } = e;
  const data = {
    id: nanoid(3),
    name,
    lastname,
    email,
    subject,
    message,
  };
  dispatch(sendingMessage(data));
  form.resetForm();
};

export const createUserData = (
  event: CreateUserDataType,
  form: FormHelpers,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  const { userName, phoneNumber, email, password } = event;
  const data = {
    id: nanoid(7),
    userName,
    phoneNumber,
    email,
    password,
    wishList: [] as WishList[],
    totalCheckPrice: "0.000",
  };
  navigate(`/${ROUTES.LOGIN}`);
  dispatch(creatingUserData(data));
  form.resetForm();
};

export const checkUserSendingData = (
  event: CheckUserSendingDataType,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  const { email, password } = event;
  const data = {
    email,
    password,
    navigate,
  };
  dispatch(checkingUserExisting(data));
};

export const reserveTableInfo = (
  event: ReserveTableInfoType,
  form: FormHelpers,
  dispatch: AppDispatch
) => {
  dispatch(addingReserveTable(event));
  form.resetForm();
};

export const updateDataOnProfile = (
  event: UpdateDataOnProfileType,
  form: FormHelpers,
  dispatch: AppDispatch
) => {
  dispatch(updatingProfileInformation(event));
  form.resetForm();
};

export const sendingWatchList = (
  dispatch: AppDispatch,
  item: SendingWatchListTyoe
) => {
  dispatch(
    addingWishlistToData({
      id: item.mealId,
      name: item.label,
      price: item.price,
      calories: item.calories,
      img: item.images?.REGULAR.url,
      count: 1,
    })
  );
};
