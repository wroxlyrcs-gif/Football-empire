/* ===== LİG MODÜLÜ ===== */
function fixtures(n){const a=[...Array(n).keys()],F=[];for(let r=0;r<n-1;r++){const m=[];for(let i=0;i<n/2;i++){let h=a[i],b=a[n-1-i];if((r+i)%2)[h,b]=[b,h];m.push([h,b])}F.push(m);a.splice(1,0,a.pop())}return[...F,...F.map(m=>m.map(([h,b])=>[b,h]))]}
const table=()=>G.teams.map(t=>({t,...G.st[t.id]})).sort((a,b)=>b.pt-a.pt||(b.gf-b.ga)-(a.gf-a.ga)||b.gf-a.gf).map((r,i)=>({...r,k:i+1}));
function rec(i,j,x,y){[[i,x,y],[j,y,x]].forEach(([k,f,a])=>{const r=G.st[k];r.p++;r.gf+=f;r.ga+=a;if(f>a){r.w++;r.pt+=3}else if(f==a){r.d++;r.pt++}else r.l++})}
const nw=s=>{G.news.unshift(s);G.news.length=Math.min(G.news.length,40)};
function week(ur){const T=G.teams,u=T[0];let my=0,op=0,hm=0;G.res[G.week]=[];
G.fix[G.week].forEach(([h,a])=>{const me=h==0||a==0,r=me&&ur?ur:quick(T[h],T[a]);G.res[G.week].push([h,a,r[0],r[1]]);rec(h,a,r[0],r[1]);if(me){G.last={h,a,r};hm=h==0;my=hm?r[0]:r[1];op=hm?r[1]:r[0]}});
u.sq.forEach(p=>{if(u.lu.includes(p.id)){p.fit=cl(p.fit-R(7,12),20,100);p.mor=cl(p.mor+(my>op?6:my<op?-6:0),30,100)}else p.fit=cl(p.fit+R(9,14),0,100)});
G.bud+=fin(hm,my>op)-Math.round(u.sq.reduce((a,p)=>a+p.sal,0)/38);G.week++;S.fw=null;if(G.week%4==0)refreshMarket();save()}
function newSeason(){const tb=table();if(tb[0].t.id==0){G.bud+=1e7;}G.hist.push('Sezon '+G.season+': '+tb[0].t.name);
G.teams.forEach(t=>{t.sq.forEach(p=>{p.age++;p.ovr=cl(p.ovr+(p.age<24?R(0,4):p.age<30?R(-1,2):R(-3,0)),38,94);p.pot=p.age>=28?p.ovr:Math.max(p.ovr,p.pot);p.yrs--;p.fit=100;p.mor=70;p.gl=0;PL.fin(p)});
for(const p of [...t.sq]){const old=p.age>=36,exp=p.yrs<=0;if(t.id==0){if((old&&t.sq.length>16||exp&&t.sq.length>18)&&(p.g!='GK'||t.sq.filter(x=>x.g=='GK').length>2)){t.sq=t.sq.filter(x=>x!=p);nw(p.name+' kulüpten ayrıldı');continue}if(exp)p.yrs=2}else{if(old)t.sq[t.sq.indexOf(p)]=PL.mk(p.g,58,R(18,21));else if(exp)p.yrs=R(1,3)}}
t.id?autoLU(t):fixLU(t)});
G.season++;G.week=0;G.fix=fixtures(20);G.st=G.teams.map(()=>({p:0,w:0,d:0,l:0,gf:0,ga:0,pt:0}));G.res=[];G.last=null;refreshMarket();nw('Yeni sezon başladı!');save()}
/* ===== 2.0: HAFTA SONRASI SİSTEMLER, KUPA, SEZON SONU ===== */
const newFn=()=>({gate:0,sp:0,tv:0,prz:0,wage:0,tr:0});
function initCup(){const ids=G.teams.map(t=>t.id).sort(()=>Math.random()-.5),k=ids.indexOf(0);if(k>=16){ids[k]=ids[0];ids[0]=0}G.cup={alive:ids.slice(0,16),res:[],ur:0,win:null}}
function setObj(){const rk=G.teams.map(t=>{const r=rate(t);return{t,r:r.at+r.df}}).sort((a,b)=>b.r-a.r).findIndex(x=>x.t.id==0)+1;G.obj={pos:Math.max(1,rk-2),cup:rk<8?2:1,bud:Math.round(G.bud)}}
function initG(){const d=(k,v)=>{if(G[k]==null)G[k]=v};d('stad',{cap:20000,tick:25,fac:1,acad:1,fans:15000,sat:60});d('mgr',{rep:30,lvl:1,xp:0});d('fn',newFn());d('tr','fit');d('trlog',[]);d('off',[]);d('awards',[]);d('wk',{});if(!G.cup)initCup();if(!G.obj)setObj()}
function cupRound(ri){const c=G.cup,T=G.teams,nx=[];for(let i=0;i<c.alive.length;i+=2){const h=c.alive[i],a=c.alive[i+1],[x,y]=quick(T[h],T[a]),w=x>y?h:y>x?a:(Math.random()<.5?h:a);c.res.push({r:ri,h,a,x,y,w,pen:x==y});nx.push(w);if(h==0||a==0){if(w==0){c.ur++;nw('🏅 Kupada tur atladık!')}else nw('😞 Kupada elendik')}}c.alive=nx;if(nx.length==1){c.win=nx[0];nw('🏆 Kupa şampiyonu: '+T[nx[0]].name);if(nx[0]==0){G.bud+=5e6;G.fn.prz+=5e6}}}
const _week=week;
week=function(ur){const live=G.live,w=G.week,T=G.teams,u=T[0];G.live=0;u.sq.forEach(p=>{if(p.inj>0)p.inj--});const wage=Math.round(u.sq.reduce((a,p)=>a+p.sal,0)/38);_week(ur);G.fn.wage+=wage;
G.res[w].forEach(([h,a,x,y])=>{if((h==0||a==0)&&live)return;[[h,x],[a,y]].forEach(([k,n])=>{const t=T[k];for(let i=0;i<n;i++){const s=scorer(t);s.gl++;P(t.lu.map(id=>pl(t,id)).filter(p=>p!=s&&p.g!='GK')).as++}})});
u.lu.forEach(id=>{const p=pl(u,id);if(!p.inj&&Math.random()<.03){p.inj=R(1,6);nw('🚑 '+p.name+' sakatlandı ('+p.inj+' hafta)')}});
const tk={att:'shoot',def:'def',pas:'pass',sht:'shoot',fit:'phys'}[G.tr],ch=.04+.02*G.stad.fac;
u.sq.forEach(p=>{if(G.tr=='fit')p.fit=cl(p.fit+5,0,100);const c=ch*(p.age<23?2:p.age>30?.4:1)*(G.tr=='yth'&&p.age<=21?3:1);if(Math.random()<c&&p.ovr<p.pot){p.ovr++;PL.fin(p);G.trlog.unshift(p.name+' +1 → '+p.ovr)}if(tk&&Math.random()<.2)p.at[tk]=Math.min(p.at[tk]+1,25)});G.trlog.length=Math.min(G.trlog.length,10);
const l=G.last,hm=l.h==0,my=hm?l.r[0]:l.r[1],op=hm?l.r[1]:l.r[0],s=G.stad,wn=my>op;
s.sat=cl(s.sat+(wn?2:my<op?-2.5:0)-(s.tick>35?1:0),10,100);s.fans=Math.round(cl(s.fans+(s.sat-55)*8,3000,s.cap*1.1));G.mgr.rep=cl(G.mgr.rep+(wn?.4:my<op?-.3:0),0,100);G.mgr.xp+=wn?6:2;
while(G.mgr.xp>=100*G.mgr.lvl){G.mgr.xp-=100*G.mgr.lvl;G.mgr.lvl++;nw('⭐ Teknik direktör seviyesi: '+G.mgr.lvl)}
nw('📰 '+T[l.h].name+' '+l.r[0]+'-'+l.r[1]+' '+T[l.a].name+' • '+(wn?P(['Taraftar coştu!','Hocaya övgü yağdı.']):my<op?P(['Taraftar tepkili.','Yönetim toplantıya çağırdı.']):'Puan paylaşıldı.'));
const CW=[8,16,24,34];if(CW.includes(G.week))cupRound(CW.indexOf(G.week));
G.off=G.off.filter(f=>f.exp>G.week&&pl(u,f.id));
if(G.off.length<3&&Math.random()<.25){const L=u.sq.filter(p=>p.tl),p=L.length&&Math.random()<.7?P(L):P(u.sq);if(!G.off.some(f=>f.id==p.id)){const fee=Math.round(p.val*R(100,140)/100/1e5)*1e5;G.off.push({id:p.id,fee,club:P(D.C[G.country].c)+' '+P(D.SUF),exp:G.week+3});nw('📩 '+p.name+' için '+M$(fee)+' teklif geldi')}}
if(G.week<38){const f=G.fix[G.week].find(x=>x[0]==0||x[1]==0);nw('🔜 Sıradaki rakip: '+T[f[0]==0?f[1]:f[0]].name)}save()};
const _ns=newSeason;
newSeason=function(){const tb=table(),u=G.teams[0],all=G.teams.flatMap(t=>t.sq),gs=[...all].sort((a,b)=>b.gl-a.gl)[0],as=[...all].sort((a,b)=>b.as-a.as)[0];
G.awards.unshift('Sezon '+G.season+': Şampiyon '+tb[0].t.name+' • Gol kralı '+gs.name+' ('+gs.gl+') • Asist kralı '+as.name+' ('+as.as+')');
const me=tb.find(r=>r.t.id==0).k,o=G.obj;let ok=0;if(me<=o.pos)ok++;if(G.cup.ur>=o.cup)ok++;if(G.bud>=o.bud)ok++;
G.bud+=ok*2e6;G.mgr.rep=cl(G.mgr.rep+ok*4-2,0,100);G.mgr.xp+=ok*50+10;while(G.mgr.xp>=100*G.mgr.lvl){G.mgr.xp-=100*G.mgr.lvl;G.mgr.lvl++}
u.sq=u.sq.filter(p=>!p.loan);fixLU(u);all.forEach(p=>p.as=0);_ns();
const y=PL.mk(P(['DF','MD','FW']),48+G.stad.acad*3,R(16,18));y.pot=cl(y.ovr+R(8,20),y.ovr,95);y.yrs=3;PL.fin(y);u.sq.push(y);
nw('📋 Yönetim değerlendirmesi: '+ok+'/3 hedef tamamlandı. Akademiden yeni genç: '+y.name);G.fn=newFn();initCup();setObj();save()};
  
