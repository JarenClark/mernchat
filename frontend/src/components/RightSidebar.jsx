import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { Close, Ellipsis, SearchIcon } from "./svg";

const RightSidebar = (props) => {
  const { infoPanelIsOpen, setInfoPanelIsOpen, currentFriend } = props;

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
      {currentFriend && (
        <div className="relative">
          {infoPanelIsOpen && (
            <div
              onClick={() => setInfoPanelIsOpen(false)}
              className="fixed top-0 right-0 bottom-0 w-screen h-screen backdrop-blur-lg bg-black bg-opacity-50"
            ></div>
          )}
          <div
            className={`absolute right-0 top-0 w-[450px] bg-[#242424] h-screen ease transition duration-500 overflow-hidden 
      ${
        infoPanelIsOpen ? `translate-x-0` : `translate-x-full`
      } max-w-md border-l border-zinc-700`}
          >
            <div className="pt-8 pb-12 p-6 flex flex-col justify-center items-center border-b border-zinc-700 relative">
              <div
                style={{
                  backgroundImage: `url(/images/${currentFriend.image})`,
                }}
                className="w-40 h-40 rounded-full bg-cover bg-center"
              ></div>

              <div className="mt-4 text-center">
                <div className="text-lg font-bold text-green-500 ">Active</div>
                <div className="text-2xl font-bold">{currentFriend.userName}</div>
              </div>

              {infoPanelIsOpen && (
                <div className="absolute top-0 right-0 px-6 py-9">
                  <button
                    onClick={() => setInfoPanelIsOpen(false)}
                    className="bg-zinc-700 p-2 rounded-full hover:bg-black"
                  >
                    <Close />
                  </button>
                </div>
              )}
            </div>

            <div className="px-6">
              <h3 className="my-4 text-lg font-bold">Shared Media</h3>
            </div>
            <div className="overflow-y-scroll">
              <ul className="grid grid-cols-2 gap-6 px-6 ">
                {Array.from(Array(15).keys()).map((i) => (
                  <li key={i} className={``}>
                    <img
                      src={`/images/${currentFriend.image}`}
                      alt=""
                      className="object-fit"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSidebar;
