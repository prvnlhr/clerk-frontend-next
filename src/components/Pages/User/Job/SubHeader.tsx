"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SubHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const toggleFilters = () => {
    const params = new URLSearchParams(searchParams);
    const isFilterActive = params.get("filter") === "true";
    if (isFilterActive) {
      params.delete("filter");
    } else {
      params.set("filter", "true");
    }
    router.push(
      `${pathname}${params.toString() ? `?${params.toString()}` : ""}`,
      { scroll: false }
    );
  };
  return (
    <div className="w-[100%] h-[40px] flex items-center">
      <button
        onClick={() => router.back()}
        className="w-[20%] h-[100%] flex pl-[10px] cursor-pointer"
      >
        <div className="h-[100%] w-auto flex items-center justify-center px-[5px]">
          <Icon
            icon="lets-icons:back"
            className="w-[15xp] h-[15px] font-secondary"
          />
        </div>
        <div className="w-auto h-[100%] flex items-center justify-center">
          <p className="text-sm scheme-font font-medium">Back</p>
        </div>
      </button>
      <div className="w-[80%] h-[100%] flex items-center px-[20px]">
        <div className="w-auto h-[auto] flex items-center justify-center border-b border-black/10">
          <p className="text-[0.8rem] font-medium scheme-font">
            3,250 <span className="font-secondary">Jobs found</span>
          </p>
        </div>

        {/* Filter toggler */}
        <button
          onClick={toggleFilters}
          className="w-auto h-[60%] md:hidden flex border border-black/20 rounded ml-auto"
        >
          <div className="h-[100%] aspect-square  flex items-center justify-center ml-[auto]">
            <Icon
              icon="iconoir:filter"
              className="w-[50%] h-[50%] scheme-font"
            />
          </div>
          <div className="flex-1 h-[100%] flex items-center justify-center mr-[10px]">
            <p className="text-xs font-medium scheme-font">Filters</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
