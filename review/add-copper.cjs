const fs=require('fs');
let css=fs.readFileSync('review/dramatic.css','utf8');
if(!css.includes('/* COPPER:')){
 css=css.replaceAll('html:is([data-theme="oled"],[data-theme="club"])','html:is([data-theme="oled"],[data-theme="club"],[data-theme="copper"])');
 css+='\n'+fs.readFileSync('review/copper.css','utf8');fs.writeFileSync('review/dramatic.css',css);
}
for(const file of ['index.html','results.html']){
 let html=fs.readFileSync(file,'utf8');html=html.replace("['classic', 'broadcast', 'oled', 'club']","['classic', 'broadcast', 'oled', 'club', 'copper']");
 if(!html.includes('<option value="copper">'))html=html.replace('<option value="club">CLUB</option>','<option value="club">CLUB</option><option value="copper">COPPER</option>');fs.writeFileSync(file,html);
}
