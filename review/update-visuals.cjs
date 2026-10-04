const fs=require('fs');
const css=fs.readFileSync('review/dramatic.css','utf8');
for(const file of ['index.html','results.html']){
 let html=fs.readFileSync(file,'utf8');
 html=html.replace(/<style data-dramatic-skins>[\s\S]*?<\/style>\s*/g,'');
 html=html.replace('</head>','<style data-dramatic-skins>\n'+css+'\n</style>\n</head>');
 if(file==='index.html'){
  html=html.replace(/<script data-head-to-head>[\s\S]*?<\/script>\s*/g,'');
  if(!html.includes('id="headToHead"'))html=html.replace('  <div class="bottom">','  <section class="headToHead" id="headToHead" aria-label="Recent head-to-head results"></section>\n\n  <div class="bottom">');
  html=html.replace('</body>','<script data-head-to-head>\n'+fs.readFileSync('review/head-to-head.js','utf8')+'\n</script>\n</body>');
 }
 fs.writeFileSync(file,html);
}
