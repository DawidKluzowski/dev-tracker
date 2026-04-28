import z from "zod";

export const patchProjectSchema = z.object({
    project_name: z.string().min(1, "Project name is required").optional(),
    status: z.string().optional(),
});

export type PatchProjectData = z.infer<typeof patchProjectSchema>;
