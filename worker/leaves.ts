import { Hono } from "hono";

export const leaves = new Hono();

leaves.get("/", async (c) => {

  const rows =
  await c.env.DB.prepare(`
    SELECT
      lr.*,
      e.name
    FROM leave_requests lr
    LEFT JOIN employees e
      ON e.id = lr.employee_id
    ORDER BY leave_date DESC
  `).all();

  return c.json(
    rows.results || []
  );

});

leaves.post("/", async (c) => {

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    INSERT INTO leave_requests(
      employee_id,
      leave_date,
      approved,
      remark
    )
    VALUES(?1,?2,0,?3)
  `)
  .bind(
    body.employee_id,
    body.leave_date,
    body.remark
  )
  .run();

  return c.json({
    success:true
  });

});

leaves.put("/:id", async (c) => {

  const id =
  c.req.param("id");

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    UPDATE leave_requests
    SET
      leave_date=?1,
      remark=?2
    WHERE id=?3
  `)
  .bind(
    body.leave_date,
    body.remark,
    id
  )
  .run();

  return c.json({
    success:true
  });

});

leaves.post("/approve", async (c) => {

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    UPDATE leave_requests
    SET
      approved=1,
      approved_by=?1
    WHERE id=?2
  `)
  .bind(
    body.approved_by,
    body.id
  )
  .run();

  return c.json({
    success:true
  });

});

leaves.post("/reject", async (c) => {

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    UPDATE leave_requests
    SET
      approved=0
    WHERE id=?1
  `)
  .bind(
    body.id
  )
  .run();

  return c.json({
    success:true
  });

});

leaves.delete("/:id", async (c) => {

  const id =
  c.req.param("id");

  await c.env.DB.prepare(`
    DELETE FROM leave_requests
    WHERE id=?
  `)
  .bind(id)
  .run();

  return c.json({
    success:true
  });

});
