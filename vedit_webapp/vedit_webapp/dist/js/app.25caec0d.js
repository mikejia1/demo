(function(){"use strict";var e={3164:function(e,t,n){var r=n(9242),i=n(3396);function l(e,t,n,r,l,o){const a=(0,i.up)("SvgCanvas");return(0,i.wg)(),(0,i.j4)(a)}var o=n(7139);const a=e=>((0,i.dD)("data-v-374b995c"),e=e(),(0,i.Cn)(),e),s={class:"hello"},u={style:{"border-style":"solid"}},c=a((()=>(0,i._)("div",null," Upload an SVG file. ",-1))),f=a((()=>(0,i._)("div",null,[(0,i._)("br")],-1))),d={style:{"border-style":"solid"}},v=a((()=>(0,i._)("div",null," Import svg from a link. ",-1))),p=a((()=>(0,i._)("br",null,null,-1))),h={style:{"border-style":"solid"}},g=a((()=>(0,i._)("div",null,[(0,i.Uk)(" You can import multiple svgs at a time by supplying an API. Here is a sample: "),(0,i._)("p",{style:{"font-family":"courier"}},"https://mocki.io/v1/65edb577-03e3-49b6-a449-2da55050bd0f"),(0,i.Uk)(" Create your own API at "),(0,i._)("a",{href:"https://mocki.io"},"mock.io"),(0,i.Uk)(". ")],-1))),m=a((()=>(0,i._)("div",null,[(0,i._)("br")],-1))),b={style:{"border-style":"solid"}},y=["innerHTML"],w=a((()=>(0,i._)("rect",{class:"draggable",fill:"#b17bff",x:"4",y:"1",width:"30",height:"50",transform:"translate(10, 0)"},null,-1)));function _(e,t,n,l,a,_){return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",s,[(0,i._)("h1",null,(0,o.zw)(n.msg),1),(0,i._)("div",u,[c,(0,i._)("input",{type:"file",ref:"doc",onChange:t[0]||(t[0]=e=>_.readFile())},null,544),f]),(0,i._)("div",d,[v,(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":t[1]||(t[1]=t=>e.url=t)},null,512),[[r.nr,e.url]]),(0,i._)("input",{type:"button",value:"submit url link",onClick:t[2]||(t[2]=e=>_.readUrl())}),(0,i._)("div",null,[(0,i.Uk)((0,o.zw)(e.content),1),p])]),(0,i._)("div",h,[g,(0,i.wy)((0,i._)("input",{type:"text","onUpdate:modelValue":t[3]||(t[3]=t=>e.api=t)},null,512),[[r.nr,e.api]]),(0,i._)("input",{type:"button",value:"submit API link",onClick:t[4]||(t[4]=e=>_.fetchAPI())}),m])]),(0,i._)("div",b,[((0,i.wg)(),(0,i.iD)("svg",{xmlns:"http://www.w3.org/2000/svg",id:"canvas",viewBox:"0 0 600 400",onLoad:t[5]||(t[5]=(...e)=>_.makeDraggable&&_.makeDraggable(...e))},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.svgFiles,((e,t)=>((0,i.wg)(),(0,i.iD)("svg",{xmlns:"http://www.w3.org/2000/svg",key:t,innerHTML:e},null,8,y)))),128)),w],32))])],64)}n(7658);var k={name:"SvgCanvas",props:{msg:String},data:()=>({file:null,content:null,url:null,api:null,svgFiles:[]}),methods:{readFile(){this.file=this.$refs.doc.files[0];const e=new FileReader;this.file.name.includes(".svg")?(this.content="check the console for file output",e.onload=e=>{this.svgFiles.push(e.target.result)},e.onerror=e=>console.log(e),e.readAsText(this.file)):this.content="please select an svg file"},readUrl(){fetch("https://proxy.cors.sh/"+this.url).then((e=>e.blob())).then((e=>{e.text().then((e=>{this.svgFiles.push(e)}))}))},fetchAPI(){fetch(this.api).then((e=>e.json())).then((e=>{e.assets.forEach((e=>{this.url=e.url,this.readUrl(),this.url=null}))}))},makeDraggable(e){var t,n,r,i=e.target;function l(e){var t=i.getScreenCTM();return e.touches&&(e=e.touches[0]),{x:(e.clientX-t.e)/t.a,y:(e.clientY-t.f)/t.d}}function o(e){if(t=e.target,"canvas"!=t.id){n=l(e);var o=t.transform.baseVal;if(0===o.length||o.getItem(0).type!==SVGTransform.SVG_TRANSFORM_TRANSLATE){var a=i.createSVGTransform();a.setTranslate(0,0),t.transform.baseVal.insertItemBefore(a,0)}r=o.getItem(0),n.x-=r.matrix.e,n.y-=r.matrix.f}}function a(e){if(t){e.preventDefault();var i=l(e);r.setTranslate(i.x-n.x,i.y-n.y)}}function s(){t=!1,r=!1,n=!1}console.log(i+"makeDraggable"),i.addEventListener("mousedown",o),i.addEventListener("mousemove",a),i.addEventListener("mouseup",s),i.addEventListener("mouseleave",s)}}},x=n(89);const T=(0,x.Z)(k,[["render",_],["__scopeId","data-v-374b995c"]]);var O=T,C={name:"App",components:{SvgCanvas:O}};const S=(0,x.Z)(C,[["render",l]]);var A=S;(0,r.ri)(A).mount("#app")}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,n),l.exports}n.m=e,function(){var e=[];n.O=function(t,r,i,l){if(!r){var o=1/0;for(c=0;c<e.length;c++){r=e[c][0],i=e[c][1],l=e[c][2];for(var a=!0,s=0;s<r.length;s++)(!1&l||o>=l)&&Object.keys(n.O).every((function(e){return n.O[e](r[s])}))?r.splice(s--,1):(a=!1,l<o&&(o=l));if(a){e.splice(c--,1);var u=i();void 0!==u&&(t=u)}}return t}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[r,i,l]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};n.O.j=function(t){return 0===e[t]};var t=function(t,r){var i,l,o=r[0],a=r[1],s=r[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(i in a)n.o(a,i)&&(n.m[i]=a[i]);if(s)var c=s(n)}for(t&&t(r);u<o.length;u++)l=o[u],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(c)},r=self["webpackChunkvedit_webapp"]=self["webpackChunkvedit_webapp"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(3164)}));r=n.O(r)})();
//# sourceMappingURL=app.25caec0d.js.map