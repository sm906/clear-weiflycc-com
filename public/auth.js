const token =
localStorage.getItem(
"token"
);

if(
!token &&
!location.pathname.includes(
"login.html"
)
){
location.href =
"/login.html";
}
