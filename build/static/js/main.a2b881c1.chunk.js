(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{19:function(e,t,c){},20:function(e,t,c){},25:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c(0),r=c.n(a),s=c(12),i=c.n(s),l=(c(19),c(7)),o=c(27),j=c(28),d=c(13),x=c(30),h=c(29),b=c(31),u=(c(20),c(21),["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]);var O=function(){var e=u,t=Object(a.useState)("Ingrese texto a cifrar o descrifrar"),c=Object(l.a)(t,2),r=c[0],s=(c[1],Object(a.useState)({textoplano:"",c1:"",c2:"",secuencia:""})),i=Object(l.a)(s,2),O=i[0],p=i[1],f=Object(a.useState)(""),g=Object(l.a)(f,2),m=g[0],v=g[1],y=Object(a.useState)(""),C=Object(l.a)(y,2),T=C[0],w=C[1],L=Object(a.useState)([]),S=Object(l.a)(L,2),k=S[0],N=S[1],G=Object(a.createRef)(),I=function(){var e=function(){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:" ",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:" ";return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:" ").toLowerCase().replaceAll(e,t)}(O.textoplano," ","x"),t=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:" ",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";if(e.length<=t.split(",").length)return t.split(",");var c=Math.trunc(e.length/t.split(",").length);return(t+",").repeat(c+1).split(",")}(e,O.secuencia);return[e,t=function(e,t,c){return e.map((function(e){return Number("c1"===e?t:c)}))}(t,O.c1,O.c2)]},F=function(){var t=I(),c=Object(l.a)(t,2),n=function(t,c){for(var n,a="",r=0;r<t.length;r++)(n=e.indexOf(t[r]))+c[r]<e.length?a+=e[n+c[r]]:a+=e[n+c[r]-e.length];return a}(c[0],c[1]);v(n),E(O.textoplano,O.c1,O.c2,O.secuencia,n,"cifrado"),G.current.scrollIntoView({behavior:"smooth"})},B=function(){var t=I(),c=Object(l.a)(t,2),n=function(t,c){for(var n,a="",r=0;r<t.length;r++)(n=e.indexOf(t[r]))-c[r]<0?a+=e[e.length-Math.abs(n-c[r])]:a+=e[n-c[r]];return a}(c[0],c[1]);w(n),E(O.textoplano,O.c1,O.c2,O.secuencia,n,"descifrado"),G.current.scrollIntoView({behavior:"smooth"})},E=function(e,t,c,n,a,r){var s=k;s.push({tipo:r,texto:e,c1:t,c2:c,secuence:n,editedText:a}),N(s)},H=function(e){var t=O;O[e.target.id]=e.target.value,p(t),console.log(t)},M=function(e){"en"==e?F():B()};return Object(a.useEffect)((function(){return console.log(u),function(){}}),[]),Object(n.jsx)("div",{className:"App",style:{margin:"2%"},children:Object(n.jsxs)(o.a,{fluid:!0,children:[Object(n.jsxs)(j.a,{style:{margin:"10%"},children:[Object(n.jsx)(d.a,{xs:"2"}),Object(n.jsx)(d.a,{xs:"8",children:Object(n.jsx)("h2",{children:"Taller 2 Gestion de seguridad: Cifrado polialfabetico"})}),Object(n.jsx)(d.a,{xs:"2"})]}),Object(n.jsxs)(j.a,{children:[Object(n.jsxs)(d.a,{xs:!0,children:[Object(n.jsx)("p",{children:"Historial"}),Object(n.jsxs)("div",{style:{maxHeight:"500px",overflowX:"auto"},children:[k.map((function(e){return Object(n.jsxs)(x.a,{bg:"cifrado"===e.tipo?"secondary":"primary",text:"white",style:{width:"18rem"},className:"mb-2",children:[Object(n.jsx)(x.a.Header,{children:Object(n.jsx)("b",{children:e.tipo})}),Object(n.jsxs)(x.a.Body,{children:[Object(n.jsxs)(x.a.Title,{children:[" Texo: ",e.texto," "]}),Object(n.jsxs)(x.a.Text,{children:[Object(n.jsxs)("p",{children:["c1:",e.c1,", c2:",e.c2]}),Object(n.jsxs)("p",{children:["secuencia: ",e.secuence]}),Object(n.jsxs)("p",{children:["resultado: ",e.editedText]})]})]})]})})),Object(n.jsx)("div",{ref:G})]})]}),Object(n.jsx)(d.a,{xs:!0,children:Object(n.jsxs)(h.a,{children:[Object(n.jsxs)(h.a.Group,{children:[Object(n.jsx)(h.a.Label,{children:"texto"}),Object(n.jsx)(h.a.Control,{id:"textoplano",type:"text",placeholder:"textoplano",onChange:H}),Object(n.jsx)(h.a.Text,{className:"text-muted",children:r})]}),Object(n.jsxs)(j.a,{children:[Object(n.jsxs)(d.a,{children:[" ",Object(n.jsxs)(h.a.Group,{children:[Object(n.jsx)(h.a.Label,{children:"C1"}),Object(n.jsx)(h.a.Control,{id:"c1",type:"text",placeholder:"k=",onChange:H}),Object(n.jsx)(h.a.Text,{className:"text-muted",children:"corrimiento"})]})]}),Object(n.jsxs)(d.a,{children:[" ",Object(n.jsxs)(h.a.Group,{children:[Object(n.jsx)(h.a.Label,{children:"C2"}),Object(n.jsx)(h.a.Control,{id:"c2",type:"text",placeholder:"k=",onChange:H}),Object(n.jsx)(h.a.Text,{className:"text-muted",children:"corrimiento"})]})]})]}),Object(n.jsxs)(h.a.Group,{children:[Object(n.jsx)(h.a.Label,{children:"Secuencia"}),Object(n.jsx)(h.a.Control,{id:"secuencia",type:"text",placeholder:"secuencia",onChange:H}),Object(n.jsx)(h.a.Text,{className:"text-muted",children:"ej:c1,c2,c2"})]}),Object(n.jsx)(b.a,{variant:"primary",onClick:function(){M("en")},children:"Encriptar"}),Object(n.jsx)(b.a,{style:{marginLeft:"4%"},variant:"primary",onClick:function(){M("des")},children:"Desencriptar"})]})}),Object(n.jsxs)(d.a,{xs:!0,children:["Resultado encriptado:",Object(n.jsx)("p",{children:m})]}),Object(n.jsxs)(d.a,{xs:!0,children:["Resultado descifrado ",Object(n.jsx)("p",{children:T})]})]})]})})},p=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,32)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,s=t.getTTFB;c(e),n(e),a(e),r(e),s(e)}))};i.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(O,{})}),document.getElementById("root")),p()}},[[25,1,2]]]);
//# sourceMappingURL=main.a2b881c1.chunk.js.map