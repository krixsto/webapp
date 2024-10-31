import fs from "node:fs/promises";
import { join } from "node:path";
import type { DB } from "./db";

export const seed = async (db: DB) => {
    const path = join(__dirname, "data.json");
    const file = await fs.readFile(path, "utf-8");
    const projects = JSON.parse(file);

    const insertProject = db.prepare(`
    INSERT INTO projects (id, title, description, publishedAt, public, status, tags) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const insertTransaction = db.transaction(() => {
        for (const project of projects) {
            insertProject.run(
                project.id,
                project.title,
                project.description,
                project.publishedAt,
                project.public ? 1 : 0,
                project.status ? 1 : 0,
                project.tags.join(",")
            );
        }
    });

    insertTransaction();
};