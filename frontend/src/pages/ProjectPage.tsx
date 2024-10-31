import Projects from '../components/Projects';
import AddProject from '../components/AddProject';
import useProjects from '../hooks/useProjects';

function ProjectPage() {
    const { projects, loading, handleAddProject, handleDeleteProject } = useProjects();
    const totalProjects = projects.length;

  return (
    <>

    {loading ? <p>Laster prosjekter...</p> : null}
      <Projects projects={projects} onRemoveProject={handleDeleteProject} />
      <AddProject onAddProject={handleAddProject} />
      <section id="prosjekt-count">
        <h2>Antall prosjekter: {totalProjects}</h2>
      </section>

    </>
  );
}


export default ProjectPage;