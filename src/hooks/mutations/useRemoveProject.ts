"use client";

import deleteProject from "@/services/deleteProjectMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useRemoveProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

export default useRemoveProject;
