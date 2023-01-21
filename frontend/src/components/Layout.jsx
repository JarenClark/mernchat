import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";

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
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <header className="border-b">
          <div className="flex items-center justify-between px-8">
            <div className="p-4">
              <h1 className="text-center">chat...</h1>
            </div>
            <div className="inline-flex space-x-4 py-4">
              {authenticate && (
                <button
                  onClick={logout}
                  style={{
                    backgroundImage: `url(/images/${myInfo.image})`,
                  }}
                  className="bg-cover bg-center p-8  rounded-full"
                ></button>
              )}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>

      <footer className="border-t py-4"></footer>
    </div>
  );
};

export default Layout;
