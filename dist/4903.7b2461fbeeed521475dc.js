(self.webpackChunktelegram_t=self.webpackChunktelegram_t||[]).push([[4903],{44903:function(e,t,n){var i,o;"undefined"!=typeof self&&self,i=function(){"function"!=typeof Promise&&function(t){function n(e,t){return function(){e.apply(t,arguments)}}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],u(e,n(r,this),n(a,this))}function o(e){var t=this;return null===this._state?void this._deferreds.push(e):void h((function(){var n=t._state?e.onFulfilled:e.onRejected;if(null!==n){var i;try{i=n(t._value)}catch(t){return void e.reject(t)}e.resolve(i)}else(t._state?e.resolve:e.reject)(t._value)}))}function r(e){try{if(e===this)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t)return void u(n(t,e),n(r,this),n(a,this))}this._state=!0,this._value=e,s.call(this)}catch(e){a.call(this,e)}}function a(e){this._state=!1,this._value=e,s.call(this)}function s(){for(var e=0,t=this._deferreds.length;t>e;e++)o.call(this,this._deferreds[e]);this._deferreds=null}function l(e,t,n,i){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.resolve=n,this.reject=i}function u(e,t,n){var i=!1;try{e((function(e){i||(i=!0,t(e))}),(function(e){i||(i=!0,n(e))}))}catch(e){if(i)return;i=!0,n(e)}}var c=setTimeout,h="function"==typeof setImmediate&&setImmediate||function(e){c(e,1)},p=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){var n=this;return new i((function(i,r){o.call(n,new l(e,t,i,r))}))},i.all=function(){var e=Array.prototype.slice.call(1===arguments.length&&p(arguments[0])?arguments[0]:arguments);return new i((function(t,n){function i(r,a){try{if(a&&("object"==typeof a||"function"==typeof a)){var s=a.then;if("function"==typeof s)return void s.call(a,(function(e){i(r,e)}),n)}e[r]=a,0==--o&&t(e)}catch(e){n(e)}}if(0===e.length)return t([]);for(var o=e.length,r=0;r<e.length;r++)i(r,e[r])}))},i.resolve=function(e){return e&&"object"==typeof e&&e.constructor===i?e:new i((function(t){t(e)}))},i.reject=function(e){return new i((function(t,n){n(e)}))},i.race=function(e){return new i((function(t,n){for(var i=0,o=e.length;o>i;i++)e[i].then(t,n)}))},i._setImmediateFn=function(e){h=e},e.exports?e.exports=i:t.Promise||(t.Promise=i)}(this),"undefined"!=typeof window&&"function"!=typeof window.CustomEvent&&function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}(),"undefined"==typeof HTMLCanvasElement||HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(e,t,n){for(var i=atob(this.toDataURL(t,n).split(",")[1]),o=i.length,r=new Uint8Array(o),a=0;a<o;a++)r[a]=i.charCodeAt(a);e(new Blob([r],{type:t||"image/png"}))}});var t,n,i,o=["Webkit","Moz","ms"],r="undefined"!=typeof document?document.createElement("div").style:{},a=[1,8,3,6],s=[2,7,4,5];function l(e){if(e in r)return e;for(var t=e[0].toUpperCase()+e.slice(1),n=o.length;n--;)if((e=o[n]+t)in r)return e}function u(e,t){for(var n in e=e||{},t)t[n]&&t[n].constructor&&t[n].constructor===Object?(e[n]=e[n]||{},u(e[n],t[n])):e[n]=t[n];return e}function c(e){return u({},e)}function h(e){if("createEvent"in document){var t=document.createEvent("HTMLEvents");t.initEvent("change",!1,!0),e.dispatchEvent(t)}else e.fireEvent("onchange")}function p(e,t,n){if("string"==typeof t){var i=t;(t={})[i]=n}for(var o in t)e.style[o]=t[o]}function d(e,t){e.classList?e.classList.add(t):e.className+=" "+t}function m(e,t){for(var n in t)e.setAttribute(n,t[n])}function f(e){return parseInt(e,10)}function v(e,t){var n=e.naturalWidth,i=e.naturalHeight,o=t||b(e);if(o&&o>=5){var r=n;n=i,i=r}return{width:n,height:i}}n=l("transform"),t=l("transformOrigin"),i=l("userSelect");var g={translate3d:{suffix:", 0px"},translate:{suffix:""}},w=function(e,t,n){this.x=parseFloat(e),this.y=parseFloat(t),this.scale=parseFloat(n)};w.parse=function(e){return e.style?w.parse(e.style[n]):e.indexOf("matrix")>-1||e.indexOf("none")>-1?w.fromMatrix(e):w.fromString(e)},w.fromMatrix=function(e){var t=e.substring(7).split(",");return t.length&&"none"!==e||(t=[1,0,0,1,0,0]),new w(f(t[4]),f(t[5]),parseFloat(t[0]))},w.fromString=function(e){var t=e.split(") "),n=t[0].substring(re.globals.translate.length+1).split(","),i=t.length>1?t[1].substring(6):1,o=n.length>1?n[0]:0,r=n.length>1?n[1]:0;return new w(o,r,i)},w.prototype.toString=function(){var e=g[re.globals.translate].suffix||"";return re.globals.translate+"("+this.x+"px, "+this.y+"px"+e+") scale("+this.scale+")"};var y=function(e){if(!e||!e.style[t])return this.x=0,void(this.y=0);var n=e.style[t].split(" ");this.x=parseFloat(n[0]),this.y=parseFloat(n[1])};function b(e){return e.exifdata&&e.exifdata.Orientation?f(e.exifdata.Orientation):1}function x(e,t,n){var i=t.width,o=t.height,r=e.getContext("2d");switch(e.width=t.width,e.height=t.height,r.save(),n){case 2:r.translate(i,0),r.scale(-1,1);break;case 3:r.translate(i,o),r.rotate(180*Math.PI/180);break;case 4:r.translate(0,o),r.scale(1,-1);break;case 5:e.width=o,e.height=i,r.rotate(90*Math.PI/180),r.scale(1,-1);break;case 6:e.width=o,e.height=i,r.rotate(90*Math.PI/180),r.translate(0,-o);break;case 7:e.width=o,e.height=i,r.rotate(-90*Math.PI/180),r.translate(-i,o),r.scale(1,-1);break;case 8:e.width=o,e.height=i,r.translate(0,i),r.rotate(-90*Math.PI/180)}r.drawImage(t,0,0,i,o),r.restore()}function C(){var e,t,n,i,o,r,a=this,s=a.options.viewport.type?"cr-vp-"+a.options.viewport.type:null;a.options.useCanvas=a.options.enableOrientation||E.call(a),a.data={},a.elements={},e=a.elements.boundary=document.createElement("div"),n=a.elements.viewport=document.createElement("div"),t=a.elements.img=document.createElement("img"),i=a.elements.overlay=document.createElement("div"),a.options.useCanvas?(a.elements.canvas=document.createElement("canvas"),a.elements.preview=a.elements.canvas):a.elements.preview=t,d(e,"cr-boundary"),e.setAttribute("aria-dropeffect","none"),o=a.options.boundary.width,r=a.options.boundary.height,p(e,{width:o+(isNaN(o)?"":"px"),height:r+(isNaN(r)?"":"px")}),d(n,"cr-viewport"),s&&d(n,s),p(n,{width:a.options.viewport.width+"px",height:a.options.viewport.height+"px"}),n.setAttribute("tabindex",0),d(a.elements.preview,"cr-image"),m(a.elements.preview,{alt:"preview","aria-grabbed":"false"}),d(i,"cr-overlay"),a.element.appendChild(e),e.appendChild(a.elements.preview),e.appendChild(n),e.appendChild(i),d(a.element,"croppie-container"),a.options.customClass&&d(a.element,a.options.customClass),M.call(this),a.options.enableZoom&&R.call(a),a.options.enableResize&&_.call(a)}function E(){return this.options.enableExif&&window.EXIF}function _(){var e,t,n,o,r,a,s,l=this,u=document.createElement("div"),c=!1,h=50;function m(a){if((void 0===a.button||0===a.button)&&(a.preventDefault(),!c)){var s=l.elements.overlay.getBoundingClientRect();if(c=!0,t=a.pageX,n=a.pageY,e=-1!==a.currentTarget.className.indexOf("vertical")?"v":"h",o=s.width,r=s.height,a.touches){var u=a.touches[0];t=u.pageX,n=u.pageY}window.addEventListener("mousemove",f),window.addEventListener("touchmove",f),window.addEventListener("mouseup",v),window.addEventListener("touchend",v),document.body.style[i]="none"}}function f(i){var a=i.pageX,s=i.pageY;if(i.preventDefault(),i.touches){var c=i.touches[0];a=c.pageX,s=c.pageY}var d=a-t,m=s-n,f=l.options.viewport.height+m,v=l.options.viewport.width+d;"v"===e&&f>=h&&f<=r?(p(u,{height:f+"px"}),l.options.boundary.height+=m,p(l.elements.boundary,{height:l.options.boundary.height+"px"}),l.options.viewport.height+=m,p(l.elements.viewport,{height:l.options.viewport.height+"px"})):"h"===e&&v>=h&&v<=o&&(p(u,{width:v+"px"}),l.options.boundary.width+=d,p(l.elements.boundary,{width:l.options.boundary.width+"px"}),l.options.viewport.width+=d,p(l.elements.viewport,{width:l.options.viewport.width+"px"})),z.call(l),S.call(l),I.call(l),H.call(l),n=s,t=a}function v(){c=!1,window.removeEventListener("mousemove",f),window.removeEventListener("touchmove",f),window.removeEventListener("mouseup",v),window.removeEventListener("touchend",v),document.body.style[i]=""}d(u,"cr-resizer"),p(u,{width:this.options.viewport.width+"px",height:this.options.viewport.height+"px"}),this.options.resizeControls.height&&(d(a=document.createElement("div"),"cr-resizer-vertical"),u.appendChild(a)),this.options.resizeControls.width&&(d(s=document.createElement("div"),"cr-resizer-horisontal"),u.appendChild(s)),a&&(a.addEventListener("mousedown",m),a.addEventListener("touchstart",m)),s&&(s.addEventListener("mousedown",m),s.addEventListener("touchstart",m)),this.elements.boundary.appendChild(u)}function L(e){if(this.options.enableZoom){var t=this.elements.zoomer,n=Q(e,4);t.value=Math.max(parseFloat(t.min),Math.min(parseFloat(t.max),n)).toString()}}function R(){var e=this,t=e.elements.zoomerWrap=document.createElement("div"),n=e.elements.zoomer=document.createElement("input");function i(){B.call(e,{value:parseFloat(n.value),origin:new y(e.elements.preview),viewportRect:e.elements.viewport.getBoundingClientRect(),transform:w.parse(e.elements.preview)})}function o(t){var n,o;if("ctrl"===e.options.mouseWheelZoom&&!0!==t.ctrlKey)return 0;n=t.wheelDelta?t.wheelDelta/1200:t.deltaY?t.deltaY/1060:t.detail?t.detail/-60:0,o=e._currentZoom+n*e._currentZoom,t.preventDefault(),L.call(e,o),i.call(e)}d(t,"cr-slider-wrap"),d(n,"cr-slider"),n.type="range",n.step="0.0001",n.value="1",n.style.display=e.options.showZoomer?"":"none",n.setAttribute("aria-label","zoom"),e.element.appendChild(t),t.appendChild(n),e._currentZoom=1,e.elements.zoomer.addEventListener("input",i),e.elements.zoomer.addEventListener("change",i),e.options.mouseWheelZoom&&(e.elements.boundary.addEventListener("mousewheel",o),e.elements.boundary.addEventListener("DOMMouseScroll",o))}function B(e){var i=this,o=e?e.transform:w.parse(i.elements.preview),r=e?e.viewportRect:i.elements.viewport.getBoundingClientRect(),a=e?e.origin:new y(i.elements.preview);function s(){var e={};e[n]=o.toString(),e[t]=a.toString(),p(i.elements.preview,e)}if(i._currentZoom=e?e.value:i._currentZoom,o.scale=i._currentZoom,i.elements.zoomer.setAttribute("aria-valuenow",i._currentZoom),s(),i.options.enforceBoundary){var l=Z.call(i,r),u=l.translate,c=l.origin;o.x>=u.maxX&&(a.x=c.minX,o.x=u.maxX),o.x<=u.minX&&(a.x=c.maxX,o.x=u.minX),o.y>=u.maxY&&(a.y=c.minY,o.y=u.maxY),o.y<=u.minY&&(a.y=c.maxY,o.y=u.minY)}s(),Y.call(i),H.call(i)}function Z(e){var t=this,n=t._currentZoom,i=e.width,o=e.height,r=t.elements.boundary.clientWidth/2,a=t.elements.boundary.clientHeight/2,s=t.elements.preview.getBoundingClientRect(),l=s.width,u=s.height,c=i/2,h=o/2,p=-1*(c/n-r),d=-1*(h/n-a),m=1/n*c,f=1/n*h;return{translate:{maxX:p,minX:p-(l*(1/n)-i*(1/n)),maxY:d,minY:d-(u*(1/n)-o*(1/n))},origin:{maxX:l*(1/n)-m,minX:m,maxY:u*(1/n)-f,minY:f}}}function I(e){var i=this,o=i._currentZoom,r=i.elements.preview.getBoundingClientRect(),a=i.elements.viewport.getBoundingClientRect(),s=w.parse(i.elements.preview.style[n]),l=new y(i.elements.preview),u=a.top-r.top+a.height/2,c=a.left-r.left+a.width/2,h={},d={};if(e){var m=l.x,f=l.y,v=s.x,g=s.y;h.y=m,h.x=f,s.y=v,s.x=g}else h.y=u/o,h.x=c/o,d.y=(h.y-l.y)*(1-o),d.x=(h.x-l.x)*(1-o),s.x-=d.x,s.y-=d.y;var b={};b[t]=h.x+"px "+h.y+"px",b[n]=s.toString(),p(i.elements.preview,b)}function M(){var e,t,o,r,a,s=this,l=!1;function u(e,t){var n=s.elements.preview.getBoundingClientRect(),i=a.y+t,o=a.x+e;s.options.enforceBoundary?(r.top>n.top+t&&r.bottom<n.bottom+t&&(a.y=i),r.left>n.left+e&&r.right<n.right+e&&(a.x=o)):(a.y=i,a.x=o)}function c(e){s.elements.preview.setAttribute("aria-grabbed",e),s.elements.boundary.setAttribute("aria-dropeffect",e?"move":"none")}function d(n){if((void 0===n.button||0===n.button)&&(n.preventDefault(),!l)){if(l=!0,e=n.pageX,t=n.pageY,n.touches){var o=n.touches[0];e=o.pageX,t=o.pageY}c(l),a=w.parse(s.elements.preview),window.addEventListener("mousemove",m),window.addEventListener("touchmove",m),window.addEventListener("mouseup",f),window.addEventListener("touchend",f),document.body.style[i]="none",r=s.elements.viewport.getBoundingClientRect()}}function m(i){i.preventDefault();var r=i.pageX,l=i.pageY;if(i.touches){var c=i.touches[0];r=c.pageX,l=c.pageY}var d=r-e,m=l-t,f={};if("touchmove"===i.type&&i.touches.length>1){var v=i.touches[0],g=i.touches[1],w=Math.sqrt((v.pageX-g.pageX)*(v.pageX-g.pageX)+(v.pageY-g.pageY)*(v.pageY-g.pageY));o||(o=w/s._currentZoom);var y=w/o;return L.call(s,y),void h(s.elements.zoomer)}u(d,m),f[n]=a.toString(),p(s.elements.preview,f),z.call(s),t=l,e=r}function f(){c(l=!1),window.removeEventListener("mousemove",m),window.removeEventListener("touchmove",m),window.removeEventListener("mouseup",f),window.removeEventListener("touchend",f),document.body.style[i]="",I.call(s),H.call(s),o=0}s.elements.overlay.addEventListener("mousedown",d),s.elements.viewport.addEventListener("keydown",(function(e){var t;if(!e.shiftKey||38!==e.keyCode&&40!==e.keyCode){if(s.options.enableKeyMovement&&e.keyCode>=37&&e.keyCode<=40){e.preventDefault();var l=function(e){switch(e){case 37:return[1,0];case 38:return[0,1];case 39:return[-1,0];case 40:return[0,-1]}}(e.keyCode);a=w.parse(s.elements.preview),document.body.style[i]="none",r=s.elements.viewport.getBoundingClientRect(),function(e){var t={};u(e[0],e[1]),t[n]=a.toString(),p(s.elements.preview,t),z.call(s),document.body.style[i]="",I.call(s),H.call(s),o=0}(l)}}else t=38===e.keyCode?parseFloat(s.elements.zoomer.value)+parseFloat(s.elements.zoomer.step):parseFloat(s.elements.zoomer.value)-parseFloat(s.elements.zoomer.step),s.setZoom(t)})),s.elements.overlay.addEventListener("touchstart",d)}function z(){if(this.elements){var e=this,t=e.elements.boundary.getBoundingClientRect(),n=e.elements.preview.getBoundingClientRect();p(e.elements.overlay,{width:n.width+"px",height:n.height+"px",top:n.top-t.top+"px",left:n.left-t.left+"px"})}}y.prototype.toString=function(){return this.x+"px "+this.y+"px"};var k,F,W,X,Y=(k=z,F=500,function(){var e=this,t=arguments,n=W&&!X;clearTimeout(X),X=setTimeout((function(){X=null,W||k.apply(e,t)}),F),n&&k.apply(e,t)});function H(){var e,t=this,n=t.get();O.call(t)&&(t.options.update.call(t,n),t.$&&"undefined"==typeof Prototype?t.$(t.element).trigger("update.croppie",n):(window.CustomEvent?e=new CustomEvent("update",{detail:n}):(e=document.createEvent("CustomEvent")).initCustomEvent("update",!0,!0,n),t.element.dispatchEvent(e)))}function O(){return this.elements.preview.offsetHeight>0&&this.elements.preview.offsetWidth>0}function A(){var e,i=this,o={},r=i.elements.preview,a=new w(0,0,1),s=new y;O.call(i)&&!i.data.bound&&(i.data.bound=!0,o[n]=a.toString(),o[t]=s.toString(),o.opacity=1,p(r,o),e=i.elements.preview.getBoundingClientRect(),i._originalImageWidth=e.width,i._originalImageHeight=e.height,i.data.orientation=E.call(i)?b(i.elements.img):i.data.orientation,i.options.enableZoom?S.call(i,!0):i._currentZoom=1,a.scale=i._currentZoom,o[n]=a.toString(),p(r,o),i.data.points.length?j.call(i,i.data.points):N.call(i),I.call(i),z.call(i))}function S(e){var t,n,i,o,r=this,a=Math.max(r.options.minZoom,0)||0,s=r.options.maxZoom||1.5,l=r.elements.zoomer,u=parseFloat(l.value),c=r.elements.boundary.getBoundingClientRect(),p=v(r.elements.img,r.data.orientation),d=r.elements.viewport.getBoundingClientRect();r.options.enforceBoundary&&(i=d.width/p.width,o=d.height/p.height,a=Math.max(i,o)),a>=s&&(s=a+1),l.min=Q(a,4),l.max=Q(s,4),!e&&(u<l.min||u>l.max)?L.call(r,u<l.min?l.min:l.max):e&&(n=Math.max(c.width/p.width,c.height/p.height),t=null!==r.data.boundZoom?r.data.boundZoom:n,L.call(r,t)),h(l)}function j(e){if(4!==e.length)throw"Croppie - Invalid number of points supplied: "+e;var i=this,o=e[2]-e[0],r=i.elements.viewport.getBoundingClientRect(),a=i.elements.boundary.getBoundingClientRect(),s=r.left-a.left,l=r.top-a.top,u=r.width/o,c=e[1],h=e[0],d=-1*e[1]+l,m=-1*e[0]+s,f={};f[t]=h+"px "+c+"px",f[n]=new w(m,d,u).toString(),p(i.elements.preview,f),L.call(i,u),i._currentZoom=u}function N(){var e=this,t=e.elements.preview.getBoundingClientRect(),i=e.elements.viewport.getBoundingClientRect(),o=e.elements.boundary.getBoundingClientRect(),r=i.left-o.left,a=i.top-o.top,s=r-(t.width-i.width)/2,l=a-(t.height-i.height)/2,u=new w(s,l,e._currentZoom);p(e.elements.preview,n,u.toString())}function P(e){var t=this,n=t.elements.canvas,i=t.elements.img;n.getContext("2d").clearRect(0,0,n.width,n.height),n.width=i.width,n.height=i.height,x(n,i,t.options.enableOrientation&&e||b(i))}function T(e){var t=this,n=e.points,i=f(n[0]),o=f(n[1]),r=f(n[2])-i,a=f(n[3])-o,s=e.circle,l=document.createElement("canvas"),u=l.getContext("2d"),c=e.outputWidth||r,h=e.outputHeight||a;l.width=c,l.height=h,e.backgroundColor&&(u.fillStyle=e.backgroundColor,u.fillRect(0,0,c,h));var p=i,d=o,m=r,v=a,g=0,w=0,y=c,b=h;return i<0&&(p=0,g=Math.abs(i)/r*c),m+p>t._originalImageWidth&&(y=(m=t._originalImageWidth-p)/r*c),o<0&&(d=0,w=Math.abs(o)/a*h),v+d>t._originalImageHeight&&(b=(v=t._originalImageHeight-d)/a*h),u.drawImage(this.elements.preview,p,d,m,v,g,w,y,b),s&&(u.fillStyle="#fff",u.globalCompositeOperation="destination-in",u.beginPath(),u.arc(l.width/2,l.height/2,l.width/2,0,2*Math.PI,!0),u.closePath(),u.fill()),l}function D(e){var t=e.points,n=document.createElement("div"),i=document.createElement("img"),o=t[2]-t[0],r=t[3]-t[1];return d(n,"croppie-result"),n.appendChild(i),p(i,{left:-1*t[0]+"px",top:-1*t[1]+"px"}),i.src=e.url,p(n,{width:o+"px",height:r+"px"}),n}function q(e){return T.call(this,e).toDataURL(e.format,e.quality)}function K(e){var t=this;return new Promise((function(n){T.call(t,e).toBlob((function(e){n(e)}),e.format,e.quality)}))}function U(e){this.elements.img.parentNode&&(Array.prototype.forEach.call(this.elements.img.classList,(function(t){e.classList.add(t)})),this.elements.img.parentNode.replaceChild(e,this.elements.img),this.elements.preview=e),this.elements.img=e}function $(e,t){var n,i=this,o=[],r=null,a=E.call(i);if("string"==typeof e)n=e,e={};else if(Array.isArray(e))o=e.slice();else{if(void 0===e&&i.data.url)return A.call(i),H.call(i),null;n=e.url,o=e.points||[],r=void 0===e.zoom?null:e.zoom}return i.data.bound=!1,i.data.url=n||i.data.url,i.data.boundZoom=r,function(e,t){if(!e)throw"Source image missing";var n=new Image;return n.style.opacity="0",new Promise((function(i,o){function r(){n.style.opacity="1",setTimeout((function(){i(n)}),1)}n.removeAttribute("crossOrigin"),e.match(/^https?:\/\/|^\/\//)&&n.setAttribute("crossOrigin","anonymous"),n.onload=function(){t?EXIF.getData(n,(function(){r()})):r()},n.onerror=function(e){n.style.opacity=1,setTimeout((function(){o(e)}),1)},n.src=e}))}(n,a).then((function(n){if(U.call(i,n),o.length)i.options.relative&&(o=[o[0]*n.naturalWidth/100,o[1]*n.naturalHeight/100,o[2]*n.naturalWidth/100,o[3]*n.naturalHeight/100]);else{var r,a,s=v(n),l=i.elements.viewport.getBoundingClientRect(),u=l.width/l.height;s.width/s.height>u?r=(a=s.height)*u:(r=s.width,a=s.height/u);var c=(s.width-r)/2,h=(s.height-a)/2,p=c+r,d=h+a;i.data.points=[c,h,p,d]}i.data.orientation=e.orientation||1,i.data.points=o.map((function(e){return parseFloat(e)})),i.options.useCanvas&&P.call(i,i.data.orientation),A.call(i),H.call(i),t&&t()}))}function Q(e,t){return parseFloat(e).toFixed(t||0)}function G(){var e=this,t=e.elements.preview.getBoundingClientRect(),n=e.elements.viewport.getBoundingClientRect(),i=n.left-t.left,o=n.top-t.top,r=(n.width-e.elements.viewport.offsetWidth)/2,a=(n.height-e.elements.viewport.offsetHeight)/2,s=i+e.elements.viewport.offsetWidth+r,l=o+e.elements.viewport.offsetHeight+a,u=e._currentZoom;(u===1/0||isNaN(u))&&(u=1);var c=e.options.enforceBoundary?0:Number.NEGATIVE_INFINITY;return i=Math.max(c,i/u),o=Math.max(c,o/u),s=Math.max(c,s/u),l=Math.max(c,l/u),{points:[Q(i),Q(o),Q(s),Q(l)],zoom:u,orientation:e.data.orientation}}var V={type:"canvas",format:"png",quality:1},J=["jpeg","webp","png"];function ee(e){var t=this,n=G.call(t),i=u(c(V),c(e)),o="string"==typeof e?e:i.type||"base64",r=i.size||"viewport",a=i.format,s=i.quality,l=i.backgroundColor,h="boolean"==typeof i.circle?i.circle:"circle"===t.options.viewport.type,p=t.elements.viewport.getBoundingClientRect(),d=p.width/p.height;return"viewport"===r?(n.outputWidth=p.width,n.outputHeight=p.height):"object"==typeof r&&(r.width&&r.height?(n.outputWidth=r.width,n.outputHeight=r.height):r.width?(n.outputWidth=r.width,n.outputHeight=r.width/d):r.height&&(n.outputWidth=r.height*d,n.outputHeight=r.height)),J.indexOf(a)>-1&&(n.format="image/"+a,n.quality=s),n.circle=h,n.url=t.data.url,n.backgroundColor=l,new Promise((function(e){switch(o.toLowerCase()){case"rawcanvas":e(T.call(t,n));break;case"canvas":case"base64":e(q.call(t,n));break;case"blob":K.call(t,n).then(e);break;default:e(D.call(t,n))}}))}function te(){A.call(this)}function ne(e){if(!this.options.useCanvas||!this.options.enableOrientation)throw"Croppie: Cannot rotate without enableOrientation && EXIF.js included";var t,n,i,o,r,l=this,u=l.elements.canvas;if(l.data.orientation=(t=l.data.orientation,n=e,i=a.indexOf(t)>-1?a:s,o=i.indexOf(t),r=n/90%i.length,i[(i.length+o+r%i.length)%i.length]),x(u,l.elements.img,l.data.orientation),I.call(l,!0),S.call(l),Math.abs(e)/90%2==1){var c=l._originalImageHeight,h=l._originalImageWidth;l._originalImageWidth=c,l._originalImageHeight=h}}function ie(){var e,t,n=this;n.element.removeChild(n.elements.boundary),e=n.element,t="croppie-container",e.classList?e.classList.remove(t):e.className=e.className.replace(t,""),n.options.enableZoom&&n.element.removeChild(n.elements.zoomerWrap),delete n.elements}if("undefined"!=typeof window&&window.jQuery){var oe=window.jQuery;oe.fn.croppie=function(e){if("string"==typeof e){var t=Array.prototype.slice.call(arguments,1),n=oe(this).data("croppie");return"get"===e?n.get():"result"===e?n.result.apply(n,t):"bind"===e?n.bind.apply(n,t):this.each((function(){var n=oe(this).data("croppie");if(n){var i=n[e];if(!oe.isFunction(i))throw"Croppie "+e+" method not found";i.apply(n,t),"destroy"===e&&oe(this).removeData("croppie")}}))}return this.each((function(){var t=new re(this,e);t.$=oe,oe(this).data("croppie",t)}))}}function re(e,t){if(e.className.indexOf("croppie-container")>-1)throw new Error("Croppie: Can't initialize croppie more than once");if(this.element=e,this.options=u(c(re.defaults),t),"img"===this.element.tagName.toLowerCase()){var n=this.element;d(n,"cr-original-image"),m(n,{"aria-hidden":"true",alt:""});var i=document.createElement("div");this.element.parentNode.appendChild(i),i.appendChild(n),this.element=i,this.options.url=this.options.url||n.src}if(C.call(this),this.options.url){var o={url:this.options.url,points:this.options.points};delete this.options.url,delete this.options.points,$.call(this,o)}}return re.defaults={viewport:{width:100,height:100,type:"square"},boundary:{},orientationControls:{enabled:!0,leftClass:"",rightClass:""},resizeControls:{width:!0,height:!0},customClass:"",showZoomer:!0,enableZoom:!0,enableResize:!1,mouseWheelZoom:!0,enableExif:!1,enforceBoundary:!0,enableOrientation:!1,enableKeyMovement:!0,update:function(){}},re.globals={translate:"translate3d"},u(re.prototype,{bind:function(e,t){return $.call(this,e,t)},get:function(){var e=G.call(this),t=e.points;return this.options.relative&&(t[0]/=this.elements.img.naturalWidth/100,t[1]/=this.elements.img.naturalHeight/100,t[2]/=this.elements.img.naturalWidth/100,t[3]/=this.elements.img.naturalHeight/100),e},result:function(e){return ee.call(this,e)},refresh:function(){return te.call(this)},setZoom:function(e){L.call(this,e),h(this.elements.zoomer)},rotate:function(e){ne.call(this,e)},destroy:function(){return ie.call(this)}}),re},void 0===(o=i.call(t,n,t,e))||(e.exports=o)}}]);
//# sourceMappingURL=4903.7b2461fbeeed521475dc.js.map
