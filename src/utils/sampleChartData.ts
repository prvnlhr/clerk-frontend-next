import { JobChartDataItem, JobTypeData } from "@/types/Charts/jobChart";

export const jobDataThisMonth: JobChartDataItem[] = [
  { jobTitle: "DevOps Engineer", applications: 400 },
  { jobTitle: "UX Designer", applications: 300 },
  { jobTitle: "Data Scientist", applications: 200 },
  { jobTitle: "Android Developer", applications: 278 },
  { jobTitle: "Technical Support Engineer", applications: 189 },
];

export const jobDataThisWeek: JobChartDataItem[] = [
  { jobTitle: "DevOps Engineer", applications: 40 },
  { jobTitle: "UX Designer", applications: 30},
  { jobTitle: "Data Scientist", applications: 20 },
  { jobTitle: "Android Developer", applications: 25 },
  { jobTitle: "Technical Support Engineer", applications: 18 },
];

export const jobDataRecentPosted: JobChartDataItem[] = [
  { jobTitle: "Product Manager", applications: 20 },
  { jobTitle: "QA Automation Engineer", applications: 40},
  { jobTitle: "Cloud Architect", applications: 20 },
  { jobTitle: "Technical Writer", applications: 25 },
  { jobTitle: "Security Engineer", applications: 18 },
];

export const jobTypeData: JobTypeData[] = [
  { name: "Full Time", totalJobs: 100 },
  { name: "Part Time", totalJobs: 50 },
  { name: "Contract", totalJobs: 30 },
  { name: "Temporary", totalJobs: 70 },
  { name: "Internship", totalJobs: 50 },
];