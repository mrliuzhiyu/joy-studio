const fs=require('fs');
const path=require('path');
const sharp=require('C:/Users/Joy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root=path.resolve(__dirname,'..');
const font="Optima-Regular,PingFangTC-light,'PingFang SC','Hiragino Sans GB',sans-serif";
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline=s=>esc(s).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>');
const para=s=>`<p style="margin:0 8px 32px;line-height:1.75em;letter-spacing:0.578px;"><span style="font-family:${font};font-size:16px;letter-spacing:0.5px;color:rgb(34,34,34);">${inline(s)}</span></p>`;
(async()=>{
 const raw=fs.readFileSync(path.join(root,'draft.md'),'utf8');
 const blocks=raw.trim().split(/\r?\n\s*\r?\n/);
 const out=[],downloads=[];
 let title='';
 for(let i=0;i<blocks.length;i++){
  const block=blocks[i].trim();
  if(block.startsWith('# ')){
   title=block.slice(2);
   out.push(`<h1 style="margin:0 8px 24px;font-size:24px;line-height:1.5;letter-spacing:0.578px;color:#000;font-weight:700;"><span style="font-family:${font};letter-spacing:0.5px;">${esc(title)}</span></h1>`);
  }else if(block.startsWith('## ')){
   const m=block.match(/^## (\d+)｜(.+)$/);
   if(!m)throw new Error('Bad heading '+block);
   out.push(`<section style="padding:3px;display:inline-block;border-top:6px solid #000;margin:40px 8px 8px;"><p style="margin:0;"><span style="font-size:36px;font-weight:700;font-family:Futura-Medium,Futura,'Helvetica Neue',Arial,sans-serif;line-height:1.1;">${m[1]}</span></p></section><h2 style="margin:0 8px 32px;line-height:1.5;font-size:24px;letter-spacing:0.578px;color:#000;font-family:${font};">${esc(m[2])}</h2>`);
  }else if(block.startsWith('![')){
   const m=block.match(/^!\[(.*?)\]\((.*?)\)$/);
   const imgPath=path.resolve(root,m[2]);
   const buf=fs.readFileSync(imgPath),meta=await sharp(buf).metadata();
   const data='data:image/png;base64,'+buf.toString('base64');
   const id='figure-'+downloads.length;
   const source=blocks[i+1]?.trim();
   if(!source?.startsWith('来源：https://'))throw new Error('Missing source '+m[2]);
   i++;
   out.push(`<figure style="margin:0 8px 8px;"><img id="${id}" src="${data}" width="${meta.width}" height="${meta.height}" alt="${esc(m[1])}" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto;" /></figure><p style="margin:0 8px 8px;line-height:1.75em;text-align:center;font-size:12px;color:rgb(150,150,150);font-family:${font};">${esc(m[1])}</p><p style="margin:0 8px 32px;line-height:1.65;font-size:11px;color:rgb(120,120,120);overflow-wrap:anywhere;word-break:break-all;"><span style="font-family:Consolas,monospace;">${esc(source)}</span></p>`);
   downloads.push({id,data,name:path.basename(imgPath),caption:m[1],source:source.slice('来源：'.length)});
  }else if(block.startsWith('```text')){
   const text=block.replace(/^```text\n/,'').replace(/\n```$/,'');
   out.push(`<pre style="margin:0 8px 32px;padding:16px 10px;border-top:1px solid #ddd;border-bottom:1px solid #ddd;font-family:Consolas,'Microsoft YaHei',monospace;font-size:13px;line-height:1.9;white-space:pre-wrap;word-break:break-word;color:#222;">${esc(text)}</pre>`);
  }else{
   // Keep each complete sentence in its own mobile paragraph; do not split commas.
   const sentences=block.match(/[^。！？]+[。！？]?/g)||[block];
   for(const s of sentences)if(s.trim())out.push(para(s.trim()));
  }
 }
 out.push(`<p style="margin:48px 8px 12px;text-align:center;font-size:12px;color:#aaa;">— 完 —</p><p style="margin:0 8px 32px;text-align:center;font-size:12px;color:#999;">#DeepSeekHarness　#AI安全　#智能体</p>`);
 const button="padding:8px 12px;border:1px solid #111;border-radius:4px;font-size:12px;cursor:pointer;text-decoration:none;display:inline-block;";
 const downloadRows=downloads.map(d=>`<section style="padding:16px 0;border-bottom:1px solid #eee;"><p style="font-size:13px;line-height:1.6;margin:0 0 10px;">${esc(d.caption)}</p><button onclick="copyImage('${d.id}',this)" style="${button}background:#111;color:#fff;">复制图片</button> <a href="${d.data}" download="${d.name}" style="${button}background:white;color:#111;">下载 PNG</a> <a href="${esc(d.source)}" target="_blank" rel="noreferrer" style="${button}background:white;color:#111;">原网页</a></section>`).join('\n');
 const html=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;background:#f2f2f2;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Helvetica Neue','PingFang SC','Microsoft YaHei',Arial,sans-serif;">
<div style="height:72px;"></div>
<button id="copy-btn" onclick="copyWxArticle()" style="position:fixed;top:16px;right:20px;padding:10px 18px;background:#111;color:white;border:0;border-radius:999px;cursor:pointer;font-size:13px;font-weight:600;z-index:999;">复制正文（无白边）</button>
<article id="wx-body" style="max-width:677px;margin:0 auto;background:white;padding:40px 24px 60px;box-sizing:border-box;">
${out.join('\n')}
</article>
<aside style="max-width:677px;margin:0 auto;padding:28px 24px 60px;box-sizing:border-box;background:#fff;border-top:1px solid #e6e6e6;">
<h2 style="font-size:18px;margin:0 0 16px;">本文配图</h2><p style="font-size:13px;color:#666;line-height:1.8;">复制正文后可粘贴到公众号编辑器。图片已嵌入此文件；如需单独上传，可在下方下载原图。这一区不参与正文复制。</p>
${downloadRows}
</aside>
<script>
function notice(btn,text){var old=btn.textContent;btn.textContent=text;setTimeout(function(){btn.textContent=old},2200)}
function copyWxArticle(){var r=document.createRange();r.selectNodeContents(document.getElementById('wx-body'));var s=getSelection();s.removeAllRanges();s.addRange(r);var ok=false;try{ok=document.execCommand('copy')}catch(e){}s.removeAllRanges();notice(document.getElementById('copy-btn'),ok?'正文已复制':'请选中正文复制')}
async function copyImage(id,btn){if(!window.isSecureContext||!navigator.clipboard||!window.ClipboardItem){notice(btn,'请使用下载 PNG');return}try{var img=document.getElementById(id);var c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);var blob=await new Promise(function(resolve){c.toBlob(resolve,'image/png')});await navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);notice(btn,'图片已复制')}catch(e){notice(btn,'请使用下载 PNG')}}
</script></body></html>`;
 fs.writeFileSync(path.join(root,'platforms','wechat.html'),html);
 console.log(JSON.stringify({title,bodyCharacters:raw.length,images:downloads.length,htmlBytes:Buffer.byteLength(html)},null,2));
})();
