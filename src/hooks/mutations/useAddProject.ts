"use client";

import addProject from "@/services/addProjectMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useAddProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
}

export { useAddProject };
