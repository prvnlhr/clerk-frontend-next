import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import profilePicture from "../../../../../public/profilePhoto.jpg";
import Image from "next/image";
import Link from "next/link";
type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
};

const experiences: Experience[] = [
  {
    company: "Google",
    role: "Software Development Engineer - I",
    duration: "March, 2018 - April, 2022",
    description:
      "As a Software Development Engineer at Google, I contributed to the design and development of scalable backend systems, collaborated closely with cross-functional teams to optimize performance, and implemented innovative solutions to enhance product reliability and user experience.",
  },
  {
    company: "Microsoft",
    role: "Software Engineer",
    duration: "January, 2016 - February, 2018",
    description:
      "At Microsoft, I worked on cloud service integrations within the Azure ecosystem, improving API performance and reliability. I also helped refactor legacy code and introduced CI/CD pipelines to streamline deployments.",
  },
  {
    company: "Amazon",
    role: "Backend Developer Intern",
    duration: "June, 2015 - December, 2015",
    description:
      "During my internship at Amazon, I developed microservices to support internal tools, participated in code reviews, and wrote unit and integration tests to improve code coverage and reliability across services.",
  },
];
type Project = {
  name: string;
  description: string;
  url: string;
  duration: string;
  skills: string[];
};

const projects: Project[] = [
  {
    name: "TaskFlow",
    description:
      "A collaborative task management tool designed for teams to plan, assign, and track project progress efficiently.",
    url: "https://taskflow.app",
    duration: "May 2022 - June 2023",
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "TypeScript",
      "Socket.IO",
    ],
  },
  {
    name: "ShopSwift",
    description:
      "An e-commerce platform that supports multi-vendor functionality, real-time inventory updates, and secure payments.",
    url: "https://shopswift.io",
    duration: "May 2022 - June 2023",
    skills: ["Next.js", "Node.js", "PostgreSQL", "Stripe API", "Tailwind CSS"],
  },
  {
    name: "FitTrack",
    description:
      "A fitness tracking web app that helps users log workouts, set goals, and monitor progress using visual charts.",
    url: "https://fittrack.dev",
    duration: "May 2022 - June 2023",
    skills: ["React", "Redux", "Firebase", "Chart.js", "Material UI"],
  },
];

const skills: string[] = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Tailwind CSS",
  "Material UI",
  "Redux",
  "Zustand",
  "GraphQL",
  "REST API",
  "Socket.IO",
  "Stripe API",
  "Git",
  "Docker",
  "Jest",
];

type Certification = {
  certificationName: string;
  institutionName: string;
  duration: string;
  link: string;
};

const certifications: Certification[] = [
  {
    certificationName: "Full Stack Web Development",
    institutionName: "Coursera (University of Michigan)",
    duration: "May, 2012 - June, 2013",
    link: "https://www.coursera.org/account/accomplishments/certificate/ABC123",
  },
  {
    certificationName: "Data Science Specialization",
    institutionName: "Johns Hopkins University",
    duration: "May, 2012 - June, 2013",
    link: "https://www.coursera.org/account/accomplishments/certificate/DEF456",
  },
  {
    certificationName: "Certified Kubernetes Administrator",
    institutionName: "The Linux Foundation",
    duration: "May, 2012 - June, 2013",
    link: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/",
  },
];

type Education = {
  institute: string;
  duration: string;
  grade: string;
  degree: string;
  fieldOfStudy: string;
};

const education: Education[] = [
  {
    institute: "Massachusetts Institute of Technology",
    duration: "August, 2008 - May, 2012",
    grade: "3.9 GPA",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science and Engineering",
  },
  {
    institute: "Stanford University",
    duration: "September, 2013 - June, 2015",
    grade: "4.0 GPA",
    degree: "Master of Science",
    fieldOfStudy: "Artificial Intelligence",
  },
  {
    institute: "Harvard Business School",
    duration: "September, 2017 - May, 2019",
    grade: "Distinction",
    degree: "Master of Business Administration",
    fieldOfStudy: "Technology Management",
  },
];

const ApplicationDetailsPage = () => {
  return (
    <div className="w-full h-full flex flex-col  bg-[#F5F7F9]">
      <div className="w-[100%] h-[calc(100%-40px)] flex justify-center items-start overflow-y-scroll hide-scrollbar">
        <div className="w-[60%] h-auto flex mt-[20px]">
          <section className="w-[calc(30%-2px)] h-[auto] self-start px-[20px] py-[30px] bg-white mr-[2px]">
            {/* Profile Picture & Applicant's Name */}

            <div className="w-[100%] h-[auto] flex flex-col items-center">
              <div className=" w-[45%] aspect-square border-1 border-[#0a65cc7a] rounded-full p-[5px] bg-[#F4F5FF]">
                <div className="relative w-[100%] h-[100%] flex items-center justify-center rounded-full overflow-hidden">
                  <Image
                    src={profilePicture}
                    fill={true}
                    alt="profile-picture"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="w-[100%] h-[auto] py-[10px] mt-[10px] flex flex-col items-center justify-center">
                <p className="text-[1.2rem] font-semibold">Steve Rogers</p>
                <p className="text-xs font-medium">
                  Full-stack Software developer
                </p>
              </div>

              <div className="w-[100%] h-[30px] flex justify-center items-center">
                <p className="text-xs">
                  Applied on{" "}
                  <span className="font-medium">September, 2024</span>
                </p>
              </div>

              <div className="w-[100%] h-[40px] rounded flex justify-center items-center bg-[#F4F5FF] mt-[10px]">
                <Icon
                  icon="proicons:briefcase"
                  className="w-[20px] h-[20px] scheme-font mr-[5px]"
                />
                <p className="text-xs font-medium">5+ Years Experience</p>
              </div>

              <button className="w-[100%] h-[35px] rounded flex items-center justify-center scheme-bg mt-[10px] cursor-pointer">
                <Icon
                  icon="material-symbols:download-rounded"
                  className="w-[22px] h-[22px] text-white"
                />
                <p className="text-sm text-white ml-[5px]">Download Resume</p>
              </button>
            </div>

            {/* Personal Info */}
            <div className="w-[100%] h-auto flex flex-col mt-[10px]">
              <div className="w-[100%] h-[auto] py-[10px] flex items-center my-[10px] border-black/10 bg-[#F4F5FF] px-[10px]">
                <p className="text-[1rem] font-bold scheme-font">
                  Personal Info
                </p>
              </div>
              {/* GENDER */}
              <div className="w-[100%] h-[50px] flex mt-[10px]">
                <div className="h-[100%] aspect-square flex">
                  <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#F4F5FF] rounded">
                    <Icon
                      icon="ph:gender-male"
                      className="w-[40%] h-[40%] scheme-font"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-center pl-[10px]">
                  <p className="text-sm font-medium font-secondary">Gender</p>
                  <p className="text-xs font-medium">Male</p>
                </div>
              </div>
              {/* DOB */}
              <div className="w-[100%] h-[50px] flex mt-[10px]">
                <div className="h-[100%] aspect-square flex">
                  <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#F4F5FF] rounded">
                    <Icon
                      icon="fluent-mdl2:birthday-cake"
                      className="w-[40%] h-[40%] scheme-font"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-center pl-[10px]">
                  <p className="text-sm font-medium font-secondary">
                    Date of Birth
                  </p>
                  <p className="text-xs font-medium">Dec 14, 1985 </p>
                </div>
              </div>
              {/* EMAIL */}
              <div className="w-[100%] h-[50px] flex mt-[10px]">
                <div className="h-[100%] aspect-square flex">
                  <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#F4F5FF] rounded">
                    <Icon
                      icon="formkit:email"
                      className="w-[40%] h-[40%] scheme-font"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-center pl-[10px]">
                  <p className="text-sm font-medium font-secondary">
                    Email address
                  </p>
                  <p className="text-xs font-medium">steveroger@gmail.com</p>
                </div>
              </div>
              {/* PHONE */}
              <div className="w-[100%] h-[50px] flex mt-[10px]">
                <div className="h-[100%] aspect-square flex">
                  <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#F4F5FF] rounded">
                    <Icon
                      icon="solar:phone-linear"
                      className="w-[40%] h-[40%] scheme-font"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-center pl-[10px]">
                  <p className="text-sm font-medium font-secondary">Phone</p>
                  <p className="text-xs font-medium">+91 9876543210</p>
                </div>
              </div>
              {/* CURRENT LOCATION */}
              <div className="w-[100%] h-[50px] flex mt-[10px]">
                <div className="h-[100%] aspect-square flex">
                  <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#F4F5FF] rounded">
                    <Icon
                      icon="fluent:location-16-regular"
                      className="w-[40%] h-[40%] scheme-font"
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-center pl-[10px]">
                  <p className="text-sm font-medium font-secondary">
                    Current Location
                  </p>
                  <p className="text-xs font-medium">Banglore, Karnataka</p>
                </div>
              </div>
              {/* LINKS  */}
              <div className="w-[100%] h-[auto] flex mt-[10px]">
                <div className="h-[50px] aspect-square flex">
                  <div className="w-[45px] h-[45px] flex items-center justify-center bg-[#F4F5FF] rounded">
                    <Icon
                      icon="mynaui:link"
                      className="w-[40%] h-[40%] scheme-font"
                    />
                  </div>
                </div>
                <div className="w-[calc(100%-50px)] flex flex-col items-start justify-center px-[10px]">
                  <p className="text-sm font-medium font-secondary">Links</p>
                  <div className="w-full truncate flex flex-col my-[5px]">
                    <p className="text-sm font-medium font-secondary">
                      Linkedin
                    </p>
                    <Link
                      href={"https://www.linkedin.com/in/johndoe/"}
                      className="text-xs font-medium truncate scheme-font"
                    >
                      https://www.linkedin.com/in/johndoe/
                    </Link>
                  </div>
                  <div className="w-full truncate flex flex-col my-[5px]">
                    <p className="text-sm font-medium font-secondary">Github</p>

                    <Link
                      href={"https://github.com/johndoe"}
                      className="text-xs font-medium truncate scheme-font"
                    >
                      https://github.com/johndoe
                    </Link>
                  </div>
                  <div className="w-full truncate flex flex-col my-[5px]">
                    <p className="text-sm font-medium font-secondary">
                      Portfolio
                    </p>
                    <Link
                      href={"https://johndoe.dev"}
                      className="text-xs font-medium truncate scheme-font"
                    >
                      https://johndoe.dev
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-[70%] h-[auto] flex items-start px-[5px] py-[5px] bg-white">
            <div className="w-[100%] h-[auto] flex flex-col">
              {/* Experience ------------------------------------------------------------ */}
              <section className="w-[100%] h-[auto] flex flex-col">
                <div className="w-[100%] h-[auto] py-[10px] flex items-center border-black/10 bg-[#F4F5FF] px-[10px] sticky top-0">
                  <p className="text-[1rem] font-bold scheme-font">
                    Experience
                  </p>
                </div>
                <div className="w-[100%] h-[auto] flex flex-col mt-[20px] px-[15px]">
                  {experiences.map((experience, eId) => (
                    <div
                      key={eId}
                      className="w-[100%] h-[auto] flex flex-col my-[10px]"
                    >
                      <p className="text-[1rem] font-medium">
                        {experience.company}
                      </p>
                      <div className="w-[100%] h-auto flex items-center mt-[5px]">
                        <p className="text-sm font-medium">{experience.role}</p>
                        <Icon
                          icon="bi:dot"
                          className="w-[20px] h-[20px] text-[#667085]"
                        />

                        <p className="text-sm font-medium">
                          {experience.duration}
                        </p>
                      </div>
                      <div className="w-[100%] h-auto flex items-center mt-[10px]">
                        <p className="text-xs font-secondary">
                          {experience.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              {/* Projects ------------------------------------------------------------ */}
              <section className="w-[100%] h-[auto] flex flex-col">
                <div className="w-[100%] h-[auto] py-[10px] flex items-center border-black/10 bg-[#F4F5FF] px-[10px] sticky top-0">
                  <p className="text-[1rem] font-bold scheme-font">Projects</p>
                </div>
                <div className="w-[100%] h-[auto] flex flex-col mt-[20px] px-[15px]">
                  {projects.map((project, eId) => (
                    <div
                      key={eId}
                      className="w-[100%] h-[auto] flex flex-col my-[10px]"
                    >
                      <p className="text-[1rem] font-medium">{project.name}</p>
                      <Link
                        href={project.url}
                        className="w-[100%] h-auto flex items-center mt-[5px]"
                      >
                        <Icon
                          icon="mynaui:link"
                          className="w-[15px] h-[15px] scheme-font mr-[5px]"
                        />
                        <p className="text-sm font-medium scheme-font">
                          {project.url}
                        </p>
                      </Link>
                      <div className="w-[100%] h-auto flex items-center mt-[5px]">
                        <p className="text-sm font-medium">
                          {project.duration}
                        </p>
                      </div>
                      <div className="w-[100%] h-auto flex items-center mt-[10px]">
                        <p className="text-xs font-secondary">
                          {project.description}
                        </p>
                      </div>
                      <div className="w-[100%] h-auto flex flex-wrap mt-[0px]">
                        {project.skills.map((projectSkill, skillId) => (
                          <div
                            key={skillId}
                            className="w-auto h-[30px] flex items-center"
                          >
                            <p className="text-xs font-secondary">
                              {projectSkill}
                            </p>
                            <Icon
                              icon="bi:dot"
                              className="w-[15px] h-[15px] font-secondary"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              {/* Skills ------------------------------------------------------------ */}
              <section className="w-[100%] h-[auto] flex flex-col">
                <div className="w-[100%] h-[auto] py-[10px] flex items-center border-black/10 bg-[#F4F5FF] px-[10px] sticky top-0">
                  <p className="text-[1rem] font-bold scheme-font">Skills</p>
                </div>
                <div className="w-[100%] h-[auto] flex flex-wrap mt-[20px] px-[15px]">
                  {skills.map((skill, skillId) => (
                    <div
                      key={skillId}
                      className="w-auto h-auto px-[10px] py-[5px] mr-[10px] mb-[10px] bg-[#F4F5FF] flex items-center justify-center rounded-full"
                    >
                      <p className="text-xs font-medium">{skill}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications ------------------------------------------------------------ */}
              <section className="w-[100%] h-[auto] flex flex-col mt-[20px]">
                <div className="w-[100%] h-[auto] py-[10px] flex items-center border-black/10 bg-[#F4F5FF] px-[10px] sticky top-0">
                  <p className="text-[1rem] font-bold scheme-font">
                    Certifications
                  </p>
                </div>
                <div className="w-[100%] h-[auto] flex flex-col mt-[10px] px-[15px]">
                  {certifications.map((certification, eId) => (
                    <div
                      key={eId}
                      className="w-[100%] h-[auto] flex flex-col my-[10px]"
                    >
                      <p className="text-[1rem] font-medium">
                        {certification.certificationName}
                      </p>
                      <div className="w-[100%] h-[30px] flex items-center">
                        <p className="text-sm font-medium font-secondary">
                          {certification.institutionName}
                        </p>
                        <Icon
                          icon="bi:dot"
                          className="w-[20px] h-[20px] font-secondary"
                        />
                        <p className="text-sm font-medium">
                          {certification.duration}
                        </p>
                      </div>
                      <Link
                        href={certification.link}
                        className="w-[100%] h-auto flex items-center"
                      >
                        <Icon
                          icon="mynaui:link"
                          className="w-[15px] h-[15px] scheme-font mr-[5px]"
                        />
                        <p className="text-sm font-medium scheme-font truncate">
                          {certification.link}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education ------------------------------------------------------------ */}
              <section className="w-[100%] h-[auto] flex flex-col mt-[20px]">
                <div className="w-[100%] h-[auto] py-[10px] flex items-center border-black/10 bg-[#F4F5FF] px-[10px] sticky top-0">
                  <p className="text-[1rem] font-bold scheme-font">Education</p>
                </div>
                <div className="w-[100%] h-[auto] flex flex-col mt-[10px] space-y-3 px-[15px]">
                  {education.map((edu, eId) => (
                    <div
                      key={eId}
                      className="w-[100%] h-[60px] flex flex-col my-[10px] p-1 rounded-lg hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <div className="w-[100%] h-[20px] flex items-center">
                        <p className="text-[1rem] font-medium text-gray-800">
                          {edu.degree}
                        </p>
                      </div>
                      <div className="w-[100%] h-[20px] flex items-center">
                        <p className="text-sm font-medium font-secondary text-gray-600">
                          {edu.institute}
                        </p>
                        <Icon
                          icon="bi:dot"
                          className="w-[20px] h-[20px] font-secondary text-gray-400"
                        />
                        <p className="text-sm font-medium text-gray-500">
                          {edu.duration}
                        </p>
                      </div>
                      <div className="w-[100%] h-[20px] flex items-center">
                        <Icon
                          icon="solar:medal-ribbon-outline"
                          className="w-[15px] h-[15px] mr-[5px] scheme-font text-indigo-500"
                        />
                        <p className="text-xs font-medium font-secondary text-gray-500">
                          {edu.grade}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsPage;
