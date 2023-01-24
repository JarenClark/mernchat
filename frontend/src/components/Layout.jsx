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

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8000");
  //   console.log(socket.current)
  // }, []);

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

  // socket
  const socket = useRef();
  const [activeUsers, setActiveUsers] = useState([]);
  const [socketMessage, setSocketMessage] = useState("");
  const [typingMessage, setTypingMessage] = useState("");

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    socket.current.on("typingMessageGet", (data) => {
      setTypingMessage(data);
    });

    socket.current.on("msgSeenResponse", (msg) => {
      dispatch({
        type: "SEEN_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("msgDelivaredResponse", (msg) => {
      dispatch({
        type: "DELIVARED_MESSAGE",
        payload: {
          msgInfo: msg,
        },
      });
    });

    socket.current.on("seenSuccess", (data) => {
      dispatch({
        type: "SEEN_ALL",
        payload: data,
      });
    });
  }, []);

  return (
    <>
      <div className="flex w-screen h-screen justify-between overflow-hidden">
        {/* LEFT SIDEBAR */}
        <LeftSidebar
          socket={socket}
          activeUsers={activeUsers}
          currentFriend={currentFriend}
          setcurrentFriend={setcurrentFriend}
        />

        {/* MAIN */}
        <main className="fill-available">
          <Messenger
            socket={socket}
            activeUsers={activeUsers}
            currentFriend={currentFriend}
            infoPanelIsOpen={infoPanelIsOpen}
            setInfoPanelIsOpen={setInfoPanelIsOpen}
          />
        </main>

        {/* RIGHT SIDEBAR */}
        <RightSidebar
          socket={socket}
          activeUsers={activeUsers}
          currentFriend={currentFriend}
          infoPanelIsOpen={infoPanelIsOpen}
          setInfoPanelIsOpen={setInfoPanelIsOpen}
        />
      </div>
    </>
  );
};

export default Layout;
