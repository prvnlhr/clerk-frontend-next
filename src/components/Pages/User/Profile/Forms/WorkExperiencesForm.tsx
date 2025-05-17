"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { WorkExperience } from "@/utils/profileData";

const workExperienceSchema = z
  .object({
    isCurrentJob: z.enum(["Yes", "No"]),
    companyName: z.string().min(1, "Company name is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    roleDescription: z.string().min(1, "Role description is required"),
  })
  .refine(
    (data) =>
      data.isCurrentJob === "Yes" ||
      (data.isCurrentJob === "No" && !!data.endDate),
    {
      message: "End date is required unless this is your current job",
      path: ["endDate"],
    }
  );

type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;

interface WorkExperiencesFormProps {
  initialData: WorkExperience[];
}

const WorkExperiencesForm: React.FC<WorkExperiencesFormProps> = ({
  initialData,
}) => {
  const [workExperiences, setWorkExperiences] =
    useState<WorkExperience[]>(initialData);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      isCurrentJob: "No",
    },
  });

  const isCurrentJob = watch("isCurrentJob");

  const startEdit = (experience: WorkExperience) => {
    setEditingId(experience.id);
    setValue("isCurrentJob", experience.isCurrentJob);
    setValue("companyName", experience.companyName);
    setValue("jobTitle", experience.jobTitle);
    setValue("startDate", experience.startDate);
    setValue("endDate", experience.endDate || "");
    setValue("roleDescription", experience.roleDescription);
  };

  const onSubmit = (data: WorkExperienceFormData) => {
    if (editingId) {
      setWorkExperiences(
        workExperiences.map((exp) =>
          exp.id === editingId ? { ...data, id: editingId } : exp
        )
      );
      setEditingId(null);
    } else {
      const newExperience: WorkExperience = {
        ...data,
        id: Date.now().toString(),
      };
      setWorkExperiences([...workExperiences, newExperience]);
      setIsAdding(false);
    }
    reset();
  };

  const handleCancel = () => {
    if (editingId) {
      setEditingId(null);
    } else {
      setIsAdding(false);
    }
    reset();
  };

  const handleDelete = (id: string) => {
    setWorkExperiences(workExperiences.filter((exp) => exp.id !== id));
  };

  const renderWorkExperienceForm = () => (
    <div className="w-[100%] h-[auto]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[100%] h-[auto] flex flex-col">
          <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
            {/* IS CURRENT JOB */}
            <div className="w-[100%] h-[auto] min-h-[100px] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  IS YOUR CURRENT JOB? *
                </label>
                <div className="w-full h-full flex items-center flex-wrap justify-start min-h-[30px]">
                  {(["Yes", "No"] as const).map((type) => (
                    <div
                      key={type}
                      className="h-[20px] w-auto flex items-center mt-[10px] cursor-pointer"
                      onClick={() =>
                        setValue("isCurrentJob", type, { shouldDirty: true })
                      }
                    >
                      <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                        {isCurrentJob === type && (
                          <div className="w-[100%] h-[100%] scheme-bg"></div>
                        )}
                      </div>
                      <div className="h-[100%] flex-1 flex items-center justify-center px-[10px] text-[0.75rem] font-medium">
                        {type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.isCurrentJob && (
                  <p className="text-red-500 text-xs">
                    {errors.isCurrentJob.message}
                  </p>
                )}
              </div>
            </div>

            {/* COMPANY NAME */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  COMPANY NAME *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. Google"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("companyName")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.companyName && (
                  <p className="text-red-500 text-xs">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
            </div>

            {/* JOB TITLE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  JOB TITLE *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. Fullstack Developer"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("jobTitle")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.jobTitle && (
                  <p className="text-red-500 text-xs">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>

            {/* START DATE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  JOINED DATE *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. Aug 2018"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("startDate")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.startDate && (
                  <p className="text-red-500 text-xs">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* END DATE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  WORKED TILL {isCurrentJob === "Yes" ? "" : "*"}
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder={
                      isCurrentJob === "Yes" ? "Present" : "Ex. May 2022"
                    }
                    className={`w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4] ${
                      isCurrentJob === "Yes" ? "bg-gray-100" : ""
                    }`}
                    {...register("endDate")}
                    disabled={isCurrentJob === "Yes"}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.endDate && (
                  <p className="text-red-500 text-xs">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* ROLE DESCRIPTION */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  ROLE DESCRIPTION *
                </label>
                <div className="w-full h-full">
                  <textarea
                    placeholder="Describe your responsibilities and achievements"
                    className="w-full min-h-[100px] h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("roleDescription")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.roleDescription && (
                  <p className="text-red-500 text-xs">
                    {errors.roleDescription.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-[100%] h-[40px] flex items-start justify-end col-span-2">
              <button
                type="button"
                onClick={handleCancel}
                className="w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] scheme-secondary-bg cursor-pointer"
              >
                <p className="text-xs font-medium">Cancel</p>
              </button>
              <button
                type="submit"
                disabled={!isDirty}
                className={`w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] ${
                  isDirty
                    ? "scheme-bg cursor-pointer"
                    : "bg-gray-200 cursor-not-allowed"
                }`}
              >
                <p className="text-xs font-medium text-white">Save</p>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  return (
    <section className="w-[100%] h-[auto] flex flex-col bg-white p-[20px] mt-[20px]">
      <div className="w-[100%] h-[50px] flex items-center justify-between border-black/10 mb-[20px] sticky z-1 top-0 bg-[#F4F5FF] px-[10px]">
        <p className="text-[1.2rem] font-semibold scheme-font">
          Work Experiences
        </p>
        <button
          className="w-auto h-auto px-[5px] py-[10px] flex items-center justify-center disabled:opacity-50"
          onClick={() => setIsAdding(true)}
          disabled={isAdding || editingId !== null}
        >
          <Icon
            icon="flowbite:plus-outline"
            className="w-[15px] h-[15px] scheme-font"
          />
        </button>
      </div>

      {/* Add Work Experience Form */}
      {isAdding && renderWorkExperienceForm()}

      {/* Work Experiences List */}
      {workExperiences.map((experience) => (
        <div
          key={experience.id}
          className="w-[100%] h-[auto] flex flex-col p-[0px] mb-[10px] relative"
        >
          {editingId === experience.id ? (
            renderWorkExperienceForm()
          ) : (
            <>
              <div className="relative w-[100%] h-[auto] grid grid-rows-[auto_auto_auto] rounded border border-black/10 p-[15px]">
                <div className="absolute w-[auto] h-[40px] flex items-center right-0 top-0 pr-[10px]">
                  <button
                    onClick={() => startEdit(experience)}
                    className="w-[22px] aspect-square flex items-center justify-center rounded-full mx-[5px] border border-black/20 hover:bg-[#0a65cc]/10 cursor-pointer"
                  >
                    <Icon
                      icon="material-symbols:edit-outline-rounded"
                      className="w-[60%] h-[60%] scheme-font"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="w-[22px] aspect-square flex items-center border border-black/20 hover:bg-red-500/10 justify-center rounded-full mx-[5px] cursor-pointer"
                  >
                    <Icon
                      icon="meteor-icons:trash"
                      className="w-[60%] h-[60%] text-[#F04438]"
                    />
                  </button>
                </div>
                <div className="w-[100%] h-[50px] col-span-2 flex flex-col justify-center">
                  <p className="text-[1rem] font-semibold">
                    {experience.jobTitle}
                  </p>
                  <p className="text-[0.8rem] font-medium font-secondary">
                    {experience.companyName}
                  </p>
                </div>
                <div className="w-[auto] h-[30px] flex items-center">
                  <div className="h-[100%] w-[auto] flex items-center justify-center">
                    <Icon
                      icon="uil:calendar"
                      className="w-[15px] h-[15px] scheme-font"
                    />
                  </div>
                  <div className="flex-1 h-[100%] flex items-center px-[5px]">
                    <p className="text-xs font-medium">
                      {experience.startDate} -{" "}
                      {experience.isCurrentJob === "Yes"
                        ? "Present"
                        : experience.endDate}
                    </p>
                  </div>
                </div>
                <div className="w-[auto] h-[auto] flex items-center col-span-2 my-[5px] px-[0px]">
                  <p className="text-xs font-medium leading-relaxed font-secondary">
                    {experience.roleDescription}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default WorkExperiencesForm;
