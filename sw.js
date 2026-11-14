// Keeps the viewer working offline. Change VERSION whenever the site files change.
const VERSION='campus-v4';
const FILES=["./", "index.html", "data/graph.json", "data/outdoor.json", "floors/OUT.jpg", "fonts/manrope.woff2", "floors/A_1.png", "floors/A_2.png", "floors/A_G.png", "floors/B_1.png", "floors/B_2.png", "floors/B_G.png", "floors/B_RG.png", "floors/C_1.png", "floors/C_2.png", "floors/C_G.png", "floors/D_1.png", "floors/D_2.png", "floors/D_3.png", "floors/D_G.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==VERSION).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Show the saved copy at once, and refresh it from the network in the background.
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==location.origin||u.pathname.endsWith('editor.html'))return;
 e.respondWith(caches.open(VERSION).then(c=>c.match(e.request,{ignoreSearch:true}).then(hit=>{
  const net=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r});
  if(hit){net.catch(()=>{});return hit}
  return net;
 })));
});
