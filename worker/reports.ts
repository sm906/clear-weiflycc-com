import { Hono } from "hono";

export const reports = new Hono();

reports.get("/summary", async (c) => {

  const employees =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM employees
    WHERE status='active'
  `).first();

  const leaves =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM leave_requests
  `).first();

  const schedules =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM schedules
  `).first();

  const warnings =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM schedule_warnings
    WHERE resolved=0
  `).first();

  return c.json({

    employees:
    employees?.total || 0,

    leaves:
    leaves?.total || 0,

    schedules:
    schedules?.total || 0,

    warnings:
    warnings?.total || 0

  });

});
