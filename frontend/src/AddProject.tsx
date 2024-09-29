import { useState } from 'react';

type AddProjectProps = {
    onAddProject: (title: string, description: string) => void;
};

function AddProject({ onAddProject }: AddProjectProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAddProject(title, description);
        setTitle('');
        setDescription('');
    };

    return (
        <section id="nytt-prosjekt">
            <form id="nytt-prosjekt-skjema" onSubmit={handleSubmit}>
                <h2>Skjema</h2>
                <label htmlFor="prosjekt-tittel">Tittel</label>
                <input type="text" id="prosjekt-tittel" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Gi prosjeket en tittel" required /> 

                <label htmlFor="prosjekt-beskrivelse">Beskrivelse</label>
                <textarea id="prosjekt-beskrivelse" value={description} onChange={(event) => setDescription(event.target.value)}
                placeholder='Gi prosjektet en beskrivelse'required></textarea>
                
                <button type="submit">Last opp</button>
            </form>
        </section>
    );
}

export default AddProject;
