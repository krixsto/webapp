export type ProjectType = {
    id: string;
    title: string;
    description: string;
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
                {projects.map((project) => (
                        <li key={project.id} className="prosjekt-card">
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <button className="remove-button" onClick={() => onRemoveProject(project.id)}>Fjern</button>
                        </li>
                    ))}
            </ul>
        </section>
    );
}

  export default Projects;