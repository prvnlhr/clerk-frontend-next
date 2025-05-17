"use client";
import useClickOutside from "@/hooks/useClickOutside";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef, useState } from "react";

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(userMenuRef, () => {
    setIsUserMenuOpen(false);
  });

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="w-[100%] h-[100%] flex justify-between bg-[#ffffff] border-b border-[#D6DDEB]">
      <div className="aspect-square h-[100%]"></div>
      <div className="flex-1 h-[100%] flex justify-between items-center pr-[20px]">
        <div className="w-auto  h-[100%] flex items-center">
          <div className="w-auto h-[auto] flex items-center justify-center border-b-2 border-[#0a65cc] mr-[20px]">
            <p className="text-[0.9rem] font-medium">Jobs</p>
          </div>
          <div className="w-auto h-[auto] flex items-center justify-center border-b-2 border-transparent mr-[20px]">
            <p className="text-[0.9rem] font-medium">Profile</p>
          </div>
          <div className="w-auto h-[auto] flex items-center justify-center border-b-2 border-transparent mr-[20px]">
            <p className="text-[0.9rem] font-medium">Create Job Post</p>
          </div>
        </div>
        <div className="h-[100%] w-auto flex items-center justify-center">
          <div className="w-[20px] h-[100%] flex items-center justify-center">
            <Icon
              onClick={toggleUserMenu}
              icon="famicons:chevron-down"
              className="w-[15px] h-[15px] text-[#5a5d79] cursor-pointer"
            />
          </div>
          <div className="h-[70%] aspect-[1/1] bg-[#F4F7FF] border border-black/10 rounded-full p-[3px]">
            <div className="w-[100%] h-[100%] bg-[#E7F0FA] rounded-full border border-black/20"></div>
          </div>

          {/* user menu */}
          {isUserMenuOpen && (
            <div
              ref={userMenuRef}
              className="absolute w-[200px] h-[auto] flex right-[20px] top-[63px] p-[5px] rounded bg-white shadow-[0px_3px_5px_rgba(0,0,0,0.04)]"
            >
              <div className="w-[100%] h-[100%]">
                <div className="w-[100%] h-[50px] flex flex-col justify-center bg-[#F6F6F7] px-[10px] rounded">
                  <p className="text-sm font-medium">Eva Robinson</p>
                  <p className="text-xs font-normal text-[#9199A3]">
                    evarobinson.@gmail.com
                  </p>
                </div>
                <div className="w-[100%] h-[40px] flex  justify-center px-[10px] mt-[5px]">
                  <div className="h-[100%] w-auto flex items-center justify-center mr-[5px]">
                    <Icon
                      icon="hugeicons:logout-square-01"
                      className="w-[15px] h-[15px] text-[#5a5d79]"
                    />
                  </div>
                  <div className="flex-1 h-[100%] flex items-center text-sm">
                    Sign out
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
