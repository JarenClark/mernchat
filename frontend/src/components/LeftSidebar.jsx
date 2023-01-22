import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { Ellipsis, SearchIcon } from "./svg";

const LeftSidebar = () => {
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
    <div className="h-screen overflow-hidden w-full max-w-md border-r border-zinc-700">
      {/** HEADER */}
      <div className="p-6 flex items-center justify-between">
        <div className="inline-flex items-center space-x-4">
          <div
            onClick={logout}
            style={{
              backgroundImage: `url(/images/${myInfo.image})`,
            }}
            className="w-16 h-16 rounded-full bg-cover bg-center"
          ></div>
          <h2 className="text-xl font-bold">Hi, {myInfo.userName}</h2>
        </div>

        <div className="inline-flex items-center space-x-2">
          <div className="bg-zinc-700 p-2 rounded-full">
            <Ellipsis />
          </div>
          <div className="bg-zinc-700 p-2 rounded-full">
            <Ellipsis />
          </div>
        </div>
      </div>

      {/* FRIEND SEARCH */}
      <div className="p-6">
        <div className="flex bg-zinc-700 rounded-full px-4 py-2 w-full overflow-hidden items-center space-x-2">
          <SearchIcon />
          <form className="fill-available">
            <input
              type="text"
              className="p-1 px-2 fill-available text-white bg-transparent"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>

      {/* ACTIVE FRIENDS LIST */}
      <ul className="px-6 mb-4 pb-4 flex space-x-4 w-full overflow-x-auto">
        {Array.from(Array(12).keys()).map((i) => (
          <li key={i}>
            <div
              style={{
                backgroundImage: `url(/images/${myInfo.image})`,
              }}
              className="relative w-12 h-12 rounded-full bg-cover bg-center"
            >
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1"></div>
            </div>
          </li>
        ))}
      </ul>

      {/* CHATS LIST */}
      <ul
        id="friend-list"
        style={{ maxHeight: `70vh` }}
        className="overflow-y-auto overflow-x-hidden  border-t  border-zinc-700"
      >
        {Array.from(Array(15).keys()).map((i) => (
          <li
            key={i}
            className={`px-6 border-b hover:bg-black border-zinc-700 py-4 flex items-center space-x-4`}
          >
            <div
              style={{
                backgroundImage: `url(/images/${myInfo.image})`,
              }}
              className="w-16 h-16 rounded-full bg-cover bg-center"
            ></div>
            <div>
              <h3 className="font-bold">{myInfo.userName}</h3>
              <p className="text-zinc-500 truncate">
                Lorem ipsum dolor, sit amet text-ellipsis elit...
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
