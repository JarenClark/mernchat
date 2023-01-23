import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { Ellipsis, Pencil, SearchIcon } from "./svg";

const LeftSidebar = (props) => {
  const { currentFriend, setcurrentFriend } = props;
  const dispatch = useDispatch();

  // router
  const navigate = useNavigate();

  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  const { friends } = useSelector((state) => state.messenger);

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
          <div className="bg-zinc-700 hover:bg-black p-2 rounded-full">
            <Ellipsis />
          </div>
          <div className="bg-zinc-700 hover:bg-black p-2 rounded-full">
            <Pencil />
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
      {friends && friends.length > 0 ? (
        <ul className="px-6 mb-4 pb-4 flex space-x-4 w-full overflow-x-auto">
          {friends.map((friend, i) => (
            <li key={i}>
              <div
                style={{
                  backgroundImage: `url(/images/${friend.image})`,
                }}
                className="relative w-12 h-12 rounded-full bg-cover bg-center"
              >
                <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1"></div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-6 py-4">
          <p>No other users online</p>
        </div>
      )}

      {/* USERS LIST */}
      <ul
        id="friend-list"
        style={{ maxHeight: `70vh` }}
        className="overflow-y-auto overflow-x-hidden  border-t  border-zinc-700"
      >
        {friends.map((friend, i) => (
          <li
            key={i}
            className={` pr-4 cursor-pointer border-b hover:bg-black ${
              currentFriend != null && currentFriend._id == friend._id
                ? `bg-black`
                : ``
            } border-zinc-700`}
          >
            <button
              className="text-left px-6 py-4 flex overflow-hidden items-center space-x-4"
              onClick={() => setcurrentFriend(friend)}
            >
              <div
                style={{
                  backgroundImage: `url(/images/${friend.image})`,
                }}
                className="w-16 h-16 rounded-full bg-cover bg-center"
              ></div>
              <div>
                <h3 className="font-bold">{friend.userName}</h3>
                <p className="text-zinc-500 truncate">
                  Lorem ipsum dolor, sit amet text-ellipsis elit...
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
