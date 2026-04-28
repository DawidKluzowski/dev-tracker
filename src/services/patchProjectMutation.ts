import { Tables } from "@/types/supabase";

const patchProjectMutation = async (data: {
    id: string;
    updates: Partial<Tables<"projects">>;
}) => {
    const response = await fetch(`/api/project/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data.updates),
    });
    return response.json();
};

export default patchProjectMutation;
