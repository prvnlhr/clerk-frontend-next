import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const TotalJobsCard = () => {
  return (
    <div className="w-[15%] h-[60%] flex flex-col justify-start items-start gap-y-4 rounded-[15px] p-[10px] border border-gray-200
                    bg-[linear-gradient(180deg,rgba(178,221,255,0.37)_0%,rgba(255,255,255,0)_100%)]">
       {/* ICON--------------------------------------------------------------- */}
       <div className="aspect-square h-[30px] flex justify-center items-center self-end rounded-[60px] bg-gray-100 border border-gray-300">
          <Icon
           icon="mage:stack"
           className="w-[15px] h-[15px] scheme-font"
           />
       </div>
       <div className="w-full h-[auto] flex flex-col justify-start items-start">
            {/* TOTAL JOBS POSTED------------------------------------------------------ */}
            <div className="w-full h-[auto] flex justify-start items-center">
                    <p className="font-medium text-[1rem]">21</p>
            </div>
            {/* LINK TO JOBS PAGE------------------------------------------------------- */}
            <div className="w-full h-[auto] flex justify-start items-center">
                {/*to be changed to Link afterwards  */}
                <p className="font-bold text-[0.65rem] scheme-font">
                    TOTAL JOBS POSTED
                </p>  
                <div className="w-[auto] h-[auto] flex justify-center items-center ml-[4px]">
                    <Icon
                    icon="stash:arrow-up-duotone"
                    className="w-[12px] h-[12px] rotate-45"
                    />
                </div>           
            </div>
            {/* LAST POSTED-------------------------------------------------------------- */}
            <div className="w-full h-[auto] flex justify-start items-center">
                {/*to be changed to Link afterwards  */}
                <p className="text-[0.5rem] text-gray-400">
                   Last Posted -
                </p>          
                <p className="font-semibold text-[0.5rem] ml-[2px]">
                  7 May 2025
                </p>          
            </div>
       </div>
       
    </div>
  )
}

export default TotalJobsCard;
