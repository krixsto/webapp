import { z } from "zod";

const projectSchema = z.object({
    id: z.string().uuid().optional(),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    public: z.boolean(),
    status: z.boolean(),
    tags: z.array(z.string().min(1).regex(/[a-zA-Z]/)).optional(),
});

const projectsSchema = z.array(projectSchema);

export function validateProject(data: unknown) {
    return projectSchema.safeParse(data);
}

export { projectSchema, projectsSchema };
