"use client";
import { jobDataThisMonth, jobDataThisWeek, jobDataRecentPosted } from "@/utils/sampleChartData";
import React, { useState } from "react";
import TopJobs from "./TopJobs";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

const JobChart = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("thisMonth");

  const options= [
    {value: "thisMonth", label: "This Month"},
    {value: "thisWeek", label: "This Week"},
    {value: "recentlyPosted", label: "Recently Posted"},
  ]

  return (
    <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="w-[100%] h-[20%] border border-gray-200 border-b-white rounded-t-md p-[20px] flex justify-between items-center">
           <p className="font-medium text-[1rem]">Top 5 Job Posts</p>
           
           {/* FILTER------------------------------------------------------------------- */}
           <Select.Root 
            value={selectedFilter}
            onValueChange={setSelectedFilter}
            defaultValue="thisMonth"
            >
                <Select.Trigger className="w-[30%] h-full flex justify-center items-center gap-x-4 font-semibold text-[0.9rem]">
                  <Select.Icon>
                    <ChevronDownIcon />
                  </Select.Icon>
                  <Select.Value />
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content position="popper" side="bottom" className="w-[200px] bg-white rounded shadow-lg border border-gray-200 z-50 relative left-[50px] p-[10px]">
                      <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white">
                        <ChevronUpIcon />
                      </Select.ScrollUpButton>
                      <Select.Viewport className="p-1">
                        {options.map(option => (
                        <Select.Item
                          key={option.value}
                          value={option.value}
                          className="text-[0.9rem] px-3 py-2 rounded hover:bg-(--scheme-secondary) cursor-pointer"
                        >
                          <Select.ItemText>{option.label}</Select.ItemText>
                        </Select.Item>
                        ))}
                      </Select.Viewport>
                      <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white">
                        <ChevronDownIcon />
                      </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
           </Select.Root>
        </div>
        {/* BAR CHART---------------------------------------------------------------------------------------- */}
        <div className="w-full h-[80%] border border-gray-200 rounded-b-md flex justify-center items-center">
          <TopJobs data={selectedFilter==="thisMonth"?jobDataThisMonth:selectedFilter==="thisWeek"?jobDataThisWeek:jobDataRecentPosted}/>
        </div>
    </div>
  )
}

export default JobChart;
