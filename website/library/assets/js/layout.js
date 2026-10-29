document.addEventListener("DOMContentLoaded",()=>{

const nav = `
<header class="topbar">
<div class="topbar-inner">

<a class="logo" href="/library/">
威飛文建CC
</a>

<nav class="menu">
<a href="/library/">首頁</a>
<a href="/library/templates/">範本館</a>
<a href="/library/contracts/">合約中心</a>
<a href="/library/delivery/">交付中心</a>
<a href="/library/manuals/">操作手冊</a>
<a href="/library/quotations/">報價中心</a>
<a href="/library/checklist/">Checklist</a>
<a href="/library/projects/">專案中心</a>
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

});
