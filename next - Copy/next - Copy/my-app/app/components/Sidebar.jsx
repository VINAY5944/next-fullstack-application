import React from "react";
import Button from "./button";

const Sidebar = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        {" "}
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
        <Button placeholder={"search"} />
      </div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center"></div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
