import { Hono } from "hono";

export const holidays = new Hono();

holidays.get("/", async (c) => {

  const rows =
  await c.env.DB.prepare(`
    SELECT *
    FROM holidays
    ORDER BY holiday_date
  `).all();

  return c.json(
    rows.results || []
  );

});

holidays.post("/", async (c) => {

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    INSERT INTO holidays(
      holiday_date,
      holiday_name
    )
    VALUES(?1,?2)
  `)
  .bind(
    body.holiday_date,
    body.holiday_name
  )
  .run();

  return c.json({
    success:true
  });

});

holidays.put("/:id", async (c) => {

  const id =
  c.req.param("id");

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    UPDATE holidays
    SET
      holiday_date=?1,
      holiday_name=?2
    WHERE id=?3
  `)
  .bind(
    body.holiday_date,
    body.holiday_name,
    id
  )
  .run();

  return c.json({
    success:true
  });

});

holidays.delete("/:id", async (c) => {

  const id =
  c.req.param("id");

  await c.env.DB.prepare(`
    DELETE FROM holidays
    WHERE id=?
  `)
  .bind(id)
  .run();

  return c.json({
    success:true
  });

});
