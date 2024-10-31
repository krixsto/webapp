import ProjectCard from './ProjectCard';

export type ProjectType = {
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    public: boolean;
    status: boolean;
    tags: string | string[];
};

  type ProjectsProps = {
    projects: ProjectType[];
    onRemoveProject: (id: string) => void;
  };

  function Projects({ projects, onRemoveProject }: ProjectsProps) {
    if (projects.length === 0) {
        return (
            <section id="alle-prosjekter">
                <h2>Prosjekter</h2>
                <p>Ingen prosjekter enda.</p>
            </section>
        );
    }

    return (
        <section id="alle-prosjekter">
            <h2>Prosjekter</h2>
            <ul className="prosjekt-container">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id || index}
                        project={project}
                        onRemove={onRemoveProject}
                    />
                    ))}
            </ul>
        </section>
    );
}

  export default Projects;