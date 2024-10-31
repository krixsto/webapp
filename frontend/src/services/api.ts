import { endpoints } from "../config/urls";
import { validateProject } from "../helpers/schema";

// Hente prosjekt(er)
export const fetchProjects = async () => {
    const response = await fetch(endpoints.projects);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    return response.json();
};

// Legge til nytt prosjekt
export const addProject =async (project: {title: string; description: string; publishedAt: string; public: boolean; status: boolean; tags: string[] }) => {
    const validation = validateProject(project);

    if (!validation.success) {
        console.error("Validation failed:", validation.error.format());
        throw new Error("Invalid project data");
    }

    const response = await fetch(endpoints.projects, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.erorr?.message || 'Failed to add project');
    }
    return response.json();
};


// Slette prosjekt
export const deleteProject = async (id: string) => {
    try {
        const response = await fetch(`${endpoints.projects}/${id}`, { method: 'DELETE' });
    
        if (!response.ok) {
            const errorData = await response.json();
            return { success: false, error: { code: "DELETE_ERROR", message: errorData.message || 'Failed to delete project' }};
        }
        return { success: true, data: null };
    } catch (error: any) {
        console.error("Error deleting project:", error);
        return { success: false, error: { code: "DELETE_ERROR", message: error.message || 'Unknown error' }};
    }
};
