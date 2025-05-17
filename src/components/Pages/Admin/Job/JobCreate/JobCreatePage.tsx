"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Image from "next/image";
import JobDescriptionEditor from "./JobDescriptionEditor";

// Zod schema for form validation
const jobFormSchema = z
  .object({
    coverImage: z.instanceof(File).optional(),
    companyLogo: z.instanceof(File).optional(),
    jobTitle: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    jobType: z.enum([
      "full-time",
      "part-time",
      "contract",
      "temporary",
      "internship",
    ]),
    workType: z.enum(["onsite", "remote", "hybrid", "flexible"]),
    experience: z.string().min(1, "Experience is required"),
    salaryType: z.enum(["notDisclosed", "fixedAmount", "range"]),
    salaryFrom: z.number().optional(),
    salaryTo: z.number().optional(),
    fixedSalary: z.number().optional(),
    skills: z.array(z.string()).min(1, "At least one skill is required"),
    jobDescription: z.string().min(1, "Job description is required"),
  })
  .superRefine((data, ctx) => {
    if (data.salaryType === "fixedAmount" && !data.fixedSalary) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Fixed amount is required",
        path: ["fixedSalary"],
      });
    }
    if (data.salaryType === "range" && (!data.salaryFrom || !data.salaryTo)) {
      if (!data.salaryFrom) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "From amount is required",
          path: ["salaryFrom"],
        });
      }
      if (!data.salaryTo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "To amount is required",
          path: ["salaryTo"],
        });
      }
      if (data.salaryFrom && data.salaryTo && data.salaryFrom > data.salaryTo) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "From amount must be less than To amount",
          path: ["salaryFrom"],
        });
      }
    }
  });

type JobFormData = z.infer<typeof jobFormSchema>;

const JobCreatePage = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(
    null
  );
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      jobType: "full-time",
      workType: "onsite",
      salaryType: "notDisclosed",
      skills: [],
      experience: "",
      jobDescription: "",
    },
  });

  const selectedSalaryType = watch("salaryType");
  const selectedJobType = watch("jobType");
  const selectedWorkType = watch("workType");
  const selectedExperience = watch("experience");

  const experienceOptions = [
    { value: "0", label: "Fresher (0 years)" },
    { value: "1", label: "1 year" },
    { value: "2", label: "2 years" },
    { value: "3", label: "3 years" },
    { value: "4", label: "4 years" },
    { value: "5", label: "5 years" },
    { value: "6", label: "6 years" },
    { value: "7", label: "7 years" },
    { value: "8", label: "8 years" },
    { value: "9", label: "9 years" },
    { value: "10", label: "10 years" },
    { value: "11-15", label: "11-15 years" },
    { value: "16-20", label: "16-20 years" },
    { value: "20+", label: "20+ years" },
  ];

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setSkills((prev) => [...prev, skillInput.trim()]);
      setValue("skills", [...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    setValue("skills", newSkills);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "coverImage" | "companyLogo"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(type, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "coverImage") {
          setCoverImagePreview(reader.result as string);
        } else {
          setCompanyLogoPreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceSelect = (value: string) => {
    setValue("experience", value);
    setIsExperienceOpen(false);
  };

  const onSubmit = (data: JobFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-[10px] bg-[#F5F7F9]">
      <div className="w-[100%] md:w-[60%] h-[95%] overflow-y-scroll hide-scrollbar bg-white p-[20px] rounded">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[100%] h-[50px] flex items-center border-b border-black/10 mb-[20px] sticky -top-[20px] bg-white z-3">
            <h1 className="text-2xl font-medium">Create a Job Post</h1>
          </div>

          {/* COVER IMAGE & COMPANY LOGO */}
          <section className="w-full h-auto flex flex-col mt-[0px]">
            <div className="w-full h-[40px] flex items-center">
              <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                COVER IMAGE & COMPANY LOGO
                <span className="text-[#9199A3] font-normal ml-[5px]">
                  (Optional)
                </span>
              </label>
            </div>
            <div className="w-[100%] h-[140px]">
              {/* Cover Image */}
              <label className="relative w-[100%] h-[100px] flex items-center justify-center border-2 border-dashed border-[#D6DDEB] rounded cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, "coverImage")}
                />
                {coverImagePreview ? (
                  <Image
                    fill={true}
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <Icon
                    icon="flowbite:plus-outline"
                    className="w-[20px] h-[20px] text-gray-400"
                  />
                )}
              </label>

              {/* Company Logo */}
              <div className="relative w-[100%] h-[40px]">
                <label className="absolute rounded border-2 border-dashed border-[#D6DDEB]  bg-gray-100 h-[80px] aspect-[1/1] flex items-center justify-center left-[20px] bottom-[0%] z-[2] cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, "companyLogo")}
                  />
                  {companyLogoPreview ? (
                    <Image
                      fill={true}
                      src={companyLogoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <Icon
                      icon="flowbite:plus-outline"
                      className="w-[20px] h-[20px] text-gray-400"
                    />
                  )}
                </label>
              </div>
            </div>
          </section>

          <section className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 mt-[20px]">
            {/* JOB TITLE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  JOB TITLE *
                </label>
                <div className="w-full h-full">
                  <input
                    {...register("jobTitle")}
                    placeholder="Ex. Lead Product Manager"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.jobTitle && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            {/* COMPANY */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  COMPANY *
                </label>
                <div className="w-full h-full">
                  <input
                    {...register("company")}
                    placeholder="Ex. Google"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.company && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.company.message}
                  </p>
                )}
              </div>
            </div>

            {/* LOCATION */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  LOCATION *
                </label>
                <div className="w-full h-full">
                  <input
                    {...register("location")}
                    placeholder="Ex. Banglore, Karnataka"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.location && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* JOB TYPE */}
            <div className="w-[100%] h-[auto] min-h-[100px] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  JOB TYPE *
                </label>
                <div className="w-full h-full flex items-center flex-wrap justify-start min-h-[30px]">
                  {(
                    [
                      "full-time",
                      "part-time",
                      "contract",
                      "temporary",
                      "internship",
                    ] as const
                  ).map((type) => (
                    <div
                      key={type}
                      className="h-[20px] w-auto flex items-center mt-[10px] cursor-pointer"
                      onClick={() => setValue("jobType", type)}
                    >
                      <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                        {selectedJobType === type && (
                          <div className="w-[100%] h-[100%] scheme-bg"></div>
                        )}
                      </div>
                      <div className="h-[100%] flex-1 flex items-center justify-center px-[10px] text-[0.75rem] font-medium">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.jobType && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.jobType.message}
                  </p>
                )}
              </div>
            </div>

            {/* WORK TYPE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2 md:col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  WORK TYPE *
                </label>
                <div className="w-full h-full flex flex-wrap items-center justify-start min-h-[30px]">
                  {(["onsite", "remote", "hybrid", "flexible"] as const).map(
                    (type) => (
                      <div
                        key={type}
                        className="h-[20px] w-auto flex items-center mt-[10px] cursor-pointer"
                        onClick={() => setValue("workType", type)}
                      >
                        <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                          {selectedWorkType === type && (
                            <div className="w-[100%] h-[100%] scheme-bg"></div>
                          )}
                        </div>
                        <div className="h-[100%] flex-1 flex items-center justify-center px-[10px] text-[0.75rem] font-medium">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.workType && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.workType.message}
                  </p>
                )}
              </div>
            </div>

            {/* EXPERIENCE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2 md:col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  EXPERIENCE *
                </label>
                <div className="relative w-full h-[100%] flex justify-start">
                  <div
                    className="flex-1 h-[100%] flex items-center cursor-pointer"
                    onClick={() => setIsExperienceOpen(!isExperienceOpen)}
                  >
                    <p className="text-xs font-medium">
                      {selectedExperience
                        ? experienceOptions.find(
                            (opt) => opt.value === selectedExperience
                          )?.label || "Select experience"
                        : "Select experience"}
                    </p>
                  </div>
                  <div className="h-[100%] aspect-[1/1] flex items-center justify-center">
                    <Icon
                      icon="famicons:chevron-down"
                      className="w-[15px] h-[15px] text-[#5a5d79] cursor-pointer"
                      onClick={() => setIsExperienceOpen(!isExperienceOpen)}
                    />
                  </div>
                  {isExperienceOpen && (
                    <div className="left-0 top-[45px] absolute w-[100%] h-[auto] max-h-[300px] overflow-y-scroll hide-scrollbar flex flex-col items-center border border-[#D6DDEB] shadow-[0px_3px_5px_rgba(0,0,0,0.04)] bg-white px-[10px] py-[20px] rounded">
                      {experienceOptions.map((exp, expIndex) => (
                        <div
                          key={expIndex}
                          className="w-[100%] h-[35px] min-h-[35px] flex items-center hover:bg-[#F4F7FF] pl-[15px] rounded cursor-pointer"
                          onClick={() => handleExperienceSelect(exp.value)}
                        >
                          <p className="text-sm font-medium">{exp.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.experience && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.experience.message}
                  </p>
                )}
              </div>
            </div>

            {/* SALARY */}
            <div className="w-[100%] h-[100%] flex flex-col col-span-2">
              <div className="w-full h-[calc(100%-25px)] grid grid-rows-[30px_minmax(0,1fr)] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  SALARY *
                </label>
                <div className="w-full h-full flex justify-start">
                  {(["notDisclosed", "fixedAmount", "range"] as const).map(
                    (type) => (
                      <div
                        key={type}
                        className="h-[20px] w-auto flex items-center my-[10px] cursor-pointer"
                        onClick={() => setValue("salaryType", type)}
                      >
                        <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                          {selectedSalaryType === type && (
                            <div className="w-[100%] h-[100%] scheme-bg"></div>
                          )}
                        </div>
                        <div className="h-[100%] flex-1 flex items-center justify-center px-[10px] text-[0.75rem] font-medium">
                          {type === "notDisclosed"
                            ? "Not Disclosed"
                            : type === "fixedAmount"
                            ? "Fixed Amount"
                            : "Range"}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Salary Inputs */}
                {selectedSalaryType === "fixedAmount" && (
                  <div className="w-full h-[50px] flex items-center">
                    <div className="w-auto h-[30px] flex justify-start border border-[#D6DDEB] rounded">
                      <div className="h-[100%] aspect-[1/1] flex items-center justify-center border-r border-[#D6DDEB]">
                        <Icon
                          icon="ic:twotone-currency-rupee"
                          className="w-[50%] h-[50%] scheme-font"
                        />
                      </div>
                      <div className="flex-1 h-[100%]">
                        <input
                          type="number"
                          {...register("fixedSalary", { valueAsNumber: true })}
                          placeholder="Amount"
                          className="w-[100px] h-[100%] px-[10px] placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedSalaryType === "range" && (
                  <div className="w-full h-[50px] flex items-center">
                    <div className="w-auto h-[30px] flex justify-start border border-[#D6DDEB] rounded">
                      <div className="h-[100%] aspect-[1/1] flex items-center justify-center border-r border-[#D6DDEB]">
                        <Icon
                          icon="ic:twotone-currency-rupee"
                          className="w-[50%] h-[50%] scheme-font"
                        />
                      </div>
                      <div className="flex-1 h-[100%]">
                        <input
                          type="number"
                          {...register("salaryFrom", { valueAsNumber: true })}
                          placeholder="From"
                          className="w-[100px] h-[100%] px-[10px] placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        />
                      </div>
                    </div>
                    <span className="mx-[5px]">-</span>
                    <div className="w-auto h-[30px] flex justify-start border border-[#D6DDEB] rounded">
                      <div className="h-[100%] aspect-[1/1] flex items-center justify-center border-r border-[#D6DDEB]">
                        <Icon
                          icon="ic:twotone-currency-rupee"
                          className="w-[50%] h-[50%] scheme-font"
                        />
                      </div>
                      <div className="flex-1 h-[100%] flex items-center">
                        <input
                          type="number"
                          {...register("salaryTo", { valueAsNumber: true })}
                          placeholder="To"
                          className="w-[100px] h-[100%] px-[10px] placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-[25px] flex items-center">
                {(errors.fixedSalary ||
                  errors.salaryFrom ||
                  errors.salaryTo) && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.fixedSalary?.message ||
                      errors.salaryFrom?.message ||
                      errors.salaryTo?.message}
                  </p>
                )}
              </div>
            </div>

            {/* SKILLS */}
            <div className="w-[100%] h-[100%] flex flex-col col-span-2">
              <div className="w-full h-[calc(100%-25px)] grid grid-rows-[30px_minmax(0,1fr)] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  SKILLS *
                </label>
                <div className="w-[80%] h-[30px] flex border-b border-[#D6DDEB] my-[10px] mr-[10px]">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    placeholder="Type skill + press Enter (e.g., React, Python)"
                    className="w-[100%] h-[100%] placeholder:text-sm placeholder:font-normal placeholder:text-[#A1AAB4]"
                  />
                </div>
                <div className="w-[100%] h-[auto] flex justify-start flex-wrap">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="w-auto h-[30px] flex border border-[#D6DDEB] rounded-full my-[10px] mr-[10px]"
                    >
                      <div className="flex-1 h-[100%] flex items-center justify-center pl-[15px]">
                        <p className="text-[0.75rem] font-medium">{skill}</p>
                      </div>
                      <div
                        className="h-[100%] aspect-[1/1] flex items-center justify-center cursor-pointer"
                        onClick={() => handleRemoveSkill(index)}
                      >
                        <Icon
                          icon="iconamoon:close-light"
                          className="w-[15px] h-[15px] scheme-font"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center text-red-500 text-xs">
                {errors.skills && (
                  <p className="text-xs danger-red whitespace-nowrap font-medium">
                    {errors.skills.message}
                  </p>
                )}
              </div>
            </div>

            {/* JOB DESCRIPTION (TODO) */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  JOB DESCRIPTION *
                </label>
                <div className="w-[100%] min-h-[300px] flex items-center justify-center">
                  <JobDescriptionEditor
                    onChange={(html) => setValue("jobDescription", html)}
                    value={watch("jobDescription")}
                  />
                </div>
              </div>
            </div>
          </section>
          <div className="w-[100%] h-[50px] flex items-center justify-end my-[20px]">
            <button
              type="submit"
              className="w-[auto] h-[40px] px-[10px] scheme-bg text-white text-[0.8rem] font-medium"
            >
              Create Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobCreatePage;
