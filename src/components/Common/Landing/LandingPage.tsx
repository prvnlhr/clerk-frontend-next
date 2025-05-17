import Image from "next/image";
import React from "react";
import landingPageBanner from "../../../../public/banners/landing_page_banner.jpg";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
const LandingPage = () => {
  return (
    <div className="w-[100%] h-[100%] flex  items-center justify-center">
      <div className="md:w-[80%] md:h-[80%]  h-[100%] w-[100%] flex flex-col md:flex-row">
        {/* LEFT SECTION: FORM CONTENT */}
        <section className="w-[100%] md:w-[40%] h-[70vh] md:h-[100%] px-[30px] md:py-[0px] py-[20px]">
          <div className="w-[100%] h-[100%] flex  flex-col">
            <div className="w-full flex items-center">
              <h3 className="text-[2.5rem] font-extrabold leading-tight">
                Connecting{" "}
                <span className="scheme-font italic mx-1">Talent</span> with{" "}
                <span className="scheme-font italic">Opportunity.</span>
              </h3>
            </div>
            <div className="w-[100%] h-auto flex items-center mt-[20px]">
              <p className="text-[1rem] font-normal text-[#a8adb7]">
                Great careers and thriving businesses start with the right
                connection. We bring talent and opportunity together—helping job
                seekers grow and employers succeed. Your perfect match begins
                here.
              </p>
            </div>
            <div className="w-[100%] h-[70px] flex items-center mt-[20px]">
              <Link
                href={"/auth/user/sign-in"}
                className="w-[auto] h-[40px]  mr-[20px] scheme-bg  flex items-center justify-center rounded"
              >
                <div className="h-[100%] aspect-square flex items-center justify-center">
                  <Icon
                    icon="bi:briefcase"
                    className="w-[18px] h-[18px] text-white"
                  />
                </div>
                <div className="flex-1 h-[100%] flex items-center justify-center pr-[20px]">
                  <p className="text-sm text-white font-medium">Find a Job</p>
                </div>
              </Link>

              <Link
                href={"/auth/admin/sign-in"}
                className="w-[auto] h-[40px]  mr-[20px] border border-[#D6DDEB] flex items-center justify-center rounded"
              >
                <div className="h-[100%] aspect-square flex items-center justify-center">
                  <Icon
                    icon="material-symbols-light:post-outline-rounded"
                    className="w-[18px] h-[18px] scheme-font"
                  />
                </div>
                <div className="flex-1 h-[100%] flex items-center justify-center pr-[20px]">
                  <p className="text-sm scheme-font font-medium">Post a Job</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        {/* RIGHT SECTION: BANNER IMAGE */}
        <section className="relative w-[100%] h-[30vh] md:w-[60%] md:h-[100%] bg-[#E7F0FA] overflow-hidden rounded">
          {/* Image Container */}
          <div className="w-full h-full z-[1]">
            <Image
              src={landingPageBanner}
              fill={true}
              alt="sign-up-banner"
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#131776]/90 via-[#131776]/50 to-[#131776]/0" />

          <div className="absolute bottom-0 left-0 right-0 z-[3] p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Welcome Back.
              <span className="block mt-2 text-2xl md:text-3xl font-semibold text-white/90">
                Access your personalized dashboard and continue your job search
                journey
              </span>
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
