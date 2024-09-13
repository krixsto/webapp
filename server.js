import { Hono } from "hono";
import { serve } from "@hono/node-server";
import fs from 'fs/promises';
import path from 'path';

const app = new Hono();

const filPlassering = path.resolve('prosjektfil.json');

// Prosjektinitialisering med data fra fil
let prosjekter = JSON.parse(await fs.readFile(filPlassering, 'utf8'));

// GET HTML
app.get("/", async (c) => {
    const html = await fs.readFile(path.resolve('index.html'), 'utf8');
    return c.text(html, 200, { 'Content-Type': 'text/html' });
});

// GET JSON
app.get("/prosjektfil", (c) => {
    return c.json(prosjekter);
});

// POST JSON
app.post("/prosjektfil", async (c) => {
    const nyttProsjekt = await c.req.json();
    prosjekter.push(nyttProsjekt);
    await fs.writeFile(filPlassering, JSON.stringify(prosjekter, null, 2));
    return c.json(prosjekter, { status: 201 });
});

// Port
const port = 3999;
console.log(`Serveren kjører. Port: ${port}`);

// Server start
serve({
  fetch: app.fetch,
  port,
});
