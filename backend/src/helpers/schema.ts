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

const createProjectSchema = projectSchema.omit({ id: true });
const updateProjectSchema = projectSchema.partial();

export function validateCreateProject(data: unknown) {
    return createProjectSchema.safeParse(data);
}

export function validateUpdateProject(data: unknown) {
    return updateProjectSchema.safeParse(data);
}

export { projectSchema};