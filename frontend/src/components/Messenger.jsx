import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const { currentFriend, infoPanelIsOpen, setInfoPanelIsOpen } = props;

  const dispatch = useDispatch();

  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  const { messages } = useSelector((state) => state.messenger);

  // message stuff
  const [newMessage, setNewMessage] = useState("");

  const inputRef = useRef(null);

  const messageHandle = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const data = {
      sender: myInfo.id,
      senderName: myInfo.userName,
      receiver: currentFriend._id,
      message: newMessage,
    };

    dispatch(messageSend(data));
    //reset input
    inputRef.current.value = "";
    setNewMessage("");
  };

  useEffect(() => {
    // reset input
    inputRef.current.value = "";
    setNewMessage("");

    // get messages with new user
    dispatch(getMessages(currentFriend?._id ?? null));
  }, [currentFriend]);

  // message classes for left/right
  const myMessageClasses = `ml-auto`
  const theirMessageClasses = `mr-auto`
  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        <div
          className={`transition duration-500 ${
            currentFriend ? `translate-y-0` : `-translate-y-full`
          }`}
        >
          <div className="p-6 flex items-center justify-between border-b border-zinc-700">
            <div className="inline-flex items-center space-x-4">
              {currentFriend ? (
                <div
                  style={{
                    backgroundImage: `url(/images/${currentFriend.image})`,
                  }}
                  className="w-16 h-16 rounded-full bg-cover bg-center"
                ></div>
              ) : (
                <div className="w-16 h-16 bg-zinc-700 rounded-full bg-cover bg-center"></div>
              )}
              {currentFriend ? (
                <h2 className="text-xl font-bold">{currentFriend.userName}</h2>
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

        {currentFriend == null && (
          <h3 className="text-center text-zinc-600 text-lg">
            Select a friend to start chatting.
          </h3>
        )}
        <div>
          {/* MAIN MESSAGE AREA */}

          {/* {msg.senderId == myInfo.id ? myMessageClasses: theirMessageClasses} */}
          {currentFriend != null && (
            <div className="p-6">
              <ul>
                {messages.map((msg, i) => (
                  <li key={i} className={`flex mb-4 ${msg.senderId == myInfo.id && `justify-end`}`}>
                    <div className={`max-w-1/3 flex flex-col ${msg.senderId == myInfo.id && `items-end`}`}>
                    <div className={` p-2 text-lg rounded-lg ${msg.senderId == myInfo.id ? `bg-zinc-700` : `bg-black`}`}>
                      {msg.message.text}
                    </div>
                    <span>{msg.createdAt.toLocaleDateString('EN-us',{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
            } transition duration-500 p-6 flex space-x-4 items-center justify-between border-t border-zinc-700`}
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
