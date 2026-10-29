import { Hono } from "hono";

export const auditLogs =
new Hono();

auditLogs.get(
"/",
async(c)=>{

const rows =
await c.env.DB.prepare(`
SELECT *
FROM audit_logs
ORDER BY id DESC
LIMIT 300
`)
.all();

return c.json(
rows.results || []
);

});

