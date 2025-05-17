import { Job } from "@/types/Job/jobTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

interface JobCardProps {
  job: Job;
}
const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Link
      href={
        "/user/3f7a42b1-6e32-4a8d-b5d2-1c9f8d6e3f2a/jobs/1c9f8d6e3f2a/details"
      }
      className="
        w-auto h-auto mb-[20px] flex flex-col self-start
        shadow-[0px_3px_5px_rgba(0,0,0,0.04)]
        hover:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
        hover:bg-[linear-gradient(180deg,rgba(178,221,255,0.15)_0%,rgba(255,250,235,0)_100%)]
        bg-white
        p-[20px]
        rounded"
    >
      {/* JOB TITLE, COMPANY LOGO --------------------------------------- */}
      <div className="w-full h-[60px] flex">
        <div className="h-[100%] flex-1 flex items-center">
          <p className="md:text-[1rem] w-[80%] font-semibold line-clamp-2">
            {job.title}
          </p>
        </div>
        <div className="h-[100%] aspect-square flex items-center justify-center bg-[#F4F7FF] rounded-[10px]">
          <Icon icon={job.logo} className="w-[80%] h-[80%] text-[#999999]" />
        </div>
      </div>

      {/* COMPANY NAME, LOCATION, JOB TYPE --------------------------------------- */}
      <div className="w-full h-[auto] flex flex-wrap items-center p-[2px]">
        {/* COMPANY -----------------------------------------------------*/}
        <div className="w-auto h-[30px] flex items-center justify-start">
          <div className="h-[100%] flex-1 flex items-center">
            <p className="text-[0.75rem] font-medium">{job.company}</p>
          </div>
          <div className="h-[100%] w-auto flex items-center justify-center">
            <Icon icon="bi:dot" className="w-[20px] h-[20px] text-[#667085]" />
          </div>
        </div>
        {/* LOCATION -----------------------------------------------------*/}
        <div className="w-auto h-[30px] flex items-center justify-center">
          <div className="h-[100%] w-[auto] flex items-center justify-start">
            <Icon
              icon="fluent:location-16-regular"
              className="w-[15px] h-[15px] scheme-font"
            />
          </div>
          <div className="h-[100%] flex-1 flex items-center px-[5px]">
            <p className="text-[0.75rem] font-medium">{job.location}</p>
          </div>
        </div>
        {/* JOB TYPE ----------------------------------------------------- */}
        {/* <div className="w-full h-[25px] flex items-center justify-start">
          <div className="w-auto h-[100%] flex items-center bg-[#D1FADF] px-[10px] rounded">
            <p className="text-[0.65rem] text-[#027A48] font-medium">
              {job.type}
            </p>
          </div>
        </div> */}
      </div>

      {/* YOE, SALARY, DATE POSTED --------------------------------------- */}
      <div className="w-full h-[auto] flex flex-wrap items-center py-[5px] mt-[10px] border-t border-black/10">
        {/* YOE -----------------------------------------------------*/}
        <div className="w-auto h-[30px] flex items-center justify-center">
          <div className="h-[100%] w-[auto] flex items-center justify-start">
            <Icon
              icon="mingcute:briefcase-line"
              className="w-[15px] h-[15px] scheme-font"
            />
          </div>
          <div className="h-[100%] flex-1 flex items-center px-[5px]">
            <p className="text-[0.7rem] font-medium">{job.yoe}</p>
          </div>
          <div className="h-[100%] w-auto flex items-center justify-center">
            <Icon icon="bi:dot" className="w-[20px] h-[20px] text-[#667085]" />
          </div>
        </div>
        {/* SALARY -----------------------------------------------------*/}
        <div className="w-auto h-[30px] flex items-center justify-center">
          <div className="h-[100%] w-[auto] flex items-center justify-start">
            <Icon icon="bx:rupee" className="w-[15px] h-[15px] scheme-font" />
          </div>
          <div className="h-[100%] flex-1 flex items-center px-[5px]">
            <p className="text-[0.7rem] font-medium">{job.salary}</p>
          </div>
          <div className="h-[100%] aspect-[1/1.5] flex items-center justify-center">
            <Icon icon="bi:dot" className="w-[100%] h-[100%] text-[#667085]" />
          </div>
        </div>
        {/* DATE POSTED -----------------------------------------------------*/}
        <div className="w-auto h-[30px] flex items-center justify-center">
          <div className="h-[100%] w-[auto] flex items-center justify-start">
            <Icon
              icon="mingcute:time-line"
              className="w-[15px] h-[15px] scheme-font"
            />
          </div>
          <div className="h-[100%] flex-1 flex items-center px-[5px]">
            <p className="text-[0.7rem] font-medium">{job.posted}</p>
          </div>
        </div>
      </div>

      {/* SKILLSET -------------------------------------------------- */}
      <div className="w-full h-auto flex flex-wrap border-y border-black/10 mb-[8px]">
        {job.skills.slice(0, 5).map((skill, sIndex) => (
          <div
            key={sIndex}
            className="flex items-center h-[30px] whitespace-nowrap"
          >
            <p className="text-[0.7rem] text-[#667085] font-medium">{skill}</p>
            <Icon icon="bi:dot" className="w-[20px] h-[20px] text-[#667085]" />
          </div>
        ))}
        {job.skills.length > 5 && (
          <div className="flex items-center h-[30px] whitespace-nowrap">
            <p className="text-[0.7rem] text-[#667085] font-medium">
              +{job.skills.length - 5} more
            </p>
          </div>
        )}
      </div>
      <div className="w-full h-[40px] relative">
        <p
          className="text-[0.75rem] text-[#667085] line-clamp-2 h-full overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
            height: "100%",
          }}
        >
          {job.description}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
