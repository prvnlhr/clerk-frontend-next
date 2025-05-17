"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Project } from "@/utils/profileData";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  skillsUsed: z.array(z.string()).min(1, "At least one skill is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  projectUrl: z.string().url("Invalid URL").or(z.literal("")).optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectsFormProps {
  initialData: Project[];
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ initialData }) => {
  const [projects, setProjects] = useState<Project[]>(initialData);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentSkill, setCurrentSkill] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      skillsUsed: [],
    },
  });

  const skillsUsed = watch("skillsUsed") || [];

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setValue("title", project.title);
    setValue("description", project.description);
    setValue("skillsUsed", project.skillsUsed);
    setValue("startDate", project.startDate);
    setValue("endDate", project.endDate || "");
    setValue("projectUrl", project.projectUrl || "");
    setCurrentSkill("");
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      if (!skillsUsed.includes(currentSkill.trim())) {
        setValue("skillsUsed", [...skillsUsed, currentSkill.trim()], {
          shouldDirty: true,
        });
      }
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setValue(
      "skillsUsed",
      skillsUsed.filter((skill) => skill !== skillToRemove),
      { shouldDirty: true }
    );
  };

  const onSubmit = (data: ProjectFormData) => {
    if (editingId) {
      setProjects(
        projects.map((proj) =>
          proj.id === editingId ? { ...data, id: editingId } : proj
        )
      );
      setEditingId(null);
    } else {
      const newProject: Project = {
        ...data,
        id: Date.now().toString(),
      };
      setProjects([...projects, newProject]);
      setIsAdding(false);
    }
    reset();
    setCurrentSkill("");
  };

  const handleCancel = () => {
    if (editingId) {
      setEditingId(null);
    } else {
      setIsAdding(false);
    }
    reset();
    setCurrentSkill("");
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const renderProjectForm = () => (
    <div className="w-[100%] h-[auto]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[100%] h-[auto] flex flex-col">
          <div className="w-[100%] h-[auto] grid grid-cols-[calc(50%-4px)_calc(50%-4px)] gap-x-2 border-red-500">
            {/* TITLE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  TITLE *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. E-Commerce Website"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("title")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>
            </div>
            {/* DESCRIPTION */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  DESCRIPTION *
                </label>
                <div className="w-full h-full">
                  <textarea
                    placeholder="Ex. Describe your project here"
                    className="w-full min-h-[60px] h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("description")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            {/* SKILLS USED */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_auto] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  SKILLS USED *
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Type skill + press Enter (e.g., React, Node.js)"
                    className="w-full h-[30px] border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                  />
                  <div className="w-[100%] h-[auto] flex flex-wrap">
                    {skillsUsed.map((skill) => (
                      <div
                        key={skill}
                        className="w-auto h-[30px] flex border border-[#D6DDEB] rounded-full my-[10px] mr-[10px]"
                      >
                        <div className="flex-1 h-[100%] flex items-center justify-center pl-[15px]">
                          <p className="text-[0.75rem] font-medium">{skill}</p>
                        </div>
                        <div
                          className="h-[100%] aspect-[1/1] flex items-center justify-center cursor-pointer"
                          onClick={() => removeSkill(skill)}
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
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.skillsUsed && (
                  <p className="text-red-500 text-xs">
                    {errors.skillsUsed.message}
                  </p>
                )}
              </div>
            </div>
            {/* START DATE */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-1">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  PROJECT START DATE *
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
                  PROJECT END DATE
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. May 2022 or Present"
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
            {/* PROJECT URL */}
            <div className="w-[100%] h-[auto] flex flex-col col-span-2">
              <div className="w-full h-[auto] grid grid-rows-[30px_30px] border border-[#D6DDEB] rounded p-[10px]">
                <label className="w-full h-full text-[0.75rem] flex items-center scheme-font font-bold tracking-widest">
                  PROJECT URL
                </label>
                <div className="w-full h-full">
                  <input
                    placeholder="Ex. https://github.com/yourproject"
                    className="w-full h-full border-transparent text-sm placeholder:text-xs placeholder:font-normal placeholder:text-[#A1AAB4]"
                    {...register("projectUrl")}
                  />
                </div>
              </div>
              <div className="w-full h-[25px] flex items-center">
                {errors.projectUrl && (
                  <p className="text-red-500 text-xs">
                    {errors.projectUrl.message}
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
        <p className="text-[1.2rem] font-semibold scheme-font">Projects</p>
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

      {/* Add Project Form */}
      {isAdding && renderProjectForm()}

      {/* Project List */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="w-[100%] h-[auto] flex flex-col p-[0px] mb-[10px] relative"
        >
          {editingId === project.id ? (
            renderProjectForm()
          ) : (
            <>
              <div className="relative w-[100%] h-[auto] grid grid-rows-[auto_auto_auto_auto] rounded border border-black/10 p-[15px]">
                <div className="absolute w-[auto] h-[40px] flex items-center right-0 top-0 pr-[10px]">
                  <button
                    onClick={() => startEdit(project)}
                    className="w-[22px] aspect-square flex items-center justify-center rounded-full mx-[5px] border border-black/20 hover:bg-[#0a65cc]/10 cursor-pointer"
                  >
                    <Icon
                      icon="material-symbols:edit-outline-rounded"
                      className="w-[60%] h-[60%] scheme-font"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="w-[22px] aspect-square flex items-center border border-black/20 justify-center rounded-full mx-[5px] hover:bg-red-500/10 cursor-pointer"
                  >
                    <Icon
                      icon="meteor-icons:trash"
                      className="w-[60%] h-[60%] text-[#F04438]"
                    />
                  </button>
                </div>
                <div className="w-[100%] h-[auto] flex items-center">
                  <p className="text-[1rem] font-semibold">{project.title}</p>
                </div>
                <div className="w-[100%] h-[30px] flex items-center">
                  <div className="w-[auto] h-[100%] flex items-center justify-center">
                    <Icon
                      icon="tdesign:link"
                      className="w-[15px] h-[15px] scheme-font"
                    />
                  </div>
                  <div className="flex-1 h-[100%] flex items-center px-[5px]">
                    <p className="text-xs font-medium scheme-font">
                      {project.projectUrl || "No URL provided"}
                    </p>
                  </div>
                </div>
                <div className="w-[auto] h-[auto] flex items-center my-[5px] px-[0px]">
                  <p className="text-xs font-medium leading-relaxed font-secondary">
                    {project.description}
                  </p>
                </div>
                <div className="w-[auto] h-[30px] flex items-center my-[5px] px-[0px]">
                  <p className="text-xs font-medium">
                    Skills: {project.skillsUsed.join(", ")}
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
                      {project.startDate} - {project.endDate || "Present"}
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

export default ProjectsForm;
