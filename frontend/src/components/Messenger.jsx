import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
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

const Messenger = (props) => {
  const { currentFriend, infoPanelIsOpen, setInfoPanelIsOpen } = props;

  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  //
  const [newMessage, setNewMessage] = useState("");

  const messageHandle = (e) => {
    setNewMessage(e.target.value);
  };
  useEffect(() => {
    console.log(`newMessage is: \n ${newMessage}`)
  }, [newMessage])
  

  return (
    <>
      <div className="flex h-screen flex-col justify-between">
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

        {currentFriend == null && (
          <h3 className="text-center text-zinc-600 text-lg">
            Select a friend to start chatting
          </h3>
        )}
        <div>
          {/* MAIN MESSAGE AREA */}
          {currentFriend != null && (
            <div className="p-6">Main Message Area</div>
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
              <form className="fill-available">
                {/* <textarea
                name="msg"
                id="msg"
                rows="1"
                placeholder="New Message..."
                className="bg-transparent w-full"
              ></textarea> */}
                <input
                  name="msg"
                  type="text"
                  placeholder="New Message..."
                  onChange={messageHandle}
                  className="p-1 bg-transparent w-full"
                />
              </form>
              <button>
                <Send />
              </button>
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
