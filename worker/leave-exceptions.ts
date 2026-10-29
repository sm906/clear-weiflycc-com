import { Hono } from "hono";

export const leaveExceptions =
new Hono();

leaveExceptions.get("/", async (c) => {

  const rows =
  await c.env.DB.prepare(`
    SELECT
      le.*,
      e.name
    FROM leave_exceptions le
    LEFT JOIN employees e
      ON e.id = le.employee_id
    ORDER BY leave_date DESC
  `).all();

  return c.json(
    rows.results || []
  );

});

leaveExceptions.post("/", async (c) => {

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    INSERT INTO leave_exceptions(
      employee_id,
      leave_date,
      approved_by,
      remark
    )
    VALUES(
      ?1,
      ?2,
      ?3,
      ?4
    )
  `)
  .bind(
    body.employee_id,
    body.leave_date,
    body.approved_by,
    body.remark
  )
  .run();

  return c.json({
    success:true
  });

});
