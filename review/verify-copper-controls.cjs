const fs=require('fs'),cp=require('child_process'),http=require('http'),assert=require('assert');
const {chromium}=require('C:/Users/cmbel/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const original={};
for(const f of ['index.html','results.html']) {
 original[f]=cp.execFileSync('git',['show','main:'+f],{encoding:'utf8'});
 const scripts=s=>[...s.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].filter(m=>!m[0].includes('data-visual-themes') && !m[0].includes('data-head-to-head')).map(m=>m[1]);
 assert.deepStrictEqual(scripts(fs.readFileSync(f,'utf8')),scripts(original[f]),f+' functional scripts changed');
}
const server=http.createServer((req,res)=>{let path=req.url.split('?')[0];const baseline=path.startsWith('/baseline/');path=path.replace(/^\/baseline\//,'/');const f=path==='/'?'index.html':path.slice(1);if(!fs.existsSync(f)){res.writeHead(404).end();return}res.setHeader('Content-Type',f.endsWith('.html')?'text/html':f.endsWith('.wav')?'audio/wav':'application/octet-stream');res.end(baseline&&original[f]?original[f]:fs.readFileSync(f));});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const root='http://127.0.0.1:'+server.address().port;const browser=await chromium.launch({headless:true,channel:"msedge"});const report=[];
async function run(base,theme){const context=await browser.newContext({viewport:{width:1366,height:900},acceptDownloads:true});const page=await context.newPage();await page.clock.install({time:new Date('2026-10-04T12:00:00Z')});await page.clock.pauseAt(new Date('2026-10-04T12:00:01Z'));const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(root+base+'index.html');if(theme){await page.locator('.appearance summary').click();await page.selectOption('#visualTheme',theme);await page.locator('.appearance summary').click();}
const states=[];async function click(s){await page.locator(s).click();states.push(await page.evaluate(()=>localStorage.getItem('snookerBoardV1')));}
for(let v=1;v<=7;v++){await click('.ball[data-points="'+v+'"]');await click('#submitBtn');}
await click('#p2');for(let v=4;v<=7;v++){await click('[data-foul="'+v+'"]');await click('#submitBtn');await click('#undoBtn');await click('#redoBtn');}
await click('#freeBallBtn');await click('.ball.red');await click('#submitBtn');await click('.ball.blue');await click('#clearPending');await click('#redsMinus');await click('#redsPlus');
await page.locator('.name[data-player="1"]').fill('Craig');await page.locator('.name[data-player="1"]').blur();await click('#resetBtn');await click('#cancelReset');await click('#endFrameBtn');await click('#cancelLog');await click('#endFrameBtn');await click('#confirmLog');
await page.reload();if(theme)assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme);await page.clock.runFor(2000);assert.equal(await page.locator('#frameTimer').textContent(),'00:02');
await click('#fsBtn');await click('#fsBtn');await click('#resetBtn');await click('#confirmReset');
await page.locator('#resultsBtn').click();await page.waitForURL('**/results.html');
if(theme){assert.equal(await page.evaluate(()=>document.documentElement.dataset.theme),theme);await page.screenshot({path:'review/'+theme+'-results.png',fullPage:true});}
for(const tab of ['players','stats','frames'])await page.locator('[data-tab="'+tab+'"]').click();
for(const range of ['today','7d','30d','all'])await page.locator('[data-range="'+range+'"]').click();
await page.fill('#search','Craig');await page.fill('#search','');for(const value of await page.locator('#sort option').evaluateAll(o=>o.map(x=>x.value)))await page.selectOption('#sort',value);
const download=page.waitForEvent('download');await page.click('#exportCsvBtn');const d=await download;const csv=fs.readFileSync(await d.path(),'utf8');await page.click('#copyBtn');await page.click('#shareBtn');await page.locator('#framesBody tr').first().click();
await page.click('#clearBtn');await page.click('#cancelClear');await page.click('#clearBtn');await page.fill('#clearInput','CLEAR');await page.click('#confirmClear');assert.equal(await page.evaluate(()=>localStorage.getItem('snookerLogs')),'[]');await page.click('#backBtn');await page.waitForURL('**/index.html');
if(theme){await page.screenshot({path:'review/'+theme+'.png',fullPage:true});for(const viewport of [{width:844,height:390},{width:390,height:844}]){await page.setViewportSize(viewport);await page.screenshot({path:'review/'+theme+'-'+viewport.width+'.png',fullPage:true});}}
await context.close();return {states,csv,errors};}
const baseline=await run('/baseline/',null);for(const theme of ['copper']){const current=await run('/',theme);assert.deepStrictEqual(current,baseline,theme+' differs from baseline');report.push(theme+': all exercised controls and stored state match baseline');}
report.push('Existing baseline errors: '+JSON.stringify(baseline.errors));fs.writeFileSync('review/verification.txt',report.join('\n'));console.log(report.join('\n'));await browser.close();server.close();})().catch(e=>{console.error(e);server.close();process.exit(1)});


