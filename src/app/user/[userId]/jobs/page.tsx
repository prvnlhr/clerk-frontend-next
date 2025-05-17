import JobListingsPage from "@/components/Pages/User/Job/JobListingsPage";
import React from "react";

// http:localhost:3000/user/3f7a42b1-6e32-4a8d-b5d2-1c9f8d6e3f2a/jobs

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { filter } = await searchParams;
  return <JobListingsPage isfilter={filter === "true"} />;
};

export default page;
