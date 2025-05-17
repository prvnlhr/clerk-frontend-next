import React from "react";
import { jobTypeData } from "@/utils/sampleChartData";
import { PieChart, Pie, ResponsiveContainer, Cell, PieLabelRenderProps, Legend } from "recharts";
import type { ComponentProps } from "react";
import { DefaultLegendContent } from "recharts/types/component/DefaultLegendContent";

type CustomLegendProps = ComponentProps<typeof DefaultLegendContent>;

//Colors for pie chart
const COLORS = ["#0a65cc", "#4781ec", "#6d9eff", "#90bcff", "#b2dbff"];

const RADIAN = Math.PI / 180;

//Customized labels for pie chart
const renderCustomizedLabel = ( {cx, cy, midAngle, innerRadius, outerRadius, percent}: PieLabelRenderProps ) => {
    const innerRadiusValue = Number(innerRadius);
    const outerRadiusValue = Number(outerRadius);
    const cxValue = Number(cx);
    const cyValue = Number(cy);
    const percentValue = Number(percent);

    const radius = innerRadiusValue + (outerRadiusValue - innerRadiusValue) * 0.5;
    const x = cxValue + radius * Math.cos(-midAngle * RADIAN);
    const y = cyValue + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cxValue ? "start" : "end"} dominantBaseline="central" fontSize="0.85rem">
            {`${(percentValue * 100).toFixed(0)}%`}
        </text>
    );
};


//Customized legend
const renderCustomLegend = (props: CustomLegendProps) => {
  const { payload } = props;

  return (
    <ul className="flex flex-wrap gap-4 mt-4 text-sm justify-center">
      {payload && payload.map((entry, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

const JobDistribution = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
        {/* JOB DISTRIBUTION CHART------------------------------------------------------ */}
        <ResponsiveContainer width="80%" height="100%">
            <PieChart width={400} height={200}>
                <Pie data={jobTypeData} dataKey="totalJobs" outerRadius={90} labelLine={false} label={renderCustomizedLabel}>
                    {jobTypeData.map((_, index)=>(
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Legend content={renderCustomLegend} align="center"/>
            </PieChart>
        </ResponsiveContainer>
    </div>
  )
}

export default JobDistribution
