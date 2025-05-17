const profilePhoto = "/profilePhoto.jpg";

export type Gender = "Male" | "Female" | "Non-binary" | "Prefer not to say";
export type WorkStatus = "Fresher" | "Experienced";
export type JobType =
  | "full-time"
  | "part-time"
  | "contract"
  | "temporary"
  | "internship";
export type WorkType = "onsite" | "remote" | "hybrid" | "flexible";

export interface PersonalInfo {
  photo?: string;
  name: string;
  gender: Gender;
  dob: string;
  contactNumber: string;
  email: string;
  currentLocation: string;
  workStatus: WorkStatus;
  nationality: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface CareerPreferences {
  preferredJobRole: string;
  expectedSalary: string;
  jobTypes: JobType[];
  workTypes: WorkType[];
}

export interface Education {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startDate: string;
  endDate: string;
  grade: string;
}

export interface SkillCertification {
  skills: string[];
  certifications: Certification[];
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skillsUsed: string[];
  startDate: string;
  endDate?: string;
  projectUrl?: string;
}

export interface WorkExperience {
  id: string;
  isCurrentJob: "Yes" | "No";
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  roleDescription: string;
}

export interface Resume {
  name: string;
  url: string;
  uploadDate: string;
}

export interface UserProfile {
  personalInfo: PersonalInfo;
  careerPreferences: CareerPreferences;
  education: Education[];
  skillsCertifications: SkillCertification;
  projects: Project[];
  workExperiences: WorkExperience[];
  resume: Resume | null;
}

export const sampleUserProfile: UserProfile = {
  personalInfo: {
    name: "John Doe",
    photo: profilePhoto,
    gender: "Male",
    dob: "15/05/1990",
    contactNumber: "9876543210",
    email: "john.doe@example.com",
    currentLocation: "Bangalore, India",
    workStatus: "Experienced",
    nationality: "Indian",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    portfolio: "https://johndoe.portfolio.com",
  },
  careerPreferences: {
    preferredJobRole: "Senior Frontend Developer",
    expectedSalary: "₹15-20 LPA",
    jobTypes: ["full-time", "contract"],
    workTypes: ["remote", "hybrid"],
  },
  education: [
    {
      id: "1",
      degree: "B.Tech in Computer Science",
      fieldOfStudy: "Computer Science",
      institution: "Indian Institute of Technology",
      startDate: "Aug 2010",
      endDate: "May 2014",
      grade: "8.5/10",
    },
    {
      id: "2",
      degree: "Higher Secondary",
      fieldOfStudy: "Science",
      institution: "Delhi Public School",
      startDate: "Apr 2008",
      endDate: "Mar 2010",
      grade: "92%",
    },
  ],
  skillsCertifications: {
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    certifications: [
      {
        id: "1",
        name: "AWS Certified Developer",
        organization: "Amazon Web Services",
        issueDate: "Jun 2020",
        expiryDate: "Jun 2023",
        credentialId: "AWS-123456789",
      },
      {
        id: "2",
        name: "React Professional",
        organization: "Udemy",
        issueDate: "Jan 2019",
        credentialId: "UC-XYZ789ABC123",
      },
    ],
  },
  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description: `Developed a full-stack e-commerce platform with React, Node.js, and MongoDB. 
      Implemented user authentication, product catalog, and payment integration. 
      Optimized performance reducing load times by 40%. 
      The platform serves 10,000+ monthly active users.`,
      skillsUsed: ["React", "Node.js", "MongoDB"],
      startDate: "Jan 2020",
      endDate: "Dec 2020",
      projectUrl: "https://github.com/johndoe/ecommerce",
    },
    {
      id: "2",
      title: "Portfolio Website",
      description: `Designed and developed an interactive personal portfolio website. 
      Implemented smooth animations using GSAP and CSS transitions. 
      Integrated a blog section with content management capabilities. 
      The site scores 95+ on Lighthouse performance metrics.`,
      skillsUsed: ["React", "GSAP", "CSS"],
      startDate: "Mar 2021",
      endDate: "May 2021",
    },
  ],
  workExperiences: [
    {
      id: "1",
      isCurrentJob: "Yes",
      companyName: "Tech Solutions Inc.",
      jobTitle: "Senior Frontend Developer",
      startDate: "Jan 2020",
      roleDescription: `Lead a team of 5 frontend developers building enterprise applications. 
      Architected a component library improving development speed by 30%. 
      Implemented performance optimizations reducing bundle size by 25%. 
      Mentored junior developers in React best practices.`,
    },
    {
      id: "2",
      isCurrentJob: "No",
      companyName: "Digital Creations",
      jobTitle: "Frontend Developer",
      startDate: "Jul 2016",
      endDate: "Dec 2019",
      roleDescription: `Developed user interfaces for 10+ web applications using React and Redux. 
      Collaborated with UX designers to implement responsive layouts. 
      Reduced UI bugs by 60% through improved testing practices. 
      Contributed to the development of the company's design system.`,
    },
  ],
  resume: {
    name: "John_Doe_Resume.pdf",
    url: "/resumes/John_Doe_Resume.pdf",
    uploadDate: "15 Oct 2023",
  },
};
