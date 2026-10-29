document.addEventListener("DOMContentLoaded",()=>{

const path = window.location.pathname;

const root =
path.includes("/library/projects/yicheng/") ||
path.includes("/library/projects/xw/")
? "../../../"
:
path !== "/library/" &&
path !== "/library/index.html"
? "../"
:
"./";

const nav = `
<header class="topbar">

<div class="topbar-inner">

<a class="logo" href="${root}">
威飛文建CC
</a>

<button
class="menu-toggle"
id="menuToggle"
aria-label="開啟選單"
aria-expanded="false">
☰
</button>

<nav
class="menu"
id="mainMenu">

<a href="${root}">
首頁
</a>

<a href="${root}templates/">
範本館
</a>

<a href="${root}contracts/">
合約中心
</a>

<a href="${root}delivery/">
交付中心
</a>

<a href="${root}manuals/">
操作手冊
</a>

<a href="${root}quotations/">
報價中心
</a>

<a href="${root}checklist/">
Checklist
</a>

<a href="${root}projects/">
專案中心
</a>

</nav>

</div>

</header>
`;

document.body.insertAdjacentHTML(
"afterbegin",
nav
);

const btn =
document.querySelector(
"#menuToggle"
);

const menu =
document.querySelector(
"#mainMenu"
);

if(btn){

btn.addEventListener(
"click",
()=>{

menu.classList.toggle(
"show"
);

const expanded =
menu.classList.contains(
"show"
);

btn.setAttribute(
"aria-expanded",
expanded
);

}
);

}

});
