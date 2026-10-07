const fs=require('fs');
let css=fs.readFileSync('review/dramatic.css','utf8').replace(/\r\n/g,'\n');
const selector='html:is([data-theme="oled"],[data-theme="club"])';
const compact=css.slice(css.indexOf('html[data-theme="broadcast"] .players {gap:12px'),css.indexOf('@media(max-width:1100px)'));
const density=css.slice(css.indexOf('/* Broadcast density'),css.indexOf('html[data-theme] .appearance summary'));
const classic=`
/* Tablet skin sizing: Classic uses the space saved by hiding head-to-head. */
html[data-theme="classic"] #app {height:100dvh;}
html[data-theme="classic"] .player {min-height:clamp(100px,23dvh,200px);padding:12px 18px;}
html[data-theme="classic"] .player .score {font-size:clamp(60px,13dvh,120px);}
html[data-theme="classic"] .player .name {font-size:clamp(20px,3vw,30px);}
html[data-theme="classic"] .ball {position:relative;isolation:isolate;width:min(100%,clamp(80px,22dvh,160px));border:1px solid #ffffff40;background-image:radial-gradient(ellipse at 30% 22%,#ffffffe8 0%,#ffffff75 4%,#ffffff12 13%,transparent 23%),radial-gradient(circle at 35% 28%,transparent 25%,#0003 62%,#000b 100%);box-shadow:inset -9px -13px 20px #0007,inset 3px 4px 12px #ffffff36,0 12px 16px -5px #000c;color:#fff;text-shadow:0 2px 4px #000a;}
html[data-theme="classic"] .ball::after {content:"";position:absolute;inset:8% 16% 57% 16%;border-top:2px solid #ffffff42;border-radius:50%;transform:rotate(-28deg);pointer-events:none;}
html[data-theme="classic"] :is(.ball.yellow,.ball.pink){color:#111;text-shadow:none;}
html[data-theme="classic"] .ball.black{background-color:#10151b;border-color:#77838e;}
`;
css+='\n/* OLED and Club share the proven Broadcast layout dimensions. */\n'+compact.replaceAll('html[data-theme="broadcast"]',selector)+density.replaceAll('html[data-theme="broadcast"]',selector)+classic;
fs.writeFileSync('review/dramatic.css',css);
