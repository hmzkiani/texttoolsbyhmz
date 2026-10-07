(function(){
const small={a:'ᵃ',b:'ᵇ',c:'ᶜ',d:'ᵈ',e:'ᵉ',f:'ᶠ',g:'ᵍ',h:'ʰ',i:'ⁱ',j:'ʲ',k:'ᵏ',l:'ˡ',m:'ᵐ',n:'ⁿ',o:'ᵒ',p:'ᵖ',r:'ʳ',s:'ˢ',t:'ᵗ',u:'ᵘ',v:'ᵛ',w:'ʷ',x:'ˣ',y:'ʸ',z:'ᶻ'},sup={0:'⁰',1:'¹',2:'²',3:'³',4:'⁴',5:'⁵',6:'⁶',7:'⁷',8:'⁸',9:'⁹','+':'⁺','-':'⁻','=':'⁼','(':'⁽',')':'⁾','a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ','j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ','o':'ᵒ','p':'ᵖ','r':'ʳ','s':'ˢ','t':'ᵗ','u':'ᵘ','v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ'},sub={0:'₀',1:'₁',2:'₂',3:'₃',4:'₄',5:'₅',6:'₆',7:'₇',8:'₈',9:'₉','+':'₊','-':'₋','=':'₌','(':'₍',')':'₎','a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','j':'ⱼ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','o':'ₒ','p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','x':'ₓ'};
const lorem=`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, nisl a luctus aliquet, justo nibh commodo nibh, vitae feugiat magna lorem non erat. Donec vitae neque vel arcu consequat facilisis.`;
function qs(s){return document.querySelector(s)}
function setup(){const root=document.body.dataset.tool;const ta=qs('#input');if(!ta)return;const out=qs('#output');const action=(fn)=>{const b=qs('#run');if(b)b.onclick=()=>{out.textContent=fn(ta.value)}};
if(root==='word-counter'){const update=()=>{const v=ta.value,w=(v.match(/\b[\p{L}\p{N}'’-]+\b/gu)||[]).length,c=(v.match(/[\s\S]/g)||[]).length,s=(v.match(/[.!?]+(?=\s|$)/g)||[]).length,p=v.trim()?v.trim().split(/\n\s*\n/).length:0;qs('#words').textContent=w;qs('#chars').textContent=c;qs('#sentences').textContent=s;qs('#paragraphs').textContent=p};ta.oninput=update;update()}
if(root==='character-counter'){const update=()=>{qs('#chars').textContent=ta.value.length;qs('#noSpaces').textContent=ta.value.replace(/\s/g,'').length;qs('#letters').textContent=(ta.value.match(/[\p{L}]/gu)||[]).length;qs('#digits').textContent=(ta.value.match(/\d/g)||[]).length};ta.oninput=update;update()}
if(root==='line-counter'){const update=()=>{let a=ta.value.split(/\r?\n/);qs('#lines').textContent=ta.value? a.length:0;qs('#nonempty').textContent=a.filter(x=>x.trim()).length;qs('#unique').textContent=new Set(a.filter(x=>x.trim())).size};ta.oninput=update;update()}
if(root==='word-frequency-counter'){action(v=>{const ws=(v.toLowerCase().match(/[\p{L}\p{N}]+/gu)||[]);const m={};ws.forEach(w=>m[w]=(m[w]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([w,n])=>`${w}: ${n}`).join('\n')||'No words found.'})}
if(root==='case-converter'){qs('#upper').onclick=()=>out.textContent=ta.value.toUpperCase();qs('#lower').onclick=()=>out.textContent=ta.value.toLowerCase();qs('#title').onclick=()=>out.textContent=ta.value.toLowerCase().replace(/\b\w/g,m=>m.toUpperCase());qs('#sentence').onclick=()=>out.textContent=ta.value.toLowerCase().replace(/(^|[.!?]\s+)([a-z])/g,(m,a,b)=>a+b.toUpperCase())}
if(root==='text-cleaner'){action(v=>v.replace(/[ \t]+/g,' ').replace(/\n[ \t]+/g,'\n').replace(/\n{3,}/g,'\n\n').trim())}
if(root==='small-text'){action(v=>[...v].map(c=>small[c.toLowerCase()]||c).join(''))}
if(root==='superscript'){action(v=>[...v].map(c=>sup[c.toLowerCase()]||c).join(''))}
if(root==='subscript'){action(v=>[...v].map(c=>sub[c.toLowerCase()]||c).join(''))}
if(root==='duplicate'){action(v=>{const seen=new Set();return v.split(/\r?\n/).filter(x=>{if(seen.has(x))return false;seen.add(x);return true}).join('\n')})}
if(root==='find-replace'){qs('#run').onclick=()=>{const f=qs('#find').value,r=qs('#replace').value;out.textContent=f?ta.value.split(f).join(r):ta.value}}
if(root==='slug'){action(v=>v.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,''))}
if(root==='lorem'){qs('#run').onclick=()=>{const n=Math.max(1,Math.min(20,+qs('#count').value||3));out.textContent=Array.from({length:n},(_,i)=>lorem.replace('Lorem ipsum',i?'Lorem ipsum':'Lorem ipsum')).join('\n\n')}}
if(root==='random'){qs('#run').onclick=()=>{const n=Math.max(1,Math.min(500,+qs('#count').value||50));const words='quick bright simple useful text tool browser fast clean clear word page guide random online'.split(' ');out.textContent=Array.from({length:n},()=>words[Math.floor(Math.random()*words.length)]).join(' ')}}
}
document.addEventListener('DOMContentLoaded',setup);
})();
