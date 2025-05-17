"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CareerPreferences } from "@/utils/profileData";
import { Icon } from "@iconify/react/dist/iconify.js";

const careerPreferencesSchema = z.object({
  preferredJobRole: z.string().min(1, "Preferred job role is required"),
  expectedSalary: z.string().min(1, "Expected salary is required"),
  jobTypes: z
    .array(
      z.enum(["full-time", "part-time", "contract", "temporary", "internship"])
    )
    .min(1, "At least one job type must be selected"),
  workTypes: z
    .array(z.enum(["onsite", "remote", "hybrid", "flexible"]))
    .min(1, "At least one work type must be selected"),
});

type CareerPreferencesFormData = z.infer<typeof careerPreferencesSchema>;

interface CareerPreferencesFormProps {
  initialData: CareerPreferences;
}

const CareerPreferencesForm: React.FC<CareerPreferencesFormProps> = ({
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<CareerPreferencesFormData>({
    resolver: zodResolver(careerPreferencesSchema),
    defaultValues: {
      ...initialData,
    },
  });

  const jobTypes = watch("jobTypes");
  const workTypes = watch("workTypes");

  const toggleJobType = (
    type: typeof careerPreferencesSchema.shape.jobTypes.element._type
  ) => {
    if (jobTypes.includes(type)) {
      setValue(
        "jobTypes",
        jobTypes.filter((t) => t !== type),
        { shouldDirty: true }
      );
    } else {
      setValue("jobTypes", [...jobTypes, type], { shouldDirty: true });
    }
  };

  const toggleWorkType = (
    type: typeof careerPreferencesSchema.shape.workTypes.element._type
  ) => {
    if (workTypes.includes(type)) {
      setValue(
        "workTypes",
        workTypes.filter((t) => t !== type),
        { shouldDirty: true }
      );
    } else {
      setValue("workTypes", [...workTypes, type], { shouldDirty: true });
    }
  };

  const onSubmit = (data: CareerPreferencesFormData) => {
    console.log("Updated career preferences:", data);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset(initialData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset(initialData);
  };

  const renderEditButton = () => (
    <button
      onClick={handleEdit}
      className="w-[auto] h-[60%] rounded-full flex px-[10px] py-[5px] scheme-bg cursor-pointer"
    >
      <div className="h-[100%] aspect-square flex items-center justify-center">
        <Icon
          icon="material-symbols:edit-outline-rounded"
          className="w-[70%] h-[70%] text-white"
        />
      </div>
      <div className="flex-1 h-[100%] flex items-center px-[5px]">
        <p className="text-xs font-medium text-white">Edit</p>
      </div>
    </button>
  );

  const renderFormActions = () => (
    <div className="flex gap-2">
      <button
        onClick={handleCancel}
        className="w-[auto] h-[60%] rounded-full flex px-[10px] py-[5px] scheme-secondary-bg cursor-pointer"
      >
        <p className="text-xs font-medium">Cancel</p>
      </button>
      <button
        type="submit"
        form="careerPreferencesForm"
        disabled={!isDirty}
        className={`w-[auto] h-[60%] rounded-full flex px-[10px] py-[5px] ${
          isDirty
            ? "scheme-bg cursor-pointer"
            : "bg-gray-200 cursor-not-allowed"
        }`}
      >
        <p className="text-xs font-medium text-white">Save</p>
      </button>
    </div>
  );

  return (
    <section className="w-[100%] h-[auto] flex flex-col bg-white p-[20px] mt-[20px]">
      <div className="w-[100%] h-[50px] flex items-center justify-between border-black/10 mb-[20px] sticky z-1 top-0 bg-[#F4F5FF] px-[10px]">
        <p className="text-[1.2rem] font-semibold scheme-font">
          Career Preferences
        </p>
        {!isEditing ? renderEditButton() : renderFormActions()}
      </div>
      <div className="w-[100%] h-[calc(100%-50px)]">
        {isEditing ? (
          <form id="careerPreferencesForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[100%] h-[auto] flex flex-col">
              <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
                {/* PREFERRED JOB ROLE/TITLE */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      PREFERRED JOB ROLE/TITLE *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. Preferred Job Role/Title"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("preferredJobRole")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.preferredJobRole && (
                      <p className="text-red-500 text-xs">
                        {errors.preferredJobRole.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* EXPECTED SALARY */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      EXPECTED SALARY (LPA) *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. ₹8-12 LPA"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("expectedSalary")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.expectedSalary && (
                      <p className="text-red-500 text-xs">
                        {errors.expectedSalary.message}
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
                          onClick={() => toggleJobType(type)}
                        >
                          <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                            {jobTypes.includes(type) && (
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
                    {errors.jobTypes && (
                      <p className="text-red-500 text-xs">
                        {errors.jobTypes.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* WORK TYPE */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                  <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      WORK TYPE *
                    </label>
                    <div className="w-full h-full flex flex-wrap items-center justify-start min-h-[30px]">
                      {(
                        ["onsite", "remote", "hybrid", "flexible"] as const
                      ).map((type) => (
                        <div
                          key={type}
                          className="h-[20px] w-auto flex items-center mt-[10px] cursor-pointer"
                          onClick={() => toggleWorkType(type)}
                        >
                          <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                            {workTypes.includes(type) && (
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
                    {errors.workTypes && (
                      <p className="text-red-500 text-xs">
                        {errors.workTypes.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="w-[100%] h-[auto] flex flex-col">
            <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
              {/* PREFERRED JOB ROLE/TITLE */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    PREFERRED JOB ROLE/TITLE
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.preferredJobRole}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* EXPECTED SALARY */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    EXPECTED SALARY (LPA)
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.expectedSalary}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* JOB TYPE */}
              <div className="w-[100%] h-[auto] min-h-[100px] flex flex-col col-span-2">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    JOB TYPE
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.jobTypes
                        .map(
                          (type) => type.charAt(0).toUpperCase() + type.slice(1)
                        )
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* WORK TYPE */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    WORK TYPE
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.workTypes
                        .map(
                          (type) => type.charAt(0).toUpperCase() + type.slice(1)
                        )
                        .join(", ")}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerPreferencesForm;
