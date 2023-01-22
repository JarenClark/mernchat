import React from "react";
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
  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  return (
    <>
      <div className="flex h-screen flex-col justify-between">
        <div className="p-6 flex items-center justify-between border-b border-zinc-700">
          <div className="inline-flex items-center space-x-4">
            <div
              style={{
                backgroundImage: `url(/images/${myInfo.image})`,
              }}
              className="w-16 h-16 rounded-full bg-cover bg-center"
            ></div>
            <h2 className="text-xl font-bold">{myInfo.userName}</h2>
          </div>

          <div className="inline-flex items-center space-x-4 ">
            <div className="bg-zinc-700 p-2 rounded-full hover:bg-black">
              <Phone />
            </div>

            <div className="bg-zinc-700 p-2 rounded-full hover:bg-black">
              <Video />
            </div>

            {!props.infoPanelIsOpen && (
              <button
                onClick={() => props.setInfoPanelIsOpen(!props.infoPanelIsOpen)}
                className="bg-zinc-700 p-2 rounded-full hover:bg-black"
              >
                {props.infoPanelIsOpen ? <Close /> : <Info />}
              </button>
            )}

          </div>
        </div>
        <div className="p-6 flex space-x-4 items-center justify-between border-t border-zinc-700">
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
    </>
  );
};

export default Messenger;
