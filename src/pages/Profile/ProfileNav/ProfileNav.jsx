import React from "react";
import "./ProfileNav.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../Routes";
import { FaUser } from "react-icons/fa";
import { LogOutFromAccount } from "../../../helpers/logOut.ts";
import { FaRightToBracket } from "react-icons/fa6";
const ProfileNav = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];
  const navigate = useNavigate();

  return (
    <nav className="miniNav">
      <div className="miniNavSec">
        <div className="topSide">
          <FaUser />
          <p>
            Welcome back! <br />
            {userInfo.userName ? userInfo.userName : null}
          </p>
          <p>
            Phone <br />
            {userInfo.phoneNumber ? userInfo.phoneNumber : null}
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
