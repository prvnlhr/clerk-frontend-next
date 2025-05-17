import { Application } from "@/types/Application/applicationTypes";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  return (
    <Link
      href={
        "/admin/3f7a42b1-6e32-4a8d-b5d2-1c9f8d6e3f2a/job-postings/1c9f8d6e3f2a/applications/4a8d/details"
      }
      className="
        w-auto h-auto mb-[20px] flex flex-col self-start justify-start gap-y-5
        shadow-[0px_3px_5px_rgba(0,0,0,0.04)]
        hover:shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]
        hover:bg-[linear-gradient(180deg,rgba(178,221,255,0.15)_0%,rgba(255,250,235,0)_100%)]
        bg-white
        py-[5px] px-[20px]
        rounded"
    >
      {/* APPLICANT IMAGE, CURRENT POSITION --------------------------------------- */}
      <div className="h-[60px] flex justify-between items-center">
        <div className="h-[80%] aspect-square flex items-center justify-center bg-[#F6F6F7] rounded-[10px] mt-[10px]">
          <Icon
            icon={application.image}
            className="w-[80%] h-[80%] text-[#999999]"
          />
        </div>
        <div className="h-[100%] flex-1 flex items-center justify-end">
          <p className="text-[0.75rem] min-w-[45%] w-[auto] font-semibold line-clamp-2 bg-(--scheme-secondary) scheme-font flex justify-center px-[10px] py-[5px] rounded">
            {application.currentPosition}
          </p>
        </div>
      </div>

      {/* APPLICANT NAME, LOCATION ---------------------------------------*/}
      <div className="h-[100%] flex flex-col justify-start items-start gap-y-1">
        <div className="w-full h-[50px] flex flex-col justify-start">
          {/* NAME -----------------------------------------------------*/}
          <div className="h-[auto] flex-1 flex items-center">
            <p className="md:text-[1rem] min-w-[45%] w-[auto] font-semibold">
              {application.applicantName}
            </p>
          </div>
          {/* LOCATION -----------------------------------------------------*/}
          <div className="w-auto h-[30px] flex items-center justify-center">
            <div className="h-[auto] flex-1 flex items-center">
              <p className="text-[0.75rem] font-medium text-gray-400">
                {application.location}
              </p>
            </div>
          </div>
        </div>

        {/* DOWNLOAD RESUME, YOE --------------------------------------------- */}
        <div className="w-full h-[20px] flex items-center justify-between">
          {/* DOWNLOAD RESUME ----------------------------------------------------- */}
          <div className="w-auto h-[100%] flex items-center">
            <button className="w-auto h-[30px] flex items-center justify-center mr-[10px]">
              <div className="h-[100%] flex items-center justify-center">
                <Icon
                  icon="lets-icons:file-duotone"
                  className="w-[15px] h-[15px] scheme-font"
                />
                <p className="text-[0.75rem] scheme-font ml-[4px] font-semibold">
                  {application.resumeFile}
                </p>
              </div>
            </button>
          </div>
          {/* YOE -----------------------------------------------------*/}
          <div className="w-auto h-[30px] flex items-center justify-center ">
            <div className="h-[100%] w-[auto] flex items-center justify-start ">
              <Icon
                icon="mingcute:briefcase-line"
                className="w-[15px] h-[15px] scheme-font"
              />
            </div>
            <div className="h-[100%] flex-1 flex items-center px-[5px]">
              <p className="text-[0.7rem] font-medium">{application.yoe}</p>
            </div>
          </div>
          {/* DATE APPLIED -----------------------------------------------------*/}
          <div className="w-auto h-[30px] flex items-center justify-center">
            <div className="h-[100%] w-[auto] flex items-center justify-start">
              <Icon
                icon="mingcute:time-line"
                className="w-[15px] h-[15px] scheme-font"
              />
            </div>
            <div className="h-[100%] flex-1 flex items-center px-[5px]">
              <p className="text-[0.7rem] font-medium">
                {application.dateApplied}
              </p>
            </div>
          </div>
        </div>

        {/* SAVE, SEND JD, CONTACT---------------------------------------------------- */}
        <div className="w-full h-[80px] flex items-center justify-between">
          <div className="w-auto h-[100%] flex items-center">
            <button className="w-[50px] h-[50%] flex items-center justify-center rounded border border-gray-200">
              <Icon
                icon="mdi-light:bookmark"
                className="w-[30px] h-[30px] text-gray-300"
              />
            </button>
          </div>
          <div className="w-auto h-[100%] flex items-center">
            <button className="w-[auto] h-[50%] flex items-center justify-center rounded px-[15px] bg-gray-100">
              <p className="text-[0.75rem] font-semibold">Send JD</p>
            </button>
          </div>
          <div className="w-auto h-[100%] flex items-center">
            <button className="w-[100px] h-[50%] flex items-center justify-center rounded px-[15px] bg-gray-100">
              <p className="text-[0.75rem] font-semibold">Contact</p>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ApplicationCard;
