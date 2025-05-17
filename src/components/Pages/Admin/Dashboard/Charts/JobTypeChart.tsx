"use client";
import React from "react";
import JobDistribution from "./JobDistribution";

const JobTypeChart = () => {
  return (
      <div className="w-full h-full flex flex-col justify-start items-center">
        <div className="w-[80%] h-[20%] flex justify-start items-center">
          <p className="font-medium text-[1rem]">Job Type Distribution</p>
        </div>
        {/* PIE CHART---------------------------------------------------- */}
        <div className="w-full h-[80%] flex justify-center items-center">
            <JobDistribution />
        </div>

      </div>
      
  )
}

export default JobTypeChart
