import { Hono } from "hono";

export const employees =
new Hono();

employees.get("/",async(c)=>{

const rows=
await c.env.DB.prepare(`
SELECT *
FROM employees
ORDER BY id DESC
`).all();

return c.json(
rows.results||[]
);

});

employees.post("/",async(c)=>{

const body=
await c.req.json();

const result=
await c.env.DB.prepare(`
INSERT INTO employees
(
employee_code,
name,
employee_type,
status,
mentor_id,
hire_date
)
VALUES
(?1,?2,?3,?4,?5,?6)
`)
.bind(
body.employee_code,
body.name,
body.employee_type,
body.status,
body.mentor_id,
body.hire_date
)
.run();

return c.json({
success:true,
id:result.meta.last_row_id
});

});

employees.put("/:id",async(c)=>{

const id=
c.req.param("id");

const body=
await c.req.json();

await c.env.DB.prepare(`
UPDATE employees
SET
name=?1,
employee_type=?2,
status=?3,
mentor_id=?4,
hire_date=?5
WHERE id=?6
`)
.bind(
body.name,
body.employee_type,
body.status,
body.mentor_id,
body.hire_date,
id
)
.run();

return c.json({
success:true
});

});

employees.delete("/:id",async(c)=>{

const id=
c.req.param("id");

await c.env.DB.prepare(`
UPDATE employees
SET
status='left',
leave_date=date('now')
WHERE id=?
`)
.bind(id)
.run();

return c.json({
success:true
});

});

