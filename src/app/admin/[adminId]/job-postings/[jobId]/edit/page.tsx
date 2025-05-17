import JobUpdatePage from "@/components/Pages/Admin/Job/JobUpdate/JobUpdatePage";
import React from "react";
import { editJobData } from "@/utils/sampleJobData";
const page = () => {
  return <JobUpdatePage editJobData={editJobData} />;
};

export default page;
