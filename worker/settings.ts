import { Hono } from "hono";

export const settings = new Hono();

settings.get("/rules", async (c) => {

  const rows =
  await c.env.DB.prepare(`
    SELECT *
    FROM system_rules
    ORDER BY rule_key
  `).all();

  return c.json(
    rows.results || []
  );

});

settings.put("/rules/:key", async (c) => {

  const key =
  c.req.param("key");

  const body =
  await c.req.json();

  await c.env.DB.prepare(`
    UPDATE system_rules
    SET
      rule_value=?1,
      updated_at=CURRENT_TIMESTAMP
    WHERE rule_key=?2
  `)
  .bind(
    body.value,
    key
  )
  .run();

  return c.json({
    success:true
  });

});
