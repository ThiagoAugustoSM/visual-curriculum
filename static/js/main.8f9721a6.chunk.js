(this["webpackJsonpvisual-curriculum"]=this["webpackJsonpvisual-curriculum"]||[]).push([[0],{83:function(e,t,r){"use strict";r.r(t);var c=r(4),a=r(1),i=r.n(a),s=r(65),n=r.n(s),o=r(105),l=r(102),j=r(103),d=r(66),b=r(6),u=r(98),O=r(109),x=r(71),h=r(107),g=r(108),m=r(95),f=r(96),p=r(70),v=r(85),w=r(31),y=r.p+"static/media/peacock-logo.c54a9c97.png",S=function(){var e=Object(x.b)(),t=e.colorMode,r=e.toggleColorMode;return Object(c.jsxs)(h.a,{direction:"row",align:"center",justify:"space-between",flexWrap:"wrap",children:[Object(c.jsxs)(h.a,{direction:"row",align:"center",children:[Object(c.jsx)(g.a,{boxSize:"100px",src:y,alt:"Imagem de um pav\xe3o representando a logo do Visual Curriculum"}),Object(c.jsxs)(h.a,{direction:"column",textAlign:"left",children:[Object(c.jsx)(m.a,{as:"h2",fontSize:["3xl","4xl"],children:"Visual Curriculum"}),Object(c.jsx)(f.a,{children:"Uma nova forma de visualizar a sua grade curricular!"})]})]}),Object(c.jsxs)(h.a,{direction:"row",flexWrap:"wrap",align:"center",spacing:[0,0,4],children:[Object(c.jsx)(p.a,{marginY:"2",colorScheme:"blue",variant:"outline",rightIcon:Object(c.jsx)(v.a,{as:w.a}),onClick:function(){window.open("https://github.com/ThiagoAugustoSM/visual-curriculum/")},children:"Quero contribuir!"}),Object(c.jsxs)(p.a,{onClick:r,rightIcon:"light"===t?Object(c.jsx)(v.a,{as:w.c}):Object(c.jsx)(v.a,{as:w.d}),children:["Colocar em modo ","light"===t?"escuro?":"claro?"]})]})]})},C=r(97),z=function(){return Object(c.jsxs)(C.a,{size:"20",m:"3",separator:"/",children:[Object(c.jsx)(C.b,{children:Object(c.jsx)(C.c,{href:"#",children:"UFPE"})}),Object(c.jsx)(C.b,{children:Object(c.jsx)(C.c,{href:"#",isCurrentPage:!0,children:"Engenharia da Computa\xe7\xe3o"})})]})},H=r(99),E=r(104),W=r(100),k=r(69),T=function(e){switch(e){case 1:return"gray";case 2:return"red";case 3:return"orange";case 4:return"yellow";case 5:return"green";case 6:return"teal";case 7:return"blue";case 8:return"cyan";case 9:return"purple";case 10:return"pink";default:return"gray"}},A=function(e){var t=e.id,r=e.onClick,i=e.name,s=e.prerequisites,n=e.semester,o=e.hours,l=e.credits,j=e.isObligatory,d=Object(x.b)().colorMode,O=Object(a.useState)(!1),h=Object(b.a)(O,2),g=h[0],m=h[1],f=Object(a.useState)("white"),p=Object(b.a)(f,2),v=p[0],w=p[1],y=Object(a.useState)(""),S=Object(b.a)(y,2),C=S[0],z=S[1],A=Object(a.useState)({bgColor:"",color:""}),D=Object(b.a)(A,2),F=D[0],P=D[1];return Object(a.useEffect)((function(){P({bgColor:"light"===d?"white":"gray.800",color:"light"===d?"gray.500":"gray.400"})}),[d]),Object(c.jsx)(u.a,{id:t,onClick:function(){!0===g?(w("white"),z("gray.800")):(w("green.200"),z("green.500")),r({isActive:!g,id:t,isObligatory:j,hours:o}),m(!g)},bgColor:"light"===d?v:C,borderRadius:"lg",borderWidth:"1px",m:"3",maxW:"sm",minW:"245px",overflow:"hidden",children:Object(c.jsxs)(u.a,{p:"4",children:[Object(c.jsxs)(u.a,{d:"flex",alignItems:"center",children:[Object(c.jsxs)(H.a,{borderRadius:"full",colorScheme:T(n),px:"2",children:[n,"\xba Per\xedodo"]}),Object(c.jsx)(u.a,{color:"gray.500",fontSize:"xs",fontWeight:"semibold",letterSpacing:"wide",marginX:"2",textTransform:"uppercase",children:j?"Obrigat\xf3ria":"Eletiva"}),s.length>0&&Object(c.jsx)(u.a,{ml:"auto",children:Object(c.jsxs)(E.a,{placement:"top",trigger:"hover",children:[Object(c.jsx)(E.f,{children:Object(c.jsx)(u.a,{children:Object(c.jsx)(k.a,{})})}),Object(c.jsxs)(E.d,{d:"flex",bgColor:F.bgColor,color:F.color,fontSize:"12px",marginX:"auto",maxW:"200px",textTransform:"uppercase",children:[Object(c.jsx)(E.b,{bgColor:F.bgColor}),Object(c.jsx)(E.e,{fontWeight:"semibold",children:"Pr\xe9-requisitos"}),Object(c.jsx)(E.c,{children:Object(c.jsx)(W.d,{children:s.map((function(e){return Object(c.jsx)(W.c,{children:e},e)}))})})]})]})})]}),Object(c.jsx)(u.a,{as:"h4",mt:"1",fontWeight:"semibold",lineHeight:"tight",isTruncated:!0,children:i}),Object(c.jsxs)(u.a,{children:[o,Object(c.jsx)(u.a,{as:"span",color:"gray.600",fontSize:"sm",children:"HRs"})]}),Object(c.jsxs)(u.a,{children:[l,Object(c.jsx)(u.a,{as:"span",color:"gray.600",fontSize:"sm",ml:"1",children:"cr\xe9dito(s)"})]})]})})},D=r(106),F=function(e){var t=e.title,r=e.total,a=e.partial,i=parseFloat((a/r*100).toFixed(2));return Object(c.jsx)(u.a,{minW:"200px",maxW:"md",borderWidth:"1px",borderRadius:"lg",overflow:"hidden",m:"3",children:Object(c.jsxs)(u.a,{p:"4",d:"flex",flexDir:"column",alignItems:"flex-start",justifyContent:"center",children:[Object(c.jsx)(f.a,{as:"h4",fontWeight:"semibold",lineHeight:"tight",isTruncated:!0,children:t}),Object(c.jsx)(u.a,{w:"100%",mt:"1",children:Object(c.jsx)(D.a,{hasStripe:!0,size:"md",value:i})}),Object(c.jsx)(u.a,{children:Object(c.jsxs)(f.a,{children:[i,Object(c.jsx)(u.a,{as:"span",color:"gray.600",fontSize:"sm",children:"%"})]})}),Object(c.jsxs)(u.a,{flexDir:"row",children:[a,Object(c.jsx)(u.a,{as:"span",color:"gray.600",fontSize:"sm",children:"/"}),r,Object(c.jsx)(u.a,{as:"span",color:"gray.600",fontSize:"sm",children:"HRs"})]})]})})},P=function(e){var t=e.academicTotalDone,r=e.academicObligatoryDone,a=e.academicElectiveDone,i=e.totalHours,s=e.totalHoursObligatory,n=e.totalHoursElective;return Object(c.jsxs)(h.a,{children:[Object(c.jsx)(m.a,{as:"h2",size:"lg",marginY:"2",children:"Aproveitamento Acad\xeamico"}),Object(c.jsxs)(u.a,{w:"100%",d:"flex",flexWrap:"wrap",children:[Object(c.jsx)(F,{title:"Total",partial:t,total:i}),Object(c.jsx)(F,{title:"Obrigat\xf3ria",partial:r,total:s}),Object(c.jsx)(F,{title:"Eletivas",partial:a,total:n})]})]})},I=r(54),R=function(){return Object(c.jsxs)(h.a,{children:[Object(c.jsx)(m.a,{as:"h2",size:"lg",marginY:"2",children:"Sobre o Projeto"}),Object(c.jsx)(f.a,{children:"Este projeto tem o objetivo de facilitar o entendimento do curr\xedculo de universidades do Brasil, atrav\xe9s de uma f\xe1cil visualiza\xe7\xe3o. Com o modelo Open Source, estudantes de todo o Brasil podem adicionar informa\xe7\xf5es atualizadas a este site. O projeto ainda est\xe1 em desenvolvimento, abaixo est\xe3o as pr\xf3ximas funcionalidades:"}),Object(c.jsxs)(W.a,{spacing:3,children:[Object(c.jsxs)(W.c,{children:[Object(c.jsx)(W.b,{as:I.a,color:"green.500"}),"Op\xe7\xe3o de salvar o seu hist\xf3rico localmente."]}),Object(c.jsxs)(W.c,{children:[Object(c.jsx)(W.b,{as:I.a,color:"green.500"}),"Habilitar para a cria\xe7\xe3o de novos curr\xedculos e Universidades."]})]})]})},M=r(101),B=function(){return Object(c.jsxs)(h.a,{align:"center",mt:"5",children:[Object(c.jsxs)(f.a,{children:["Feito com"," ",Object(c.jsx)("span",{role:"img","aria-label":"hearth",children:"\ud83d\udc99"})," ","em Recife, por Thiago Augusto"]}),Object(c.jsxs)(h.a,{spacing:3,direction:"row",children:[Object(c.jsx)(M.a,{size:"sm","aria-label":"Abrir Linkedin",icon:Object(c.jsx)(v.a,{as:w.b})}),Object(c.jsx)(M.a,{size:"sm","aria-label":"Abrir Linkedin",icon:Object(c.jsx)(v.a,{as:w.a})})]})]})};var L=function(){var e=Object(a.useState)({}),t=Object(b.a)(e,2),r=t[0],i=t[1],s=Object(a.useState)(0),n=Object(b.a)(s,2),o=n[0],l=n[1],j=Object(a.useState)(0),x=Object(b.a)(j,2),h=x[0],g=x[1],m=Object(a.useState)(0),f=Object(b.a)(m,2),p=f[0],v=f[1],w=function(e){var t=e.isActive,r=e.isObligatory,c=e.hours;t?(r?g(h+c):v(p+c),l(o+c)):(r?g(h-c):v(p-c),l(o-c))};Object(a.useEffect)((function(){fetch("./university/UFPE/engenhariaDaComputacao.json").then((function(e){return e.json()})).then((function(e){return i(e)}))}),[]);var y=Array.from({length:null===r||void 0===r?void 0:r.semesters},(function(e,t){return t+1}));return Object(c.jsxs)(u.a,{m:"5",children:[Object(c.jsx)(S,{}),Object(c.jsx)(z,{}),Object(c.jsx)(u.a,{w:"100%",maxH:"60vh",overflow:"scroll",children:y.map((function(e){return Object(c.jsx)(u.a,{d:"flex",w:"100%",children:null===r||void 0===r?void 0:r.disciplines.filter((function(t){return t.semester===e})).map((function(e){return Object(c.jsx)(A,Object(d.a)({id:e.code,onClick:w},e),e.name)}))},"row-".concat(e))}))}),Object(c.jsxs)(O.a,{columns:[1,2],spacing:"5",children:[Object(c.jsx)(P,{academicTotalDone:o,academicObligatoryDone:h,academicElectiveDone:p,totalHours:null===r||void 0===r?void 0:r.totalHours,totalHoursObligatory:null===r||void 0===r?void 0:r.totalHoursObligatory,totalHoursElective:null===r||void 0===r?void 0:r.totalHoursElective}),Object(c.jsx)(R,{})]}),Object(c.jsx)(B,{})]})},U=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,110)).then((function(t){var r=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,s=t.getTTFB;r(e),c(e),a(e),i(e),s(e)}))};n.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsxs)(o.a,{children:[Object(c.jsx)(l.a,{}),Object(c.jsx)(j.a,{}),Object(c.jsx)(L,{})]})}),document.getElementById("root")),U()}},[[83,1,2]]]);
//# sourceMappingURL=main.8f9721a6.chunk.js.map