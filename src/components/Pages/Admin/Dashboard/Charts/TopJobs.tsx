"use client";

import { JobChartDataItem } from "../../../../../types/Charts/jobChart";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const TopJobs = ({data}: {data: JobChartDataItem[]}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
        <ResponsiveContainer height="80%">
          {/* TOP 5 JOBS--------------------------------------------------------- */}
        <BarChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="jobTitle" tick={{fontSize: "0.6rem"}} interval={0}/>
                <YAxis tick={{fontSize: "0.75rem"}}/>
                <Tooltip cursor={{fill: "#f2f3f4" }}/>
                <Legend />
                <Bar dataKey="applications" fill="#d9d9d9" barSize={30} radius={[5, 5, 0, 0]}/>
        </BarChart>
    </ResponsiveContainer>
</div>
  )
}

export default TopJobs;
