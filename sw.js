(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.0.0-alpha.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.0.0-alpha.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.0.0-alpha.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.0.0-alpha.2"]&&_()}catch(e){}}},t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={exports:{}};return e[n](a,a.exports,s),a.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const n=new Set;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||r(a.precache),o=e=>e||r(a.runtime);function c(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}let h;class l{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let s=!1;setTimeout((()=>{s=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",((i,o)=>{const c=i.objectStore(e),h=t?c.index(t):c,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(r?e:e.value),a&&l.length>=a?o(l):e.continue()):o(l)}}))}async transaction(e,t,s){return await this.open(),await new Promise(((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,(e=>n(e)))}))}async _call(e,t,s,...n){return await this.transaction([t],s,((s,a)=>{const r=s.objectStore(t),i=r[e].apply(r,n);i.onsuccess=()=>a(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}l.prototype.OPEN_TIMEOUT=2e3;const u={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(u))for(const s of t)s in IDBObjectStore.prototype&&(l.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});class d{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function f(e,t){const s=t();return e.waitUntil(s),s}async function p(e,s){let n=null;if(e.url){n=new URL(e.url).origin}if(n!==self.location.origin)throw new t("cross-origin-copy-response",{origin:n});const a=e.clone(),r={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},i=s?s(r):r,o=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?a.body:await a.blob();return new Response(o,i)}s(80);const y=e=>e&&"object"==typeof e?e:{handle:e};class g{constructor(e,t,s="GET"){this.handler=y(t),this.match=e,this.method=s}}class w extends g{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class m{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const n=s.origin===location.origin,{params:a,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:n,url:s});let i=r&&r.handler;const o=e.method;if(!i&&this._defaultHandlerMap.has(o)&&(i=this._defaultHandlerMap.get(o)),!i)return void 0;let c;try{c=i.handle({url:s,request:e,event:t,params:a})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this._catchHandler&&(c=c.catch((n=>this._catchHandler.handle({url:s,request:e,event:t})))),c}findMatchingRoute({url:e,sameOrigin:t,request:s,event:n}){const a=this._routes.get(s.method)||[];for(const r of a){let a;const i=r.match({url:e,sameOrigin:t,request:s,event:n});if(i)return a=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(a=void 0),{route:r,params:a}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,y(e))}setCatchHandler(e){this._catchHandler=y(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let _;s(977);function v(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}class R{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class b{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}s(873);function C(e){return"string"==typeof e?new Request(e):e}class U{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new d,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}fetch(e){return this.waitUntil((async()=>{const{event:s}=this;let n=C(e);if("navigate"===n.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))n=await e({request:n.clone(),event:s})}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=n.clone();try{let e;e=await fetch(n,"navigate"===n.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw a&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:a.clone(),request:r.clone()}),e}})())}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}cacheMatch(e){return this.waitUntil((async()=>{const t=C(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i={...a,cacheName:n};s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s})())}async cachePut(e,s){const a=C(e);var r;await(r=0,new Promise((e=>setTimeout(e,r))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(o=i.url,new URL(String(o),location.href).href.replace(new RegExp("^"+location.origin),""))});var o;const h=await this._ensureResponseSafeToCache(s);if(!h)return void 0;const{cacheName:l,matchOptions:u}=this._strategy,d=await self.caches.open(l),f=this.hasCallback("cacheDidUpdate"),p=f?await async function(e,t,s,n){const a=c(t.url,s);if(t.url===a)return e.match(t,n);const r={...n,ignoreSearch:!0},i=await e.keys(t,r);for(const t of i)if(a===c(t.url,s))return e.match(t,n)}(d,i.clone(),["__WB_REVISION__"],u):null;try{await d.put(i,f?h.clone():h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of n)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:l,oldResponse:p,newResponse:h.clone(),request:i,event:this.event})}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=C(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a={...n,state:s};return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}const L={cacheWillUpdate:async({response:e})=>e.redirected?await p(e):e};class q extends class{constructor(e={}){this.cacheName=o(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new U(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(e,s,n){await e.runCallbacks("handlerWillStart",{event:n,request:s});let a=void 0;try{if(a=await this._handle(s,e),!a||"error"===a.type)throw new t("no-response",{url:s.url})}catch(t){for(const r of e.iterateCallbacks("handlerDidError"))if(a=await r({error:t,event:n,request:s}),a)break;if(!a)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))a=await t({event:n,request:s,response:a});return a}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(e){r=e}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(L)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let n;if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return n=await s.fetch(e),n}async _handleInstall(e,s){const n=await s.fetchAndCachePut(e);let a=Boolean(n);if(n&&n.status>=400&&!this._usesCustomCacheableResponseLogic()&&(a=!1),!a)throw new t("bad-precaching-response",{url:e.url,status:n.status});return n}_usesCustomCacheableResponseLogic(){return this.plugins.some((e=>e.cacheWillUpdate&&e!==L))}}class T{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new q({cacheName:i(e),plugins:[...t,new b({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=v(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return f(e,(async()=>{const t=new R;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const n=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:n,cache:a,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return f(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params={cacheKey:s,...t.params},this.strategy.handle(t))}}let k;const K=()=>(k||(k=new T),k);class x extends g{constructor(e,t){super((({request:s})=>{const n=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=n.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}function N(e){const s=K();!function(e,s,n){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new g((({url:e})=>e.href===t.href),s,n)}else if(e instanceof RegExp)a=new w(e,s,n);else if("function"==typeof e)a=new g(e,s,n);else{if(!(e instanceof g))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}(_||(_=new m,_.addFetchListener(),_.addCacheListener()),_).registerRoute(a)}(new x(s,e))}function E(e,t){!function(e){K().precache(e)}(e),N(t)}var A,M,O=[{'revision':'cbd5b20fde23b87ee89f90da0ec8f522','url':'/app-1d060c291026b5a3e770.js'},{'revision':'3e2bcc909160126c87fd584175f70e3c','url':'/app-1d060c291026b5a3e770.js.LICENSE.txt'},{'revision':'35dc9571951506279b798b4f36a9c642','url':'/app-8c0b2340afecfbbcd2dc.css'},{'revision':'df8db9aafd123863b31b0799ed3d3434','url':'/assets/logo-3f7fb7a22a208c46d6e571fb44e0dc31.svg'}];self.addEventListener("message",(function(e){e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),self.addEventListener("activate",(()=>self.clients.claim())),self.addEventListener("activate",(e=>{const t=i();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e));return await Promise.all(s.map((e=>self.caches.delete(e)))),s})(t).then((e=>{})))})),(A=JSON.stringify(O),M=(new TextEncoder).encode(A),crypto.subtle.digest("SHA-256",M).then((function(e){return Array.from(new Uint8Array(e)).map((function(e){return("00"+e.toString(16)).slice(-2)})).join("")}))).then((function(e){E([{url:"/index.html",revision:"".concat(e,"-v1")},{url:"/manifest.json",revision:"".concat(e,"-v1")}])})),E(O)})()})();
//# sourceMappingURL=sw.js.map