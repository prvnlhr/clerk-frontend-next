export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: "FULLTIME" | "CONTRACT" | "TEMPORARY" | "INTERNSHIP" | "PARTTIME";
  yoe: string;
  salary: string;
  posted: string;
  applications: number;
  skills: string[];
  description: string;
}

interface FilterOption {
  label: string;
  value: string;
}

export interface FilterCategory {
  heading: string;
  filters: FilterOption[];
}
