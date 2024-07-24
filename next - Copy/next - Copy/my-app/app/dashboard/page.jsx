import React from "react";
import Stock from "../components/StockChart";
import MyDashboard from "../components/Food";
import Sidebar from "../components/side";

const Page = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 w-full p-4">
        <div className="space-y-4">
          {/* Stock Chart */}
          <div>
            <Stock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
