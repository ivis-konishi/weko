(this["webpackJsonpweko-facet-search"]=this["webpackJsonpweko-facet-search"]||[]).push([[0],{69:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),s=a(10),i=a.n(s),r=a(36),l=a(37),o=a(14),d=a(42),h=a(41),u=(a(17),a(18),a(28)),b=a(16),f=a(71),j=a(40),g=a(4);var p=function(e){for(var t=e.values,a=e.name,n=e.labels,c=window.location.search.replace(",","%2C")||"?",s=window.location.search.substring(1).split("&"),i=0;i<s.length;i++)s[i]=decodeURIComponent(s[i]);var r=[],l=[];return t&&t.map((function(e,t){var c={label:(n[e.key]||e.key)+"("+e.doc_count+")",value:e.key};l.push(c);var i=a+"="+e.key;-1!=s.indexOf(i)&&r.push(c)})),Object(g.jsx)("div",{children:Object(g.jsx)("div",{className:"select-container",children:Object(g.jsx)(j.a,{defaultValue:r,isMulti:!0,name:"Facet_Search",onChange:function(e){!function(e){var t="";if(c.indexOf("&")>=0){for(var n=c.split("&"),s=0;s<n.length;s++)n[s].indexOf(encodeURIComponent(a)+"=")<0&&(t+="&"+n[s]);t=t.substring(1)}""!=t&&(c=t),e.map((function(e,t){var n=encodeURIComponent(a)+"="+encodeURIComponent(e.value);c+="&"+n})),c=c.replace("q=0","q="),c+=-1==c.indexOf("is_facet_search=")?"&is_facet_search=true":"",window.location.href="/search"+c}(e)},options:l,className:"basic-multi-select",classNamePrefix:"select"})})})};a(39);function O(e){return"Temporal"===e}for(var v=function(e){var t=e.item,a=e.nameshow,c=e.name,s=e.key,i=e.labels,r=window.location.search.replace(",","%2C").indexOf(encodeURIComponent(c))>=0,l=Object(n.useState)(r),o=Object(b.a)(l,2),d=o[0],h=o[1];return Object(g.jsxs)("div",{className:"panel panel-default",children:[Object(g.jsxs)("div",{className:"panel-heading clearfix",children:[Object(g.jsx)("h3",{className:"panel-title pull-left",children:a}),Object(g.jsxs)("a",{className:"pull-right",onClick:function(){return h(!d)},children:[!d&&Object(g.jsx)("span",{children:Object(g.jsx)("i",{className:"glyphicon glyphicon-chevron-right"})}),d&&Object(g.jsx)("span",{children:Object(g.jsx)("i",{className:"glyphicon glyphicon-chevron-down"})})]})]}),Object(g.jsx)(f.a,{isOpen:d,children:Object(g.jsxs)("div",{className:"panel-body index-body",children:[!O(c)&&Object(g.jsx)(p,{values:t.buckets,name:c,labels:i}),O(c)&&!1]})})]},s)},m={},_=document.getElementsByClassName("body-facet-search-label"),x=0;x<_.length;x++)m[_[x].id]=_[x].value;var y=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).state={is_enable:!0,list_title:{},list_facet:{},list_order:{}},n.getTitleAndOrder=n.getTitleAndOrder.bind(Object(o.a)(n)),n.get_facet_search_list=n.get_facet_search_list.bind(Object(o.a)(n)),n.convertData=n.convertData.bind(Object(o.a)(n)),n}return Object(l.a)(a,[{key:"getTitleAndOrder",value:function(){var e=this,t={},a={};Object(u.a)("/facet-search/get-title-and-order",{method:"POST"}).then((function(e){return e.json()})).then((function(n){n.status&&(t=n.data.titles,a=n.data.order),e.setState({list_title:t}),e.setState({list_order:a})}))}},{key:"get_facet_search_list",value:function(){var e=this,t=new URLSearchParams(window.location.search),a=2==t.get("search_type")?"/api/index/":"/api/records/";Object(u.a)(a+"?"+t.toString()).then((function(e){return e.json()})).then((function(a){if(2==t.get("search_type")){var n=a&&a.aggregations&&a.aggregations.aggregations?a.aggregations.aggregations[0]:{};e.convertData(n)}else e.convertData(a&&a.aggregations?a.aggregations:{})}))}},{key:"convertData",value:function(e){var t={},a=this.state.list_order;e&&Object.keys(a).map((function(n,c){t[a[n]]={buckets:[]},Object.keys(e).map((function(c,s){if(a[n]==c){var i=e[c][c]?e[c][c]:e[c],r=i.key&&i.key.hasOwnProperty("buckets");(r=i.hasOwnProperty("buckets")||r)&&(t[c]=i[c]?i[c]:i)}}))})),this.setState({list_facet:t})}},{key:"componentDidMount",value:function(){this.getTitleAndOrder(),this.get_facet_search_list()}},{key:"render",value:function(){var e=this.state,t=e.is_enable,a=e.list_title,n=e.list_facet;return Object(g.jsx)("div",{children:t&&Object(g.jsx)("div",{className:"facet-search break-word",children:Object.keys(n).map((function(e,t){var c=n[e],s=a[e];return Object(g.jsx)(v,{item:c,nameshow:s,name:e,labels:m},t)}))})})}}]),a}(c.a.Component);i.a.render(Object(g.jsx)(c.a.StrictMode,{children:Object(g.jsx)(y,{})}),document.getElementById("app-facet-search"))}},[[69,1,2]]]);
//# sourceMappingURL=main.5153bba4.chunk.js.map