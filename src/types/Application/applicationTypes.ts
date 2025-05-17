export interface Application {
    id: string;
    applicantName: string;
    applicantEmail: string;
    currentPosition: string;
    image: string;
    location: string;
    yoe: string;
    dateApplied: string;
    resumeFile: string;
    applicantDetails: {
      qualifications: string[],
      skills: string[],
      experience: string,
    };
  }

  export interface EditJob {
  id: string;
  title: string;
  company: string;
  coverImageUrl: string;
  logo: string;
  location: string;
  type: "full-time" | "contract" | "temporary" | "internship" | "part-time";
  workType: "onsite" | "remote" | "hybrid" | "flexible";
  salaryType: "notDisclosed" | "fixedAmount" | "range";
  yoe: string;
  salary?: string;
  salaryRange?: string;
  posted: string;
  applications: number;
  skills: string[];
  description: string;
}
