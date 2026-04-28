import { ProjectFormData } from "@/types/zodSchemas/projectFormSchema";

const addProject = async (newProject: ProjectFormData) => {
    const response = await fetch("/api/project", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
    });

    return response;
};

export default addProject;
