import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { Ellipsis, SearchIcon } from "./svg";
import { LeftSidebar, Messenger, RightSidebar } from "./";
import { getFriends } from "../store/actions/messengerAction";
import { io } from "socket.io-client";

const Layout = ({ children, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state
  const [infoPanelIsOpen, setInfoPanelIsOpen] = useState(false); // right sidebar
  const [currentFriend, setcurrentFriend] = useState(null);

  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  // socket
  const socket = useRef();
  const [activeUser, setActiveUser] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    console.log(socket.current)
  }, []);

  // kick us to login if we are not authenticated
  useEffect(() => {
    if (!loading && !authenticate) {
      navigate("/login");
    }
  }, [loading, authenticate]);

  // get our friends on load
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
