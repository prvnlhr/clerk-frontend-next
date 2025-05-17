"use client";
import React from "react";
import { Icon } from "@iconify/react";

const SearchBar = () => {
  return (
    <div className="w-[100%] md:w-[100%] h-[100%] flex items-center justify-center bg-white">
      <div className="flex-1 h-[100%] flex items-center ">
        <div className="h-[100%] aspect-[1/1] flex items-center justify-center">
          <Icon
            icon="mingcute:search-fill"
            className="w-[20px] h-[20px] scheme-font"
          />
        </div>
        <div className="h-[100%] flex-1 flex flex-col  py-[5px]">
          <div className="w-[100%] h-[50%] flex items-center ">
            <label className="w-[100%] h-[100%] flex items-end row-span-1 col-span-1 text-[0.7rem] scheme-font font-bold tracking-widest">
              SEARCH JOB
            </label>
          </div>
          <div className="w-[100%] h-[50%] flex items-center ">
            <input
              placeholder="Title, Position, Keyword"
              type="text"
              className="w-full h-full flex items-start border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 h-[100%] flex items-center ">
        <div className="h-[100%] aspect-[1/1] flex items-center justify-center">
          <Icon
            icon="fluent:location-16-filled"
            className="w-[20px] h-[20px] scheme-font"
          />
        </div>
        <div className="h-[100%] flex-1 flex flex-col py-[5px]">
          <div className="w-[100%] h-[50%] flex items-center ">
            <label className="w-[100%] h-[100%] flex items-end row-span-1 col-span-1 text-[0.7rem] scheme-font font-bold tracking-widest">
              LOCATION
            </label>
          </div>
          <div className="w-[100%] h-[50%] flex items-center">
            <input
              placeholder="City, State, Pin code "
              type="text"
              className="w-full h-full flex items-start border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
            />
          </div>
        </div>
      </div>
      <div className="flex-1 h-[100%] flex items-center ">
        <div className="h-[100%] aspect-[1/1] flex items-center justify-center">
          <Icon
            icon="ri:briefcase-fill"
            className="w-[20px] h-[20px] scheme-font"
          />
        </div>
        <div className="h-[100%] flex-1 flex flex-col py-[5px]">
          <div className="w-[100%] h-[50%] flex items-center ">
            <label className="w-[100%] h-[100%] flex items-end row-span-1 col-span-1 text-[0.7rem] scheme-font font-bold tracking-widest">
              JOB TYPE
            </label>
          </div>
          <div className="w-[100%] h-[50%] flex items-center">
            <input
              placeholder="Fulltime, Internship, Contract, Part-time"
              type="text"
              className="w-full h-full flex items-start border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
            />
          </div>
        </div>
      </div>
      <div className="w-[auto] h-[100%] flex items-center">
        <button className="h-[100%] scheme-bg text-[0.8rem] font-medium px-[30px] text-white">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
