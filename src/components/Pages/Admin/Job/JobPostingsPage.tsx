import SearchBar from "@/components/Common/Search/SearchBar";
import React from "react";
import JobCard from "./JobCard";
import { jobData } from "@/utils/sampleData";

const JobPostingsPage = () => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center bg-[#F5F7F9]">
      <div className="w-[100%] h-[60px] flex items-center">
        <SearchBar />
      </div>
      <div className="w-[100%] h-[40px] flex items-center justify-center">
        <div className="w-[80%] h-[100%] flex items-center px-[25px]">
          <div className="w-auto h-[auto] flex items-center justify-center border-b border-black/10">
            <p className="text-[0.8rem] font-medium scheme-font">
              3,250 <span className="font-secondary">jobs posted</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[calc(100%-100px)] flex justify-center">
        <div className="w-[80%] h-[100%]">
          <div className="w-[100%] h-[100%] grid grid-cols-1 md:grid-cols-3 gap-x-[10px] md:gap-x-[40px] overflow-y-scroll py-[20px] px-[20px] hide-scrollbar">
            {jobData.map((job, jIndex) => (
              <JobCard key={jIndex} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingsPage;
