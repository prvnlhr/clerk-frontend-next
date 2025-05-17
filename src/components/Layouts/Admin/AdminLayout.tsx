"use client";
import React from "react";
import Header from "./Header";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-[100%] h-[60px] items-center">
        <Header />
      </div>
      <div className="w-[100%] h-[calc(100%-60px)] overflow-y-auto hide-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
