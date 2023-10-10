import React, { useEffect, useState } from "react";
import { logOutAsync } from "../features/auth/authSlice";
import {  useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

const Nav = () => {
    const site = window.location.pathname;
  const dispatch = useDispatch();
  const [isActive, setisActive] = useState(false);
  
  

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 20 ? setisActive(true) : setisActive(false);
    });
  });

  const logout = () => {
    dispatch(logOutAsync());
  };

  return (
    <nav
      className={`
       w-full px-[40px] nav-animation fixed z-40  ${
        isActive || site !== "/user" ? "navActive" : ""
      }`}
    >
      <div className="flex h-[60px] mt-2 justify-between">
        <NavLink to="/" className="flex items-center ">
         <h3 className={`${isActive || site !== "/user" ? "text-black" : "text-white"} font-primary`}>Event</h3>
        </NavLink>
        <div
          className={`flex w-[70%] gap-4 items-center justify-end  font-primary text-sm ${
            isActive || site !== "/user" ? "text-black" : "text-white"
          }`}
        >
          <div
            className={`banner-btn relative hover:text-black cursor-pointer py-2 px-4 text-center w-[150px] border-[1px] ${
              isActive || site !== "/user" ? "border-black" : "border-white"
            }`}
          >
            order status
          </div>
          <NavLink to="/cart" className="cursor-pointer">
            Cart
          </NavLink>
          
             
              <div className="cursor-pointer" onClick={logout}>
                Log out
              </div>
           
        </div>
      </div>
    </nav>
  );
};

export default Nav;
