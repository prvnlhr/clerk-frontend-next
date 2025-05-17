import AdminLayout from "@/components/Layouts/Admin/AdminLayout";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
