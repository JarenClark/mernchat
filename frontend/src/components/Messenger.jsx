import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, formatRelative } from "date-fns";
import {
  Attachment,
  Close,
  Heart,
  Hamburger,
  Info,
  Phone,
  Send,
  Video,
} from "./svg";
import { messageSend, getMessages } from "../store/actions/messengerAction";

const Messenger = (props) => {


  //refs
  const inputRef = useRef(null);
  const scrollRef = useRef(null);


  const {
    socket,
    socketMessage,
    activeUsers,
    currentFriend,
    infoPanelIsOpen,
    setInfoPanelIsOpen,
  } = props;

  const dispatch = useDispatch();


  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  const { messages, messageSendSuccess } = useSelector(
    (state) => state.messenger
  );

  // message stuff
  const [newMessage, setNewMessage] = useState("");

  const messageHandle = (e) => {
    // update state
    setNewMessage(e.target.value);

    // let our websocket know
    socket.current.emit("typingMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend.fndInfo._id,
      msg: e.target.value,
    });
  };

  const sendMessage = (e) => {
    // send to our server
    e.preventDefault();
    const data = {
      sender: myInfo.id,
      senderName: myInfo.userName,
      receiverId: currentFriend.fndInfo._id,
      message: newMessage ? newMessage : "❤",
    };

    dispatch(messageSend(data));

    // let our websocket know
    socket.current.emit("sendMessage", {
      senderId: myInfo.id,
      receiverId: currentFriend.fndInfo._id,
      msg: newMessage ? newMessage : "❤",
    });

    //reset input
    inputRef.current.value = "";
    setNewMessage("");

    // socket stuff
    socket.current.emit("chat message", newMessage);
  };

  useEffect(() => {
    // reset input
    inputRef.current.value = "";
    setNewMessage("");

    // get messages with new user
    dispatch(getMessages(currentFriend?.fndInfo._id ?? null));
  }, [currentFriend]);

  // scroll to bottom of messages
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (messageSendSuccess) {
      socket.current.emit("sendMessage", messages[messages.length - 1]);
      dispatch({
        type: "UPDATE_FRIEND_MESSAGE",
        payload: {
          msgInfo: messages[messages.length - 1],
        },
      });
      dispatch({
        type: "MESSAGE_SEND_SUCCESS_CLEAR",
      });
    }
  }, [messageSendSuccess]);

  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        {/* HEADER INFO */}
        <div className={` h-[12.5vh] border-b border-zinc-700`}>
          <div>
            <div className={`  p-6 flex items-center justify-between `}>
              <div className="inline-flex items-center space-x-4">
                {currentFriend ? (
                  <div
                    style={{
                      backgroundImage: `url(/images/${currentFriend.fndInfo.image})`,
                    }}
                    className="w-16 h-16 rounded-full bg-cover bg-center"
                  ></div>
                ) : (
                  <div className="w-16 h-16 bg-zinc-700 rounded-full bg-cover bg-center"></div>
                )}
                {currentFriend ? (
                  <h2 className="text-xl font-bold">
                    {currentFriend.fndInfo.userName}
                  </h2>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <div className="p-2 w-40 bg-zinc-700 "></div>
                    <div className="p-2 w-64 bg-zinc-700 "></div>
                  </div>
                )}
              </div>

              {currentFriend && (
                <div className="inline-flex items-center space-x-4 ">
                  <div className="bg-zinc-700 p-2 rounded-full hover:bg-black">
                    <Phone />
                  </div>

                  <div className="bg-zinc-700 p-2 rounded-full hover:bg-black">
                    <Video />
                  </div>

                  {!infoPanelIsOpen && (
                    <button
                      onClick={() => setInfoPanelIsOpen(!infoPanelIsOpen)}
                      className="bg-zinc-700 p-2 rounded-full hover:bg-black"
                    >
                      {infoPanelIsOpen ? <Close /> : <Info />}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ON LOGIN SHOW THIS MESSAGE */}
        {currentFriend == null && (
          <h3 className="text-center text-zinc-600 text-lg">
            Select a friend to start chatting.
          </h3>
        )}

        {/* IF THERE ARE NO CHATS WITH CURRENT FRIEND */}
        {currentFriend != null && messages.length == 0 && (
          <h3 className="m-auto text-center text-zinc-600 text-lg">
            Let's get this conversation going!
          </h3>
        )}
        <div>
          {/* MAIN MESSAGE AREA */}
          {currentFriend != null && (
            <div className="p-6 overflow-y-auto max-h-[75vh]">
              <ul>
                {messages.map((msg, i) => (
                  <li
                    ref={scrollRef}
                    key={i}
                    className={`flex mb-4 ${
                      msg.senderId == myInfo.id && `justify-end`
                    }`}
                  >
                    {msg.senderId != myInfo.id && (
                      <div
                        style={{
                          backgroundImage: `url(/images/${currentFriend.fndInfo.image})`,
                        }}
                        className="w-10 h-10 mr-4 rounded-full bg-cover bg-center"
                      ></div>
                    )}
                    <div
                      className={` flex flex-col ${
                        msg.senderId == myInfo.id && `items-end`
                      }`}
                    >
                      <div
                        className={` p-2 text-lg rounded-lg ${
                          msg.senderId == myInfo.id
                            ? `ml-48 bg-zinc-700`
                            : `mr-48 bg-black`
                        }`}
                      >
                        {msg.message.text ? msg.message.text : null}
                        {msg.message.image ? (
                          <img src={msg.message.image} alt="" />
                        ) : null}
                      </div>
                      <div className="px-2 text-sm">
                        {" "}
                        {formatRelative(new Date(msg.createdAt), new Date())}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* MESSAGE SENDER */}
          <div
            className={`${
              currentFriend ? `translate-y-0` : `translate-y-full`
            } transition duration-500 p-6 flex space-x-4 items-center justify-between border-t border-zinc-700 h-[12.5vh]`}
          >
            {/* ATTACH IMAGE */}
            <div>
              <Attachment></Attachment>
            </div>

            {/* SEND MESSAGE */}
            <div className="rounded-full space-x-4 inline-flex items-center fill-available bg-zinc-700 overflow-hidden px-4 justify-between p-2">
              <form onSubmit={sendMessage} className="fill-available">
                <fieldset className="flex">
                  <input
                    ref={inputRef}
                    name="msg"
                    type="text"
                    autoComplete="off"
                    placeholder="New Message..."
                    onChange={messageHandle}
                    className="p-1 bg-transparent w-full"
                  />

                  <button
                    disabled={newMessage.length == 0}
                    type="submit"
                    className="disabled:opacity-30"
                  >
                    <Send />
                  </button>
                </fieldset>
              </form>
            </div>

            {/* SEND EMOJI */}
            <div>
              <Heart></Heart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
