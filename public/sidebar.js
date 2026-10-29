window.sidebar = `
<div class="sidebar">

<div class="logo">
毅澄環保
</div>

<a href="/dashboard.html">
Dashboard
</a>

<a href="/employees.html">
員工管理
</a>

<a href="/areas.html">
區域管理
</a>

<a href="/leaves.html">
休假管理
</a>

<a href="/schedules.html">
排班管理
</a>

<a href="/calendar.html">
排班月曆
</a>

<a href="/reports.html">
報表中心
</a>

<a href="/settings.html">
系統設定
</a>

<a href="#"
onclick="logout()">
登出
</a>

</div>
`;

function logout(){

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

location.href =
"/login.html";

}
