import getAllProjects from "@/services/getAllProjects";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetAllProjects = (page: string, limit: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["projects", page, limit],
        queryFn: () => getAllProjects(page, limit),
    });

    return { data, error, isLoading };
};

export default useGetAllProjects;
