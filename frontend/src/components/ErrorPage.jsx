import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full bg-zinc-900 rounded-2xl p-8">
        <h1 className="mb-4">Whoops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
