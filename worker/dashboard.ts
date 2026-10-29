import { Hono } from "hono";

export const dashboard = new Hono();

dashboard.get("/stats", async (c) => {

  const active =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM employees
    WHERE status='active'
  `).first();

  const fixed =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM employees
    WHERE employee_type='fixed'
  `).first();

  const substitute =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM employees
    WHERE employee_type='substitute'
  `).first();

  const mobile =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM employees
    WHERE employee_type='mobile'
  `).first();

  const pending =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM leave_requests
    WHERE approved=0
  `).first();

  const warnings =
  await c.env.DB.prepare(`
    SELECT COUNT(*) total
    FROM schedule_warnings
    WHERE resolved=0
  `).first();

  return c.json({
    activeEmployees:
      active?.total || 0,

    fixedEmployees:
      fixed?.total || 0,

    substituteEmployees:
      substitute?.total || 0,

    mobileEmployees:
      mobile?.total || 0,

    pendingLeaves:
      pending?.total || 0,

    warnings:
      warnings?.total || 0
  });

});
