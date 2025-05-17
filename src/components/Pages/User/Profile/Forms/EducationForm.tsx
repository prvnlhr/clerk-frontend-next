"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Education } from "@/utils/profileData";

// Define the form schema using zod
const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  grade: z.string().min(1, "Grade is required"),
});

type EducationFormData = z.infer<typeof educationSchema>;

interface EducationEntry extends EducationFormData {
  id: string;
}

interface EducationFormProps {
  initialData: Education[];
}

const EducationForm: React.FC<EducationFormProps> = ({ initialData }) => {
  const [educations, setEducations] = useState<EducationEntry[]>(initialData);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
  });

  const editEducation = (education: EducationEntry) => {
    setEditingId(education.id);
    reset({
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      institution: education.institution,
      startDate: education.startDate,
      endDate: education.endDate,
      grade: education.grade,
    });
  };

  const onSubmit = (data: EducationFormData) => {
    if (editingId) {
      // Update existing education
      setEducations(
        educations.map((edu) =>
          edu.id === editingId ? { ...data, id: editingId } : edu
        )
      );
      setEditingId(null);
    } else {
      // Add new education
      const newEducation: EducationEntry = {
        ...data,
        id: Date.now().toString(),
      };
      setEducations([...educations, newEducation]);
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
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const renderEducationForm = () => (
    <div className="w-[100%] h-[auto]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[100%] h-[auto] flex flex-col">
          <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
            {/* DEGREE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  DEGREE *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. B.Tech in Computer Science"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("degree")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.degree && (
                  <p className="text-red-500 text-xs">
                    {errors.degree.message}
                  </p>
                )}
              </div>
            </div>

            {/* FIELD OF STUDY */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  FIELD OF STUDY *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. Field of Study/Chemical/Mechanical"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("fieldOfStudy")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.fieldOfStudy && (
                  <p className="text-red-500 text-xs">
                    {errors.fieldOfStudy.message}
                  </p>
                )}
              </div>
            </div>

            {/* INSTITUTION */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  INSTITUTION *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. XYZ University"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("institution")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.institution && (
                  <p className="text-red-500 text-xs">
                    {errors.institution.message}
                  </p>
                )}
              </div>
            </div>

            {/* START */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  START *
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

            {/* END */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  END DATE *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. May 2022"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("endDate")}
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

            {/* CGPA/PERCENTAGE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  CGPA/PERCENTAGE *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. 8.5/10 or 85%"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("grade")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.grade && (
                  <p className="text-red-500 text-xs">{errors.grade.message}</p>
                )}
              </div>
            </div>

            <div className="w-[100%] h-[40px] flex items-start justify-end col-span-2">
              <button
                type="button"
                onClick={handleCancel}
                className="w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] scheme-secondary-bg"
              >
                <p className="text-xs font-medium">Cancel</p>
              </button>
              <button
                type="submit"
                className="w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] scheme-bg"
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
    <section className="w-[100%] h-[auto] flex flex-col bg-white p-[20px] mt-[0px]">
      <div className="w-[100%] h-[50px] flex items-center justify-between border-black/10 mb-[20px] sticky z-1 top-0 bg-[#F4F5FF] px-[10px]">
        <p className="text-[1.2rem] font-semibold scheme-font">Education</p>
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

      {/* Add Education Form */}
      {isAdding && renderEducationForm()}

      {/* Education List */}
      {educations.map((education) => (
        <div
          key={education.id}
          className="w-[100%] h-[auto] flex flex-col p-[0px] mb-[10px] relative"
        >
          {editingId === education.id ? (
            renderEducationForm()
          ) : (
            <>
              <div className="relative w-[100%] h-[auto] grid grid-cols-[auto_auto] rounded border border-black/10 p-[15px]">
                <div className="absolute w-[auto] h-[40px] flex items-center right-0 top-0 pr-[10px]">
                  <button
                    onClick={() => editEducation(education)}
                    className="w-[22px] aspect-square flex items-center justify-center rounded-full  mx-[5px] border border-black/20 hover:bg-[#0a65cc]/10 cursor-pointer"
                  >
                    <Icon
                      icon="material-symbols:edit-outline-rounded"
                      className="w-[60%] h-[60%] scheme-font"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(education.id)}
                    className="w-[22px] aspect-square flex items-center border border-black/20 justify-center rounded-full mx-[5px] hover:bg-red-500/10 cursor-pointer"
                  >
                    <Icon
                      icon="meteor-icons:trash"
                      className="w-[60%] h-[60%] text-[#F04438]"
                    />
                  </button>
                </div>
                <div className="w-[100%] h-[50px] col-span-2 flex flex-col justify-center">
                  <p className="text-[1rem] font-semibold">
                    {education.degree}
                  </p>
                  <p className="text-[0.8rem] font-medium font-secondary">
                    {education.institution}
                  </p>
                </div>
                <div className="w-[auto] h-[30px] flex items-center col-span-1">
                  <div className="h-[100%] w-auto flex items-center justify-center">
                    <Icon
                      icon="solar:medal-ribbon-linear"
                      className="w-[15px] h-[15px] scheme-font"
                    />
                  </div>
                  <div className="flex-1 h-[100%] flex items-center px-[5px]">
                    <p className="text-xs font-medium">{education.grade}</p>
                  </div>
                </div>
                <div className="w-[auto] h-[30px] flex items-center col-span-1">
                  <div className="h-[100%] w-auto flex items-center justify-center">
                    <Icon
                      icon="uil:calendar"
                      className="w-[15px] h-[15px] scheme-font"
                    />
                  </div>
                  <div className="flex-1 h-[100%] flex items-center px-[5px]">
                    <p className="text-xs font-medium">
                      {education.startDate} - {education.endDate}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default EducationForm;
