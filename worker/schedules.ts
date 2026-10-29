import { Hono } from "hono";
import { generateMonthlySchedule } from "./AutoScheduler";

export const schedules =
new Hono();

schedules.get(
"/",
async(c)=>{

const rows =
await c.env.DB.prepare(`
SELECT
s.*,
a.area_name,
e.name
FROM schedules s
LEFT JOIN areas a
ON a.id=s.area_id
LEFT JOIN employees e
ON e.id=s.employee_id
ORDER BY work_date DESC
`)
.all();

return c.json(
rows.results || []
);

});

schedules.post(
"/",
async(c)=>{

const body =
await c.req.json();

await c.env.DB.prepare(`
INSERT INTO schedules(
work_date,
area_id,
employee_id,
substitute_employee_id,
status,
source
)
VALUES(
?1,
?2,
?3,
?4,
?5,
'manual'
)
`)
.bind(
body.work_date,
body.area_id,
body.employee_id,
body.substitute_employee_id,
body.status
)
.run();

return c.json({
success:true
});

});

schedules.post(
"/autoscheduler",
async(c)=>{

const body =
await c.req.json();

const result =
await generateMonthlySchedule(
c.env.DB,
body.year,
body.month
);

return c.json(
result
);

});

schedules.get(
"/warnings",
async(c)=>{

const rows =
await c.env.DB.prepare(`
SELECT *
FROM schedule_warnings
WHERE resolved=0
ORDER BY id DESC
`)
.all();

return c.json(
rows.results || []
);

});

