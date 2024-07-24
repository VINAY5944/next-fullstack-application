"use cient";
import React from "react";
import Button from "./button";

const Chatsent = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-m"
        />
      </div>
      <div>
        <Button placeholder={"sent"} />
      </div>
    </div>
  );
};

export default Chatsent;
