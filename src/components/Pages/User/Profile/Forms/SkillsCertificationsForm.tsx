"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SkillCertification } from "@/utils/profileData";

// Define the form schemas using zod
const certificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  organization: z.string().min(1, "Issuing organization is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().min(1, "Credential ID/URL is required"),
});

type CertificationFormData = z.infer<typeof certificationSchema>;

interface Certification extends CertificationFormData {
  id: string;
}

interface SkillsCertificationsFormProps {
  initialData: SkillCertification;
}

const SkillsCertificationsForm: React.FC<SkillsCertificationsFormProps> = ({
  initialData,
}) => {
  // Skills state
  const [skills, setSkills] = useState<string[]>(initialData.skills);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [originalSkills, setOriginalSkills] = useState<string[]>(
    initialData.skills
  );

  // Certifications state
  const [certifications, setCertifications] = useState<Certification[]>(
    initialData.certifications
  );
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [editingCertificationId, setEditingCertificationId] = useState<
    string | null
  >(null);

  // Certification form
  const {
    register: registerCertification,
    handleSubmit: handleCertificationSubmit,
    reset: resetCertification,
    setValue: setCertificationValue,
    formState: { errors: certificationErrors },
  } = useForm<CertificationFormData>({
    resolver: zodResolver(certificationSchema),
  });

  // Handle skill input
  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      if (!skills.includes(currentSkill.trim())) {
        setSkills([...skills, currentSkill.trim()]);
      }
      setCurrentSkill("");
    }
  };

  // Remove skill
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Start editing certification
  const startEditCertification = (certification: Certification) => {
    setEditingCertificationId(certification.id);
    setCertificationValue("name", certification.name);
    setCertificationValue("organization", certification.organization);
    setCertificationValue("issueDate", certification.issueDate);
    setCertificationValue("expiryDate", certification.expiryDate || "");
    setCertificationValue("credentialId", certification.credentialId);
  };

  // Submit certification form
  const onSubmitCertification = (data: CertificationFormData) => {
    if (editingCertificationId) {
      // Update existing certification
      setCertifications(
        certifications.map((cert) =>
          cert.id === editingCertificationId
            ? { ...data, id: editingCertificationId }
            : cert
        )
      );
      setEditingCertificationId(null);
    } else {
      // Add new certification
      const newCertification: Certification = {
        ...data,
        id: Date.now().toString(),
      };
      setCertifications([...certifications, newCertification]);
      setIsAddingCertification(false);
    }
    resetCertification();
  };

  // Cancel adding or editing certification
  const handleCancelCertification = () => {
    if (editingCertificationId) {
      setEditingCertificationId(null);
    } else {
      setIsAddingCertification(false);
    }
    resetCertification();
  };

  // Delete certification
  const deleteCertification = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  // Save skills
  const handleSaveSkills = () => {
    setIsEditingSkills(false);
    setOriginalSkills(skills);
  };

  // Cancel skills editing
  const handleCancelSkills = () => {
    setIsEditingSkills(false);
    setSkills(originalSkills);
    setCurrentSkill("");
  };

  const renderCertificationForm = () => (
    <div className="w-[100%] h-[auto]">
      <form onSubmit={handleCertificationSubmit(onSubmitCertification)}>
        <div className="w-[100%] h-[auto] flex flex-col">
          <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
            {/* CERTIFICATION NAME */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  CERTIFICATION NAME *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. AWS Certified Developer"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...registerCertification("name")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {certificationErrors.name && (
                  <p className="text-red-500 text-xs">
                    {certificationErrors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* ISSUING ORGANIZATION */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  ISSUING ORGANIZATION *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. Udemy, Google"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...registerCertification("organization")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {certificationErrors.organization && (
                  <p className="text-red-500 text-xs">
                    {certificationErrors.organization.message}
                  </p>
                )}
              </div>
            </div>

            {/* ISSUE DATE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  ISSUE DATE *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. Aug 2018"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...registerCertification("issueDate")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {certificationErrors.issueDate && (
                  <p className="text-red-500 text-xs">
                    {certificationErrors.issueDate.message}
                  </p>
                )}
              </div>
            </div>

            {/* EXPIRY DATE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  EXPIRY DATE
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. May 2022"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...registerCertification("expiryDate")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center"></div>
            </div>

            {/* CREDENTIAL ID/URL */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  CREDENTIAL ID/URL *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. https://www.udemy.com/certificate/UC-XYZ789ABC123/"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...registerCertification("credentialId")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {certificationErrors.credentialId && (
                  <p className="text-red-500 text-xs">
                    {certificationErrors.credentialId.message}
                  </p>
                )}
              </div>
            </div>

            <div className="w-[100%] h-[40px] flex items-start justify-end col-span-2">
              <button
                type="button"
                onClick={handleCancelCertification}
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
    <section className="w-[100%] h-[auto] flex flex-col bg-white p-[20px] mt-[20px]">
      <div className="w-[100%] h-[50px] flex items-center justify-between  border-black/10 mb-[20px] sticky z-1 top-0 bg-[#F4F5FF] px-[10px]">
        <p className="text-[1.2rem] font-semibold scheme-font">
          Skills & Certification
        </p>
        {!isEditingSkills && (
          <button
            onClick={() => setIsEditingSkills(true)}
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
        )}
      </div>

      {/* Skills Section */}
      <div className="w-[100%] h-[auto]">
        <div className="w-[100%] h-[auto] flex flex-col">
          <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  SKILLS
                </label>
                <div className="w-full h-full">
                  {isEditingSkills ? (
                    <input
                      placeholder="Type skill + press Enter (e.g., React, Python)"
                      className="w-[100%] h-[100%] placeholder:text-sm placeholder:font-normal placeholder:text-[#A1AAB4]"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                    />
                  ) : (
                    <p className="text-sm text-gray-800">{skills.join(", ")}</p>
                  )}
                </div>
              </div>
              <div className="w-[100%] h-[auto] flex flex-wrap">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="w-auto h-[30px] flex border border-[#D6DDEB] rounded-full my-[10px] mr-[10px]"
                  >
                    <div
                      className={`flex-1 h-[100%] flex items-center justify-center ${
                        isEditingSkills ? "pl-[15px]" : "px-[15px]"
                      }`}
                    >
                      <p className="text-[0.75rem] font-medium">{skill}</p>
                    </div>
                    {isEditingSkills && (
                      <div
                        className="h-[100%] aspect-[1/1] flex items-center justify-center cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      >
                        <Icon
                          icon="iconamoon:close-light"
                          className="w-[15px] h-[15px] scheme-font"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditingSkills && (
                <div className="w-[100%] h-[40px] flex items-start justify-end col-span-2">
                  <button
                    type="button"
                    onClick={handleCancelSkills}
                    className="w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] scheme-secondary-bg"
                  >
                    <p className="text-xs font-medium">Cancel</p>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveSkills}
                    className="w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] scheme-bg"
                  >
                    <p className="text-xs font-medium text-white">Save</p>
                  </button>
                </div>
              )}
              <div className="w-full h-[25px] flex items-center"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="w-[100%] h-[auto]">
        <div className="w-[100%] h-[50px] flex items-center justify-between border-black/10 mb-[20px] sticky z-1 top-0 bg-[#F4F5FF] px-[10px]">
          <p className="text-[1.2rem] font-semibold scheme-font">
            Certifications
          </p>
          <button
            className="w-auto h-auto px-[5px] py-[10px] flex items-center justify-center"
            onClick={() => setIsAddingCertification(true)}
            disabled={isAddingCertification || editingCertificationId !== null}
          >
            <Icon
              icon="flowbite:plus-outline"
              className="w-[15px] h-[15px] scheme-font"
            />
          </button>
        </div>

        {/* Add Certification Form */}
        {isAddingCertification && renderCertificationForm()}

        {/* Certifications List */}
        {certifications.map((certification) => (
          <div
            key={certification.id}
            className="w-[100%] h-[auto] flex flex-col p-[0px] mb-[10px] relative"
          >
            {editingCertificationId === certification.id ? (
              renderCertificationForm()
            ) : (
              <>
                <div className="relative w-[100%] h-[auto] grid grid-cols-[auto_auto_auto] rounded border border-black/10 p-[15px]">
                  <div className="absolute w-[auto] h-[40px] flex items-center right-0 top-0 pr-[10px]">
                    <button
                      onClick={() => startEditCertification(certification)}
                      className="w-[22px] aspect-square flex items-center justify-center rounded-full  mx-[5px] border border-black/20 hover:bg-[#0a65cc]/10 cursor-pointer"
                    >
                      <Icon
                        icon="material-symbols:edit-outline-rounded"
                        className="w-[60%] h-[60%] scheme-font"
                      />
                    </button>
                    <button
                      onClick={() => deleteCertification(certification.id)}
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
                      {certification.name}
                    </p>
                    <p className="text-[0.8rem] font-medium font-secondary underline">
                      {certification.organization}
                    </p>
                  </div>
                  <div className="w-[auto] h-[30px] flex items-center col-span-2">
                    <div className="h-[100%] w-auto flex items-center justify-center">
                      <Icon
                        icon="tdesign:link"
                        className="w-[15px] h-[15px] scheme-font"
                      />
                    </div>
                    <div className="flex-1 h-[100%] flex items-center px-[5px]">
                      <p className="text-xs font-medium scheme-font">
                        {certification.credentialId}
                      </p>
                    </div>
                  </div>
                  <div className="w-[auto] h-[30px] flex items-center col-span-2">
                    <div className="h-[100%] w-auto flex items-center justify-center">
                      <Icon
                        icon="uil:calendar"
                        className="w-[15px] h-[15px] scheme-font"
                      />
                    </div>
                    <div className="flex-1 h-[100%] flex items-center px-[5px]">
                      <p className="text-xs font-medium">
                        {certification.issueDate}
                        {certification.expiryDate &&
                          ` - ${certification.expiryDate}`}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsCertificationsForm;
