!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).orWhere=t()}(this,function(){var e=0;function t(t){return"__private_"+e+++"_"+t}function i(e,t){if(!Object.prototype.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}var n=require("lodash/fp"),r=n.flow,s=n.map,u=n.pick,o=n.filter,h=n.sortBy,c=n.groupBy,l=n.mapValues,y=/*#__PURE__*/t("nest"),f=/*#__PURE__*/t("stripEmpties"),a=/*#__PURE__*/function(){function e(){var e=this;Object.defineProperty(this,f,{value:p}),Object.defineProperty(this,y,{writable:!0,value:function(t){return function(n){if(!t.length)return n;var r=t[0],s=t.slice(1);return l(function(t){return i(e,y)[y](s)(t)})(c(r)(n))}}}),this.resetQuery()}var t=e.prototype;return t.select=function(e){return this.selectKeys=[].concat(new Set([].concat(this.selectKeys,e))),this},t.where=function(){var e=[].slice.call(arguments);return this.makeAnd(),"function"==typeof e[0]?(this.query+="(",e[0](this),this.query+=")"):1===e.length?this.query+="(item."+e[0]+")":2===e.length?this.query+="(item."+e[0]+" == "+("string"==typeof e[1]?'"'+e[1]+'"':e[1])+")":3===e.length&&(this.query+="(item."+e[0]+" "+e[1]+" "+("string"==typeof e[2]?'"'+e[2]+'"':e[2])+")"),this},t.orWhere=function(){return this.query+=" || ",this.where.apply(this,[].slice.call(arguments))},t.whereIncludes=function(e,t,i){return void 0===i&&(i=null),this.makeAnd(),null==i?(this.query+="(item."+e+" ? item."+e+".includes('"+t+"') : false)",this):(this.query+="(item."+e+" ? item."+e+".some(element => element."+t+" === '"+i+"') : false)",this)},t.orWhereIncludes=function(e,t,i){return void 0===i&&(i=null),this.query+=" || ",this.whereIncludes(e,t,i),this},t.whereContains=function(e,t){return this.makeAnd(),this.query+="(item."+e+" ? item."+e+".toLowerCase().includes('"+t.toLowerCase()+"') : false)",this},t.orWhereContains=function(e,t){return this.query+=" || ",this.whereContains(e,t),this},t.whereIn=function(e,t){return this.makeAnd(),this.query+="(item."+e+' ? ["'+t.join('", "')+"\"].includes('' + item."+e+") : false)",this},t.orWhereIn=function(e,t){return this.query+=" || ",this.whereIn(e,t),this},t.makeAnd=function(){this.query.slice(-1).includes(")")&&(this.query+=" && ")},t.sort=function(e){return this.sortKeys=[].concat(new Set([].concat(this.sortKeys,e))),this},t.group=function(e){return this.groupKeys=[].concat(new Set([].concat(this.groupKeys,e))),this},t.get=function(e){var t=this;i(this,f)[f]();var n=[];return this.selectKeys.length&&n.push(s(function(e){return u(t.selectKeys)(e)})),this.sortKeys.length&&n.push(h(this.sortKeys)),this.groupKeys.length&&n.push(i(this,y)[y](this.groupKeys)),r.apply(void 0,[o(function(e){return new Function("item","'use strict';return "+t.query+";")(e)})].concat(n))(e)},t.resetQuery=function(){this.query="",this.selectKeys=[],this.sortKeys=[],this.groupKeys=[]},e}();function p(){this.query=this.query.replace(/&& \(\)/g,""),this.query=this.query.replace(/\(\)\s\s&&/g,""),this.query=this.query.replace(/\(\)\s&&/g,"")}return a});
//# sourceMappingURL=index.umd.js.map
