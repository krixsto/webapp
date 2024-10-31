import { useState, useEffect } from 'react';
import { ProjectType } from '../components/Projects';
import { fetchProjects, addProject, deleteProject } from '../services/api';

function useProjects() {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            try {
                const response = await fetchProjects();
                
                if (response.success) {
                    setProjects(response.data);
                } else {
                    console.error("Failed to load projects:", response.error);
                }
            } catch (error) {
                console.error("Error loading projects:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    const handleAddProject = async (title: string, description: string, publishedAt: string, isPublic: boolean, isPublished: boolean, tags: string[]) => {
        try {
            const response = await addProject({
                title,
                description,
                publishedAt,
                public: isPublic,
                status: isPublished,
                tags,
            });

            if (response.success) {
                setProjects((prevProjects) => [...prevProjects, response.data]);
            } else {
                console.error("Failed to add project:", response.error);
            }
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const handleDeleteProject = async (id: string) => {
        try {
            const response = await deleteProject(id);

            if (response.success) {
                setProjects((prevProjects) => prevProjects.filter((project) => project.id !== id));
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return { projects, loading, handleAddProject, handleDeleteProject };
}

export default useProjects;