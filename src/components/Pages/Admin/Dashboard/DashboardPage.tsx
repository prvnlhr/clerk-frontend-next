"use client";
import React from "react";
import TotalJobsCard from "./TotalJobsCard";
import TotalApplicationsCard from "./TotalApplicationsCard";
import MostAppliedCard from "./MostAppliedCard";
import JobChart from "./Charts/JobChart";
import JobTypeChart from "./Charts/JobTypeChart";

const DashboardPage = () => {
  return (
    <div className="w-full h-auto flex justify-center items-start pb-[30px] pl-[50px]">
      <div className="w-[100%] h-auto overflow-y-auto hide-scrollbar flex flex-col justify-start items-center gap-y-6">
              {/* OVERVIEW---------------------------------------------------------- */}
              <div className="w-[80%] h-[200px] flex justify-center items-center gap-x-10">
                 <TotalJobsCard />
                 <TotalApplicationsCard />
                 <MostAppliedCard />
              </div>
              {/*  CHARTS------------------------------------------------------------ */}
              <div className="w-[100%] h-auto flex justify-start items-start">
                <div className="w-[48%] h-[500px] flex justify-center items-center">
                  <JobChart />
                </div>
                <div className="w-[48%] h-[400px] flex justify-center items-center">
                  <JobTypeChart />
                </div>
              </div>
              
      </div>
    </div>

  );
};

export default DashboardPage;
