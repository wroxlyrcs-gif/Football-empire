/* ===== MAÇ MOTORU ===== */
const newM=(h,a)=>({h,a,r:[rate(h),rate(a)],s:[0,0],min:0,st:{sh:[0,0],ot:[0,0],po:[0,0],co:[0,0],fo:[0,0]},log:[],t:0,fin:{x:.5,y:.5},goal:0});
function scorer(t){const sl=slots(t.form),w=t.lu.map(i=>pl(t,i)),ws=w.map((p,i)=>({GK:0,DF:.6,MD:2,FW:5}[sl[i].g])*p.ovr);let r=Math.random()*ws.reduce((a,b)=>a+b,0);for(let i=0;i<11;i++){r-=ws[i];if(r<=0)return w[i]}return w[10]}
function step(m){m.min++;const T=[m.h,m.a],A=m.r,t=Math.random()<A[0].md/(A[0].md+A[1].md)+.03-(Math.random()<.5?0:0)?0:1,o=1-t,x=Math.random();m.t=t;m.st.po[t]++;let fy=t?.9:.1,fx=.3+Math.random()*.4,tx=null;const q=A[t].at-A[o].df;
if(x<.06){m.st.fo[o]++;tx='⚠️ Faul – '+T[o].name;fy=.5}
else if(x<.23){m.st.sh[t]++;const s=scorer(T[t]);fx=.4+Math.random()*.2;if(Math.random()<cl(.5+.004*q,.3,.7)){m.st.ot[t]++;if(Math.random()<cl(.34+q/110,.15,.6)){m.s[t]++;s.gl++;m.goal=1;tx='⚽ GOL! '+s.name+' ('+T[t].name+')'}else tx='🧤 Kaleci kurtardı – '+s.name}else tx='💨 Şut auta – '+s.name}
else if(x<.28){m.st.co[t]++;tx='🚩 Korner – '+T[t].name;fy=t?.97:.03;fx=Math.random()<.5?.05:.95;if(Math.random()<cl(.1+q/400,.04,.25)){const s=scorer(T[t]);m.s[t]++;s.gl++;m.st.sh[t]++;m.st.ot[t]++;m.goal=1;tx='⚽ GOL! (kornerden) '+s.name+' ('+T[t].name+')'}}
m.fin={x:fx,y:fy};if(tx)m.log.unshift(m.min+"' "+tx)}
const poi=l=>{const L=Math.exp(-cl(l,.2,4.5));let k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1};
const quick=(h,a)=>{const A=rate(h),B=rate(a);return[poi(1.4*Math.pow(A.at/B.df,3)*1.08),poi(1.4*Math.pow(B.at/A.df,3)*.94)]};
/* ===== 2.0: PENALTI, SERBEST VURUŞ, KART, SAKATLIK ===== */
const taker=(t,k)=>{const p=pl(t,t[k]);return p&&t.lu.includes(p.id)?p:t.lu.map(i=>pl(t,i)).sort((a,b)=>b.at.shoot-a.at.shoot)[0]};
const _step=step;
step=function(m){const T=[m.h,m.a],s0=m.s[0]+m.s[1];m.y=m.y||{};_step(m);const t=m.t,o=1-t,r=Math.random(),ev=x=>m.log.unshift(m.min+"' "+x);
if(m.s[0]+m.s[1]>s0){const tt=T[t],c=(m.log[0]||'').includes('kornerden')?taker(tt,'cr'):P(tt.lu.map(i=>pl(tt,i)).filter(p=>p.g!='GK'));c.as++}
if(r<.012){const k=taker(T[t],'pen');m.st.sh[t]++;m.st.ot[t]++;if(Math.random()<.78){m.s[t]++;k.gl++;m.goal=1;ev('⚽ PENALTI GOLÜ! '+k.name+' ('+T[t].name+')')}else ev('🧤 Penaltı kurtarıldı – '+k.name)}
else if(r<.03){const k=taker(T[t],'fk');m.st.sh[t]++;if(Math.random()<.05+k.at.shoot/1200){m.st.ot[t]++;m.s[t]++;k.gl++;m.goal=1;ev('⚽ Serbest vuruştan GOL! '+k.name)}else ev('🎯 Serbest vuruş – '+k.name)}
else if(r<.05)ev('🚩 Ofsayt – '+T[t].name);
else if(r<.09){const f=T[o],p=pl(f,P(f.lu));if(!m.y[p.id]){m.y[p.id]=1;ev('🟨 Sarı kart – '+p.name)}else if(m.y[p.id]==1){m.y[p.id]=2;ev('🟥 Kırmızı kart – '+p.name);m.r[o]={at:m.r[o].at*.92,df:m.r[o].df*.92,md:m.r[o].md*.92}}}
else if(r<.098){const f=T[Math.random()<.5?0:1],p=pl(f,P(f.lu));if(!p.inj){p.inj=R(1,5);ev('🚑 Sakatlık – '+p.name)}}};
function ratings(m){m.y=m.y||{};const o=[];[m.h,m.a].forEach((t,k)=>{const d=m.s[k]-m.s[1-k];t.lu.forEach(i=>{const p=pl(t,i);o.push({p,t,r:cl(6+(d>0?.5:d<0?-.4:0)+(p.ovr-60)/40+(p.gl-((m.g0&&m.g0[p.id])||0))*1.2+Math.random()*1.2-.5-(m.y[p.id]==2?1:0),3.5,9.9)})})});return o}
   
