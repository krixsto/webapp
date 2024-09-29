import './style.css'
import { useState, useEffect } from 'react';
import { ProjectType } from './Projects';
import Header from './Header';
import Projects from './Projects';
import AddProject from './AddProject';
import Footer from './Footer';

function App() {
  const [projects, setProjects] = useState<ProjectType[]>([]); 

// Henter prosjekter fra backend
useEffect(() => {
  fetch('http://localhost:3000/projects')
  .then((response) => response.json())
  .then((data) => {
    setProjects(data);
  })
  .catch((error) => {
    console.error('Error fetching projects:', error);
  });
}, []);

  const addProject = (title: string, description: string) => {
    const newProject: ProjectType = {
      id: crypto.randomUUID(),
      title,
      description,
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id: string) => {
    setProjects((prevProjects) => prevProjects.filter((project) => project.id !==id));
  };

  const totalProjects = projects.length;

  return (
    <div className="container">
      <Header tittel="Portfolio" />
    <main>
      <Projects projects={projects} onRemoveProject={removeProject} />
      <AddProject onAddProject={addProject} />
      <section id="prosjekt-count">
        <h2>Antall prosjekter: {totalProjects}</h2>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export default App