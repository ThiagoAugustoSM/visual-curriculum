(this["webpackJsonpvisual-curriculum"]=this["webpackJsonpvisual-curriculum"]||[]).push([[0],{76:function(e,t,r){"use strict";r.r(t);var i=r(3),c=r(1),a=r.n(c),s=r(61),n=r.n(s),o=r(62),l=r(8),j=r(89),u=r(99),d=r(78),b=r(98),m=r(96),O=r(86),x=r(87),h=r(65),g=r(77),p=r(28),f=r.p+"static/media/peacock-logo.c54a9c97.png",v=function(){var e=Object(d.b)(),t=e.colorMode,r=e.toggleColorMode;return Object(i.jsxs)(b.a,{direction:"row",align:"center",justify:"space-between",flexWrap:"wrap",children:[Object(i.jsxs)(b.a,{direction:"row",align:"center",children:[Object(i.jsx)(m.a,{boxSize:"100px",src:f,alt:"Imagem de um pav\xe3o representando a logo do Visual Curriculum"}),Object(i.jsxs)(b.a,{direction:"column",textAlign:"left",children:[Object(i.jsx)(O.a,{as:"h2",fontSize:["3xl","4xl"],children:"Visual Curriculum"}),Object(i.jsx)(x.a,{children:"Uma nova forma de visualizar a sua grade curricular!"})]})]}),Object(i.jsxs)(b.a,{direction:"row",flexWrap:"wrap",align:"center",spacing:[0,0,4],children:[Object(i.jsx)(h.a,{marginY:"2",colorScheme:"blue",variant:"outline",rightIcon:Object(i.jsx)(g.a,{as:p.a}),children:"Quero contribuir!"}),Object(i.jsxs)(h.a,{onClick:r,rightIcon:"light"===t?Object(i.jsx)(g.a,{as:p.c}):Object(i.jsx)(g.a,{as:p.d}),children:["Colocar em modo ","light"===t?"escuro?":"claro?"]})]})]})},w=r(88),y=function(){return Object(i.jsxs)(w.a,{size:"20",m:"3",separator:"/",children:[Object(i.jsx)(w.b,{children:Object(i.jsx)(w.c,{href:"#",children:"UFPE"})}),Object(i.jsx)(w.b,{children:Object(i.jsx)(w.c,{href:"#",isCurrentPage:!0,children:"Engenharia da Computa\xe7\xe3o"})})]})},S=r(90),C=function(e){switch(e){case 1:return"gray";case 2:return"red";case 3:return"orange";case 4:return"yellow";case 5:return"green";case 6:return"teal";case 7:return"blue";case 8:return"cyan";case 9:return"purple";case 9:return"pink";default:return"gray"}},z=function(e){var t=e.semester,r=e.isObligatory,a=e.name,s=e.hours,n=e.credits,o=e.id,u=e.onClick,b=Object(c.useState)(!1),m=Object(l.a)(b,2),O=m[0],x=m[1],h=Object(d.b)(),g=h.colorMode,p=(h.toggleColorMode,Object(c.useState)("white")),f=Object(l.a)(p,2),v=f[0],w=f[1],y=Object(c.useState)(""),z=Object(l.a)(y,2),H=z[0],E=z[1];return Object(i.jsx)(j.a,{id:o,onClick:function(){!0===O?(w("white"),E("gray.800")):(w("green.200"),E("green.500")),u({isActive:!O,id:o,isObligatory:r,hours:s}),x(!O)},m:"3",minW:"200px",maxW:"sm",borderWidth:"1px",borderRadius:"lg",overflow:"hidden",bgColor:"light"===g?v:H,children:Object(i.jsxs)(j.a,{p:"4",children:[Object(i.jsxs)(j.a,{d:"flex",alignItems:"baseline",children:[Object(i.jsxs)(S.a,{borderRadius:"full",px:"2",colorScheme:C(t),children:[t," \xba Per\xedodo"]}),Object(i.jsx)(j.a,{color:"gray.500",fontWeight:"semibold",letterSpacing:"wide",fontSize:"xs",textTransform:"uppercase",ml:"2",children:r?"Obrigat\xf3ria":"Eletiva"})]}),Object(i.jsx)(j.a,{mt:"1",fontWeight:"semibold",as:"h4",lineHeight:"tight",isTruncated:!0,children:a}),Object(i.jsxs)(j.a,{children:[s,Object(i.jsx)(j.a,{as:"span",color:"gray.600",fontSize:"sm",children:"HRs"})]}),Object(i.jsxs)(j.a,{children:[n,Object(i.jsx)(j.a,{as:"span",ml:"1",color:"gray.600",fontSize:"sm",children:"cr\xe9dito(s)"})]})]})})},H=r(97),E=function(e){var t=e.title,r=e.total,c=e.partial,a=(c/r*100).toFixed(2);return Object(i.jsx)(j.a,{minW:"200px",maxW:"md",borderWidth:"1px",borderRadius:"lg",overflow:"hidden",m:"3",children:Object(i.jsxs)(j.a,{p:"4",d:"flex",flexDir:"column",alignItems:"flex-start",justifyContent:"center",children:[Object(i.jsx)(x.a,{as:"h4",fontWeight:"semibold",lineHeight:"tight",isTruncated:!0,children:t}),Object(i.jsx)(j.a,{w:"100%",mt:"1",children:Object(i.jsx)(H.a,{hasStripe:!0,size:"md",value:a})}),Object(i.jsx)(j.a,{children:Object(i.jsxs)(x.a,{children:[a,Object(i.jsx)(j.a,{as:"span",color:"gray.600",fontSize:"sm",children:"%"})]})}),Object(i.jsxs)(j.a,{flexDir:"row",children:[c,Object(i.jsx)(j.a,{as:"span",color:"gray.600",fontSize:"sm",children:"/"}),r,Object(i.jsx)(j.a,{as:"span",color:"gray.600",fontSize:"sm",children:"HRs"})]})]})})},L=function(e){var t=e.academicTotalDone,r=e.academicObligatoryDone,c=e.academicElectiveDone,a=e.totalHours,s=e.totalHoursObligatory,n=e.totalHoursElective;return Object(i.jsxs)(b.a,{children:[Object(i.jsx)(O.a,{as:"h2",size:"lg",marginY:"2",children:"Aproveitamento Acad\xeamico"}),Object(i.jsxs)(j.a,{w:"100%",d:"flex",flexWrap:"wrap",children:[Object(i.jsx)(E,{title:"Total",partial:t,total:a}),Object(i.jsx)(E,{title:"Obrigat\xf3ria",partial:r,total:s}),Object(i.jsx)(E,{title:"Eletivas",partial:c,total:n})]})]})},W=r(91),k=r(36),A=function(){return Object(i.jsxs)(b.a,{children:[Object(i.jsx)(O.a,{as:"h2",size:"lg",marginY:"2",children:"Sobre o Projeto"}),Object(i.jsx)(x.a,{children:"Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"}),Object(i.jsxs)(W.a,{spacing:3,children:[Object(i.jsxs)(W.c,{children:[Object(i.jsx)(W.b,{as:k.a,color:"green.500"}),"Lorem ipsum dolor sit amet, consectetur adipisicing elit"]}),Object(i.jsxs)(W.c,{children:[Object(i.jsx)(W.b,{as:k.a,color:"green.500"}),"Assumenda, quia temporibus eveniet a libero incidunt suscipit"]}),Object(i.jsxs)(W.c,{children:[Object(i.jsx)(W.b,{as:k.a,color:"green.500"}),"Quidem, ipsam illum quis sed voluptatum quae eum fugit earum"]}),Object(i.jsxs)(W.c,{children:[Object(i.jsx)(W.b,{as:k.b,color:"green.500"}),"Quidem, ipsam illum quis sed voluptatum quae eum fugit earum"]})]})]})},D=r(92),T=function(){return Object(i.jsxs)(b.a,{align:"center",mt:"5",children:[Object(i.jsx)(x.a,{children:"Feito com \ud83d\udc99 em Recife, por Thiago Augusto"}),Object(i.jsxs)(b.a,{spacing:3,direction:"row",children:[Object(i.jsx)(D.a,{size:"sm","aria-label":"Abrir Linkedin",icon:Object(i.jsx)(g.a,{as:p.b})}),Object(i.jsx)(D.a,{size:"sm","aria-label":"Abrir Linkedin",icon:Object(i.jsx)(g.a,{as:p.a})})]})]})};var F=function(){var e=Object(c.useState)({}),t=Object(l.a)(e,2),r=t[0],a=t[1],s=Object(c.useState)(0),n=Object(l.a)(s,2),d=n[0],b=n[1],m=Object(c.useState)(0),O=Object(l.a)(m,2),x=O[0],h=O[1],g=Object(c.useState)(0),p=Object(l.a)(g,2),f=p[0],w=p[1],S=function(e){var t=e.isActive,r=(e.id,e.isObligatory),i=e.hours;t?(r?h(x+i):w(f+i),b(d+i)):(r?h(x-i):w(f-i),b(d-i))};Object(c.useEffect)((function(){fetch("./university/UFPE/engenhariaDaComputacao.json").then((function(e){return e.json()})).then((function(e){return a(e)}))}),[]);var C=Array.from({length:null===r||void 0===r?void 0:r.semesters},(function(e,t){return t+1}));return Object(i.jsxs)(j.a,{m:"5",children:[Object(i.jsx)(v,{}),Object(i.jsx)(y,{}),Object(i.jsx)(j.a,{w:"100%",maxH:"60vh",overflow:"scroll",children:C.map((function(e){return Object(i.jsx)(j.a,{d:"flex",w:"100%",children:null===r||void 0===r?void 0:r.disciplines.filter((function(t){return t.semester===e})).map((function(e){return Object(i.jsx)(z,Object(o.a)({id:e.code,onClick:S},e),e.name)}))},"row-".concat(e))}))}),Object(i.jsxs)(u.a,{columns:[1,2],spacing:"5",children:[Object(i.jsx)(L,{academicTotalDone:d,academicObligatoryDone:x,academicElectiveDone:f,totalHours:null===r||void 0===r?void 0:r.totalHours,totalHoursObligatory:null===r||void 0===r?void 0:r.totalHoursObligatory,totalHoursElective:null===r||void 0===r?void 0:r.totalHoursElective}),Object(i.jsx)(A,{})]}),Object(i.jsx)(T,{})]})},I=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,100)).then((function(t){var r=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;r(e),i(e),c(e),a(e),s(e)}))},P=r(95),R=r(93),q=r(94);n.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsxs)(P.a,{children:[Object(i.jsx)(R.a,{}),Object(i.jsx)(q.a,{}),Object(i.jsx)(F,{})]})}),document.getElementById("root")),I()}},[[76,1,2]]]);
//# sourceMappingURL=main.c4a1ab10.chunk.js.map