!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r():"function"==typeof define&&define.amd?define([],r):"object"==typeof exports?exports.expgen=r():e.expgen=r().default}("undefined"!=typeof self?self:this,(function(){return window.expgen=function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=0)}([function(e,r,n){e.exports=n(1)},function(e,r,n){"use strict";n.r(r);function t(e){var r=this.exec(e);return r?1==r.length?[r[0]]:r.slice(1):[""]}function o(e){var r=this.unwrap(),n=[];-1==r.flags.indexOf("g")&&n.push("g"),-1==r.flags.indexOf("m")&&n.push("m"),n.length&&(r=new RegExp(r.source,r.flags+n.join("")));for(var t,o=e.matchAll(r),a=[];!(t=o.next()).done;)1==t.value.length?a.push(t.value[0]):a.push(t.value.slice(1));return a}function a(){return new RegExp(("^"!==this.source.charAt(0)?"^":"")+this.source+("$"!==this.source.charAt(this.source.length-1)?"$":""),this.flags)}function f(){var e=this.source.charAt(0),r=this.source.charAt(this.source.length-1),n=this.source.slice(1,-1);return new RegExp(("^"===e?"":e)+n+("$"===r?"":r),this.flags)}function i(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n]}function c(e,r){return r?e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,(function(e){return r.indexOf(e)>-1?e:"\\"+e})):e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}RegExp.prototype.pattern="",RegExp.prototype.get=function(e){return t.call(this,e)},RegExp.prototype.getAll=function(e){return o.call(this,e)},RegExp.prototype.wrap=function(){return a.call(this)},RegExp.prototype.unwrap=function(){return f.call(this)};var u=String.fromCharCode(193),g=String.fromCharCode(194),p=String.fromCharCode(195),l=String.fromCharCode(192),d={"?":String.fromCharCode(196),"(":String.fromCharCode(197),")":String.fromCharCode(198),"*":String.fromCharCode(199),"!":String.fromCharCode(200),"{":String.fromCharCode(201),"}":String.fromCharCode(202),"|":String.fromCharCode(203),"^":String.fromCharCode(204),$:String.fromCharCode(205),"@":String.fromCharCode(206),"+":String.fromCharCode(207),".":String.fromCharCode(208)},h={"?":String.fromCharCode(217),"(?:":String.fromCharCode(218),"(:":String.fromCharCode(219),")":String.fromCharCode(220),"[":String.fromCharCode(221),"]":String.fromCharCode(222),"!":String.fromCharCode(223),"^":String.fromCharCode(224),"{":String.fromCharCode(225),"}":String.fromCharCode(226),"*":String.fromCharCode(227)},s={"!":"[a-zA-Z0-9ㄱ-힣]","?":"(?:[a-zA-Z0-9ㄱ-힣]?)","{":"(","}":")","@":"\\D","#":"\\d"},C=Object.keys(s),x={"&ko":"ㄱ-힣","&en":"a-z","&EN":"A-Z","&d":"0-9","&w":"a-zA-Z0-9","&a":"a-zA-Z","&h":"0-9A-Fa-f","&sb":"\\-\\'\\\"!@#$%\\^&*\\(\\)\\{\\},.+~:;_|\\/?\\<\\>\\[\\]`\\\\"},m=Object.keys(x).sort((function(e,r){return r.length-e.length})),S=["|","^","$","@","+",".","*"],v="(png|jpg|jpeg|gif|tif|bmp|ai|svg|jpe|jfif|jp2|j2c|psd|tga|taga)",y={"&email":"{{[&a][&w-_]*}\\@{[&a][&w-_]*(\\.[&a]+){1,2}}}","&number":"{{[-+]?}{[&d]+}([.]{[&d]+})?({e[+][&d]+})?}","&domain":"{{http(s)?}://{[^\"';{}(),*]+}}","&hex":"{(0x|\\#){([&h]{3}|[&h]{6})}}","&rgb":"{rgb\\({[&d]+}, *{[&d]+}, *{[&d]+}\\)}","&rgba":"{rgba\\({[&d]+}, *{[&d]+}, *{[&d]+}, *{[&d]+([.][&d]+)?}\\)}","&img":"{{[^\"'(]*}[.]{".concat(v,"}}['\") ]*"),"&symbol":"{[&sb]+}","&imgext":"{".concat(v,"}")},b=/\[([^\[\]]+)\](\?)?/g,E=["^","-"],w=/\{((?:\d+)?,?(?:\d+)?)\}/g,O=/\(([^\(\)]+)\)(\?)?/,j=/\(([^\(\)]+)\)(\?)?/g;function R(e,r){"string"!=typeof r&&(r=void 0),Object.keys(y).sort((function(e,r){return r.length-e.length})).forEach((function(r){e.indexOf(r)>-1&&(e=e.replace(new RegExp(c(r),"g"),y[r]))}));var n=e,t=[];i("고정문자 시프트",e=e.replace(/\\./g,(function(e){return t.push(e),g+(t.length-1)+g})),t);var o=[];i("문자셋정규식 시프트",e=e.replace(b,(function(e,r,n){return r=c(r,E),m.forEach((function(e){r.indexOf(e)>-1&&(r=r.replace(new RegExp(c(e),"g"),h[x[e]]||x[e]))})),o.push(h["["]+r+h["]"]+(n?h[n]:"")),u+(o.length-1)+u})),o);var a=[];i("길이표현식{} 시프트",e=e.replace(w,(function(e,r,n){return a.push(h["{"]+r+h["}"]),l+(a.length-1)+l})),a);for(var f,v=[];O.test(e);)e=e.replace(j,(function(e,r,n){var t=h["(?:"]+r+h[")"]+(n?h[n]:"");v.push(t);var o=p+(v.length-1)+p;return i({found:e,word:r,q:n,key:o,cword:t}),o}));i("옵셔널 단어처리:",e,v),S.forEach((function(r){d[r]&&e.indexOf(r)>-1&&(e=e.replace(new RegExp(c(r),"g"),d[r]))})),i("정규식 문자 시프트:",e),C.forEach((function(r){d[r]&&e.indexOf(r)>-1&&(e=e.replace(new RegExp(c(r),"g"),d[r]))})),i("와일드카드 문자 시프트:",e),i("escape:",e=c(e)),C.forEach((function(r){d[r]&&e.indexOf(r)>-1&&(e=e.replace(new RegExp(d[r],"g"),r))})),i("와일드카드 문자 복구:",e),S.forEach((function(r){d[r]&&e.indexOf(r)>-1&&(e=e.replace(new RegExp(d[r],"g"),r))})),i("정규식 문자 복구:",e);for(var R=v.length-1;R>=0;R--)e=e.replace(p+R+p,v[R]);i("옵셔널단어 문자치환:",e);for(var A=a.length-1;A>=0;A--)e=e.replace(l+A+l,a[A]);for(var $ in i("길이표현식 문자치환:",e),d)e.indexOf(d[$])>-1&&(e=e.replace(new RegExp(d[$],"g"),$));i("1단계치환문자 복구",e),C.forEach((function(r){"function"==typeof s[r]?e=s[r](e):e.indexOf(r)>-1&&(e=e.replace(new RegExp(c(r),"g"),s[r]))})),i("와일드카드 정규식 처리:",e);for(var _=o.length-1;_>=0;_--)e=e.replace(u+_+u,o[_]);i("문자셋정규식 문자치환:",e);for(var k=t.length-1;k>=0;k--)f=g+k+g,e.indexOf(f)>-1&&(e=e.replace(new RegExp(f,"g"),t[k]));for(var z in i("고정문자 문자치환:",e),h)e.indexOf(h[z])>-1&&(e=e.replace(new RegExp(h[z],"g"),z));i("2단계치환문자 복구",e);var P=new RegExp("^"+e+"$",r);return P.pattern=n,P}R.presets=y,r.default=R}])}));
//# sourceMappingURL=expgen.js.map