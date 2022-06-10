"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global&&global;function e(e){const t=e[0].results,r=e[1].genres;return t.map((({original_title:e,poster_path:t,original_name:n,genre_ids:a,release_date:s,id:i})=>`<div class="film-card">\n        <img src="https://image.tmdb.org/t/p/w500${t}"  alt="" loading="lazy" data-id=${i} />\n        <div class="info">\n          <p class="film-name">${e||n}\n          </p>\n          <p class="info-item">\n            <b>${r.reduce(((e,t)=>(a.includes(t.id)&&e.push(` ${t.name}`),e)),[]).slice(0,2).concat([" Other"])} </b >\n            <b>|</b>\n            <b>${s?s.slice(0,4):"-"}</b>\n          </p>\n        </div>\n      </div>`)).join("")}function t(e){const{vote_average:t,vote_count:r,genres:n,original_title:a,poster_path:s,original_name:i,popularity:o,overview:c,id:h}=e;return console.log(n),`<div class="about_film-card">\n         <img src="https://image.tmdb.org/t/p/w500${s}" class="about_film-img" alt="" loading="lazy" data-id=${h} />\n        <div class="about_film-info">\n          <h1 class="about_film-name">${a||i}\n          </h1>\n          <div class="about_film-item">\n          <p class="about_film-text">Vote / Votes</p>\n          <b class="about_film-date">${t} / ${r}</b>\n          </div>\n          <div class="about_film-item">\n          <p class="about_film-text">Popularity</p>\n          <b class="about_film-date">${o}</b>\n          </div>\n          <div class="about_film-item">\n          <p class="about_film-text">Original Title</p>\n          <b class="about_film-date">${a||i}</b>\n          </div>\n          <div class="about_film-item">\n          <p class="about_film-text">Genre</p>\n          <b class="about_film-date">${n?n.map((e=>e.name)):" "}</b>\n          </div>\n          <h2 class="about_film-pretitle">ABOUT</h2>\n          <p class="about_film-overview">${c}</p>\n        </div>\n      </div>`}async function r(e){const t=`https://api.themoviedb.org/3/movie/${e}?api_key=024bf82d4805f650033dc69997860333`;console.log(t);const r=await fetch(t);return await r.json()}new class{async searchFilm(){const e="024bf82d4805f650033dc69997860333",t=[`https://api.themoviedb.org/3/search/movie?api_key=${e}&language=en-US&page=1&include_adult=false&query=${this.searchQuery}&page=${this.page}`,`https://api.themoviedb.org/3/genre/movie/list?api_key=${e}&language=en-US`].map((async e=>(await fetch(`${e}`)).json()));return await Promise.all(t)}get query(){return this.searchQuery}set query(e){this.searchQuery=e}resetPage(){this.page=1}incrementPage(){this.page+=1}constructor(){this.searchQuery="",this.page=1}};const n=new class{async fetchFilmsCards(){const e="024bf82d4805f650033dc69997860333",t=[`https://api.themoviedb.org/3/trending/movie/day?api_key=${e}&page=1`,`https://api.themoviedb.org/3/genre/movie/list?api_key=${e}&language=en-US`].map((async e=>(await fetch(`${e}`)).json()));return await Promise.all(t)}resetPage(){this.page=1}incrementPage(){this.page+=1}constructor(){this.page=1}},a=document.querySelector(".films__container"),s=document.querySelector(".backdrop"),i=document.querySelector(".modal_film-info"),o=document.querySelector(".modal_film__button--close");document.addEventListener("DOMContentLoaded",(async function(){a.innerHTML="",n.resetPage();try{const t=await n.fetchFilmsCards();console.log(t);const r=e(t);a.insertAdjacentHTML("afterbegin",r)}catch(e){console.log(e.message)}})),a.addEventListener("click",(function(e){if(i.innerHTML="",console.log(e.target),console.log(e.currentTarget),!e.target.dataset.id)return;console.log(e.target.dataset.id),r(e.target.dataset.id).then((e=>{if(console.log(e),!e)return alert("The resource you requested could not be found.");{const r=t(e);s.classList.remove("is-hidden"),document.body.classList.toggle("modal-open"),i.insertAdjacentHTML("beforeend",r)}})).catch((e=>console.log(e)))})),o.addEventListener("click",(function(){s.classList.add("is-hidden"),document.body.classList.toggle("modal-open")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */));const c=function(e){const t=[];let r=0;for(let n=0;n<e.length;n++){let a=e.charCodeAt(n);a<128?t[r++]=a:a<2048?(t[r++]=a>>6|192,t[r++]=63&a|128):55296==(64512&a)&&n+1<e.length&&56320==(64512&e.charCodeAt(n+1))?(a=65536+((1023&a)<<10)+(1023&e.charCodeAt(++n)),t[r++]=a>>18|240,t[r++]=a>>12&63|128,t[r++]=a>>6&63|128,t[r++]=63&a|128):(t[r++]=a>>12|224,t[r++]=a>>6&63|128,t[r++]=63&a|128)}return t},h={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let t=0;t<e.length;t+=3){const a=e[t],s=t+1<e.length,i=s?e[t+1]:0,o=t+2<e.length,c=o?e[t+2]:0,h=a>>2,l=(3&a)<<4|i>>4;let d=(15&i)<<2|c>>6,p=63&c;o||(p=64,s||(d=64)),n.push(r[h],r[l],r[d],r[p])}return n.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(c(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):function(e){const t=[];let r=0,n=0;for(;r<e.length;){const a=e[r++];if(a<128)t[n++]=String.fromCharCode(a);else if(a>191&&a<224){const s=e[r++];t[n++]=String.fromCharCode((31&a)<<6|63&s)}else if(a>239&&a<365){const s=((7&a)<<18|(63&e[r++])<<12|(63&e[r++])<<6|63&e[r++])-65536;t[n++]=String.fromCharCode(55296+(s>>10)),t[n++]=String.fromCharCode(56320+(1023&s))}else{const s=e[r++],i=e[r++];t[n++]=String.fromCharCode((15&a)<<12|(63&s)<<6|63&i)}}return t.join("")}(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const r=t?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let t=0;t<e.length;){const a=r[e.charAt(t++)],s=t<e.length?r[e.charAt(t)]:0;++t;const i=t<e.length?r[e.charAt(t)]:64;++t;const o=t<e.length?r[e.charAt(t)]:64;if(++t,null==a||null==s||null==i||null==o)throw Error();const c=a<<2|s>>4;if(n.push(c),64!==i){const e=s<<4&240|i>>2;if(n.push(e),64!==o){const e=i<<6&192|o;n.push(e)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},l=function(e){return function(e){const t=c(e);return h.encodeByteArray(t,!0)}(e).replace(/\./g,"")};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class d{wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,r))}}constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name="FirebaseError",Object.setPrototypeOf(this,p.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,f.prototype.create)}}class f{create(e,...t){const r=t[0]||{},n=`${this.service}/${e}`,a=this.errors[e],s=a?function(e,t){return e.replace(u,((e,r)=>{const n=t[r];return null!=n?String(n):`<${r}?>`}))}(a,r):"Error",i=`${this.serviceName}: ${s} (${n}).`;return new p(n,i,r)}constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}}const u=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g(e,t){if(e===t)return!0;const r=Object.keys(e),n=Object.keys(t);for(const a of r){if(!n.includes(a))return!1;const r=e[a],s=t[a];if(m(r)&&m(s)){if(!g(r,s))return!1}else if(r!==s)return!1}for(const e of n)if(!r.includes(e))return!1;return!0}function m(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _{get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new d;if(this.instancesDeferred.set(t,e),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&e.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),n=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(r)&&!this.shouldAutoInitialize()){if(n)return null;throw Error(`Service ${this.name} is not available`)}try{return this.getOrInitializeService({instanceIdentifier:r})}catch(e){if(n)return null;throw e}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:"[DEFAULT]"})}catch(e){}for(const[e,t]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:r});t.resolve(e)}catch(e){}}}}clearInstance(e="[DEFAULT]"){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter((e=>"INTERNAL"in e)).map((e=>e.INTERNAL.delete())),...e.filter((e=>"_delete"in e)).map((e=>e._delete()))])}isComponentSet(){return null!=this.component}isInitialized(e="[DEFAULT]"){return this.instances.has(e)}getOptions(e="[DEFAULT]"){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const n=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[e,t]of this.instancesDeferred.entries()){r===this.normalizeInstanceIdentifier(e)&&t.resolve(n)}return n}onInit(e,t){var r;const n=this.normalizeInstanceIdentifier(t),a=null!==(r=this.onInitCallbacks.get(n))&&void 0!==r?r:new Set;a.add(e),this.onInitCallbacks.set(n,a);const s=this.instances.get(n);return s&&e(s,n),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const n of r)try{n(e,t)}catch(e){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:(n=e,"[DEFAULT]"===n?void 0:n),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(e){}var n;return r||null}normalizeInstanceIdentifier(e="[DEFAULT]"){return this.component?this.component.multipleInstances?e:"[DEFAULT]":e}shouldAutoInitialize(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode}constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}}class y{addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new _(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}constructor(e){this.name=e,this.providers=new Map}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v=[];var E,w;(w=E||(E={}))[w.DEBUG=0]="DEBUG",w[w.VERBOSE=1]="VERBOSE",w[w.INFO=2]="INFO",w[w.WARN=3]="WARN",w[w.ERROR=4]="ERROR",w[w.SILENT=5]="SILENT";const I={debug:E.DEBUG,verbose:E.VERBOSE,info:E.INFO,warn:E.WARN,error:E.ERROR,silent:E.SILENT},D=E.INFO,S={[E.DEBUG]:"log",[E.VERBOSE]:"log",[E.INFO]:"info",[E.WARN]:"warn",[E.ERROR]:"error"},C=(e,t,...r)=>{if(t<e.logLevel)return;const n=(new Date).toISOString(),a=S[t];if(!a)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[a](`[${n}]  ${e.name}:`,...r)};let A,L;const O=new WeakMap,T=new WeakMap,$=new WeakMap,B=new WeakMap,N=new WeakMap;let M={get(e,t,r){if(e instanceof IDBTransaction){if("done"===t)return T.get(e);if("objectStoreNames"===t)return e.objectStoreNames||$.get(e);if("store"===t)return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return j(e[t])},set:(e,t,r)=>(e[t]=r,!0),has:(e,t)=>e instanceof IDBTransaction&&("done"===t||"store"===t)||t in e};function k(e){return e!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(L||(L=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(e)?function(...t){return e.apply(H(this),t),j(O.get(this))}:function(...t){return j(e.apply(H(this),t))}:function(t,...r){const n=e.call(H(this),t,...r);return $.set(n,t.sort?t.sort():[t]),j(n)}}function P(e){return"function"==typeof e?k(e):(e instanceof IDBTransaction&&function(e){if(T.has(e))return;const t=new Promise(((t,r)=>{const n=()=>{e.removeEventListener("complete",a),e.removeEventListener("error",s),e.removeEventListener("abort",s)},a=()=>{t(),n()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),n()};e.addEventListener("complete",a),e.addEventListener("error",s),e.addEventListener("abort",s)}));T.set(e,t)}(e),t=e,(A||(A=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some((e=>t instanceof e))?new Proxy(e,M):e);var t}function j(e){if(e instanceof IDBRequest)return function(e){const t=new Promise(((t,r)=>{const n=()=>{e.removeEventListener("success",a),e.removeEventListener("error",s)},a=()=>{t(j(e.result)),n()},s=()=>{r(e.error),n()};e.addEventListener("success",a),e.addEventListener("error",s)}));return t.then((t=>{t instanceof IDBCursor&&O.set(t,e)})).catch((()=>{})),N.set(t,e),t}(e);if(B.has(e))return B.get(e);const t=P(e);return t!==e&&(B.set(e,t),N.set(t,e)),t}const H=e=>N.get(e);function R(e,t,{blocked:r,upgrade:n,blocking:a,terminated:s}={}){const i=indexedDB.open(e,t),o=j(i);return n&&i.addEventListener("upgradeneeded",(e=>{n(j(i.result),e.oldVersion,e.newVersion,j(i.transaction))})),r&&i.addEventListener("blocked",(()=>r())),o.then((e=>{s&&e.addEventListener("close",(()=>s())),a&&e.addEventListener("versionchange",(()=>a()))})).catch((()=>{})),o}const F=["get","getKey","getAll","getAllKeys","count"],V=["put","add","delete","clear"],U=new Map;function z(e,t){if(!(e instanceof IDBDatabase)||t in e||"string"!=typeof t)return;if(U.get(t))return U.get(t);const r=t.replace(/FromIndex$/,""),n=t!==r,a=V.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!a&&!F.includes(r))return;const s=async function(e,...t){const s=this.transaction(e,a?"readwrite":"readonly");let i=s.store;return n&&(i=i.index(t.shift())),(await Promise.all([i[r](...t),a&&s.done]))[0]};return U.set(t,s),s}M=(e=>({...e,get:(t,r,n)=>z(t,r)||e.get(t,r,n),has:(t,r)=>!!z(t,r)||e.has(t,r)}))(M);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class x{getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}constructor(e){this.container=e}}const W=new class{get logLevel(){return this._logLevel}set logLevel(e){if(!(e in E))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?I[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,E.DEBUG,...e),this._logHandler(this,E.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,E.VERBOSE,...e),this._logHandler(this,E.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,E.INFO,...e),this._logHandler(this,E.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,E.WARN,...e),this._logHandler(this,E.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,E.ERROR,...e),this._logHandler(this,E.ERROR,...e)}constructor(e){this.name=e,this._logLevel=D,this._logHandler=C,this._userLogHandler=null,v.push(this)}}("@firebase/app"),q={"@firebase/app":"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},G=new Map,Q=new Map;function K(e,t){try{e.container.addComponent(t)}catch(r){W.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,r)}}function J(e){const t=e.name;if(Q.has(t))return W.debug(`There were multiple attempts to register component ${t}.`),!1;Q.set(t,e);for(const t of G.values())K(t,e);return!0}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const X=new f("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","storage-open":"Error thrown when opening storage. Original error: {$originalErrorMessage}.","storage-get":"Error thrown when reading from storage. Original error: {$originalErrorMessage}.","storage-set":"Error thrown when writing to storage. Original error: {$originalErrorMessage}.","storage-delete":"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Y{get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw X.create("app-deleted",{appName:this._name})}constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new b("app",(()=>this),"PUBLIC"))}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e,t,r){var n;let a=null!==(n=q[e])&&void 0!==n?n:e;r&&(a+=`-${r}`);const s=a.match(/\s|\//),i=t.match(/\s|\//);if(s||i){const e=[`Unable to register library "${a}" with version "${t}":`];return s&&e.push(`library name "${a}" contains illegal characters (whitespace or "/")`),s&&i&&e.push("and"),i&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void W.warn(e.join(" "))}J(new b(`${a}-version`,(()=>({library:a,version:t})),"VERSION"))}let ee=null;function te(){return ee||(ee=R("firebase-heartbeat-database",1,{upgrade:(e,t)=>{if(0===t)e.createObjectStore("firebase-heartbeat-store")}}).catch((e=>{throw X.create("storage-open",{originalErrorMessage:e.message})}))),ee}async function re(e,t){try{const r=(await te()).transaction("firebase-heartbeat-store","readwrite"),n=r.objectStore("firebase-heartbeat-store");return await n.put(t,ne(e)),r.done}catch(e){throw X.create("storage-set",{originalErrorMessage:e.message})}}function ne(e){return`${e.name}!${e.options.appId}`}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),t=se();if(null===this._heartbeatsCache&&(this._heartbeatsCache=await this._heartbeatsCachePromise),this._heartbeatsCache.lastSentHeartbeatDate!==t&&!this._heartbeatsCache.heartbeats.some((e=>e.date===t)))return this._heartbeatsCache.heartbeats.push({date:t,agent:e}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter((e=>{const t=new Date(e.date).valueOf();return Date.now()-t<=2592e6})),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(null===this._heartbeatsCache&&await this._heartbeatsCachePromise,null===this._heartbeatsCache||0===this._heartbeatsCache.heartbeats.length)return"";const e=se(),{heartbeatsToSend:t,unsentEntries:r}=function(e,t=1024){const r=[];let n=e.slice();for(const a of e){const e=r.find((e=>e.agent===a.agent));if(e){if(e.dates.push(a.date),oe(r)>t){e.dates.pop();break}}else if(r.push({agent:a.agent,dates:[a.date]}),oe(r)>t){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}(this._heartbeatsCache.heartbeats),n=l(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),n}constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ie(t),this._heartbeatsCachePromise=this._storage.read().then((e=>(this._heartbeatsCache=e,e)))}}function se(){return(new Date).toISOString().substring(0,10)}class ie{async runIndexedDBEnvironmentCheck(){return"object"==typeof indexedDB&&new Promise(((e,t)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",a=self.indexedDB.open(n);a.onsuccess=()=>{a.result.close(),r||self.indexedDB.deleteDatabase(n),e(!0)},a.onupgradeneeded=()=>{r=!1},a.onerror=()=>{var e;t((null===(e=a.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}})).then((()=>!0)).catch((()=>!1))}async read(){if(await this._canUseIndexedDBPromise){return await async function(e){try{return(await te()).transaction("firebase-heartbeat-store").objectStore("firebase-heartbeat-store").get(ne(e))}catch(e){throw X.create("storage-get",{originalErrorMessage:e.message})}}(this.app)||{heartbeats:[]}}return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return re(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;if(await this._canUseIndexedDBPromise){const r=await this.read();return re(this.app,{lastSentHeartbeatDate:null!==(t=e.lastSentHeartbeatDate)&&void 0!==t?t:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}}constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}}function oe(e){return l(JSON.stringify({version:2,heartbeats:e})).length}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ce;ce="",J(new b("platform-logger",(e=>new x(e)),"PRIVATE")),J(new b("heartbeat",(e=>new ae(e)),"PRIVATE")),Z("@firebase/app","0.7.25",ce),Z("@firebase/app","0.7.25","esm2017"),Z("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Z("firebase","9.8.2","app");!function(e,t={}){if("object"!=typeof t){t={name:t}}const r=Object.assign({name:"[DEFAULT]",automaticDataCollectionEnabled:!1},t),n=r.name;if("string"!=typeof n||!n)throw X.create("bad-app-name",{appName:String(n)});const a=G.get(n);if(a){if(g(e,a.options)&&g(r,a.config))return a;throw X.create("duplicate-app",{appName:n})}const s=new y(n);for(const e of Q.values())s.addComponent(e);const i=new Y(e,r,s);G.set(n,i)}({apiKey:"AIzaSyDcQX36y9qDVvGT9ex-Dyg3NuMiItVzDWw",authDomain:"filmoteka-goit-6e05f.firebaseapp.com",databaseURL:"https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com",projectId:"filmoteka-goit-6e05f",storageBucket:"filmoteka-goit-6e05f.appspot.com",messagingSenderId:"281727023613",appId:"1:281727023613:web:ae072f932b4bc661d88194"});const he="https://filmoteka-goit-6e05f-default-rtdb.firebaseio.com/users.json";class le{create(e){return fetch(he,{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"aplicatiom/json"}}).then((e=>e.json())).then((t=>(e.id=t.name,e)))}getUser(){return fetch(he).then((e=>e.json())).then((e=>console.log(e)))}fetch(e){return e?fetch(`${he}?auth=${e}`).then((e=>e.json())).then((e=>e&&e.error?`<p>${e.error}</p>`:e?Object.keys(e).map((t=>({...e[t],id:t}))):[])):Promise.resolve(console.error(error))}}new le;
//# sourceMappingURL=index.43aa9cc4.js.map
