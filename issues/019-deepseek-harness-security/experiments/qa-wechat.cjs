const fs=require('fs');
const path=require('path');
const {chromium}=require('C:/Users/Joy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/Joy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const checks=[];
 for(const width of [390,1280]){
  const page=await browser.newPage({viewport:{width,height:950},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('file:///'+path.join(root,'platforms','wechat.html').replaceAll('\\','/'),{waitUntil:'load'});
  const data=await page.evaluate(()=>({
   title:document.title,sections:document.querySelectorAll('#wx-body h2').length,
   images:[...document.querySelectorAll('#wx-body img')].map(i=>({alt:i.alt,ok:i.complete&&i.naturalWidth>0,embedded:i.src.startsWith('data:')})),
   sources:[...document.querySelectorAll('#wx-body p')].filter(p=>p.textContent.startsWith('来源：https://')).length,
   horizontalOverflow:document.documentElement.scrollWidth>innerWidth,
   styleTags:document.querySelectorAll('style').length,
   outsideTools:!document.querySelector('#wx-body #copy-btn')&&document.querySelector('aside').parentNode===document.body,
   paragraphCount:document.querySelectorAll('#wx-body p').length,
   ending:document.querySelector('#wx-body').innerText.includes('— 完 —')
  }));
  await page.screenshot({path:path.join(root,'assets',`preview-${width}-opening.png`)});
  const target=page.locator('#wx-body h2').filter({hasText:'第四项'});
  await target.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'assets',`preview-${width}-attack.png`)});
  const evalTarget=page.locator('#wx-body h2').filter({hasText:'腾讯朱雀'});
  await evalTarget.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(root,'assets',`preview-${width}-assessment.png`)});
  await page.locator('#copy-btn').click();
  const copyButtonText=await page.locator('#copy-btn').innerText();
  checks.push({width,...data,copyButtonText,errors});await page.close();
 }
 const names=fs.readdirSync(path.join(root,'assets')).filter(n=>/^\d\d-/.test(n)&&n.endsWith('.png'));
 const cells=[];
 for(let i=0;i<names.length;i++){
  const tile=await sharp(path.join(root,'assets',names[i])).resize({width:300,height:250,fit:'contain',background:'#eee'}).png().toBuffer();
  cells.push({input:tile,left:(i%4)*300,top:Math.floor(i/4)*250});
 }
 await sharp({create:{width:1200,height:Math.ceil(names.length/4)*250,channels:3,background:'#ddd'}}).composite(cells).png().toFile(path.join(root,'assets','source-contact-sheet.png'));
 const ok=checks.every(c=>!c.horizontalOverflow&&!c.errors.length&&c.sections===12&&c.images.length===13&&c.sources===13&&c.images.every(i=>i.ok&&i.embedded)&&c.outsideTools&&c.ending);
 fs.writeFileSync(path.join(root,'experiments','qa-results.json'),JSON.stringify({ok,checks},null,2));
 console.log(JSON.stringify({ok,checks},null,2));
 await browser.close();if(!ok)process.exitCode=1;
})();
