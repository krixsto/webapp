import { useState } from 'react';

type AddProjectProps = {
    onAddProject: (title: string, description: string, publishedAt: string, isPublic: boolean, isPublished: boolean, tags: string[]) => void;
};

function AddProject({ onAddProject }: AddProjectProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [publishedAt, setPublishedAt] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onAddProject(title, description, publishedAt, isPublic, isPublished, tags);
        setTitle('');
        setDescription('');
        setPublishedAt;
        setIsPublic(false);
        setIsPublished(false);
        setTags([]);
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

                <label htmlFor="prosjekt-publishedAt">Publisert Dato</label>
                <input type="date" id="prosjekt-publishedAt" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} required />

                <label htmlFor="prosjekt-tags">Tags</label>
                <input type="text" id="prosjekt-tags" value={tags.join(',')} onChange={(e) => setTags(e.target.value.split(','))} 
                placeholder="Legg til tags adskilt med komma"/> 

                <label>
                    <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
                    Public
                </label>

                <label>
                    <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                    Published
                </label>
                
                <button type="submit">Last opp</button>
            </form>
        </section>
    );
}

export default AddProject;