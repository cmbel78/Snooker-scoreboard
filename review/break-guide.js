// Companion visual record only; original scoring scripts and state schema are untouched.
(() => {
 const key = 'snookerBreakVisualsV1';
 const colours = ['','red','yellow','green','brown','blue','pink','black'];
 const names = ['','Red','Yellow','Green','Brown','Blue','Pink','Black'];
 let visuals = {frame:null, visits:{}};
 function board(){try{return JSON.parse(localStorage.getItem('snookerBoardV1')||'null');}catch(_){return null;}}
 try {const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved&&saved.visits&&typeof saved.visits==='object')visuals=saved;}catch(_){}
 function syncFrame(state){if(visuals.frame!==state.frameStartedAt)visuals={frame:state.frameStartedAt,visits:{}};}
 function persist(){try{localStorage.setItem(key,JSON.stringify(visuals));}catch(_){} }
 function render(){
  const state=board();if(!state)return;syncFrame(state);
  [1,2].forEach(p=>{
   const wrap=document.getElementById('breakGuide'+p);if(!wrap)return;
   wrap.replaceChildren();const high=Number(state.highBreak?.[p])||0;wrap.hidden=high===0;if(!high)return;
   // Each Submit ends a break in the existing scorer. Match its existing high-break total.
   const visit=(state.history||[]).find(h=>h.type==='pots'&&h.player===p&&h.amount===high&&visuals.visits[JSON.stringify(h)]);
   const sequence=visit&&visuals.visits[JSON.stringify(visit)];
   if(!Array.isArray(sequence)||!sequence.every(b=>b&&Number.isInteger(b.points)&&b.points>=1&&b.points<=7)||sequence.reduce((sum,b)=>sum+b.points,0)!==high){wrap.textContent='Ball guide available for new breaks';wrap.classList.add('unavailable');return;}
   wrap.classList.remove('unavailable');wrap.setAttribute('aria-label','Highest break '+high+': '+sequence.map(b=>names[b.points]+(b.free?' (free ball)':'')).join(', '));
   sequence.forEach(b=>{const ball=document.createElement('span');ball.className='breakBall '+colours[b.points]+(b.free?' breakFree':'');ball.title=names[b.points]+' · '+b.points+' point'+(b.points===1?'':'s')+(b.free?' · Free ball':'');ball.setAttribute('aria-hidden','true');wrap.append(ball);});
  });
 }
 document.addEventListener('DOMContentLoaded',()=>{
  [1,2].forEach(p=>{const guide=document.createElement('div');guide.id='breakGuide'+p;guide.className='breakGuide';guide.hidden=true;document.getElementById('p'+p).append(guide);});
  let candidate=null;
  document.getElementById('submitBtn').addEventListener('click',()=>{
   const state=board();const tray=document.getElementById('pendingIcons');
   const sequence=Array.from(tray.children).map(el=>({points:colours.findIndex(c=>c&&el.classList.contains(c)),free:!!el.style.outline}));
   candidate=state&&Number(document.getElementById('pendingAmount').textContent)>0&&document.getElementById('foulBadge').style.display==='none'&&sequence.length&&sequence.every(b=>b.points>=1&&b.points<=7)?{frame:state.frameStartedAt,length:(state.history||[]).length,sequence}:null;
  },true);
  // Document bubbling runs after the existing button actions have saved their state.
  document.addEventListener('click',e=>{
   if(e.target.closest('#submitBtn')&&candidate){const state=board();if(state&&state.frameStartedAt===candidate.frame&&(state.history||[]).length===candidate.length+1){syncFrame(state);const visit=state.history.at(-1);if(visit.type==='pots'&&visit.amount===candidate.sequence.reduce((sum,b)=>sum+b.points,0)){visuals.visits[JSON.stringify(visit)]=candidate.sequence;persist();}}candidate=null;}
   render();persist();
  });
  window.addEventListener('storage',()=>{try{const value=JSON.parse(localStorage.getItem(key)||'null');if(value?.visits)visuals=value;}catch(_){}render();});
  render();
 });
})();
