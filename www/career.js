/* ===== KAYIT MODÜLÜ ===== */
const ixs=()=>JSON.parse(localStorage.getItem('fe_ix')||'[]');
function save(){if(!G)return;try{localStorage.setItem('fe_s_'+G.id,JSON.stringify(G));localStorage.setItem('fe_ix',JSON.stringify([{id:G.id,name:G.teams[0].name,logo:G.logo,s:G.season,w:G.week,ts:Date.now()},...ixs().filter(x=>x.id!=G.id)]))}catch(e){toast('Kayıt hatası!')}}
function startCareer(){const f=S.nf,c=D.C[f.co];const T=[mkTeam(0,(f.name||'').trim()||'Zunex FC',62,f.c1,f.c2),...c.c.slice(0,19).map((n,i)=>mkTeam(i+1,n+' '+D.SUF[i%5],R(54,72),`hsl(${R(0,360)},60%,45%)`,'#ffffff'))];
G={id:Date.now()+'',logo:f.logo,country:f.co,season:1,week:0,bud:+f.bud,teams:T,fix:fixtures(20),st:T.map(()=>({p:0,w:0,d:0,l:0,gf:0,ga:0,pt:0})),res:[],last:null,news:['Kariyer başladı. Başarılar!'],hist:[],mk:[]};refreshMarket();save();S.v='hub';render()}
