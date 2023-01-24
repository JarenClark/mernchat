import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { Ellipsis, SearchIcon } from "./svg";
import { LeftSidebar, Messenger, RightSidebar } from "./";
import { getFriends } from "../store/actions/messengerAction";

const Layout = ({ children, title }) => {
  // state
  const dispatch = useDispatch();
  const [infoPanelIsOpen, setInfoPanelIsOpen] = useState(false); // right sidebar
  const [currentFriend, setcurrentFriend] = useState(null);
  
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

  // get our friends
  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <>
      <div className="flex w-screen h-screen jusify-between overflow-hidden">
        {/* LEFT SIDEBAR */}
        <LeftSidebar
          currentFriend={currentFriend}
          setcurrentFriend={setcurrentFriend}
        />

        {/* MAIN */}
        <main className="fill-available">
          <Messenger
            currentFriend={currentFriend}
            infoPanelIsOpen={infoPanelIsOpen}
            setInfoPanelIsOpen={setInfoPanelIsOpen}
          />
        </main>

        {/* RIGHT SIDEBAR */}
        <RightSidebar
          currentFriend={currentFriend}
          infoPanelIsOpen={infoPanelIsOpen}
          setInfoPanelIsOpen={setInfoPanelIsOpen}
        />
      </div>
    </>
  );
};

export default Layout;
