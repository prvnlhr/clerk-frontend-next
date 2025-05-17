"use client";
import React from "react";
import { filterMenuData } from "@/utils/sampleData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";

interface FilterMenuProps {
  isfilter: boolean;
}
const FilterMenu: React.FC<FilterMenuProps> = ({ isfilter }) => {
  console.log(" isfilter:", isfilter);
  const searchParams = useSearchParams();
  const router = useRouter();
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
    <div className={`w-[100%] h-[100%] flex items-center justify-center`}>
      <div className="w-[80%] h-[95%]">
        <div className="w-full h-[40px] flex items-center justify-between">
          <p className="text-[0.8rem] scheme-font font-bold tracking-widest">
            FILTERS
          </p>
          <button
            onClick={toggleFilters}
            className="md:hidden w-[25px] h-[25px] bg-[#E7F0FA] rounded-full flex items-center justify-center border border-black/10 cursor-pointer"
          >
            <Icon icon="radix-icons:cross-2" width="10" height="10" />
          </button>
        </div>
        <div className="w-full h-[calc(100%-40px)] flex flex-col p-[5px] overflow-y-scroll hide-scrollbar">
          {filterMenuData.map((filter, fIndex) => (
            <div
              key={fIndex}
              className="w-full h-auto flex flex-col border-b  border-black/10 pb-[10px]"
            >
              <div className="w-[100%] h-[30px] flex items-center my-[10px]">
                <p className="text-[0.9rem] font-medium">{filter.heading}</p>
              </div>

              {filter.filters.map((filterOption, fOptionIndex) => (
                <div
                  key={fOptionIndex}
                  className="w-full h-[30px] flex items-center"
                >
                  <div className="h-[100%] aspect-[1/1] flex items-center justify-start">
                    <div className="w-[20px] aspect-[1/1] flex items-center p-[3px] bg-[#F6F6F7] border border-[#D6DDEB]">
                      <div
                        className={`w-[100%] h-[100%] ${
                          fOptionIndex === 1 ? "bg-[#0A65CC]" : ""
                        } `}
                      ></div>
                    </div>
                  </div>
                  <div className="h-[100%] flex-1 flex items-center">
                    <p className="text-[0.75rem] font-medium">
                      {filterOption.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterMenu;
