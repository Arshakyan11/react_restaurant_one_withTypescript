import React from "react";
import "./ProfileNav.scss";
import { NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Routes";
import { FaUser } from "react-icons/fa";
import { LogOutFromAccount } from "../../../helpers/logOut";
import { FaRightToBracket } from "react-icons/fa6";
import { getLocalUserStrict } from "../../../store/api/api";
const ProfileNav = () => {
  const userInfo = getLocalUserStrict();
  const navigate: NavigateFunction = useNavigate();
  return (
    <nav className="miniNav">
      <div className="miniNavSec">
        <div className="topSide">
          <FaUser />
          <p>
            Welcome back! <br />
            {userInfo?.userName}
          </p>
          <p>
            Phone <br />
            {userInfo?.phoneNumber}
          </p>
        </div>
        <div className="bottomSide">
          <NavLink to={`/${ROUTES.PROFILE}`} end>
            Profile
          </NavLink>
          <NavLink to={`${ROUTES.PROFILERESERVEDATE}`}>Reservations</NavLink>
          <NavLink to={`${ROUTES.PROFILEWISHLIST}`}>Wishlist</NavLink>
          <button
            onClick={() => {
              LogOutFromAccount(navigate);
            }}
          >
            <FaRightToBracket />
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;
