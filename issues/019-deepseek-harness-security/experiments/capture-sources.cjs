const fs = require('fs');
const path = require('path');
const {chromium} = require('C:/Users/Joy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root=path.resolve(__dirname,'..');
for(const dir of ['assets','platforms'])fs.mkdirSync(path.join(root,dir),{recursive:true});
const sources=[
 {url:'https://www.deepseek.com/harness/', shots:[['01-official','','body',850]]},
 {url:'https://github.com/zzszmyf/dsh-security-pocs/blob/main/WRITEUP.md',shots:[
 ['02-config','1. PoC V1:','h2',1020],['03-readonly','2. PoC V2:','h2',760],
 ['04-vm','3. PoC V4:','h2',850],['05-process','4. PoC V4b','h2',670],
 ['06-chain','The end-to-end attack chain','h3',760]]},
 {url:'https://github.com/ChaoMixian/dsh2shell',shots:[['07-rpc','Principle:','p',380]]},
 {url:'https://matrix.tencent.com/zh/2026/08/20/deepseek-harness-agent-injection-risk',shots:[
 ['08-assessment','A.I.G 红队实测','h1',690],
 ['09-overall','4.1 总体结果','h3',780],
 ['10-channels','4.3 关键发现二','h3',1050],
 ['11-output-actions','4.6 关键发现五','h3',520]]},
 {url:'https://github.com/deepseek-ai/deepseek-harness/blob/master/SAFETY.zh.md',shots:[['12-safety','安全','h1',750]]},
 {url:'https://arxiv.org/html/2608.16393v1',shots:[['13-paper','Evaluating DeepSeek Harness','h1',750]]}
];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const manifest=[];
 for(const source of sources){
  const page=await browser.newPage({viewport:{width:1280,height:1080},deviceScaleFactor:1.5,javaScriptEnabled:!source.url.includes('www.deepseek.com')});
  try{
   await page.goto(source.url,{waitUntil:'domcontentloaded',timeout:55000});
   await page.waitForTimeout(1800);
   for(const [name,text,tag,height] of source.shots){
    const heading=page.locator(tag).filter({hasText:text}).last();
    await heading.waitFor({timeout:12000});
    await heading.scrollIntoViewIfNeeded();
    const rect=await heading.boundingBox();
    const article=page.locator('.markdown-body').last();
    let x=40,width=1200;
    if(await article.count()){
     const box=await article.boundingBox();x=Math.max(0,Math.floor(box.x-12));width=Math.min(1280-x,Math.ceil(box.width+24));
    }else{
     const box=await heading.boundingBox();x=Math.max(20,Math.floor(box.x-16));width=Math.min(1280-x-20,1050);
    }
    if(tag==='body'){x=0;width=1280;}
    const targetY=tag==='body'?0:Math.max(0,Math.floor(rect.y+await page.evaluate(()=>scrollY)-120));
    await page.evaluate(y=>scrollTo(0,y),targetY);
    await page.waitForTimeout(300);
    const top=await page.evaluate(()=>scrollY);
    const file=path.join(root,'assets',name+'.png');
    await page.screenshot({path:file,clip:{x,y:0,width,height:Math.min(height,await page.evaluate(()=>document.documentElement.scrollHeight)-top)}});
    manifest.push({name,url:source.url,title:await page.title(),file:'assets/'+name+'.png',capturedAt:new Date().toISOString()});
    console.log('CAPTURED '+name);
   }
  }catch(e){console.log('FAILED '+source.url+' '+e.message);manifest.push({url:source.url,error:e.message});}
  await page.close();
 }
 fs.writeFileSync(path.join(root,'experiments','screenshots.json'),JSON.stringify(manifest,null,2));
 await browser.close();
})();
