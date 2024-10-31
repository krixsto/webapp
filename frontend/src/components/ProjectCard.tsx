// Oblig 3 effektivisering av komponenter: flyttet prosjektvisningen til en separat ProjectCard-komponent for bedre modularisering
import { ProjectType } from './Projects';
import { format } from 'date-fns';

type ProjectCardProps = {
    project: ProjectType;
    onRemove: (id: string) => void;
};

function ProjectCard({ project, onRemove }: ProjectCardProps) {
    return (
        <li className="prosjekt-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Publisert: {format(new Date(project.publishedAt), 'dd.MM.yyyy')}</p>

            <p className={project.public ? "status-public" : "status-private"}>
                {project.public ? "Public" : "Private"} </p>
            
            <p className={project.status ? "status-published" : "status-draft"}>
                {project.status ? "Published" : "Draft"} </p>
            
            <p>Tags: {Array.isArray(project.tags) ? project.tags.join(', ') : project.tags}</p>
            <button className="remove-button" onClick={() => onRemove(project.id)}>Fjern</button>
        </li>
    );
}

export default ProjectCard;