(function(e,t){if("object"===typeof exports&&"object"===typeof module)module.exports=t(require("Vue"));else if("function"===typeof define&&define.amd)define(["Vue"],t);else{var a="object"===typeof exports?t(require("Vue")):t(e["Vue"]);for(var r in a)("object"===typeof exports?exports:e)[r]=a[r]}})(window,(function(e){return function(e){var t={};function a(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}return a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a(a.s=1)}({1:function(e,t,a){e.exports=a("a317")},"24fb":function(e,t,a){"use strict";function r(e,t){var a=e[1]||"",r=e[3];if(!r)return a;if(t&&"function"===typeof btoa){var o=n(r),c=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[a].concat(c).concat([o]).join("\n")}return[a].join("\n")}function n(e){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(t);return"/*# ".concat(a," */")}e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var a=r(t,e);return t[2]?"@media ".concat(t[2]," {").concat(a,"}"):a})).join("")},t.i=function(e,a,r){"string"===typeof e&&(e=[[null,e,""]]);var n={};if(r)for(var o=0;o<this.length;o++){var c=this[o][0];null!=c&&(n[c]=!0)}for(var i=0;i<e.length;i++){var d=[].concat(e[i]);r&&n[d[0]]||(a&&(d[2]?d[2]="".concat(a," and ").concat(d[2]):d[2]=a),t.push(d))}},t}},"499e":function(e,t,a){"use strict";function r(e,t){for(var a=[],r={},n=0;n<t.length;n++){var o=t[n],c=o[0],i=o[1],d=o[2],s=o[3],l={id:e+":"+n,css:i,media:d,sourceMap:s};r[c]?r[c].parts.push(l):a.push(r[c]={id:c,parts:[l]})}return a}a.r(t),a.d(t,"default",(function(){return v}));var n="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!n)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},c=n&&(document.head||document.getElementsByTagName("head")[0]),i=null,d=0,s=!1,l=function(){},u=null,f="data-vue-ssr-id",p="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(e,t,a,n){s=a,u=n||{};var c=r(e,t);return b(c),function(t){for(var a=[],n=0;n<c.length;n++){var i=c[n],d=o[i.id];d.refs--,a.push(d)}t?(c=r(e,t),b(c)):c=[];for(n=0;n<a.length;n++){d=a[n];if(0===d.refs){for(var s=0;s<d.parts.length;s++)d.parts[s]();delete o[d.id]}}}}function b(e){for(var t=0;t<e.length;t++){var a=e[t],r=o[a.id];if(r){r.refs++;for(var n=0;n<r.parts.length;n++)r.parts[n](a.parts[n]);for(;n<a.parts.length;n++)r.parts.push(g(a.parts[n]));r.parts.length>a.parts.length&&(r.parts.length=a.parts.length)}else{var c=[];for(n=0;n<a.parts.length;n++)c.push(g(a.parts[n]));o[a.id]={id:a.id,refs:1,parts:c}}}}function h(){var e=document.createElement("style");return e.type="text/css",c.appendChild(e),e}function g(e){var t,a,r=document.querySelector("style["+f+'~="'+e.id+'"]');if(r){if(s)return l;r.parentNode.removeChild(r)}if(p){var n=d++;r=i||(i=h()),t=y.bind(null,r,n,!1),a=y.bind(null,r,n,!0)}else r=h(),t=j.bind(null,r),a=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else a()}}var m=function(){var e=[];return function(t,a){return e[t]=a,e.filter(Boolean).join("\n")}}();function y(e,t,a,r){var n=a?"":r.css;if(e.styleSheet)e.styleSheet.cssText=m(t,n);else{var o=document.createTextNode(n),c=e.childNodes;c[t]&&e.removeChild(c[t]),c.length?e.insertBefore(o,c[t]):e.appendChild(o)}}function j(e,t){var a=t.css,r=t.media,n=t.sourceMap;if(r&&e.setAttribute("media",r),u.ssrId&&e.setAttribute(f,t.id),n&&(a+="\n/*# sourceURL="+n.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),e.styleSheet)e.styleSheet.cssText=a;else{while(e.firstChild)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}},"79e7":function(e,t,a){var r=a("24fb");t=r(!1),t.push([e.i,"h3[data-v-be1d19fc]{margin:40px 0 0}ul[data-v-be1d19fc]{list-style-type:none;padding:0}li[data-v-be1d19fc]{display:inline-block;margin:0 10px}a[data-v-be1d19fc]{color:#42b983}",""]),e.exports=t},"8bbf":function(t,a){t.exports=e},a317:function(e,t,a){"use strict";a.r(t);var r=a("8bbf");const n=Object(r["withScopeId"])("data-v-be1d19fc");Object(r["pushScopeId"])("data-v-be1d19fc");const o={class:"hello"},c=Object(r["createStaticVNode"])('<p data-v-be1d19fc> For a guide and recipes on how to configure / customize this project,<br data-v-be1d19fc> check out the <a href="https://cli.vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>vue-cli documentation</a>. </p><h3 data-v-be1d19fc>Installed CLI Plugins</h3><ul data-v-be1d19fc><li data-v-be1d19fc><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener" data-v-be1d19fc>babel</a></li><li data-v-be1d19fc><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript" target="_blank" rel="noopener" data-v-be1d19fc>typescript</a></li><li data-v-be1d19fc><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener" data-v-be1d19fc>eslint</a></li></ul><h3 data-v-be1d19fc>Essential Links</h3><ul data-v-be1d19fc><li data-v-be1d19fc><a href="https://vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>Core Docs</a></li><li data-v-be1d19fc><a href="https://forum.vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>Forum</a></li><li data-v-be1d19fc><a href="https://chat.vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>Community Chat</a></li><li data-v-be1d19fc><a href="https://twitter.com/vuejs" target="_blank" rel="noopener" data-v-be1d19fc>Twitter</a></li><li data-v-be1d19fc><a href="https://news.vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>News</a></li></ul><h3 data-v-be1d19fc>Ecosystem</h3><ul data-v-be1d19fc><li data-v-be1d19fc><a href="https://router.vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>vue-router</a></li><li data-v-be1d19fc><a href="https://vuex.vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>vuex</a></li><li data-v-be1d19fc><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener" data-v-be1d19fc>vue-devtools</a></li><li data-v-be1d19fc><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener" data-v-be1d19fc>vue-loader</a></li><li data-v-be1d19fc><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener" data-v-be1d19fc>awesome-vue</a></li></ul>',7);Object(r["popScopeId"])();const i=n((e,t,a,n,i,d)=>{const s=Object(r["resolveComponent"])("hook2");return Object(r["openBlock"])(),Object(r["createBlock"])("div",o,[Object(r["createVNode"])("h1",null,Object(r["toDisplayString"])(e.msg),1),c,Object(r["createVNode"])(s)])}),d=Object(r["withScopeId"])("data-v-5a8ccd6a"),s=d((e,t,a,n,o,c)=>(Object(r["openBlock"])(),Object(r["createBlock"])("div")));var l=Object(r["defineComponent"])({name:"Hook2",data(){return{}},mounted(){console.log(this)}});l.render=s,l.__scopeId="data-v-5a8ccd6a";var u=l,f=Object(r["defineComponent"])({name:"HelloWorld",components:{Hook2:u},props:{msg:String,enableCompApiService:{type:Boolean,default:!0},api:{type:Array,default:()=>[{apiMethod:"system.login",respMatch:"@data@",queryParamsMatch:{a:"{a.c}",c:"{msg}"},subApis:[{apiUrl:"/api1.json",respMatch:"@data@",queryParamsMatch:{a:"{a.c}",c:"{msg}"},mergeRelations:[{system:"system"}]}]}]}},data(){return{a:{c:1123}}},watch:{a:{handler(e,t){console.log("newVal",e),console.log("oldVal",t)},deep:!0}},mounted(){this.$watch(()=>this.a,(e,t)=>{console.log("newVal",e),console.log("oldVal",t)},{deep:!0,immediate:!1})},methods:{$loadServicesConfig(){console.log(" $loadServicesConfig111111111111")},$renderData(e){const{rendered:t=!1,renderData:a=[]}=e;!0!==t&&a&&a.length>0&&(e.rendered=!0,console.log(a))}}});a("d2cb");f.render=i,f.__scopeId="data-v-be1d19fc";t["default"]=f},bcc1:function(e,t,a){var r=a("79e7");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var n=a("499e").default;n("216ee752",r,!0,{sourceMap:!1,shadowMode:!1})},d2cb:function(e,t,a){"use strict";a("bcc1")}})}));
//# sourceMappingURL=index.js.map