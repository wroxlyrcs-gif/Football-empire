/* ===== OYUNCU & TAKIM MODÜLÜ ===== */
let PID=0;
const PL={mk(g,q,age){age=age||R(18,34);const ovr=cl(q+R(-9,9),40,90),p={id:++PID,name:P(D.FN)[0]+'. '+P(D.LN),g,pos:P(D.POS[g]),age,ovr,pot:0,mor:R(65,90),fit:100,yrs:R(1,4),gl:0};PL.fin(p);p.pot=cl(ovr+(age<24?R(3,13):age<29?R(0,3):0),ovr,94);return p},
fin(p){const f=p.age<24?1.3:p.age>31?.55:1;p.val=Math.max(2e5,Math.round(Math.pow(p.ovr/60,8)*3e6*f/1e5)*1e5);p.sal=Math.max(8e4,Math.round(p.val*.14/1e4)*1e4)}};
const pl=(t,id)=>t.sq.find(p=>p.id==id),sc=p=>p.inj?-99:p.ovr*(.7+.3*p.fit/100);
function mkTeam(id,name,q,c1,c2){const t={id,name,c1,c2,form:'4-3-3',tac:'B',lu:[],sq:[['GK',3],['DF',7],['MD',7],['FW',5]].flatMap(([g,n])=>Array.from({length:n},()=>PL.mk(g,q)))};autoLU(t);return t}
function autoLU(t){const used=new Set(),sl=slots(t.form);t.lu=sl.map(s=>{const f=t.sq.filter(p=>!used.has(p.id)).sort((a,b)=>sc(b)-sc(a)),c=f.find(p=>p.g==s.g)||f[0];used.add(c.id);return c.id})}
const fixLU=t=>{if(t.lu.length!=11||t.lu.some(i=>!pl(t,i))||new Set(t.lu).size!=11)autoLU(t)};
const bench=t=>t.sq.filter(p=>!t.lu.includes(p.id)).sort((a,b)=>'GK,DF,MD,FW'.indexOf(a.g)-'GK,DF,MD,FW'.indexOf(b.g)||b.ovr-a.ovr);
function rate(t){const sl=slots(t.form),L=t.lu.map(i=>pl(t,i)),e=(p,i)=>p.ovr*(.75+.25*p.fit/100)*(.92+.08*p.mor/100)*(p.g==sl[i].g?1:.8),av=g=>{const a=L.map((p,i)=>sl[i].g==g?e(p,i):null).filter(v=>v!=null);return a.reduce((x,y)=>x+y,0)/a.length};
let at=av('FW')*.6+av('MD')*.4,df=av('DF')*.7+av('GK')*.3;if(t.tac=='A'){at*=1.07;df*=.93}if(t.tac=='D'){at*=.93;df*=1.07}return{at,df,md:av('MD')}}
/* ===== 2.0: OYUNCU DETAYLARI ===== */
const NAT=['TUR','TUR','TUR','ENG','ESP','ITA','BRA','ARG','FRA','GER','POR','NED'],AK=['pace','pass','shoot','drib','def','phys'],AL={pace:'Hız',pass:'Pas',shoot:'Şut',drib:'Dribbling',def:'Savunma',phys:'Fizik'},AB={GK:[-20,-10,-30,-25,8,0],DF:[-2,-3,-12,-8,8,5],MD:[0,6,-2,4,-4,0],FW:[5,0,8,6,-14,0]};
const AV=(p,k)=>cl(p.ovr+p.at[k],20,99);
function ext(p){if(!p.at){p.at={};AK.forEach((k,i)=>p.at[k]=AB[p.g][i]+R(-6,6))}p.nat=p.nat||P(NAT);p.no=p.no||R(1,99);p.inj=p.inj||0;p.as=p.as||0;return p}
const _mk=PL.mk;PL.mk=(g,q,a)=>ext(_mk(g,q,a));
const migrate=()=>G.teams.forEach(t=>t.sq.forEach(ext));
function fixInj(t){t.lu.forEach((id,i)=>{const p=pl(t,id);if(p.inj){const b=bench(t).filter(x=>!x.inj),c=b.find(x=>x.g==p.g)||b[0];if(c)t.lu[i]=c.id}})}
