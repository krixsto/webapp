import { Hono } from 'hono'
import { cors } from "hono/cors";
import { promises as fs } from 'fs';
import path from 'path';

const app = new Hono()
app.use("/*", cors());

const filePath = path.join(__dirname, 'projects.json');

// GET, for å hente prosjekter
app.get("/projects", async (c) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const projects = JSON.parse(data);
        return c.json(projects);
    } catch (error) {
        console.error('Loading projects failed.', error);
    }
});

export default app;
