import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../store/actions/authAction";
import { Ellipsis, SearchIcon } from "./svg";
import { LeftSidebar, Messenger, RightSidebar } from "./";
import {
  getFriends,
  messageSend,
  getMessages,
  seenMessage,
  updateMessage,
} from "../store/actions/messengerAction";
// ImageMessageSend

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
  const [typingMessage, setTypingMessage] = useState(""); // message from our sockets

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
    socket.current.on("getMessage", (data) => {
      setSocketMessage(data);
    });

    socket.current.on("typingMessageGet", (data) => {
      console.log('received typing messageget from socket server')
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

    socket.current.on("msgDeliveredResponse", (msg) => {
      dispatch({
        type: "DELIVERED_MESSAGE",
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

  // add current user to users array on server
  useEffect(() => {
    socket.current.emit("addUser", myInfo.id, myInfo);
  }, []);

  // add current users to activeUsers state
  useEffect(() => {

    socket.current.on("getUser", (users) => {
      const filterUser = users.filter((u) => u.userId !== myInfo.id);
      setActiveUsers(filterUser);
    });

    socket.current.on("new_user_add", (data) => {
      console.log(`SOCKET EMITTED new_user_add FROM SERVER`)
      dispatch({
        type: "NEW_USER_ADD",
        payload: {
          new_user_add: data,
        },
      });
    });

  }, []);

  useEffect(() => {
    console.warn(`socketMessage === ${socketMessage}`)
    if (socketMessage && currentFriend) {
      if (
        socketMessage.senderId === currentFriend.fndInfo._id &&
        socketMessage.receiverId === myInfo.id
      ) {
        dispatch({
          type: "SOCKET_MESSAGE",
          payload: {
            message: socketMessage,
          },
        });

        dispatch(seenMessage(socketMessage));

        socket.current.emit("messageSeen", socketMessage);
        dispatch({
          type: "UPDATE_FRIEND_MESSAGE",
          payload: {
            msgInfo: socketMessage,
            status: "seen",
          },
        });
      }
    }
    setSocketMessage("");
  }, [socketMessage]);

  useEffect(() => {
    if(socketMessage && socketMessage.senderId !== currentFriend.fndInfo._id && socketMessage.receiverId === myInfo.id){
        //  notificationSPlay();
        //  toast.success(`${socketMessage.senderName} Send a New Message`)
         dispatch(updateMessage(socketMessage));
         socket.current.emit('deliveredMessage',socketMessage);
         dispatch({
          type: 'UPDATE_FRIEND_MESSAGE',
          payload : {
               msgInfo : socketMessage,
               status : 'delivered'
          }
     })

    }
},[socketMessage]);

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
            socketMessage={socketMessage}
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
