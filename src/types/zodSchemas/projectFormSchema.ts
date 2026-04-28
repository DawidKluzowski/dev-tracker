import { z } from "zod";

export const projectFormSchema = z.object({
    projectName: z.string().min(1, "Project name is required"),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
