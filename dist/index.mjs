var e=/*#__PURE__*/function(){function e(e,t){this.data=e,this.query=""}var t=e.prototype;return t.where=function(){var e=[].slice.call(arguments);return this.makeAnd(),"function"==typeof e[0]?(this.query+="(",e[0](this),this.query+=")"):1===e.length?this.query+="(item."+e[0]+")":2===e.length?this.query+="(item."+e[0]+" == "+("string"==typeof e[1]?"'"+e[1]+"'":e[1])+")":3===e.length&&(this.query+="(item."+e[0]+" "+e[1]+" "+("string"==typeof e[2]?"'"+e[2]+"'":e[2])+")"),this},t.orWhere=function(){return this.query+=" || ",this.where.apply(this,[].slice.call(arguments))},t.whereIncludes=function(e,t,i){return void 0===i&&(i=null),this.makeAnd(),null==i?(this.query+="(item."+e+" ? item."+e+".includes('"+t+"') : false)",this):(this.query+="(item."+e+" ? item."+e+".some(element => element."+t+" === '"+i+"') : false)",this)},t.orWhereIncludes=function(e,t,i){return void 0===i&&(i=null),this.query+=" || ",this.whereIncludes(e,t,i),this},t.whereContains=function(e,t){return this.makeAnd(),this.query+="(item."+e+" ? item."+e+".toLowerCase().includes('"+t.toLowerCase()+"') : false)",this},t.orWhereContains=function(e,t){return this.query+=" || ",this.whereContains(e,t),this},t.whereIn=function(e,t){return this.makeAnd(),this.query+="(item."+e+" ? ['"+t.join("', '")+'\'].includes("" + item.'+e+") : false)",this},t.orWhereIn=function(e,t){return this.query+=" || ",this.whereIn(e,t),this},t.makeAnd=function(){this.query.slice(-1).includes(")")&&(this.query+=" && ")},t.stripEmpties=function(){this.query=this.query.replace(/&& \(\)/g,""),this.query=this.query.replace(/\(\)  &&/g,""),this.query=this.query.replace(/\(\) &&/g,"")},t.get=function(){var e=this;return this.stripEmpties(),this.data.filter(function(t){return new Function("item",'"use strict";return '+e.query+";")(t)})},e}();export{e as FilterBuilder};
//# sourceMappingURL=index.mjs.map
