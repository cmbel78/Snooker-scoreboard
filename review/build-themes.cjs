const fs = require('fs');
if (fs.readFileSync('index.html','utf8').includes('data-visual-themes')) {
  throw new Error('Theme blocks already exist. Edit their CSS directly in both pages; do not append duplicate blocks.');
}
const css = `
/* Visual skins only. Classic deliberately inherits every original rule. */
.appearance { position:relative; align-self:center; margin:0 14px 4px; color:var(--muted); font-size:13px; }
.appearance summary { cursor:pointer; padding:12px 16px; min-height:44px; text-align:center; }
.appearance label { display:flex; align-items:center; gap:12px; padding:8px 12px; }
.appearance select { min-height:44px; background:var(--panel); color:var(--fg); border:1px solid var(--muted); border-radius:8px; padding:8px 12px; font:inherit; }
.appearance :focus-visible { outline:2px solid var(--fg); outline-offset:3px; }
html[data-theme="broadcast"] { --bg:#0b1019; --fg:#f5f7fb; --muted:#acb8ca; --panel:#182231; --panel2:#182231; --outline:#71b9ff; --primary:#246bb0; --accent:#71b9ff; --skin-border:#334257; --skin-button:#202e40; --skin-radius:4px; --skin-shadow:none; --gold:#d7e8ff; --winGrad1:#101c2c; --winGrad2:#101c2c; }
html[data-theme="oled"] { --bg:#000; --fg:#fff; --muted:#b9b9b9; --panel:#000; --panel2:#000; --outline:#fff; --primary:#175da7; --accent:#8dc7ff; --skin-border:#343434; --skin-button:#0b0b0b; --skin-radius:2px; --skin-shadow:none; --gold:#fff; --winGrad1:#000; --winGrad2:#000; }
html[data-theme="club"] { --bg:#101715; --fg:#f0f4f1; --muted:#a8bbb1; --panel:#22332b; --panel2:#18241f; --outline:#65c39a; --primary:#236b50; --accent:#65c39a; --skin-border:#395447; --skin-button:#243a2e; --skin-radius:14px; --skin-shadow:0 8px 24px #0004; --gold:#d9c995; --winGrad1:#14271e; --winGrad2:#0f1814; }
html[data-theme]:not([data-theme="classic"]) .player { border-radius:var(--skin-radius); box-shadow:var(--skin-shadow); border-bottom:2px solid var(--skin-border); }
html[data-theme]:not([data-theme="classic"]) .player.selected { border-bottom-color:var(--outline); }
html[data-theme]:not([data-theme="classic"]) .selected .score { outline:2px solid var(--outline); border-radius:var(--skin-radius); }
html[data-theme]:not([data-theme="classic"]) .score { font-variant-numeric:tabular-nums; letter-spacing:-.035em; }
html[data-theme]:not([data-theme="classic"]) :is(.statCard,.card,.stat,.modal) { background:linear-gradient(var(--panel),var(--panel2)); border-color:var(--skin-border); border-radius:var(--skin-radius); box-shadow:var(--skin-shadow); }
html[data-theme]:not([data-theme="classic"]) :is(.undoBtn,.redoBtn,.resetBtn,.resultsBtn,.btn,.pending button,.tab) { background:var(--skin-button); border-color:var(--skin-border); color:var(--fg); border-radius:var(--skin-radius); }
html[data-theme]:not([data-theme="classic"]) :is(.logBtn,.submit,.btn.primary) { background:var(--primary); border-color:var(--primary); color:#fff; border-radius:var(--skin-radius); }
html[data-theme]:not([data-theme="classic"]) :is(.chip,.statCard.compact .chip,.pending .icons,.foulBadge,.badge,.pill) { background:var(--panel); border-color:var(--skin-border); color:var(--fg); }
html[data-theme]:not([data-theme="classic"]) :is(.chip button,.statCard.compact .chip button) { color:var(--fg); border-color:var(--skin-border); }
html[data-theme]:not([data-theme="classic"]) .pending { color:var(--muted); }
html[data-theme]:not([data-theme="classic"]) .freeBallBtn { background:var(--panel); color:var(--outline); border-color:var(--outline); }
html[data-theme]:not([data-theme="classic"]) .freeBallBtn.armed { background:var(--skin-button); box-shadow:0 0 0 4px var(--skin-border); }
html[data-theme]:not([data-theme="classic"]) .ball { border-color:var(--skin-border); color:#fff; text-shadow:0 1px 3px #000; }
html[data-theme]:not([data-theme="classic"]) :is(.ball.yellow,.ball.pink) { color:#111; text-shadow:none; }
html[data-theme]:not([data-theme="classic"]) .ball.black { border-color:var(--muted); }
html[data-theme="club"] .ball { box-shadow:inset 0 6px 12px #ffffff18,0 5px 12px #0005; }
html[data-theme="oled"] .player { border-bottom-color:transparent; }
html[data-theme="oled"] .score { font-size:clamp(56px,10vw,120px); font-weight:700; }
html[data-theme="oled"] .statCard { border-color:transparent; }
html[data-theme]:not([data-theme="classic"]) .modal p { color:var(--muted); }
html[data-theme]:not([data-theme="classic"]) #winnerOverlay { background:linear-gradient(135deg,var(--winGrad1),var(--winGrad2)); }
html[data-theme]:not([data-theme="classic"]) .overlayTitle { background:none; color:var(--fg); filter:none; }
html[data-theme]:not([data-theme="classic"]) .overlayHint { color:var(--muted); }
html[data-theme]:not([data-theme="classic"]) :is(input[type="text"],select) { background:var(--panel2); color:var(--fg); border-color:var(--skin-border); }
html[data-theme]:not([data-theme="classic"]) .tab.active { border-color:var(--outline); color:var(--fg); background:var(--panel); }
html[data-theme]:not([data-theme="classic"]) :is(th,td,.footer) { border-color:var(--skin-border); }
html[data-theme]:not([data-theme="classic"]) :is(.small,.muted,th,.stat h4,.footer) { color:var(--muted); }
html[data-theme]:not([data-theme="classic"]) tr:hover { background:var(--panel); }
html[data-theme]:not([data-theme="classic"]) .btn.danger { background:#2a1010; border-color:#804040; }
@media(max-width:600px) {
  #app .middle { grid-template-columns:1fr; }
  #app .ballRow { grid-template-columns:repeat(4,minmax(0,1fr)); }
  #app .submit { grid-column:auto; min-height:72px; }
  #app .statCard .controls { justify-content:center; flex-wrap:wrap; }
}
`;
const script = `<script data-visual-themes>
// Independent preference only: never reads or writes scoreboard state or logs.
(() => {
  const key = 'snookerVisualTheme';
  const themes = ['classic', 'broadcast', 'oled', 'club'];
  let theme = 'classic';
  try { const stored = localStorage.getItem(key); if (themes.includes(stored)) theme = stored; } catch (_) {}
  document.documentElement.dataset.theme = theme;
  document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('visualTheme');
    if (!selector) return;
    selector.value = theme;
    selector.addEventListener('change', () => {
      if (!themes.includes(selector.value)) return;
      document.documentElement.dataset.theme = selector.value;
      try { localStorage.setItem(key, selector.value); } catch (_) {}
    });
  });
})();
</script>`;
const menu = `<details class="appearance"><summary>Appearance</summary><label for="visualTheme">Theme <select id="visualTheme"><option value="classic">CLASSIC</option><option value="broadcast">BROADCAST</option><option value="oled">OLED</option><option value="club">CLUB</option></select></label></details>`;
for (const file of ['index.html','results.html']) {
  let html = fs.readFileSync(file,'utf8');
  html = html.replace('</head>', `<style data-visual-themes>${css}</style>\n${script}\n</head>`);
  html = file === 'index.html' ? html.replace('  <div class="middle">', `  ${menu}\n\n  <div class="middle">`) : html.replace('    <div class="wrap">', `    ${menu}\n    <div class="wrap">`);
  if (file === 'results.html' && !html.includes('id="visualTheme"')) html = html.replace('<body>', `<body>\n${menu}`);
  fs.writeFileSync(file,html);
}
