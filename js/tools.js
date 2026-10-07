(function(){
const groups=[['counting','📝','Counting',4,0,4],['formatting','🔤','Text Formatting',5,4,9],['utilities','🛠️','Text Utilities',3,9,12],['generators','🎲','Generators',2,12,14]];
function render(){const root=document.getElementById('toolGrid');if(!root||!window.TEXTTOOLS)return;root.id='tools';root.innerHTML=groups.map(g=>`<section class="tool-section" id="cat-${g[0]}"><div class="section-title"><h2>${g[1]} ${g[2]}</h2><span class="count-badge">${g[3]} tools</span></div>${window.TEXTTOOLS.slice(g[4],g[5]).map(t=>`<article class="tool-card"><div class="tool-icon">${t[3]}</div><div><h3>${t[0]}</h3><p>${t[1]}</p><a class="tool-link" href="${t[2]}">Open Tool →</a></div></article>`).join('')}</section>`).join('')}
document.addEventListener('DOMContentLoaded',render);
})();
