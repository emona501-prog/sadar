/* סדר — רשת קודם: כל פתיחה מביאה את הגרסה האחרונה; בלי רשת נפתחת הגרסה השמורה */
const C="sadar-v3";
self.addEventListener("install",e=>{ self.skipWaiting(); });
self.addEventListener("activate",e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(
    fetch(e.request).then(r=>{
      if(r&&(r.ok||r.type==="opaque")){ const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{}); }
      return r;
    }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./")))
  );
});
