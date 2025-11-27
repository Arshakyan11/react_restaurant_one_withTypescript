import { NavigateFunction } from "react-router-dom";
import { ROUTES } from "../Routes";

export const LogOutFromAccount = (navigate: NavigateFunction): void => {
  localStorage.removeItem("userInfo");
  navigate(ROUTES.HOME, { replace: true });
  window.location.reload();
};
