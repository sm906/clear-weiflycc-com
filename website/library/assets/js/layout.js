document.addEventListener("DOMContentLoaded",()=>{

const path=window.location.pathname;

const root =
path.includes("/library/projects/yicheng/")
||
path.includes("/library/projects/xw/")
? "../../../"
:
path !== "/library/"
&&
path !== "/library/index.html"
? "../"
: "./";

const html = `

<a href="#main-content"
class="skip-link">
跳到主要內容
</a>

<header class="topbar">

<div class="topbar-inner">

<a class="logo"
href="${root}">
威飛文建CC
</a>

<button
class="menu-toggle"
id="menuToggle"
aria-label="開啟選單"
aria-expanded="false"
aria-controls="mainMenu">

☰

</button>

<nav
id="mainMenu"
class="menu">

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
html
);

const footer = `

<footer class="footer">

<div class="footer-grid">

<div>
<h3>INFO</h3>
<p>weiflycc.info</p>
</div>

<div>
<h3>LIBRARY</h3>
<p>weiflycc.info/library</p>
</div>

<div>
<h3>SHOWCASE</h3>
<p>weiflycc.com</p>
</div>

<div>
<h3>IDENTITY</h3>
<p>weiflycc.org</p>
</div>

<div>
<h3>CONTROL</h3>
<p>weiflycc.net</p>
</div>

</div>

<p class="copyright">
© WeiflyCC Studio
</p>

</footer>
`;

document.body.insertAdjacentHTML(
"beforeend",
footer
);

const btn =
document.getElementById(
"menuToggle"
);

const menu =
document.getElementById(
"mainMenu"
);

if(btn){

btn.addEventListener(
"click",
()=>{

menu.classList.toggle(
"show"
);

btn.setAttribute(
"aria-expanded",
menu.classList.contains("show")
);

}
);

}

});
