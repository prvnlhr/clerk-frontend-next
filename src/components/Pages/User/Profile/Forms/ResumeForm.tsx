"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useRef, ChangeEvent } from "react";
import { Resume } from "@/utils/profileData";

interface ResumeFormProps {
  initialData: Resume | null;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ initialData }) => {
  const [resume, setResume] = useState<Resume | null>(initialData);
  const [tempFile, setTempFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and size
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        setError("Please upload a PDF, DOC or DOCX file");
        return;
      }

      if (file.size > maxSize) {
        setError("File size should be less than 5MB");
        return;
      }

      setTempFile(file);
      setError(null);
      setIsEditing(true);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Mock API function to upload resume
  const uploadResumeToAPI = async (file: File): Promise<{ url: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Uploading file to API:", file.name);
        // In a real app, this would be an actual API call
        resolve({ url: URL.createObjectURL(file) });
      }, 1000);
    });
  };

  const handleSave = async () => {
    if (!tempFile) {
      setError("Please upload a resume");
      return;
    }

    try {
      setIsUploading(true);

      // Upload to API (mock implementation)
      const { url } = await uploadResumeToAPI(tempFile);

      const newResume: Resume = {
        name: tempFile.name,
        url, // This would be the URL returned from your API
        uploadDate: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };

      setResume(newResume);
      setTempFile(null);
      setIsEditing(false);
      setError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error uploading resume:", err);
      setError("Failed to upload resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setTempFile(null);
    setIsEditing(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    if (resume) {
      const a = document.createElement("a");
      a.href = resume.url;
      a.download = resume.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDelete = async () => {
    try {
      // In a real app, you would call an API to delete the resume
      console.log("Deleting resume from storage:", resume?.name);

      setResume(null);
      setTempFile(null);
      setIsEditing(false);
      setError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Error deleting resume:", err);
      setError("Failed to delete resume. Please try again.");
    }
  };

  return (
    <section className="w-[100%] h-[auto] flex flex-col bg-white p-[20px] mt-[20px]">
      <div className="w-[100%] h-[50px] flex items-center justify-between mb-[20px] bg-[#F4F5FF] px-[10px]">
        <p className="text-[1.2rem] font-semibold scheme-font">Resume/CV</p>
        {resume && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="w-[auto] h-[60%] rounded-full flex px-[10px] py-[5px] scheme-bg cursor-pointer"
          >
            <div className="h-[100%] aspect-square flex items-center justify-center">
              <Icon
                icon="material-symbols:edit-outline-rounded"
                className="w-[70%] h-[70%] text-white"
              />
            </div>
            <div className="flex-1 h-[100%] flex items-center px-[5px]">
              <p className="text-xs font-medium text-white">Update</p>
            </div>
          </button>
        )}
      </div>

      {!resume || isEditing ? (
        <div className="w-[100%] h-[auto]">
          <div className="w-[100%] h-[auto] flex flex-col">
            <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
              <div className="w-[100%] h-[auto] flex flex-col col-span-2">
                <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                  <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                    RESUME *
                  </label>
                  <div className="w-full h-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <div
                      onClick={handleUploadClick}
                      className={`w-[100%] h-[100px] border ${
                        error ? "border-red-500" : "border-black/10"
                      } col-span-2 flex flex-col items-center justify-center rounded cursor-pointer hover:bg-gray-50 transition-colors`}
                    >
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <Icon icon="eos-icons:loading" className="text-2xl" />
                          <p className="text-sm text-gray-500 mt-2">
                            Uploading...
                          </p>
                        </div>
                      ) : (
                        <>
                          <Icon
                            icon="solar:upload-linear"
                            width="24"
                            height="24"
                            className="mb-2"
                          />
                          <p className="text-sm text-gray-500 text-center">
                            {tempFile
                              ? tempFile.name
                              : "Click to upload resume"}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            (PDF, DOC, DOCX up to 5MB)
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full h-[25px] flex items-center">
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                </div>
              </div>
              {/* Show buttons when either editing OR when there's no resume */}
              {(isEditing || !resume) && (
                <div className="w-[100%] h-[40px] flex items-start justify-end col-span-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isUploading}
                    className="w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] scheme-secondary-bg disabled:opacity-50"
                  >
                    <p className="text-xs font-medium">Cancel</p>
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isUploading || !tempFile}
                    className="w-[auto] h-[auto] rounded-full px-[10px] py-[5px] mr-[10px] scheme-bg disabled:opacity-50"
                  >
                    <p className="text-xs font-medium text-white">
                      {isUploading ? "Uploading..." : "Save"}
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[auto] flex flex-col p-[0px]">
          <div className="w-[100%] h-[auto] grid grid-cols-[minmax(0,1fr)_auto] rounded border border-black/10 p-[10px] relative">
            <div className="w-[100%] h-[50px] col-span-1 flex flex-col justify-center">
              <p className="text-[1rem] font-semibold">{resume.name}</p>
              <p className="text-[0.8rem] font-medium font-secondary">
                Uploaded on {resume.uploadDate}
              </p>
            </div>
            <div className="w-[100%] h-[50px] flex items-center justify-end">
              <button
                onClick={handleDownload}
                className="w-[30px] h-[30px] flex items-center justify-center border border-black/20 rounded-full ml-[10px] hover:bg-[#0a65cc]/10 cursor-pointer"
                title="Download"
              >
                <Icon
                  icon="solar:download-linear"
                  className="w-[50%] h-[50%] scheme-font"
                />
              </button>
              <button
                onClick={handleDelete}
                className="w-[30px] h-[30px] flex items-center justify-center border border-black/20 rounded-full ml-[10px] hover:bg-red-500/10 cursor-pointer"
                title="Delete"
              >
                <Icon
                  icon="meteor-icons:trash"
                  className="w-[50%] h-[50%] text-[#F04438]"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ResumeForm;
