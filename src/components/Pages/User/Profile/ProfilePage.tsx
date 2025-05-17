"use client";
import React, { useState, useEffect } from "react";
import PersonalInfoForm from "./Forms/PersonalInfoForm";
import CareerPreferencesForm from "./Forms/CareerPreferencesForm";
import EducationForm from "./Forms/EducationForm";
import SkillsCertificationsForm from "./Forms/SkillsCertificationsForm";
import ProjectsForm from "./Forms/ProjectsForm";
import WorkExperiencesForm from "./Forms/WorkExperiencesForm";
import ResumeForm from "./Forms/ResumeForm";
import { sampleUserProfile, UserProfile } from "@/utils/profileData";

const ProfilePage = () => {
  const [showWorkExperience, setShowWorkExperience] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchUserProfile = async () => {
      // In a real app, you would fetch from your API
      // const response = await fetch('/api/profile');
      // const data = await response.json();

      // Using sample data for now
      setUserProfile(sampleUserProfile);
      setShowWorkExperience(
        sampleUserProfile.personalInfo.workStatus === "Experienced"
      );
    };

    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#F5F7F9]">
      <div className="w-[100%] md:w-[50%] h-[100%] overflow-y-scroll hide-scrollbar p-[0px] md:p-[0px] rounded">
        {/* Personal Information */}
        <PersonalInfoForm
          setShowWorkExperience={setShowWorkExperience}
          initialData={userProfile.personalInfo}
        />

        {/* Career Preferences */}
        <CareerPreferencesForm initialData={userProfile.careerPreferences} />

        {/* Education */}
        <EducationForm initialData={userProfile.education} />

        {/* Skills & Certification */}
        <SkillsCertificationsForm
          initialData={userProfile.skillsCertifications}
        />

        {/* Projects */}
        <ProjectsForm initialData={userProfile.projects} />

        {/* Work Experience */}
        {showWorkExperience && (
          <WorkExperiencesForm initialData={userProfile.workExperiences} />
        )}

        {/* Resume/cv */}
        <ResumeForm initialData={userProfile.resume} />
      </div>
    </div>
  );
};

export default ProfilePage;
