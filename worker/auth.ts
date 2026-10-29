import { Hono } from "hono";
import { sign } from "hono/jwt";

export const auth = new Hono();

auth.post("/login", async (c) => {

const body =
await c.req.json();

const user =
await c.env.DB.prepare(`
SELECT *
FROM users
WHERE username=?
AND active=1
`)
.bind(
body.username
)
.first();

if(
!user ||
user.password_hash !==
body.password
){

return c.json(
{
success:false
},
401
);

}

const token =
await sign(
{
id:user.id,
role:user.role,
username:user.username
},
c.env.JWT_SECRET
);

return c.json({

success:true,

token,

user:{
id:user.id,
name:user.display_name,
role:user.role
}

});

});

