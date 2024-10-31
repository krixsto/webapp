import { Hono } from 'hono'
import { cors } from "hono/cors";
import crypto from 'crypto';
import db from './db/db';
import { setup } from './db/setup';
import { validateCreateProject, validateUpdateProject } from './helpers/schema';
import { Result } from './types/index';

(async () => {
    await setup(db);
    console.log("Database and tables created.");
})();

const app = new Hono()
app.use("/*", cors());

// GET, for å hente prosjekter
app.get("/projects", async (c) => {
    try {
        const data = db.prepare('SELECT * FROM projects').all();
        const successResponse: Result<typeof data> = {
            success: true,
            data,
        };
        return c.json(successResponse, 200);
    } catch (error) {
        console.error('Loading projects failed.', error);
        const errorResponse: Result<null> = {
            success: false,
            error: {
                code: "DATABASE_ERROR",
                message: "Failed to load projects.",
            },
        };
        return c.json(errorResponse, 500);
    }
});

// GET, for å hente et spesifikt prosjekt basert på ID
app.get("/projects/:id", (c) => {
    const id = c.req.param("id");
    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);

    if (!project) {
        return c.json({
            success: false,
            error: {
                code: "NOT_FOUND",
                message: "Project not found.",
            },
        }, 404);
    }
    return c.json({ success: true, data: project }, 200);
});

// POST, for å legge til et nytt prosjekt
app.post("/projects", async (c) => {
    try {
        const data = await c.req.json();
        const validation = validateCreateProject(data);

        if (!validation.success) {
            console.error("Validation error:", validation.error.format());
            const errorResponse: Result<null> = {
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Invalid project data.",
                },
            };
            return c.json(errorResponse, 400);
        }

        const newProject = {
            id: crypto.randomUUID(),
            title: validation.data.title,
            description: validation.data.description,
            publishedAt: validation.data.publishedAt.toString(),
            public: validation.data.public,
            status: validation.data.status,
            tags: Array.isArray(validation.data.tags) ? validation.data.tags.join(",") : validation.data.tags
        };

        const stmt = db.prepare(`
            INSERT INTO projects (id, title, description, publishedAt, public, status, tags)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `);

        stmt.run(
            newProject.id,
            newProject.title,
            newProject.description,
            newProject.publishedAt,
            newProject.public ? 1 : 0,
            newProject.status ? 1 : 0,
            newProject.tags
        );

        const successResponse: Result<typeof newProject> = {
            success: true,
            data: newProject,
        };
        return c.json(successResponse, 201);
    } catch (error) {
        console.error('Adding project failed', error);
        const errorResponse: Result<null> = {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to add project.",
            },
        };
        return c.json(errorResponse, 500);
    }
});

// DELETE, for å slette et prosjekt
app.delete("/projects/:id", (c) => {
    try {
        const id = c.req.param("id");
        const stmt = db.prepare(`DELETE FROM projects WHERE id = ?`);
        stmt.run(id);

        return c.json({ success: true, data: null }, 200);
    } catch (error) {
        console.error('Deletion failed', error);
        return c.json({
            success: false,
            error: { code: "DELETE_ERROR", message: "Failed to delete project." }
        }, 500);
    }
});

// PUT, for oppdatering av eksisterende prosjekter
app.put("/projects/:id", async (c) => {
    try {
        const data = await c.req.json();
        const validation = validateUpdateProject(data);

        if (!validation.success) {
            console.error("Validation error:", validation.error.format());
            const errorResponse: Result<null> = {
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Invalid project data.",
                },
            };
            return c.json(errorResponse, 400);
        }
        const updatedProject = {
            ...validation.data,
            id: c.req.param("id")
        };

        const stmt = db.prepare(`
        UPDATE projects
        SET title = ?, description = ?, publishedAt = ?, public = ?, status = ?, tags = ?
        WHERE id = ?
        `);
        
        stmt.run(
            updatedProject.title,
            updatedProject.description,
            updatedProject.publishedAt,
            updatedProject.public ? 1 : 0,
            updatedProject.status ? 1 : 0,
            updatedProject.tags ? updatedProject.tags.join(",") : null,
            updatedProject.id
        );

        const successResponse: Result<typeof updatedProject> = {
            success: true,
            data: updatedProject,
        };
        return c.json(successResponse, 200);
    } catch (error) {
        console.error('Updating project failed', error);
        const errorResponse: Result<null> = {
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to update project.",
            },
        };
        return c.json(errorResponse, 500);
    }
});

export default app;
