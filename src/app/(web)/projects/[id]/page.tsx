"use client";

import { Button } from "@/components/ui/button";
import usePatchProject from "@/hooks/mutations/usePatchProject";
import { useGetProject } from "@/hooks/queries/useGetProject";
import {
    PatchProjectData,
    patchProjectSchema,
} from "@/types/zodSchemas/patchProjectSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { use } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PatchProjectData>({
        resolver: zodResolver(patchProjectSchema),
    });
    const { id } = use(params);
    const project = useGetProject(id);
    const mutation = usePatchProject();
    const projectData = project.data?.data[0];

    const onSubmit: SubmitHandler<PatchProjectData> = async (data) => {
        mutation.mutate({
            id: id,
            updates: data,
        });
    };

    return (
        <div className="mx-4">
            <h2 className="font-bold text-2xl text-center my-4">
                Project Details for: {projectData?.project_name}
            </h2>
            <form
                className="flex flex-col gap-4 w-1/2"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="projectName" className="font-semibold">
                        Project Name
                    </label>
                    <input
                        type="text"
                        id="projectName"
                        defaultValue={projectData?.project_name}
                        className="border border-gray-300 rounded px-3 py-2"
                        {...register("project_name")}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="projectStatus" className="font-semibold">
                        Status
                    </label>
                    <input
                        type="text"
                        id="projectStatus"
                        defaultValue={projectData?.status}
                        className="border border-gray-300 rounded px-3 py-2"
                        {...register("status")}
                    />
                </div>
                <Button className="w-1/3 " type="submit">
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default ProjectDetails;
