import React from "react";
import { useSelector } from "react-redux";
import { Phone, Video } from "./svg";

const Messenger = () => {
  // redux state
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );
  return (
    <>
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

        <div className="inline-flex items-center space-x-4">
          <div className="bg-zinc-700 p-2 rounded-full">
            <Phone />
          </div>
          <div className="bg-zinc-700 p-2 rounded-full">
            <Video />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
