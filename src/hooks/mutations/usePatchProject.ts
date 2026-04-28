import patchProjectMutation from "@/services/patchProjectMutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const usePatchProject = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: patchProjectMutation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });

    return mutation;
};

export default usePatchProject;
