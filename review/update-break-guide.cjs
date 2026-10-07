const fs=require('fs');let html=fs.readFileSync('index.html','utf8');
html=html.replace(/<style data-break-guide>[\s\S]*?<\/style>\s*/g,'').replace(/<script data-break-guide>[\s\S]*?<\/script>\s*/g,'');
html=html.replace('</head>','<style data-break-guide>\n'+fs.readFileSync('review/break-guide.css','utf8').replace(/\r\n/g,'\n')+'\n</style>\n</head>');
html=html.replace('</body>','<script data-break-guide>\n'+fs.readFileSync('review/break-guide.js','utf8').replace(/\r\n/g,'\n')+'\n</script>\n</body>');fs.writeFileSync('index.html',html);
