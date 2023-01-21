import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { Ellipsis, SearchIcon } from "./svg";
import { LeftSidebar, Messenger, RightSidebar } from "./";

const Layout = ({ children, title }) => {
  const dispatch = useDispatch();

  // router
  const navigate = useNavigate();

  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  // logout button
  const logout = () => {
    dispatch(userLogout());
  };

  // kick us to login if we are not authenticated
  useEffect(() => {
    if (!loading && !authenticate) {
      navigate("/login");
    }
  }, [loading, authenticate]);

  return (
    <>
      <div className="flex w-screen h-screen jusify-between overflow-hidden">
        {/* LEFT SIDEBAR */}
        <LeftSidebar />

        {/* MAIN */}
        <main className="fill-available">
          <Messenger />
        </main>

        {/* RIGHT SIDEBAR */}
        <RightSidebar />
      </div>
    </>
  );
};

export default Layout;
