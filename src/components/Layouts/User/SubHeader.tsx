import SearchBar from "@/components/Common/Search/SearchBar";
// import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const SubHeader = () => {
  return (
    <div className="w-[100%] h-[100%] flex items-center border-[#D6DDEB] px-[20px]">
      <div className="w-[40%] h-[100%] flex items-center">
        <div className="h-[100%] flex-1 flex items-center">
          <p className="text-[0.9rem] font-medium">
            {/* Showing 1 - 20 of 237 Jobs */}
          </p>
        </div>
      </div>
      <div className="w-[60%] h-[100%] flex  items-center">
        <SearchBar />
      </div>
    </div>
  );
};

export default SubHeader;
