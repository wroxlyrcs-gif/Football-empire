function startCareer(){
  const f=S.nf;
  const clubName=(f.name||'').trim();

  if(!clubName){
    toast('Lütfen kulübüne bir isim ver!');
    return;
  }

  const c=D.C[f.co];

  const T=[
    mkTeam(0,clubName,62,f.c1,f.c2),
    ...c.c.slice(0,19).map((n,i)=>
      mkTeam(
        i+1,
        n+' '+D.SUF[i%5],
        R(54,72),
        `hsl(${R(0,360)},60%,45%)`,
        '#ffffff'
      )
    )
  ];

  G={
    id:Date.now()+'',
    logo:f.logo,
    country:f.co,
    season:1,
    week:0,
    bud:+f.bud,
    teams:T,
    fix:fixtures(20),
    st:T.map(()=>({p:0,w:0,d:0,l:0,gf:0,ga:0,pt:0})),
    res:[],
    last:null,
    news:['Kariyer başladı. Başarılar!'],
    hist:[],
    mk:[]
  };

  refreshMarket();
  save();
  S.v='hub';
  render();
}
