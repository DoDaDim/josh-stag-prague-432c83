(()=>{"use strict";
const URL_="https://dodadim.github.io/emperor-josh/";
const cv=document.getElementById('c'),cx=cv.getContext('2d'),$=id=>document.getElementById(id);
const IM={};let loaded=0;const AV={arteta:[8,4,32,58],henry:[8,6,32,56],adams:[8,4,32,58],vieira:[9,4,30,58],dino:[6,4,36,56]},AVK=Object.keys(AV);
const names=['background','josh-idle','josh-catch','josh-miss','pint','pint-golden','avoid-dino-bubble'].concat(AVK.map(k=>'avoid-'+k));
names.forEach(n=>{const i=new Image();i.onload=()=>{loaded++;if(loaded===names.length)resize();};i.src='assets/'+n+'@2x.png?v=av1029';IM[n]=i;});
let W=0,H=0,DPR=1,bg=null,S=1,floorY=0;
function resize(){DPR=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*DPR;cv.height=H*DPR;cx.setTransform(DPR,0,0,DPR,0,0);
 S=Math.min(W/390,H/700);buildBg();}
function buildBg(){bg=document.createElement('canvas');bg.width=W*DPR;bg.height=H*DPR;const b=bg.getContext('2d');b.scale(DPR,DPR);
 const im=IM.background;const bs=W/390,bh=844*bs,top=H-bh; // bottom-aligned, cover width
 floorY=H-(844-800)*bs;
 if(!im.complete||!im.naturalWidth){b.fillStyle='#f6d9c0';b.fillRect(0,0,W,H);return;}
 const k=im.naturalWidth/390;
 if(top>0)b.drawImage(im,0,0,im.naturalWidth,2,0,0,W,top+1); // extend sky
 b.drawImage(im,0,0,im.naturalWidth,im.naturalHeight,0,top,W,bh);}
let j={x:200,tx:200,face:'idle',ft:0},items=[],parts=[],score=0,lives=3,t0=0,last=0,state='title',spawnT=0,shake=0;
function reset(){j={x:W/2,tx:W/2,face:'idle',ft:0};items=[];parts=[];score=0;lives=3;t0=performance.now();spawnT=.5;}
const speed=()=>1+((performance.now()-t0)/1000)/45;
function spawn(){const r=Math.random(),k=r<.08?'gold':r<.2?'water':r<.27?AVK[Math.floor(Math.random()*AVK.length)]:'pint';items.push({k,x:30+Math.random()*(W-60),y:-70,v:(H*.12+Math.random()*30)*speed(),r:(Math.random()-.5)*.5});}
const PS=()=>S*0.7, JS=()=>S*1.15;
function drawItem(it,now){const r=it.r*Math.sin(now/200);cx.save();cx.translate(it.x,it.y);cx.rotate(r);const s=PS();
 if(it.k==='pint'||it.k==='gold'){cx.drawImage(IM[it.k==='gold'?'pint-golden':'pint'],-24*s,-32*s,48*s,64*s);}
 else if(it.k==='water'){cx.scale(s,s);cx.fillStyle='#bfe6ffcc';cx.fillRect(-13,-20,26,40);cx.fillStyle='#4fb3e9';cx.fillRect(-13,-2,26,22);cx.strokeStyle='#4A2E3A';cx.lineWidth=2.5;cx.strokeRect(-13,-20,26,40);cx.fillStyle='#fff';cx.font='bold 10px sans-serif';cx.textAlign='center';cx.fillText('H₂O',0,13);}
 else if(AV[it.k]){cx.drawImage(IM['avoid-'+it.k],-24*s,-32*s,48*s,64*s);if(it.k==='dino')cx.drawImage(IM['avoid-dino-bubble'],(-24+20)*s,(-32-38)*s,96*s,40*s);}
 cx.restore();}
function wob(){return Math.sin(performance.now()/300)*.22*Math.min(score/40,1);}
function burst(x,y,col,n){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*240,vy:-Math.random()*240,l:.7,col});}
function pop(text,x,y,col){parts.push({x,y,vx:0,vy:-60,l:1,text,col});}
function mouthPt(){const s=JS(),a=wob(),d=42*s;return{x:j.x+Math.sin(a)*d,y:floorY-Math.cos(a)*d};}
function gulp(it,mp){const cxm=mp.x,cym=mp.y;
 if(it.k==='pint'){score++;j.face='catch';j.ft=.25;burst(cxm,cym,'#E6B53C',8);pop(['Gulp!','Cheers!','Lad!','+1'][score%4],cxm,cym-80,'#fff');navigator.vibrate&&navigator.vibrate(15);}
 else if(it.k==='gold'){score+=5;j.face='catch';j.ft=.35;burst(cxm,cym,'#fff36b',20);pop('+5 GOLDEN!',cxm,cym-80,'#ffe066');}
 else{lives--;shake=.3;j.face='miss';j.ft=.5;burst(cxm,cym,'#4fb3e9',10);pop(it.k==='water'?'Water?! 🤢':['Gooner alert! 🤮','Yuck, Arsenal!','Not the Gunners! 😖'][Math.floor(Math.random()*3)],cxm,cym-80,'#ff9');navigator.vibrate&&navigator.vibrate(80);}}
function mouthRect(){const s=JS(),l=j.x-64*s,t=floorY-124*s;return{x:l+50*s,y:t+70*s,w:28*s,h:24*s};}
function loop(now){const dt=Math.min((now-last)/1000,.05);last=now;
 if(state==='play'){spawnT-=dt;if(spawnT<=0){spawn();spawnT=Math.max(.55,1.6/speed());}
    j.x=j.tx;j.x=Math.max(40,Math.min(W-40,j.x));if(j.ft>0&&(j.ft-=dt)<=0)j.face='idle';
  const s=JS(),ps=PS(),mp=mouthPt(),win=32*s;let near=false;
  for(let i=items.length-1;i>=0;i--){const it=items[i];
   if(it.eat!==undefined){it.eat+=dt;if(it.eat>=.15){items.splice(i,1);gulp(it,mp);if(lives<=0){end();break;}}continue;}
   if(it.dead){it.vy+=900*dt;it.x+=it.vx*dt;it.y+=it.vy*dt;it.r+=dt*6;if(it.y>H+60)items.splice(i,1);continue;}
   it.y+=it.v*dt;let bot=it.y+30*ps,dx=it.x-mp.x;
   if((it.k==='pint'||it.k==='gold')&&Math.abs(dx)<50*s&&bot>mp.y-70*s&&bot<mp.y+20*s){it.x+=(mp.x-it.x)*Math.min(1,dt*8);dx=it.x-mp.x;}
   if(Math.abs(dx)<win*2.5&&bot>mp.y-70*s&&bot<mp.y)near=true;
   if(AV[it.k]){const h=AV[it.k],rx=it.x+(h[0]-24)*ps,ry=it.y+(h[1]-32)*ps,rw=h[2]*ps,rh=h[3]*ps,hx=j.x,hy=floorY-60*s,
     nx=Math.max(rx,Math.min(hx,rx+rw)),ny=Math.max(ry,Math.min(hy,ry+rh));
     if((nx-hx)**2+(ny-hy)**2<(36*s)**2){items.splice(i,1);lives--;shake=.3;j.face='miss';j.ft=.6;burst(hx,hy,'#DB0007',12);
      pop(['Gooner alert! 🤮','Yuck, Arsenal!','Not the Gunners! 😖'][Math.floor(Math.random()*3)],hx,hy-80,'#ff9');navigator.vibrate&&navigator.vibrate(80);if(lives<=0){end();break;}continue;}
     if(it.y>H+60)items.splice(i,1);continue;}
   if(Math.abs(dx)<win&&bot>=mp.y-16*s&&bot<mp.y+20*s){it.eat=0;it.sx=it.x;it.sy=it.y;continue;}
   // head bounce: pint bottom inside head circle (64,64) r36, outside mouth window
   const hx=j.x,hy=floorY-60*s,ddx=it.x-hx,ddy=bot-hy;
   if(Math.abs(dx)>=win&&ddx*ddx+ddy*ddy<(36*s+12*ps)**2&&bot<mp.y){it.dead=1;it.vx=(ddx>=0?1:-1)*(120+Math.random()*80);it.vy=-260;
    if(it.k==='pint'||it.k==='gold'){j.face='miss';j.ft=.3;pop('Bonk!',it.x,hy-60,'#f66');}else pop('Dodged!',it.x,hy-60,'#9f9');continue;}
   if(it.y>H+40){items.splice(i,1);if(it.k==='pint'||it.k==='gold'){lives--;shake=.25;j.face='miss';j.ft=.5;pop('Spilled!',it.x,H-120,'#f66');if(lives<=0){end();break;}}}}
  if(near&&j.face!=='miss'){j.face='catch';j.ft=.12;}}
 for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.x+=p.vx*dt;p.y+=p.vy*dt;if(!p.text)p.vy+=500*dt;p.l-=dt;if(p.l<=0)parts.splice(i,1);}
 draw(now,dt);requestAnimationFrame(loop);}
function txt(t,x,y,size,al,col){cx.font='bold '+size+'px Trebuchet MS';cx.textAlign=al;cx.lineWidth=4;cx.strokeStyle='#4A2E3A';cx.strokeText(t,x,y);cx.fillStyle=col||'#fff';cx.fillText(t,x,y);}
function draw(now,dt){cx.save();if(shake>0){shake-=dt;cx.translate((Math.random()-.5)*10,(Math.random()-.5)*10);}
 if(bg)cx.drawImage(bg,0,0,W,H);
 for(const it of items)if(it.eat===undefined)drawItem(it,now);
 const s=JS(),im=IM['josh-'+j.face];cx.save();cx.translate(j.x,floorY);cx.rotate(wob());if(im.complete)cx.drawImage(im,-64*s,-124*s,128*s,128*s);cx.restore();
 const mp=mouthPt();for(const it of items)if(it.eat!==undefined){const t=Math.min(1,it.eat/.15),ps=PS(),k=1-.8*t;
  cx.save();cx.translate(it.sx+(mp.x-it.sx)*t,it.sy+(mp.y-it.sy)*t);cx.rotate(Math.PI*.85*t);cx.scale(k,k);
  const e={k:it.k,x:0,y:0,r:0};drawItem(e,0);cx.restore();}
 if(window.__dbgMouth){cx.fillStyle='red';cx.fillRect(mp.x-2,mp.y-2,4,4);}
 for(const p of parts){cx.globalAlpha=Math.max(0,p.l);if(p.text)txt(p.text,p.x,p.y,20,'center',p.col);else{cx.fillStyle=p.col;cx.fillRect(p.x,p.y,4,4);}}cx.globalAlpha=1;
 if(state==='play'){txt('🍺 '+score,14,44,28,'left');txt('❤️'.repeat(lives)+'🖤'.repeat(Math.max(0,3-lives)),W-12,44,26,'right');
  const l=score/40;if(l>.25)txt(l>1?'Absolutely steaming 🥴':l>.6?'Proper tipsy 😵':'Merry 😊',W/2,78,16,'center','#E6B53C');}
 cx.restore();}
function setT(x){if(state==='play')j.tx=x;}
cv.addEventListener('pointerdown',e=>setT(e.clientX));
cv.addEventListener('pointermove',e=>{if(e.buttons||e.pointerType==='touch')setT(e.clientX);});
addEventListener('keydown',e=>{if(state!=='play')return;if(e.key==='ArrowLeft')j.tx-=60;if(e.key==='ArrowRight')j.tx+=60;});
const LK='emperorJosh.lb.v1',getLB=()=>{try{return JSON.parse(localStorage.getItem(LK))||[]}catch(e){return[]}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
function lbHTML(){const l=getLB();return l.length?'<div class="lb"><b>🏆 Top 10</b><ol>'+l.map(e=>`<li>${esc(e.n)} — ${e.s}</li>`).join('')+'</ol></div>':'';}
function renderLB(){$('lbT').innerHTML=lbHTML();$('lbO').innerHTML=lbHTML();}
$('save').onclick=()=>{const n=($('nm').value.trim()||'Anon').slice(0,12);try{localStorage.setItem('emperorJosh.name',n);const l=getLB();l.push({n,s:score});l.sort((a,b)=>b.s-a.s);localStorage.setItem(LK,JSON.stringify(l.slice(0,10)));}catch(e){}$('entry').classList.add('hide');renderLB();};
function end(){state='over';$('fs').textContent=score+' 🍺';
 $('msg').textContent=score>=40?'Emperor of the Pub! All hail Josh! 👑':score>=20?'A proper session, lad! 🍻':score>=8?'Warming up nicely 😊':'One-pint wonder 😅';
 $('nm').value=localStorage.getItem('emperorJosh.name')||'';const l=getLB();$('entry').classList.toggle('hide',score<=0||(l.length>=10&&score<=l[9].s));$('toast').textContent='';
 renderLB();$('over').classList.remove('hide');}
function start(){reset();state='play';$('title').classList.add('hide');$('over').classList.add('hide');}
$('play').onclick=start;$('again').onclick=start;
function card(){const c=document.createElement('canvas');c.width=600;c.height=600;const b=c.getContext('2d');
 const g=b.createLinearGradient(0,0,0,600);g.addColorStop(0,'#2b1055');g.addColorStop(1,'#c2553a');b.fillStyle=g;b.fillRect(0,0,600,600);
 b.textAlign='center';b.fillStyle='#E6B53C';b.font='bold 46px Trebuchet MS';b.fillText('Mini Emperor Josh',300,70);
 b.drawImage(IM['josh-catch'],172,100,256,256);b.drawImage(IM.pint,90,240,72,96);b.drawImage(IM['pint-golden'],440,240,72,96);
 b.fillStyle='#fff';b.font='bold 72px Trebuchet MS';b.fillText(score+' pints!',300,450);
 b.font='26px Trebuchet MS';b.fillStyle='#E6B53C';b.fillText("Josh's Stag Do 🍺 Can you beat me?",300,510);b.fillStyle='#fffc';b.font='20px Trebuchet MS';b.fillText('dodadim.github.io/emperor-josh',300,565);return c;}
window.__card=card;window.__setT=x=>setT(x);window.__st=()=>({items,score,lives,state,mp:mouthPt(),jx:j.x});
$('share').onclick=async()=>{const text=`I caught ${score} pints in Mini Emperor Josh! 🍺👑 Can you beat me? ${URL_}`;
 try{const blob=await new Promise(r=>card().toBlob(r,'image/png'));const file=new File([blob],'emperor-josh-score.png',{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text,title:'Mini Emperor Josh'});return;}
  if(navigator.share){await navigator.share({text,title:'Mini Emperor Josh',url:URL_});return;}}catch(e){if(e&&e.name==='AbortError')return;}
 try{await navigator.clipboard.writeText(text);$('toast').textContent='Copied! Paste it in the group chat 🍻';}catch(e){$('toast').textContent=text;}};
addEventListener('resize',resize);resize();reset();renderLB();last=performance.now();requestAnimationFrame(loop);
})();
