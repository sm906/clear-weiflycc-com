export async function generateMonthlySchedule(
db,
year,
month
){

const employees =
(
await db.prepare(`
SELECT *
FROM employees
WHERE status='active'
`).all()
).results || [];

const areas =
(
await db.prepare(`
SELECT *
FROM areas
WHERE active=1
`).all()
).results || [];

const holidays =
(
await db.prepare(`
SELECT holiday_date
FROM holidays
`).all()
).results || [];

const holidaySet =
new Set(
holidays.map(
x=>x.holiday_date
)
);

const totalDays =
new Date(
year,
month,
0
).getDate();

let weekendCount=0;

for(
let d=1;
d<=totalDays;
d++
){

const dt =
new Date(
year,
month-1,
d
);

const day =
dt.getDay();

if(
day===0 ||
day===6
){
weekendCount++;
}

}

const requiredLeaveDays =
weekendCount +
holidaySet.size;

await db.prepare(`
DELETE FROM schedules
WHERE substr(work_date,1,7)=?
`)
.bind(
`${year}-${String(month).padStart(2,'0')}`
)
.run();

for(
const emp
of employees
){

const leaveRows =
(
await db.prepare(`
SELECT leave_date
FROM leave_requests
WHERE employee_id=?
AND approved=1
`)
.bind(emp.id)
.all()
).results || [];

const leaveSet =
new Set(
leaveRows.map(
x=>x.leave_date
)
);

const remain =
Math.max(
0,
requiredLeaveDays -
leaveSet.size
);

let added=0;

for(
let d=1;
d<=totalDays &&
added<remain;
d++
){

const workDate =
`${year}-${String(month).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

if(
leaveSet.has(workDate)
){
continue;
}

leaveSet.add(
workDate
);

added++;

await db.prepare(`
INSERT INTO leave_requests(
employee_id,
leave_date,
approved,
remark
)
VALUES(
?1,
?2,
1,
'AUTO'
)
`)
.bind(
emp.id,
workDate
)
.run();

}

}

for(
let d=1;
d<=totalDays;
d++
){

const workDate =
`${year}-${String(month).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

for(
const area
of areas
){

const assign =
await db.prepare(`
SELECT *
FROM area_assignments
WHERE area_id=?
`)
.bind(area.id)
.first();

if(!assign){

await db.prepare(`
INSERT INTO schedule_warnings(
work_date,
warning_type,
message
)
VALUES(
?1,
'NO_PRIMARY',
'區域未配置主責'
)
`)
.bind(
workDate
)
.run();

continue;

}

await db.prepare(`
INSERT INTO schedules(
work_date,
area_id,
employee_id,
status,
source
)
VALUES(
?1,
?2,
?3,
'generated',
'system'
)
`)
.bind(
workDate,
area.id,
assign.primary_employee_id
)
.run();

}

}

return {
success:true,
year,
month,
employees:employees.length,
areas:areas.length
};

}
