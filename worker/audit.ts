export async function writeAudit(

db,
userId,
module,
action,
targetId,
detail

){

await db.prepare(`
INSERT INTO audit_logs(
user_id,
module,
action,
target_id,
detail
)
VALUES(
?1,
?2,
?3,
?4,
?5
)
`)
.bind(
userId,
module,
action,
targetId,
detail
)
.run();

}
