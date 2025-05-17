import React from "react";
import JobCard from "./JobCard";
import { jobData } from "@/utils/sampleData";
import SearchBar from "@/components/Common/Search/SearchBar";
import FilterMenu from "./FilterMenu";
import SubHeader from "./SubHeader";

interface JobListingsPageProps {
  isfilter: boolean;
}
const JobListingsPage: React.FC<JobListingsPageProps> = ({ isfilter }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-center bg-[#F5F7F9] overflow-hidden">
      <div className="w-[100%] h-[60px] flex items-center">
        <SearchBar />
      </div>
      <SubHeader />
      <div className="w-[100%] h-[calc(100%-100px)] flex">
        <div className="absolute w-[100%] md:relative md:w-[20%] h-[100%] z-2 bg-white top-0 left-0">
          <FilterMenu isfilter={isfilter} />
        </div>
        <div className="w-[80%] h-[100%]">
          <div className="w-[100%] h-[100%] grid grid-cols-1 md:grid-cols-3 gap-x-[10px] md:gap-x-[40px] overflow-y-scroll py-[0px] px-[20px] hide-scrollbar">
            {jobData.map((job, jIndex) => (
              <JobCard key={jIndex} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListingsPage;
