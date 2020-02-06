/**
 * Browser Image Compression
 * v1.0.6
 * by Donald <donaldcwl@gmail.com>
 * https://github.com/Donaldcwl/browser-image-compression
 */

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).imageCompression=n()}(this,function(){"use strict";function _slicedToArray(e,n){return function _arrayWithHoles(e){if(Array.isArray(e))return e}(e)||function _iterableToArrayLimit(e,n){var r=[],t=!0,a=!1,i=void 0;try{for(var o,s=e[Symbol.iterator]();!(t=(o=s.next()).done)&&(r.push(o.value),!n||r.length!==n);t=!0);}catch(e){a=!0,i=e}finally{try{t||null==s.return||s.return()}finally{if(a)throw i}}return r}(e,n)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var e="undefined"!=typeof window&&window.cordova&&window.cordova.require("cordova/modulemapper"),CustomFile=e&&e.getOriginalSymbol(window,"File")||File,CustomFileReader=e&&e.getOriginalSymbol(window,"FileReader")||FileReader;function getDataUrlFromFile(e){return new Promise(function(n,r){var t=new CustomFileReader;t.onload=function(){return n(t.result)},t.onerror=function(e){return r(e)},t.readAsDataURL(e)})}function getFilefromDataUrl(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Date.now();return new Promise(function(t){for(var a=e.split(","),i=a[0].match(/:(.*?);/)[1],o=atob(a[1]),s=o.length,c=new Uint8Array(s);s--;)c[s]=o.charCodeAt(s);var u=new Blob([c],{type:i});u.name=n,u.lastModified=r,t(u)})}function loadImage(e){return new Promise(function(n,r){var t=new Image;t.onload=function(){return n(t)},t.onerror=function(e){return r(e)},t.src=e})}function drawImageInCanvas(e){var n=_slicedToArray(getNewCanvasAndCtx(e.width,e.height),2),r=n[0];return n[1].drawImage(e,0,0,r.width,r.height),r}function drawFileInCanvas(e){return new Promise(function(n,r){var t,a,i=function $Try_1_Post(){try{return a=drawImageInCanvas(t),n([t,a])}catch(e){return r(e)}},o=function $Try_1_Catch(n){try{return getDataUrlFromFile(e).then(function(e){try{return loadImage(e).then(function(e){try{return t=e,i()}catch(e){return r(e)}},r)}catch(e){return r(e)}},r)}catch(e){return r(e)}};try{return createImageBitmap(e).then(function(e){try{return t=e,i()}catch(e){return o()}},o)}catch(e){o()}})}function canvasToFile(e,n,r,t){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1;return new Promise(function(i,o){var s;return"function"==typeof OffscreenCanvas&&e instanceof OffscreenCanvas?e.convertToBlob({type:n,quality:a}).then(function(e){try{return(s=e).name=r,s.lastModified=t,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o):getFilefromDataUrl(e.toDataURL(n,a),r,t).then(function(e){try{return s=e,$If_4.call(this)}catch(e){return o(e)}}.bind(this),o);function $If_4(){return i(s)}})}function getExifOrientation(e){return new Promise(function(n,r){var t=new CustomFileReader;t.onload=function(e){var r=new DataView(e.target.result);if(65496!=r.getUint16(0,!1))return n(-2);for(var t=r.byteLength,a=2;a<t;){if(r.getUint16(a+2,!1)<=8)return n(-1);var i=r.getUint16(a,!1);if(a+=2,65505==i){if(1165519206!=r.getUint32(a+=2,!1))return n(-1);var o=18761==r.getUint16(a+=6,!1);a+=r.getUint32(a+4,o);var s=r.getUint16(a,o);a+=2;for(var c=0;c<s;c++)if(274==r.getUint16(a+12*c,o))return n(r.getUint16(a+12*c+8,o))}else{if(65280!=(65280&i))break;a+=r.getUint16(a,!1)}}return n(-1)},t.onerror=function(e){return r(e)},t.readAsArrayBuffer(e)})}function handleMaxWidthOrHeight(e,n){var r,t=e.width,a=e.height,i=n.maxWidthOrHeight,o=e;if(Number.isInteger(i)&&(t>i||a>i)){var s=_slicedToArray(getNewCanvasAndCtx(t,a),2);o=s[0],r=s[1],t>a?(o.width=i,o.height=a/t*i):(o.width=t/a*i,o.height=i),r.drawImage(e,0,0,o.width,o.height),cleanupMemory(e)}return o}function followExifOrientation(e,n){var r=e.width,t=e.height,a=_slicedToArray(getNewCanvasAndCtx(r,t),2),i=a[0],o=a[1];switch(4<n&&n<9?(i.width=t,i.height=r):(i.width=r,i.height=t),n){case 2:o.transform(-1,0,0,1,r,0);break;case 3:o.transform(-1,0,0,-1,r,t);break;case 4:o.transform(1,0,0,-1,0,t);break;case 5:o.transform(0,1,1,0,0,0);break;case 6:o.transform(0,1,-1,0,t,0);break;case 7:o.transform(0,-1,-1,0,t,r);break;case 8:o.transform(0,-1,1,0,0,r)}return o.drawImage(e,0,0,r,t),cleanupMemory(e),i}function getNewCanvasAndCtx(e,n){var r,t;try{t=(r=new OffscreenCanvas(e,n)).getContext("2d")}catch(e){t=(r=document.createElement("canvas")).getContext("2d")}return r.width=e,r.height=n,[r,t]}function cleanupMemory(e){e.width=0,e.height=0,e=null}function compress(e,n){return new Promise(function(r,t){var a,i,o,s,c,u,m,l,f,g;return a=n.maxIteration||10,i=1024*n.maxSizeMB*1024,drawFileInCanvas(e).then(function(d){try{var h=_slicedToArray(d,2);return h[0],o=h[1],s=handleMaxWidthOrHeight(o,n),new Promise(function(r,t){var a;if(!(a=n.exifOrientation))return getExifOrientation(e).then(function(e){try{return a=e,$If_2.call(this)}catch(e){return t(e)}}.bind(this),t);function $If_2(){return r(a)}return $If_2.call(this)}).then(function(d){try{return n.exifOrientation=d,c=followExifOrientation(s,n.exifOrientation),u=1,canvasToFile(c,e.type,e.name,e.lastModified,u).then(function(n){try{var d,h=function $Loop_3(){if(a--&&l.size>i){var n,r,o=_slicedToArray(getNewCanvasAndCtx(n=.9*g.width,r=.9*g.height),2);return f=o[0],o[1].drawImage(g,0,0,n,r),"image/jpeg"===e.type&&(u*=.9),canvasToFile(f,e.type,e.name,e.lastModified,u).then(function(e){try{return l=e,cleanupMemory(g),g=f,$Loop_3}catch(e){return t(e)}},t)}return[1]},p=function $Loop_3_exit(){return cleanupMemory(g),cleanupMemory(f),cleanupMemory(s),cleanupMemory(c),cleanupMemory(o),r(l)};return(m=n).size<=i?r(m):(l=m,g=c,(d=function(e){for(;e;){if(e.then)return void e.then(d,t);try{if(e.pop){if(e.length)return e.pop()?p.call(this):e;e=h}else e=e.call(this)}catch(e){return t(e)}}}.bind(this))(h))}catch(e){return t(e)}}.bind(this),t)}catch(e){return t(e)}}.bind(this),t)}catch(e){return t(e)}}.bind(this),t)})}var n,r=0;var t=function createWorker(e){return new Worker(URL.createObjectURL(new Blob(["(".concat(e,")()")])))}(function(){var e=!1;self.addEventListener("message",function(n){return new Promise(function(r,t){var a,i,o,s,c=n.data;a=c.file,i=c.id,o=c.imageCompressionLibUrl,s=c.options;var u=function $Try_1_Post(){try{return r()}catch(e){return t(e)}},m=function $Try_1_Catch(e){try{return self.postMessage({error:e.message+"\n"+e.stack,id:i}),u()}catch(e){return t(e)}};try{var l;return e||(importScripts(o),e=!0),imageCompression(a,s).then(function(e){try{return l=e,self.postMessage({file:l,id:i}),u()}catch(e){return m(e)}},m)}catch(e){m(e)}})})});function compressOnWebWorker(e,a){return new Promise(function(i,o){return new Promise(function(s,c){n||(n=function createSourceObject(e){return URL.createObjectURL(new Blob([e],{type:"application/javascript"}))}("\n    function imageCompression (){return (".concat(imageCompression,").apply(null, arguments)}\n\n    imageCompression.getDataUrlFromFile = ").concat(imageCompression.getDataUrlFromFile,"\n    imageCompression.getFilefromDataUrl = ").concat(imageCompression.getFilefromDataUrl,"\n    imageCompression.loadImage = ").concat(imageCompression.loadImage,"\n    imageCompression.drawImageInCanvas = ").concat(imageCompression.drawImageInCanvas,"\n    imageCompression.drawFileInCanvas = ").concat(imageCompression.drawFileInCanvas,"\n    imageCompression.canvasToFile = ").concat(imageCompression.canvasToFile,"\n    imageCompression.getExifOrientation = ").concat(imageCompression.getExifOrientation,"\n    imageCompression.handleMaxWidthOrHeight = ").concat(imageCompression.handleMaxWidthOrHeight,"\n    imageCompression.followExifOrientation = ").concat(imageCompression.followExifOrientation,"\n\n    getDataUrlFromFile = imageCompression.getDataUrlFromFile\n    getFilefromDataUrl = imageCompression.getFilefromDataUrl\n    loadImage = imageCompression.loadImage\n    drawImageInCanvas = imageCompression.drawImageInCanvas\n    drawFileInCanvas = imageCompression.drawFileInCanvas\n    canvasToFile = imageCompression.canvasToFile\n    getExifOrientation = imageCompression.getExifOrientation\n    handleMaxWidthOrHeight = imageCompression.handleMaxWidthOrHeight\n    followExifOrientation = imageCompression.followExifOrientation\n\n    getNewCanvasAndCtx = ").concat(getNewCanvasAndCtx,"\n    \n    CustomFileReader = FileReader\n    \n    CustomFile = File\n    \n    function _slicedToArray(arr, n) { return arr }\n\n    function compress (){return (").concat(compress,").apply(null, arguments)}\n    ")));var u=r++;return t.addEventListener("message",function handler(e){e.data.id===u&&(t.removeEventListener("message",handler),e.data.error&&o(new Error(e.data.error)),i(e.data.file))}),t.postMessage({file:e,id:u,imageCompressionLibUrl:n,options:a}),s()})})}function imageCompression(e,n){return new Promise(function(r,t){var a,i;if(n.maxSizeMB=n.maxSizeMB||Number.POSITIVE_INFINITY,n.useWebWorker="boolean"!=typeof n.useWebWorker||n.useWebWorker,!(e instanceof Blob||e instanceof CustomFile))return t(new Error("The file given is not an instance of Blob or File"));if(!/^image/.test(e.type))return t(new Error("The file given is not an image"));if(i="undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope,!n.useWebWorker||"function"!=typeof Worker||i)return compress(e,n).then(function(e){try{return a=e,$If_3.call(this)}catch(e){return t(e)}}.bind(this),t);var o=function(){try{return $If_3.call(this)}catch(e){return t(e)}}.bind(this),s=function $Try_1_Catch(r){try{return console.warn("Run compression in web worker failed:",r,", fall back to main thread"),compress(e,n).then(function(e){try{return a=e,o()}catch(e){return t(e)}},t)}catch(e){return t(e)}};try{return compressOnWebWorker(e,n).then(function(e){try{return a=e,o()}catch(e){return s(e)}},s)}catch(e){s(e)}function $If_3(){try{a.name=e.name,a.lastModified=e.lastModified}catch(e){}return r(a)}})}return imageCompression.getDataUrlFromFile=getDataUrlFromFile,imageCompression.getFilefromDataUrl=getFilefromDataUrl,imageCompression.loadImage=loadImage,imageCompression.drawImageInCanvas=drawImageInCanvas,imageCompression.drawFileInCanvas=drawFileInCanvas,imageCompression.canvasToFile=canvasToFile,imageCompression.getExifOrientation=getExifOrientation,imageCompression.handleMaxWidthOrHeight=handleMaxWidthOrHeight,imageCompression.followExifOrientation=followExifOrientation,imageCompression});
//# sourceMappingURL=browser-image-compression.js.map
