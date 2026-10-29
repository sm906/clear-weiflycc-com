PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS schedule_warnings;
DROP TABLE IF EXISTS schedules;
DROP TABLE IF EXISTS leave_exceptions;
DROP TABLE IF EXISTS leave_requests;
DROP TABLE IF EXISTS holidays;
DROP TABLE IF EXISTS area_assignments;
DROP TABLE IF EXISTS areas;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS system_rules;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    role TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    employee_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    mentor_id INTEGER,
    hire_date TEXT,
    leave_date TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE areas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    area_code TEXT NOT NULL UNIQUE,
    area_name TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE area_assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    area_id INTEGER NOT NULL,
    primary_employee_id INTEGER NOT NULL,
    trainee_employee_id INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE holidays (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    holiday_date TEXT NOT NULL UNIQUE,
    holiday_name TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    leave_date TEXT NOT NULL,
    approved INTEGER DEFAULT 0,
    approved_by INTEGER,
    remark TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leave_exceptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    leave_date TEXT NOT NULL,
    approved_by INTEGER,
    remark TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    work_date TEXT NOT NULL,
    area_id INTEGER NOT NULL,
    employee_id INTEGER,
    substitute_employee_id INTEGER,
    status TEXT NOT NULL DEFAULT 'draft',
    source TEXT DEFAULT 'system',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedule_warnings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER,
    work_date TEXT,
    warning_type TEXT NOT NULL,
    message TEXT NOT NULL,
    resolved INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE system_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rule_key TEXT UNIQUE NOT NULL,
    rule_value TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    module TEXT,
    action TEXT,
    target_id TEXT,
    detail TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO system_rules(rule_key,rule_value)
VALUES
('self_leave_days','3'),
('max_continuous_leave_days','3'),
('enable_auto_scheduler','true'),
('substitute_priority','substitute,mobile,manager');

INSERT INTO users(
username,
password_hash,
display_name,
role
)
VALUES(
'admin',
'weiflycc@2026',
'毅澄環保系統管理員',
'admin'
);
