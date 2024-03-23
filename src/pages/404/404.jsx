import React from "react";

const NotFound = () => {
  return (
    <div
      className={`h-60 flex flex-col justify-center items-center`}
    >
      <h1
        className={`justify-center text-center text-red-800 text-5xl font-bold hover:text-red-600`}
      >
        404: Page not found
      </h1>
    </div>
  );
};

export default NotFound;