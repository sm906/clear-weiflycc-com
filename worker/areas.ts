import { Hono } from "hono";

export const areas = new Hono();

areas.get("/", async (c) => {

  const rows =
  await c.env.DB.prepare(`
    SELECT
      a.*,
      e.name AS primary_name,
      t.name AS trainee_name
    FROM areas a
    LEFT JOIN area_assignments aa
      ON aa.area_id = a.id
    LEFT JOIN employees e
      ON e.id = aa.primary_employee_id
    LEFT JOIN employees t
      ON t.id = aa.trainee_employee_id
    ORDER BY a.area_code
  `).all();

  return c.json(rows.results || []);

});

areas.post("/", async (c) => {

  const body = await c.req.json();

  await c.env.DB.prepare(`
    INSERT INTO areas(
      area_code,
      area_name,
      active
    )
    VALUES(?1,?2,1)
  `)
  .bind(
    body.area_code,
    body.area_name
  )
  .run();

  return c.json({
    success:true
  });

});

areas.put("/:id", async (c) => {

  const id =
  c.req.param("id");

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    UPDATE areas
    SET
      area_code=?1,
      area_name=?2,
      active=?3
    WHERE id=?4
  `)
  .bind(
    body.area_code,
    body.area_name,
    body.active,
    id
  )
  .run();

  return c.json({
    success:true
  });

});

areas.delete("/:id", async (c) => {

  const id =
  c.req.param("id");

  await c.env.DB.prepare(`
    DELETE FROM areas
    WHERE id=?
  `)
  .bind(id)
  .run();

  return c.json({
    success:true
  });

});

areas.post("/assign", async (c) => {

  const body =
  await c.req.json();

  const existing =
  await c.env.DB.prepare(`
    SELECT id
    FROM area_assignments
    WHERE area_id=?
  `)
  .bind(body.area_id)
  .first();

  if(existing){

    await c.env.DB.prepare(`
      UPDATE area_assignments
      SET
        primary_employee_id=?1,
        trainee_employee_id=?2
      WHERE area_id=?3
    `)
    .bind(
      body.primary_employee_id,
      body.trainee_employee_id,
      body.area_id
    )
    .run();

  }else{

    await c.env.DB.prepare(`
      INSERT INTO area_assignments(
        area_id,
        primary_employee_id,
        trainee_employee_id
      )
      VALUES(?1,?2,?3)
    `)
    .bind(
      body.area_id,
      body.primary_employee_id,
      body.trainee_employee_id
    )
    .run();

  }

  return c.json({
    success:true
  });

});

