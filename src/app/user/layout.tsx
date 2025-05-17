import React from "react";
import UserLayout from "@/components/Layouts/User/UserLayout";

const layout = ({ children }: { children: React.ReactNode }) => {
  
  return <UserLayout>{children}</UserLayout>;
};

export default layout;
