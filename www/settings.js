/* ===== 2.0: MENÜ, NAVİGASYON, AYARLAR, EYLEM KATMANI ===== */
NAV.length=0;NAV.push(['hub','🏠','Ana'],['club','👥','Kadro'],['tr','🔁','Transfer'],['tac','📋','Taktik'],['menu','☰','Menü']);
V.menu=()=>`<div style="text-align:center;padding:20px 0 6px"><div style="font-size:50px">🏆</div><h1 style="font-size:28px;letter-spacing:2px">FOOTBALL EMPIRE</h1><div class=m>ZUNEX STUDIOS • 2.0</div></div><div class=mg>`+[['new','⚽','Yeni Kariyer'],['load','▶️','Kariyere Devam Et'],['team','🏟️','Kulübüm'],['club','👥','Kadro'],['tr','🔁','Transfer Merkezi'],['tac','📋','Taktikler'],['train','🏋️','Antrenman'],['lg','🏆','Ligler ve Kupalar'],['stad','🏗️','Stadyum'],['fin','💰','Finans'],['stat','📊','İstatistikler'],['set','⚙️','Ayarlar']].map(([v,i,n])=>`<button class=mb data-a=go data-v=${v}><span>${i}</span>${n}</button>`).join('')+'</div>';
const _r=render;render=function(){if(G&&!G.obj){initG();migrate()}_r();if(G&&['lg','team','train','stad','fin','stat'].includes(S.v))$('#app').insertAdjacentHTML('beforeend',nav())};
const _lg=V.lg;V.lg=()=>_lg()+cupHTML();
const _vc=V.club;V.club=()=>{const o=_vc(),c=pl(G.teams[0],S.cur);return c?o.replace('<div class=card><h3>İlk 11</h3>',()=>`<div class=card><h3>#${c.no} ${c.name} • ${c.nat}</h3>${AK.map(k=>`<div class=sc style="font-size:12px"><span style="width:70px">${AL[k]}</span><i class=bar style="flex:1"><u style="width:${AV(c,k)}%"></u></i><b style="font-size:13px;width:28px;text-align:right">${AV(c,k)}</b></div>`).join('')}<div class=m style="margin-top:6px">${c.inj?'🚑 Sakat: '+c.inj+' hafta':'Sağlıklı'}${c.loan?' • Kiralık':''}</div></div><div class=card><h3>İlk 11</h3>`):o};
const _vtac=V.tac;V.tac=()=>{const u=G.teams[0];let o=_vtac();o=o.replace(/<div class=m>Oyun Anlayışı<\/div>[\s\S]*?<div style="margin:6px 0">/,()=>'<div class=m>Oyun Stili</div>'+Object.entries(STY).map(([k,n])=>`<button class="btn s ${u.tac==k?'on':''}" data-a=tc data-v=${k}>${n}</button>`).join('')+'<div style="margin:6px 0">');return o.replace('<div class=card><h3>İlk 11</h3>',()=>pitchHTML(u)+'<div class=card><h3>İlk 11</h3>')};
const _vt=V.tr;V.tr=()=>{const u=G.teams[0];let o=_vt();
o=o.replace(/<button class="btn s p" data-a=buy data-id=(\d+)>/g,(a,id)=>`<button class="btn s" data-a=loan data-id=${id}>Kirala</button><button class="btn s p" data-a=neg data-id=${id}>`);
o=o.replace(/<button class="btn s" data-a=sell data-id=(\d+)>/g,(a,id)=>`<button class="btn s" data-a=tl data-id=${id}>${pl(u,+id).tl?'✔ Listede':'Listele'}</button>`+a);
const p=S.neg&&G.mk.find(x=>x.id==S.neg),nb=(f,w,n)=>`<button class="btn s" data-a=nego data-f=${f} data-w=${w}>${n}</button>`;
const neg=p?`<div class=card style="position:fixed;left:12px;right:12px;top:70px;z-index:50;max-width:496px;margin:auto;box-shadow:0 0 0 100vmax #000b"><h3>Pazarlık: ${p.name}</h3><div class=m>Değer ${M$(p.val)} • Maaş ${M$(p.sal)}/yıl</div>${nb(1,1,'Tam fiyat')}${nb(.9,1,'Fiyat %90 (riskli)')}${nb(1,.8,'Maaş %80 (riskli)')}${nb(1,1.25,'Maaş %125 + bonus (moral+)')}<button class="btn s" data-a=negx>İptal</button></div>`:'';
const off=G.off.map((f,i)=>`<div class=card style="padding:8px"><div class=sc><span style="flex:1;font-size:13px">📩 ${f.club} → ${pl(u,f.id).name}<br><small class=m>${M$(f.fee)} • ${f.exp-G.week} hafta geçerli</small></span><button class="btn s p" data-a=acc data-i=${i}>Kabul</button><button class="btn s" data-a=rej data-i=${i}>Reddet</button></div></div>`).join('');
return o.replace('<div class=card><div class=g2>',()=>neg+off+'<div class=card><div class=g2>')};
const _vm=V.match;V.match=()=>_vm().replace('<button class="btn s" data-a=skip>','<button class="btn s" data-a=subs>🔁 Değişiklik</button><button class="btn s" data-a=skip>').replace('<div id=fin></div>','<div id=subp></div><div id=fin></div>');
const _vs=V.set;V.set=()=>_vs()+`<div class=card><button class=btn data-a=snd>Ses: ${localStorage.getItem('fe_snd')=='0'?'Kapalı':'Açık'}</button><button class=btn data-a=anim>Animasyonlar: ${localStorage.getItem('fe_an')=='0'?'Kapalı':'Açık'}</button>${G?'<button class=btn data-a=msave>💾 Şimdi Kaydet</button>':''}<small class=m>Dil: Türkçe (İngilizce / Rusça sonraki sürümde)</small></div>`;
const _ob=V.hub;V.hub=()=>{const o=_ob(),g=G.obj;return o.replace('<div class=card><h3>Puan Durumu',()=>`<div class=card><h3>Yönetim Hedefi</h3><small class=m>Lig: ilk ${g.pos} • Kupa: ${g.cup} tur • Bütçe ≥ ${M$(g.bud)}</small><br><button class="btn s" data-a=msave>💾 Kaydet</button></div><div class=card><h3>Puan Durumu`)};
const snd=(f,d)=>{if(localStorage.getItem('fe_snd')=='0')return;try{const c=snd.c||(snd.c=new(window.AudioContext||window.webkitAudioContext)),o=c.createOscillator(),g=c.createGain();o.frequency.value=f;g.gain.value=.08;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+d)}catch(e){}};
const _h=hud;hud=function(){const m=S.m,s=m.s[0]+m.s[1];if(m.ls!==undefined&&s>m.ls)snd(660,.4);m.ls=s;_h();if(m.min>=90&&!m.ed){m.ed=1;snd(440,.7)}};
const applyAn=()=>document.body.classList.toggle('noanim',localStorage.getItem('fe_an')=='0');
function subP(){const el=$('#subp'),m=S.m,u=G.teams[0];if(!el)return;if(!S.so){el.innerHTML='';return}const B=bench(u).filter(p=>!p.inj);el.innerHTML=`<div class=card><h3>Oyuncu Değişikliği (${m.subs||0}/3)</h3><small class=m>Önce çıkacak oyuncuyu, sonra girecek yedeği seç.</small>${u.lu.map((id,i)=>prow(pl(u,id),`data-a=sb data-k=l data-i=${i}`,null,S.sb===i?'sel':'')).join('')}<h3>Yedekler</h3>${B.map(p=>prow(p,`data-a=sb data-k=b data-id=${p.id}`)).join('')}</div>`}
function showSum(){const m=S.m,u=G.teams[0],rs=ratings(m),mom=[...rs].sort((a,b)=>b.r-a.r)[0];m.sum=1;rs.forEach(x=>{if(x.t==u)x.p.mor=cl(x.p.mor+(x.r>7?3:x.r<5.5?-3:0),30,100)});
$('#fin').innerHTML=`<div class=card><h3>Maç Sonu: ${m.h.name} ${m.s[0]}-${m.s[1]} ${m.a.name}</h3><div>⭐ Maçın oyuncusu: <b>${mom.p.name}</b> (${mom.t.name}) ${mom.r.toFixed(1)}</div>`+[m.h,m.a].map(t=>`<div class=m style="margin-top:8px">${t.name}</div>`+rs.filter(x=>x.t==t).map(x=>`<div class=sc style="font-size:12px;padding:2px 0"><span>${x.p.pos} ${x.p.name}</span><b style="font-size:14px">${x.r.toFixed(1)}</b></div>`).join('')).join('')+`</div><button class="btn p" data-a=mdone>Devam</button>`}
const _act=act;
act=function(a,d){const u=G&&G.teams[0],b0=G?G.bud:0,m=S.m;
if(a=='go'&&['team','train','stad','fin','stat'].includes(d.v)&&!G)return toast('Önce bir kariyer başlat veya yükle');
if((a=='play'||a=='quick')&&G)fixInj(u);
if(a=='mfin'){if(!m.sum)return showSum();G.live=1}
if(a=='mdone'){G.live=1;a='mfin'}
const X={trf:()=>{G.tr=d.v;save();render()},
tk:()=>{G.stad.tick=cl(G.stad.tick+ +d.v,5,80);save();render()},
up:()=>{const s=G.stad,c={cap:s.cap/5000*3e6,fac:s.fac*6e6,acad:s.acad*5e6}[d.k];if(d.k!='cap'&&s[d.k]>=5)return toast('Maksimum seviye');if(G.bud<c)return toast('Bütçe yetersiz');G.bud-=c;d.k=='cap'?s.cap+=5000:s[d.k]++;toast('Geliştirme tamamlandı');save();render()},
subs:()=>{S.so=!S.so;subP()},
sb:()=>{if(d.k=='l')S.sb=+d.i;else if(S.sb!=null){if((m.subs||0)>=3)return toast('En fazla 3 değişiklik');const t=m.h==u?0:1,o=pl(u,u.lu[S.sb]),n=pl(u,+d.id);u.lu[S.sb]=n.id;m.subs=(m.subs||0)+1;m.r[t]=rate(u);m.log.unshift(m.min+"' 🔁 Değişiklik: "+o.name+' ⇄ '+n.name);S.sb=null;hud()}subP()},
neg:()=>{const p=G.mk.find(x=>x.id==+d.id);if(!p)return;if(G.bud<Math.round(p.val*.9))return toast('Bütçe yetersiz');if(u.sq.length>=30)return toast('Kadro dolu (en fazla 30)');S.neg=p.id;render()},
negx:()=>{S.neg=null;render()},
nego:()=>{toast(negotiate(S.neg,+d.f,+d.w));S.neg=null;save();render()},
loan:()=>{toast(loan(+d.id));save();render()},
tl:()=>{const p=pl(u,+d.id);p.tl=!p.tl;save();render()},
acc:()=>{const f=G.off[+d.i],p=pl(u,f.id);if(u.sq.length<=15||(p.g=='GK'&&u.sq.filter(x=>x.g=='GK').length<=2))return toast('Kadro yetersiz kalır');G.bud+=f.fee;u.sq=u.sq.filter(x=>x!=p);fixLU(u);G.off.splice(+d.i,1);nw('✅ '+p.name+' satıldı ('+M$(f.fee)+')');save();render()},
rej:()=>{G.off.splice(+d.i,1);render()},
msave:()=>{save();toast('Oyun kaydedildi')},
snd:()=>{localStorage.setItem('fe_snd',localStorage.getItem('fe_snd')=='0'?'1':'0');render()},
anim:()=>{localStorage.setItem('fe_an',localStorage.getItem('fe_an')=='0'?'1':'0');applyAn();render()}};
if(X[a]){X[a]();if(G&&['nego','loan','acc','up'].includes(a))G.fn.tr+=G.bud-b0;return}
_act(a,d);if(!G)return;
if(a=='ld'){initG();migrate();render()}
if(a=='play'&&S.m){S.m.g0={};S.m.subs=0;S.so=0;G.teams.forEach(t=>t.sq.forEach(p=>S.m.g0[p.id]=p.gl))}
if(['sell','renew'].includes(a))G.fn.tr+=G.bud-b0};
const _sc=startCareer;startCareer=function(){_sc();initG();migrate();save();render()};
applyAn();setTimeout(()=>{const s=$('#splash');if(s){s.style.opacity=0;setTimeout(()=>s.remove(),500)}},1600);render();
                                                  
