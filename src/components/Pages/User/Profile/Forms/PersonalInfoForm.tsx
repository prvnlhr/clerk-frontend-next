"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { PersonalInfo } from "@/utils/profileData";
import { Icon } from "@iconify/react/dist/iconify.js";

const personalInfoSchema = z.object({
  photo: z.instanceof(File).optional(),
  name: z.string().min(1, "Name is required"),
  gender: z.enum(["Male", "Female", "Non-binary", "Prefer not to say"]),
  dob: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, "Invalid date format (DD/MM/YYYY)"),
  contactNumber: z.string().min(10, "Contact number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  currentLocation: z.string().min(1, "Current location is required"),
  workStatus: z.enum(["Fresher", "Experienced"]),
  nationality: z.string().min(1, "Nationality is required"),
  linkedin: z.string().url("Invalid URL").or(z.literal("")),
  github: z.string().url("Invalid URL").or(z.literal("")),
  portfolio: z.string().url("Invalid URL").or(z.literal("")),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  setShowWorkExperience: (show: boolean) => void;
  initialData: PersonalInfo;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  setShowWorkExperience,
  initialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(initialData.photo || null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      ...initialData,
      photo: undefined,
    },
  });

  const workStatus = watch("workStatus");
  const formValues = watch();

  useEffect(() => {
    setShowWorkExperience(workStatus === "Experienced");
  }, [workStatus, setShowWorkExperience]);

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("photo", file, { shouldDirty: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: PersonalInfoFormData) => {
    console.log("Updated form data:", data);
    setIsEditing(false);
    if (data.photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(data.photo);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset({
      ...initialData,
      photo: undefined,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewImage(initialData.photo || null);
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
        disabled={!isDirty}
        className={`w-[auto] h-[60%] rounded-full flex px-[10px] py-[5px] ${isDirty ? 'scheme-secondary-bg' : 'bg-gray-200 cursor-not-allowed'}`}
      >
        <p className="text-xs font-medium">Cancel</p>
      </button>
      <button
        type="submit"
        form="personalInfoForm"
        disabled={!isDirty}
        className={`w-[auto] h-[60%] rounded-full flex px-[10px] py-[5px] ${isDirty ? 'scheme-bg' : 'bg-gray-200 cursor-not-allowed'}`}
      >
        <p className="text-xs font-medium text-white">Save</p>
      </button>
    </div>
  );

  return (
    <section className="w-[100%] h-[auto] flex flex-col bg-white p-[20px]">
      <div className="w-[100%] h-[50px] flex items-center justify-between border-black/10 mb-[20px] sticky z-1 top-0 bg-[#F4F5FF] px-[10px]">
        <p className="text-[1.2rem] font-semibold scheme-font">
          Personal Information
        </p>
        {!isEditing ? renderEditButton() : renderFormActions()}
      </div>
      
      <div className="w-[100%] h-[calc(100%-50px)]">
        {isEditing ? (
          <form id="personalInfoForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[100%] h-[auto] flex flex-col md:flex-row">
              <div className="h-[130px] w-[130px] flex items-start">
                <div
                  className="relative w-[90%] h-[90%] flex items-center justify-center text-center border-2 border-dashed border-black/10 rounded-[20px] cursor-pointer overflow-hidden p-[5px]"
                  onClick={handleImageClick}
                >
                  {previewImage ? (
                    <div className="relative w-[100%] h-[100%] flex items-center justify-center rounded-[20px] overflow-hidden">
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill={true}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <p className="text-xs">
                      Click to
                      <br />
                      upload photo
                    </p>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              <div className="w-[100%] h-[auto] md:flex-1 grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500 px-[0px]">
                {/* NAME GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      NAME *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. John Doe"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("name")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* GENDER GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                  <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      GENDER *
                    </label>
                    <div className="w-full h-full flex flex-wrap items-center justify-start min-h-[30px]">
                      {(
                        [
                          "Male",
                          "Female",
                          "Non-binary",
                          "Prefer not to say",
                        ] as const
                      ).map((type) => (
                        <div
                          key={type}
                          className="h-[20px] w-auto flex items-center mt-[10px] cursor-pointer"
                          onClick={() => setValue("gender", type, { shouldDirty: true })}
                        >
                          <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                            {formValues.gender === type && (
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
                    {errors.gender && (
                      <p className="text-red-500 text-xs">
                        {errors.gender.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* DOB GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      DATE OF BIRTH *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="DD/MM/YYYY"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("dob")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.dob && (
                      <p className="text-red-500 text-xs">
                        {errors.dob.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* CONTACT NUMBER GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      CONTACT NUMBER *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. 9876543210"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("contactNumber")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.contactNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.contactNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* EMAIL GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      EMAIL ADDRESS *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. john.doe@example.com"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("email")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.email && (
                      <p className="text-red-500 text-xs">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* CURRENT LOCATION GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      CURRENT LOCATION *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. Bangalore, India"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("currentLocation")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.currentLocation && (
                      <p className="text-red-500 text-xs">
                        {errors.currentLocation.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* WORK STATUS GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                  <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      WORK STATUS *
                    </label>
                    <div className="w-full h-full flex flex-wrap items-center justify-start min-h-[30px]">
                      {(["Fresher", "Experienced"] as const).map((type) => (
                        <div
                          key={type}
                          className="h-[20px] w-auto flex items-center mt-[10px] cursor-pointer"
                          onClick={() => setValue("workStatus", type, { shouldDirty: true })}
                        >
                          <div className="h-[100%] aspect-[1/1] bg-[#F6F6F7] border border-[#D6DDEB] p-[2.5px]">
                            {formValues.workStatus === type && (
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
                    {errors.workStatus && (
                      <p className="text-red-500 text-xs">
                        {errors.workStatus.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* NATIONALITY GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      NATIONALITY *
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. Indian"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("nationality")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.nationality && (
                      <p className="text-red-500 text-xs">
                        {errors.nationality.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* SOCIAL LINKS - LINKEDIN GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      LINKEDIN
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. linkedin.com/in/johndoe"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("linkedin")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.linkedin && (
                      <p className="text-red-500 text-xs">
                        {errors.linkedin.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* SOCIAL LINKS - GITHUB GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      GITHUB
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. github.com/johndoe"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("github")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.github && (
                      <p className="text-red-500 text-xs">
                        {errors.github.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* SOCIAL LINKS - PORTFOLIO GROUP */}
                <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                  <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                    <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                      PORTFOLIO LINK
                    </label>
                    <div className="w-full h-full">
                      <input
                        placeholder="Ex. johndoe.design"
                        className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                        {...register("portfolio")}
                      />
                    </div>
                  </div>
                  <div className="w-full h-[25px] flex items-center">
                    {errors.portfolio && (
                      <p className="text-red-500 text-xs">
                        {errors.portfolio.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="w-[100%] h-[auto] flex flex-col md:flex-row">
            <div className="h-[130px] w-[130px] flex items-start">
              <div className="relative w-[90%] h-[90%] flex items-center justify-center text-center border-2 border-dashed border-black/10 rounded-[20px] overflow-hidden">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    alt="Profile"
                    fill={true}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-xs">
                    No photo
                    <br />
                    uploaded
                  </p>
                )}
              </div>
            </div>
            <div className="w-[100%] h-[auto] md:flex-1 grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500 px-[0px]">
              {/* NAME GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    NAME
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">{initialData.name}</p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* GENDER GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    GENDER
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.gender}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* DOB GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    DATE OF BIRTH
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">{initialData.dob}</p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* CONTACT NUMBER GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    CONTACT NUMBER
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.contactNumber}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* EMAIL GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    EMAIL ADDRESS
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">{initialData.email}</p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* CURRENT LOCATION GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    CURRENT LOCATION
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.currentLocation}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* WORK STATUS GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    WORK STATUS
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.workStatus}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* NATIONALITY GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    NATIONALITY
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.nationality}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* SOCIAL LINKS - LINKEDIN GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    LINKEDIN
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.linkedin || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* SOCIAL LINKS - GITHUB GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    GITHUB
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.github || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center"></div>
              </div>

              {/* SOCIAL LINKS - PORTFOLIO GROUP */}
              <div className="w-[100%] h-[auto] flex flex-col col-span-1">
                <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    PORTFOLIO LINK
                  </label>
                  <div className="w-full h-full flex items-center">
                    <p className="text-sm text-gray-800">
                      {initialData.portfolio || "Not provided"}
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

export default PersonalInfoForm;