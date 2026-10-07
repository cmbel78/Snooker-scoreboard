const fs=require('fs');
let css=fs.readFileSync('review/dramatic.css','utf8');
if(!css.includes('/* ORBIT:')){css+='\n'+fs.readFileSync('review/orbit.css','utf8');fs.writeFileSync('review/dramatic.css',css);}
for(const file of ['index.html','results.html']){let html=fs.readFileSync(file,'utf8');html=html.replace("'club', 'copper']","'club', 'copper', 'orbit']");if(!html.includes('<option value="orbit">'))html=html.replace('<option value="copper">COPPER</option>','<option value="copper">COPPER</option><option value="orbit">ORBIT</option>');fs.writeFileSync(file,html);}
