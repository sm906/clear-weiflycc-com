export async function generateMonthlySchedule(
db,
year,
month
){

const holidays =
(
await db.prepare(`
SELECT holiday_date
FROM holidays
`)
.all()
).results || [];

const holidaySet =
new Set(
holidays.map(
x=>x.holiday_date
)
);

const employees =
(
await db.prepare(`
SELECT *
FROM employees
WHERE status='active'
`)
.all()
).results || [];

const areas =
(
await db.prepare(`
SELECT *
FROM areas
WHERE active=1
`)
.all()
).results || [];

const totalDays =
new Date(
year,
month,
0
).getDate();

let weekendCount = 0;

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

if(
dt.getDay()===0 ||
dt.getDay()===6
){
weekendCount++;
}

}

const requiredLeaveDays =
weekendCount +
[...holidaySet]
.filter(x=>
x.startsWith(
`${year}-${String(month).padStart(2,'0')}`
)
)
.length;

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
.bind(
area.id
)
.first();

if(!assign){

await db.prepare(`
INSERT INTO schedule_warnings(
work_date,
warning_type,
message
)
VALUES(
date('now'),
'AREA_EMPTY',
'未設定主責人員'
)
`)
.run();

}

}

return {

success:true,

employees:
employees.length,

areas:
areas.length,

requiredLeaveDays

};

}
