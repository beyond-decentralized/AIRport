var app=function(e){"use strict";class t{constructor(e){this.name=e,this.applicationMap={}}app(e){if(this.applicationMap[e])throw new Error(`\n\t\t\tApplication already defined.\n\t\t\tDomain:      ${this.name}\n\t\t\tApplication: ${e}\n\t\t\t`);const t=new s(e,this);return this.applicationMap[e]=t,t}getApp(e){return this.applicationMap[e]}}const n={};function o(e){if(n[e])return n[e];const o=new t(e);return n[e]=o,o}const r=o("turbase.app");class i{constructor(e,t){this.application=e,this.descriptor=t}get dependencyConfiguration(){return this.getInheritedDependencyConfiguration(this.descriptor.class)}getPath(){return this.application.domain.name+":"+this.application.name+":"+this.descriptor.token}setDependencies(e){this._dependencyConfiguration?this._dependencyConfiguration={...this._dependencyConfiguration,...e}:this._dependencyConfiguration=e,this.descriptor.class&&(this.descriptor.class.dependencyConfiguration?this.descriptor.class.dependencyConfiguration={...this.descriptor.class.dependencyConfiguration,...e}:this.descriptor.class.dependencyConfiguration=e)}setClass(e){this.descriptor.class=e,e.dependencyConfiguration=this._dependencyConfiguration}getInheritedDependencyConfiguration(e){const t=Object.getPrototypeOf(e);let n={};t&&(n=this.getInheritedDependencyConfiguration(t));const o=e.dependencyConfiguration;return o&&(n={...n,...o}),n}}class s{constructor(e,t){this.name=e,this.domain=t,this.tokenMap=new Map,this.autopilot=!1}token(e){if(this.tokenMap.get(e.token))throw new Error(`Token with name '${name}' has already been created`);const t=new i(this,e);return this.tokenMap.set(e.token,t),t}}function a(e){return r.app(e)}var c;!function(e){e.DB="DB",e.UI="UI"}(c||(c={}));class u{constructor(e,t){this.id=e,this.type=t}}const d=a("direction-indicator").token({class:null,interface:"IAutopilotApiLoader",token:"AUTOPILOT_API_LOADER"});class l{}class f extends l{constructor(e,t){super(),this.rootContainer=e,this.context=t,this.objectMap=new Map}doEventuallyGet(e,t,n){let{firstDiNotSetClass:o,firstMissingClassToken:r,objects:i}=this.doGetCore(e);r||o?setTimeout((()=>{this.doEventuallyGet(e,t,n)}),100):i.length>1?t(i):t(i[0])}doGet(e,t,n){const{firstDiNotSetClass:o,firstMissingClassToken:r,objects:i}=this.doGetCore(e);if(o)return console.log(`Dependency Injection is not ready for token ${r.getPath()}\n\t\t\t, class: ${o.name}. Delaying injection by 100ms`),void setTimeout((()=>{this.doGet(e,t,n)}),100);if(i.filter((e=>e&&!e.__initialized__)).length){const o=i.map(((e,t)=>e.__initialized__?-1:t)).filter((e=>-1!==e)),r=[];for(const t of o)r.push(e[t].getPath());return console.log(`Dependency Injection is not ready for tokens:\n\t\t\t\t ${r.join("\n")}\n\t\t\t, these classes are not yet initialized, delaying injection by 100ms`),void setTimeout((()=>{this.doGet(e,t,n)}),100)}if(r){const e="Dependency Injection could not find class for token: "+r.getPath();console.log(e),n(e)}else i.length>1?t(i):t(i[0])}doGetCore(e){let t,n;const o=e.map((e=>{if(t||n)return;let o=this.objectMap.get(e.descriptor.token);if(!o){if(!this.rootContainer.isFramework&&e.application.autopilot)o=this.getSync(d).loadApiAutopilot(e);else{const r=e.descriptor.class;if(!r)return void(t=e);if(r.diSet&&!r.diSet())return t=e,void(n=r);o=new r,this.setDependencyGetters(o,e)}if(o.__container__=this,this.objectMap.set(e.descriptor.token,o),!e.application.autopilot&&o.init){const t=o.init();t instanceof Promise?t.then((t=>{o.__initialized__=!0,console.log(`${e.getPath()} initialized.`)})):(o.__initialized__=!0,console.log(`${e.getPath()} initialized.`))}else o.__initialized__=!0}return o}));return{firstDiNotSetClass:n,firstMissingClassToken:t,objects:o}}setDependencyGetters(e,t){if(!t.dependencyConfiguration)return;const n=t.dependencyConfiguration;for(let t in n){delete e[t];const o=n[t];Object.defineProperty(e,t,{get(){return this.__container__,this.__container__.getSync(o)}}),e["get"+t+"Async"]=async function(){await this.get(o)}}}async getByNames(e,t,n){if(!o(e))throw new Error(`Could nof find\n\tDomain:\n\t\t${e}\n\t\t`);const r=o(e).getApp(t);if(!r)throw new Error(`Could not find\n\tDomain:\n\t\t${e}\n\tApplication:\n\t\t${t}\n\t\t`);const i=r.tokenMap.get(n);if(!i)throw new Error(`Could not find token: ${n}\n\tin Domain:\n\t\t${e}\n \tApplication:\n\t\t\t${t}\n\t\t`);return await this.get(i)}get(...e){return new Promise(((t,n)=>{this.doGet(e,t,n)}))}eventuallyGet(...e){return new Promise(((t,n)=>{this.doEventuallyGet(e,t,n)}))}getSync(...e){const{firstDiNotSetClass:t,firstMissingClassToken:n,objects:o}=this.doGetCore(e);if(n)throw new Error("Dependency Injection could not find class for token: "+n.getPath());if(t)throw new Error("Dependency Injection is not ready for class: "+t.name);return o.length>1?o:o[0]}}const p=new class extends l{constructor(){super(...arguments),this.isFramework=!1,this.uiContainers=new Set}db(e=null){let t=this.dbContainerMap.get(e);return t||(t=new f(this,new u(e,c.DB)),this.dbContainerMap.set(e,t)),t}remove(e){if(!e)return;this.dbContainerMap.get(e.context.id)?this.dbContainerMap.delete(e.context.id):this.uiContainers.delete(e)}ui(e){const t=new u(e,c.UI),n=new f(this,t);return this.uiContainers.add(n),n}};"undefined"!=typeof window&&(window.DEPENDENCY_INJECTION=p,window.lib=a,window.domain=o);const h=new class{async get(...e){return await p.db().get(...e)}async eventuallyGet(...e){return await p.db().eventuallyGet(...e)}getSync(...e){return p.db().getSync(...e)}};
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function m(e){if(e.__esModule)return e;var t=Object.defineProperty({},"__esModule",{value:!0});return Object.keys(e).forEach((function(n){var o=Object.getOwnPropertyDescriptor(e,n);Object.defineProperty(t,n,o.get?o:{enumerable:!0,get:function(){return e[n]}})})),t}function _(e){var t={exports:{}};return e(t,t.exports),t.exports}var g=_((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.isNode=t.PROMISE_RESOLVED_VOID=t.PROMISE_RESOLVED_TRUE=t.PROMISE_RESOLVED_FALSE=void 0,t.isPromise=function(e){return!(!e||"function"!=typeof e.then)},t.microSeconds=function(){var e=(new Date).getTime();return e===i?(s++,1e3*e+s):(i=e,s=0,1e3*e)},t.randomInt=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},t.randomToken=function(){return Math.random().toString(36).substring(2)},t.sleep=function(e,t){e||(e=0);return new Promise((function(n){return setTimeout((function(){return n(t)}),e)}))};var n=Promise.resolve(!1);t.PROMISE_RESOLVED_FALSE=n;var o=Promise.resolve(!0);t.PROMISE_RESOLVED_TRUE=o;var r=Promise.resolve();t.PROMISE_RESOLVED_VOID=r;var i=0,s=0;var a="[object process]"===Object.prototype.toString.call("undefined"!=typeof process?process:0);t.isNode=a})),v=_((function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports}));_((function(e){function t(n){return e.exports=t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e.exports.__esModule=!0,e.exports.default=e.exports,t(n)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}));var b=g,y=_((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.averageResponseTime=u,t.canBeUsed=c,t.close=i,t.create=r,t.microSeconds=t.default=void 0,t.onMessage=a,t.postMessage=s,t.type=void 0;var n=b.microSeconds;t.microSeconds=n;var o="native";function r(e){var t={messagesCallback:null,bc:new BroadcastChannel(e),subFns:[]};return t.bc.onmessage=function(e){t.messagesCallback&&t.messagesCallback(e.data)},t}function i(e){e.bc.close(),e.subFns=[]}function s(e,t){try{return e.bc.postMessage(t,!1),b.PROMISE_RESOLVED_VOID}catch(e){return Promise.reject(e)}}function a(e,t){e.messagesCallback=t}function c(){if(b.isNode&&"undefined"==typeof window)return!1;if("function"==typeof BroadcastChannel){if(BroadcastChannel._pubkey)throw new Error("BroadcastChannel: Do not overwrite window.BroadcastChannel with this module, this is not a polyfill");return!0}return!1}function u(){return 150}t.type=o;var d={create:r,close:i,onMessage:a,postMessage:s,canBeUsed:c,type:o,averageResponseTime:u,microSeconds:n};t.default=d})),w=function(){function e(e){this.ttl=e,this.set=new Set,this.timeMap=new Map}return e.prototype.has=function(e){return this.set.has(e)},e.prototype.add=function(e){var t=this;this.timeMap.set(e,E()),this.set.add(e),setTimeout((function(){C(t)}),0)},e.prototype.clear=function(){this.set.clear(),this.timeMap.clear()},e}();function C(e){for(var t=E()-e.ttl,n=e.set[Symbol.iterator]();;){var o=n.next().value;if(!o)return;if(!(e.timeMap.get(o)<t))return;e.timeMap.delete(o),e.set.delete(o)}}function E(){return(new Date).getTime()}var S=Object.freeze({__proto__:null,ObliviousSet:w,removeTooOldValues:C,now:E}),O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=JSON.parse(JSON.stringify(e));void 0===t.webWorkerSupport&&(t.webWorkerSupport=!0);t.idb||(t.idb={});t.idb.ttl||(t.idb.ttl=45e3);t.idb.fallbackInterval||(t.idb.fallbackInterval=150);e.idb&&"function"==typeof e.idb.onclose&&(t.idb.onclose=e.idb.onclose);t.localstorage||(t.localstorage={});t.localstorage.removeTimeout||(t.localstorage.removeTimeout=6e4);e.methods&&(t.methods=e.methods);t.node||(t.node={});t.node.ttl||(t.node.ttl=12e4);t.node.maxParallelWrites||(t.node.maxParallelWrites=2048);void 0===t.node.useFastPath&&(t.node.useFastPath=!0);return t};var M=Object.defineProperty({fillOptionsWithDefaults:O},"__esModule",{value:!0}),P=m(S),L=M,k=_((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.averageResponseTime=v,t.canBeUsed=g,t.cleanOldMessages=d,t.close=h,t.create=l,t.createDatabase=i,t.default=void 0,t.getAllMessages=function(e){var t=e.transaction(o).objectStore(o),n=[];return new Promise((function(e){t.openCursor().onsuccess=function(t){var o=t.target.result;o?(n.push(o.value),o.continue()):e(n)}}))},t.getIdb=r,t.getMessagesHigherThan=a,t.getOldMessages=u,t.microSeconds=void 0,t.onMessage=_,t.postMessage=m,t.removeMessageById=c,t.type=void 0,t.writeMessage=s;var n=b.microSeconds;t.microSeconds=n;var o="messages";function r(){if("undefined"!=typeof indexedDB)return indexedDB;if("undefined"!=typeof window){if(void 0!==window.mozIndexedDB)return window.mozIndexedDB;if(void 0!==window.webkitIndexedDB)return window.webkitIndexedDB;if(void 0!==window.msIndexedDB)return window.msIndexedDB}return!1}function i(e){var t="pubkey.broadcast-channel-0-"+e,n=r().open(t,1);return n.onupgradeneeded=function(e){e.target.result.createObjectStore(o,{keyPath:"id",autoIncrement:!0})},new Promise((function(e,t){n.onerror=function(e){return t(e)},n.onsuccess=function(){e(n.result)}}))}function s(e,t,n){var r={uuid:t,time:(new Date).getTime(),data:n},i=e.transaction([o],"readwrite");return new Promise((function(e,t){i.oncomplete=function(){return e()},i.onerror=function(e){return t(e)},i.objectStore(o).add(r)}))}function a(e,t){var n=e.transaction(o).objectStore(o),r=[];return new Promise((function(e){(function(){try{var e=IDBKeyRange.bound(t+1,1/0);return n.openCursor(e)}catch(e){return n.openCursor()}}()).onsuccess=function(n){var o=n.target.result;o?o.value.id<t+1?o.continue(t+1):(r.push(o.value),o.continue()):e(r)}}))}function c(e,t){var n=e.transaction([o],"readwrite").objectStore(o).delete(t);return new Promise((function(e){n.onsuccess=function(){return e()}}))}function u(e,t){var n=(new Date).getTime()-t,r=e.transaction(o).objectStore(o),i=[];return new Promise((function(e){r.openCursor().onsuccess=function(t){var o=t.target.result;if(o){var r=o.value;if(!(r.time<n))return void e(i);i.push(r),o.continue()}else e(i)}}))}function d(e,t){return u(e,t).then((function(t){return Promise.all(t.map((function(t){return c(e,t.id)})))}))}function l(e,t){return t=(0,L.fillOptionsWithDefaults)(t),i(e).then((function(n){var o={closed:!1,lastCursorId:0,channelName:e,options:t,uuid:(0,b.randomToken)(),eMIs:new P.ObliviousSet(2*t.idb.ttl),writeBlockPromise:b.PROMISE_RESOLVED_VOID,messagesCallback:null,readQueuePromises:[],db:n};return n.onclose=function(){o.closed=!0,t.idb.onclose&&t.idb.onclose()},f(o),o}))}function f(e){e.closed||p(e).then((function(){return(0,b.sleep)(e.options.idb.fallbackInterval)})).then((function(){return f(e)}))}function p(e){return e.closed?b.PROMISE_RESOLVED_VOID:e.messagesCallback?a(e.db,e.lastCursorId).then((function(t){return t.filter((function(e){return!!e})).map((function(t){return t.id>e.lastCursorId&&(e.lastCursorId=t.id),t})).filter((function(t){return function(e,t){return!(e.uuid===t.uuid||t.eMIs.has(e.id)||e.data.time<t.messagesCallbackTime)}(t,e)})).sort((function(e,t){return e.time-t.time})).forEach((function(t){e.messagesCallback&&(e.eMIs.add(t.id),e.messagesCallback(t.data))})),b.PROMISE_RESOLVED_VOID})):b.PROMISE_RESOLVED_VOID}function h(e){e.closed=!0,e.db.close()}function m(e,t){return e.writeBlockPromise=e.writeBlockPromise.then((function(){return s(e.db,e.uuid,t)})).then((function(){0===(0,b.randomInt)(0,10)&&d(e.db,e.options.idb.ttl)})),e.writeBlockPromise}function _(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t,p(e)}function g(){return!b.isNode&&!!r()}function v(e){return 2*e.idb.fallbackInterval}t.type="idb";var y={create:l,close:h,onMessage:_,postMessage:m,canBeUsed:g,type:"idb",averageResponseTime:v,microSeconds:n};t.default=y})),D=_((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.addStorageEventListener=a,t.averageResponseTime=p,t.canBeUsed=f,t.close=d,t.create=u,t.default=void 0,t.getLocalStorage=r,t.microSeconds=void 0,t.onMessage=l,t.postMessage=s,t.removeStorageEventListener=c,t.storageKey=i,t.type=void 0;var n=b.microSeconds;t.microSeconds=n;var o="localstorage";function r(){var e;if("undefined"==typeof window)return null;try{e=window.localStorage,e=window["ie8-eventlistener/storage"]||window.localStorage}catch(e){}return e}function i(e){return"pubkey.broadcastChannel-"+e}function s(e,t){return new Promise((function(n){(0,b.sleep)().then((function(){var o=i(e.channelName),s={token:(0,b.randomToken)(),time:(new Date).getTime(),data:t,uuid:e.uuid},a=JSON.stringify(s);r().setItem(o,a);var c=document.createEvent("Event");c.initEvent("storage",!0,!0),c.key=o,c.newValue=a,window.dispatchEvent(c),n()}))}))}function a(e,t){var n=i(e),o=function(e){e.key===n&&t(JSON.parse(e.newValue))};return window.addEventListener("storage",o),o}function c(e){window.removeEventListener("storage",e)}function u(e,t){if(t=(0,L.fillOptionsWithDefaults)(t),!f())throw new Error("BroadcastChannel: localstorage cannot be used");var n=(0,b.randomToken)(),o=new P.ObliviousSet(t.localstorage.removeTimeout),r={channelName:e,uuid:n,eMIs:o};return r.listener=a(e,(function(e){r.messagesCallback&&e.uuid!==n&&e.token&&!o.has(e.token)&&(e.data.time&&e.data.time<r.messagesCallbackTime||(o.add(e.token),r.messagesCallback(e.data)))})),r}function d(e){c(e.listener)}function l(e,t,n){e.messagesCallbackTime=n,e.messagesCallback=t}function f(){if(b.isNode)return!1;var e=r();if(!e)return!1;try{var t="__broadcastchannel_check";e.setItem(t,"works"),e.removeItem(t)}catch(e){return!1}return!0}function p(){var e=navigator.userAgent.toLowerCase();return e.includes("safari")&&!e.includes("chrome")?240:120}t.type=o;var h={create:u,close:d,onMessage:l,postMessage:s,canBeUsed:f,type:o,averageResponseTime:p,microSeconds:n};t.default=h})),I=_((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.averageResponseTime=d,t.canBeUsed=u,t.close=s,t.create=i,t.microSeconds=t.default=void 0,t.onMessage=c,t.postMessage=a,t.type=void 0;var n=b.microSeconds;t.microSeconds=n;var o="simulate";t.type=o;var r=new Set;function i(e){var t={name:e,messagesCallback:null};return r.add(t),t}function s(e){r.delete(e)}function a(e,t){return new Promise((function(n){return setTimeout((function(){Array.from(r).filter((function(t){return t.name===e.name})).filter((function(t){return t!==e})).filter((function(e){return!!e.messagesCallback})).forEach((function(e){return e.messagesCallback(t)})),n()}),5)}))}function c(e,t){e.messagesCallback=t}function u(){return!0}function d(){return 5}var l={create:i,close:s,onMessage:c,postMessage:a,canBeUsed:u,type:o,averageResponseTime:d,microSeconds:n};t.default=l})),T=function(e){var t=[].concat(e.methods,A).filter(Boolean);if(e.type){if("simulate"===e.type)return N.default;var n=t.find((function(t){return t.type===e.type}));if(n)return n;throw new Error("method-type "+e.type+" not found")}e.webWorkerSupport||b.isNode||(t=t.filter((function(e){return"idb"!==e.type})));var o=t.find((function(e){return e.canBeUsed()}));if(o)return o;throw new Error("No useable method found in "+JSON.stringify(A.map((function(e){return e.type}))))},R=v(y),j=v(k),B=v(D),N=v(I),A=[R.default,j.default,B.default];var x=Object.defineProperty({chooseMethod:T},"__esModule",{value:!0}),V=_((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.OPEN_BROADCAST_CHANNELS=t.BroadcastChannel=void 0,t.clearNodeFolder=function(e){e=(0,L.fillOptionsWithDefaults)(e);var t=(0,x.chooseMethod)(e);return"node"===t.type?t.clearNodeFolder().then((function(){return!0})):b.PROMISE_RESOLVED_FALSE},t.enforceOptions=function(e){o=e};var n=new Set;t.OPEN_BROADCAST_CHANNELS=n;var o,r=0,i=function(e,t){var i,s;this.id=r++,n.add(this),this.name=e,o&&(t=o),this.options=(0,L.fillOptionsWithDefaults)(t),this.method=(0,x.chooseMethod)(this.options),this._iL=!1,this._onML=null,this._addEL={message:[],internal:[]},this._uMP=new Set,this._befC=[],this._prepP=null,s=(i=this).method.create(i.name,i.options),(0,b.isPromise)(s)?(i._prepP=s,s.then((function(e){i._state=e}))):i._state=s};function s(e,t,n){var o={time:e.method.microSeconds(),type:t,data:n};return(e._prepP?e._prepP:b.PROMISE_RESOLVED_VOID).then((function(){var t=e.method.postMessage(e._state,o);return e._uMP.add(t),t.catch().then((function(){return e._uMP.delete(t)})),t}))}function a(e){return e._addEL.message.length>0||e._addEL.internal.length>0}function c(e,t,n){e._addEL[t].push(n),function(e){if(!e._iL&&a(e)){var t=function(t){e._addEL[t.type].forEach((function(e){var n=1e5,o=e.time-n;t.time>=o&&e.fn(t.data)}))},n=e.method.microSeconds();e._prepP?e._prepP.then((function(){e._iL=!0,e.method.onMessage(e._state,t,n)})):(e._iL=!0,e.method.onMessage(e._state,t,n))}}(e)}function u(e,t,n){e._addEL[t]=e._addEL[t].filter((function(e){return e!==n})),function(e){if(e._iL&&!a(e)){e._iL=!1;var t=e.method.microSeconds();e.method.onMessage(e._state,null,t)}}(e)}t.BroadcastChannel=i,i._pubkey=!0,i.prototype={postMessage:function(e){if(this.closed)throw new Error("BroadcastChannel.postMessage(): Cannot post message after channel has closed");return s(this,"message",e)},postInternal:function(e){return s(this,"internal",e)},set onmessage(e){var t={time:this.method.microSeconds(),fn:e};u(this,"message",this._onML),e&&"function"==typeof e?(this._onML=t,c(this,"message",t)):this._onML=null},addEventListener:function(e,t){c(this,e,{time:this.method.microSeconds(),fn:t})},removeEventListener:function(e,t){u(this,e,this._addEL[e].find((function(e){return e.fn===t})))},close:function(){var e=this;if(!this.closed){n.delete(this),this.closed=!0;var t=this._prepP?this._prepP:b.PROMISE_RESOLVED_VOID;return this._onML=null,this._addEL.message=[],t.then((function(){return Promise.all(Array.from(e._uMP))})).then((function(){return Promise.all(e._befC.map((function(e){return e()})))})).then((function(){return e.method.close(e._state)}))}},get type(){return this.method.type},get isClosed(){return this.closed}}}));var G={add:function(e){if("function"==typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope);else{if("function"!=typeof window.addEventListener)return;window.addEventListener("beforeunload",(function(){e()}),!0),window.addEventListener("unload",(function(){e()}),!0)}}},U=new Set,F=!1;function z(){var e=[];return U.forEach((function(t){e.push(t()),U.delete(t)})),Promise.all(e)}var $=m(Object.freeze({__proto__:null,add:function(e){if(F||(F=!0,G.add(z)),"function"!=typeof e)throw new Error("Listener is no function");return U.add(e),{remove:function(){return U.delete(e)},run:function(){return U.delete(e),e()}}},runAll:z,removeAll:function(){U.clear()},getSize:function(){return U.size}})),Q=K,W=function(e,t){if(e._leaderElector)throw new Error("BroadcastChannel already has a leader-elector");t=function(e,t){e||(e={});(e=JSON.parse(JSON.stringify(e))).fallbackInterval||(e.fallbackInterval=3e3);e.responseTime||(e.responseTime=t.method.averageResponseTime(t.options));return e}(t,e);var n=new H(e,t);return e._befC.push((function(){return n.die()})),e._leaderElector=n,n},H=function(e,t){var n=this;this.broadcastChannel=e,this._options=t,this.isLeader=!1,this.hasLeader=!1,this.isDead=!1,this.token=(0,b.randomToken)(),this._aplQ=b.PROMISE_RESOLVED_VOID,this._aplQC=0,this._unl=[],this._lstns=[],this._dpL=function(){},this._dpLC=!1;var o=function(e){"leader"===e.context&&("death"===e.action&&(n.hasLeader=!1),"tell"===e.action&&(n.hasLeader=!0))};this.broadcastChannel.addEventListener("internal",o),this._lstns.push(o)};function J(e,t){var n={context:"leader",action:t,token:e.token};return e.broadcastChannel.postInternal(n)}function K(e){e.isLeader=!0,e.hasLeader=!0;var t=(0,$.add)((function(){return e.die()}));e._unl.push(t);var n=function(t){"leader"===t.context&&"apply"===t.action&&J(e,"tell"),"leader"!==t.context||"tell"!==t.action||e._dpLC||(e._dpLC=!0,e._dpL(),J(e,"tell"))};return e.broadcastChannel.addEventListener("internal",n),e._lstns.push(n),J(e,"tell")}H.prototype={applyOnce:function(e){var t=this;if(this.isLeader)return(0,b.sleep)(0,!0);if(this.isDead)return(0,b.sleep)(0,!1);if(this._aplQC>1)return this._aplQ;return this._aplQC=this._aplQC+1,this._aplQ=this._aplQ.then((function(){return function(){if(t.isLeader)return b.PROMISE_RESOLVED_TRUE;var n,o=!1,r=new Promise((function(e){n=function(){o=!0,e()}})),i=function(e){"leader"===e.context&&e.token!=t.token&&("apply"===e.action&&e.token>t.token&&n(),"tell"===e.action&&(n(),t.hasLeader=!0))};t.broadcastChannel.addEventListener("internal",i);var s=e?4*t._options.responseTime:t._options.responseTime;return J(t,"apply").then((function(){return Promise.race([(0,b.sleep)(s),r.then((function(){return Promise.reject(new Error)}))])})).then((function(){return J(t,"apply")})).then((function(){return Promise.race([(0,b.sleep)(s),r.then((function(){return Promise.reject(new Error)}))])})).catch((function(){})).then((function(){return t.broadcastChannel.removeEventListener("internal",i),!o&&K(t).then((function(){return!0}))}))}()})).then((function(){t._aplQC=t._aplQC-1})),this._aplQ.then((function(){return t.isLeader}))},awaitLeadership:function(){return this._aLP||(this._aLP=function(e){if(e.isLeader)return b.PROMISE_RESOLVED_VOID;return new Promise((function(t){var n=!1;function o(){n||(n=!0,e.broadcastChannel.removeEventListener("internal",r),t(!0))}e.applyOnce().then((function(){e.isLeader&&o()})),function t(){return(0,b.sleep)(e._options.fallbackInterval).then((function(){if(!e.isDead&&!n)return e.isLeader?void o():e.applyOnce(!0).then((function(){e.isLeader?o():t()}))}))}();var r=function(t){"leader"===t.context&&"death"===t.action&&(e.hasLeader=!1,e.applyOnce().then((function(){e.isLeader&&o()})))};e.broadcastChannel.addEventListener("internal",r),e._lstns.push(r)}))}(this)),this._aLP},set onduplicate(e){this._dpL=e},die:function(){var e=this;return this._lstns.forEach((function(t){return e.broadcastChannel.removeEventListener("internal",t)})),this._lstns=[],this._unl.forEach((function(e){return e.remove()})),this._unl=[],this.isLeader&&(this.hasLeader=!1,this.isLeader=!1),this.isDead=!0,J(this,"death")}};var Y=V,q=Object.defineProperty({beLeader:Q,createLeaderElection:W},"__esModule",{value:!0}),X=_((function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BroadcastChannel",{enumerable:!0,get:function(){return Y.BroadcastChannel}}),Object.defineProperty(t,"OPEN_BROADCAST_CHANNELS",{enumerable:!0,get:function(){return Y.OPEN_BROADCAST_CHANNELS}}),Object.defineProperty(t,"beLeader",{enumerable:!0,get:function(){return q.beLeader}}),Object.defineProperty(t,"clearNodeFolder",{enumerable:!0,get:function(){return Y.clearNodeFolder}}),Object.defineProperty(t,"createLeaderElection",{enumerable:!0,get:function(){return q.createLeaderElection}}),Object.defineProperty(t,"enforceOptions",{enumerable:!0,get:function(){return Y.enforceOptions}})})),Z={BroadcastChannel:X.BroadcastChannel,createLeaderElection:X.createLeaderElection,clearNodeFolder:X.clearNodeFolder,enforceOptions:X.enforceOptions,beLeader:X.beLeader};e.CrossTabCommunicator=class{constructor(){this.demoListenerStarted=!1,this.pendingMessageIdSet=new Set,this.isNativeBroadcastChannel="function"==typeof BroadcastChannel,window.addEventListener("message",(e=>{const t=e.data;if(t.__received__)return;let n={...t};t.__received__=!0;const o=e.origin.split("//"),r=o[1];t.domain===r&&("IsConnectionReady"===t.category&&(this.clientHost=t.domain,this.clientProtocol=o[0]),this.pendingMessageIdSet.add(t.id),this.communicationChannel.postMessage(n))}));const e=()=>{this.communicationChannel=new Z.BroadcastChannel("clientCommunication",{idb:{onclose:()=>{this.communicationChannel.close(),e()}}}),this.communicationChannel.onmessage=e=>{if(!this.clientHost||e.domain!==this.clientHost)return;if(e.__received__)return;if(!this.pendingMessageIdSet.has(e.id))return;this.pendingMessageIdSet.delete(e.id);const t={...e};e.__received__=!0,window.parent.postMessage(t,this.clientProtocol+"//"+this.clientHost)}};e()}},e.CrossTabCommunicator=function(e,t,n,o){var r,i=arguments.length,s=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(i<3?r(s):i>3?r(t,n,s):r(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s}([function(e){}],e.CrossTabCommunicator);const ee=a("vhf-radio").token({class:e.CrossTabCommunicator,interface:"ICrossTabCommunicator",token:"CROSS_TAB_COMMUNCATOR"});return h.getSync(ee),e.CROSS_TAB_COMMUNCATOR=ee,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
//# sourceMappingURL=bundle.js.map
