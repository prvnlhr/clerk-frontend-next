import React from "react";
import jobDetailBanner from "../../../../../../public/banners/atlassian-nn 1.png";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";

const JobDetailsPage = () => {
  return (
    <div className="w-full h-full flex flex-col  bg-[#F5F7F9]">
      <div className="w-[100%] h-[40px]"></div>
      <div className="w-[100%] h-[calc(100%-40px)] flex justify-center items-start overflow-y-scroll hide-scrollbar">
        <div className="w-[60%] h-auto bg-white">
          <div className="w-[100%] h-[140px]">
            <div className="relative w-[100%] h-[100px]">
              <Image
                src={jobDetailBanner}
                fill={true}
                alt="jd-detail-banner"
                className="object-cover object-bottom"
              />
              <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#131776]/90 via-[#131776]/50 to-[#131776]/0" />
            </div>
            <div className="relative w-[100%] h-[40px]">
              <div className="absolute h-[80px] aspect-[1/1] flex items-center justify-center left-[20px] bottom-[0%] z-[2]">
                <Icon icon="logos:atlassian" className="w-[70%] h-[70%]" />
              </div>
            </div>
          </div>
          <div className="w-[100%] h-[auto] grid grid-cols-2 grid-row-2 items-center gap-y-[5px] py-[10px] px-[20px]">
            <div className="w-[100%] h-[auto] flex items-center">
              <p className="text-xl md:text-2xl font-medium">
                Mobile Application Developer (iOS), App Store
              </p>
            </div>
            <div className="w-[100%] h-[100%] flex items-start justify-end">
              <button className="w-auto h-[30px] flex items-center justify-center scheme-bg rounded mr-[5px]">
                <div className="h-[100%] flex items-center justify-center p-4">
                  <p className="text-[0.85rem] text-white">Edit Post</p>
                </div>
              </button>
              <button className="w-auto h-[30px] flex items-center justify-center border border-black/20 rounded">
                <div className="h-[100%] flex items-center justify-center px-[10px]">
                  <p className="text-[0.85rem]">Delete Post</p>
                </div>
              </button>
            </div>
            <div className="w-[100%] h-[30px] flex items-center">
              <div className="w-auto h-[30px] flex items-center justify-start">
                <div className="h-[100%] flex-1 flex items-center">
                  <p className="text-xs md:text-sm font-semibold scheme-font">
                    Atlassian
                  </p>
                </div>
                <div className="h-[100%] w-auto flex items-center justify-center">
                  <Icon
                    icon="bi:dot"
                    className="w-[20px] h-[20px] text-[#667085]"
                  />
                </div>
              </div>

              <div className="w-auto h-[30px] flex items-center justify-center">
                <div className="h-[100%] w-[auto] flex items-center justify-start">
                  <Icon
                    icon="fluent:location-16-regular"
                    className="w-[15px] h-[15px] scheme-font"
                  />
                </div>
                <div className="h-[100%] flex-1 flex items-center px-[5px]">
                  <p className="text-xs md:text-sm font-medium">
                    Banglore, Karnataka
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[100%] h-[30px] flex items-center justify-end">
              <p className="text-sm font-medium font-secondary">
                Posted 2 Days ago -
                <span className="font-semibold scheme-font mx-[2px]">120</span>
                Applicants
              </p>
            </div>
          </div>
          <div className="w-[100%] h-[auto] items-center px-[20px] pb-[30px]">
            <section className="w-[100%] h-auto flex flex-col mt-[30px] bg-[#F4F7FF] px-[20px] py-[20px] rounded">
              <div className="w-full h-[40px] flex items-center mb-[10px]">
                <p className="text-[1.2rem] font-medium">Job Overview</p>
              </div>
              <div className="w-full h-[auto] grid grid-cols-3   border-black/10 rounded px-[5px]">
                <div className="w-[100%] h-[60px] flex flex-col">
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-semibold scheme-font">
                      EXPERIENCE
                    </p>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-medium">5+ Years</p>
                  </div>
                </div>
                <div className="w-[100%] h-[60px] flex flex-col">
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-semibold scheme-font">
                      SALARY
                    </p>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-medium">32 LPA</p>
                  </div>
                </div>
                <div className="w-[100%] h-[60px] flex flex-col">
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-semibold scheme-font">
                      POSTED
                    </p>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-medium">2 Days ago</p>
                  </div>
                </div>
                <div className="w-[100%] h-[60px] flex flex-col">
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-semibold scheme-font">
                      JOB TYPE
                    </p>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-medium">Fulltime</p>
                  </div>
                </div>
                <div className="w-[100%] h-[60px] flex flex-col">
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-semibold scheme-font">
                      WORK TYPE
                    </p>
                  </div>
                  <div className="w-full h-[50%] flex items-center justify-start">
                    <p className="text-[0.8rem] font-medium">Remote</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-[100%] h-auto flex flex-col my-[30px] px-[10px] py-[0px]">
              <div className="w-full h-[40px] flex items-center mb-[10px]">
                <p className="text-[1.2rem] font-medium">Job Description</p>
              </div>
              <div className="w-full h-[auto] flex">
                <p className="text-[0.9rem] text-[#667085]">
                  At Google, we don’t just build apps — we create mobile
                  experiences that empower billions of users worldwide. As a
                  Mobile Application Developer (Android), you will design,
                  develop, and maintain cutting-edge, high-performance apps that
                  enrich the Google Play Store ecosystem and connect with a
                  global audience. You will collaborate with cross-functional
                  teams, leverage best practices in Kotlin and Android
                  frameworks, and deliver secure, scalable, and seamless
                  features that redefine what’s possible on Android.
                </p>
              </div>
            </section>
            <section className="w-[100%] h-auto flex flex-col mt-[0px] px-[10px] py-[0px]">
              <div className="w-full h-[40px] flex items-center mb-[10px]">
                <p className="text-[1.2rem] font-medium">Requirements</p>
              </div>
              <div className="w-full h-[auto] flex">
                <ul className="list-disc pl-5 space-y-2 text-[0.9rem] text-[#667085]">
                  <li>3+ years of experience in back-end development</li>
                  <li>
                    Proficiency in APIs/Web Services and relevant tech stacks
                  </li>
                  <li>
                    Familiarity with Agile, version control, and project
                    management systems
                  </li>
                  <li>
                    Eager to grow your career and contribute to the success of a
                    fast-growing team
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
