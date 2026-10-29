import { Hono } from "hono";

import { auth } from "./auth";
import { dashboard } from "./dashboard";
import { employees } from "./employees";
import { areas } from "./areas";
import { leaves } from "./leaves";
import { schedules } from "./schedules";
import { settings } from "./settings";
import { reports } from "./reports";
import { holidays } from "./holidays";
import { leaveExceptions } from "./leave-exceptions";

const app = new Hono();

app.route("/api/auth",auth);
app.route("/api/dashboard",dashboard);
app.route("/api/employees",employees);
app.route("/api/areas",areas);
app.route("/api/leaves",leaves);
app.route("/api/schedules",schedules);
app.route("/api/settings",settings);
app.route("/api/reports",reports);
app.route("/api/holidays",holidays);
app.route("/api/leave-exceptions",leaveExceptions);

app.get("/api/status",(c)=>{
return c.json({
success:true
});
});

export default app;

import { auditLogs } from "./audit-logs";

app.route(
"/api/audit",
auditLogs
);

