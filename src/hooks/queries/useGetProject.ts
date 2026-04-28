"use client";

import { getProjectByIdQuery } from "@/services/getProjectByIdQuery";
import { useQuery } from "@tanstack/react-query";

export const useGetProject = (projectId: string) => {
    return useQuery({
        queryKey: ["projects", projectId],
        queryFn: () => getProjectByIdQuery(projectId),
    });
};
