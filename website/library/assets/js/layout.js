document.addEventListener("DOMContentLoaded",()=>{

const currentDepth = (()=>{

const path = window.location.pathname;

if(path.includes("/library/templates/")) return "../";
if(path.includes("/library/contracts/")) return "../";
if(path.includes("/library/delivery/")) return "../";
if(path.includes("/library/manuals/")) return "../";
if(path.includes("/library/quotations/")) return "../";
if(path.includes("/library/checklist/")) return "../";
if(path.includes("/library/projects/yicheng/")) return "../../../";
if(path.includes("/library/projects/xw/")) return "../../../";
if(path.includes("/library/projects/")) return "../";

return "./";

})();

const nav = `
<header class="topbar">

<div class="topbar-inner">

<a class="logo" href="${currentDepth}">
威飛文建CC
</a>

<button class="menu-toggle" id="menuToggle">
☰
</button>

<nav class="menu" id="mainMenu">

<a href="${currentDepth}">首頁</a>

<a href="${currentDepth}templates/">
範本館
</a>

<a href="${currentDepth}contracts/">
合約中心
</a>

<a href="${currentDepth}delivery/">
交付中心
</a>

<a href="${currentDepth}manuals/">
操作手冊
</a>

<a href="${currentDepth}quotations/">
報價中心
</a>

<a href="${currentDepth}checklist/">
Checklist
</a>

<a href="${currentDepth}projects/">
專案中心
</a>

</nav>

</div>

</header>
`;

const footer = `
<footer class="footer">

<div class="footer-grid">

<div>
<h3>威飛數位平台</h3>
<p>weiflycc.info</p>
</div>

<div>
<h3>威飛文建CC</h3>
<p>weiflycc.info/library</p>
</div>

<div>
<h3>威飛展示CC</h3>
<p>weiflycc.com</p>
</div>

<div>
<h3>威飛認證CC</h3>
<p>weiflycc.org</p>
</div>

<div>
<h3>威飛控制CC</h3>
<p>weiflycc.net</p>
</div>

</div>

<p class="copyright">
© WeiflyCC Studio
</p>

</footer>
`;

document.body.insertAdjacentHTML(
"afterbegin",
nav
);

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
}
);

}

});
