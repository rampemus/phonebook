(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),c=t.n(o),l=t(2),u=t(3),i=t.n(u),d="/api/persons",m=function(){return i.a.get(d).then(function(e){return e.data})},f=function(e){return i.a.post(d,e).then(function(e){return e.data})},s=function(e,n){var t=d+"/".concat(e);return i.a.put(t,{number:n}).then(function(e){return e.data})},h=function(e){console.log(e);var n=d+"/".concat(e.id);console.log(n);var t=i.a.delete(n);return console.log("Person deleted"),t.then(function(e){return e.data})},b=function(e){return a.a.createElement("div",null,"filter shown with: ",a.a.createElement("input",{value:e.filterName,onChange:e.handleFilterNameChange}))},p=function(e){return a.a.createElement("form",{onSubmit:e.addPerson},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:e.newName,onChange:e.handleNewNameChange})),a.a.createElement("div",null,"phone number: ",a.a.createElement("input",{value:e.newNumber,onChange:e.handleNewNumberChange})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},w=function(e){var n=e.persons,t=e.filterName,r=e.handlePersonDelete;return a.a.createElement("div",null,n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())}).map(function(e,n){return a.a.createElement("div",{key:n},e.name," ",e.number," ",a.a.createElement("button",{onClick:function(){return r(e)}},"delete"))}))},E=function(e){var n=e.text,t=e.isError;return null!==n?a.a.createElement("p",{style:{color:t?"red":"green",fontWeight:"bold",backgroundColor:"lightgrey",padding:"10px",borderStyle:"solid",borderColor:t?"red":"green",borderRadius:"5px",position:"fixed",width:"16em",marginLeft:"-8em",left:"50%",top:"0%",zIndex:1}},n):a.a.createElement("div",null)},g=function(){var e=Object(r.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)({text:"Notification will be printed here",error:!1}),u=Object(l.a)(c,2),i=u[0],d=u[1],g=Object(r.useState)(""),v=Object(l.a)(g,2),N=v[0],x=v[1],C=Object(r.useState)(""),j=Object(l.a)(C,2),O=j[0],k=j[1],y=Object(r.useState)(""),S=Object(l.a)(y,2),P=S[0],D=S[1];Object(r.useEffect)(function(){i.text&&setTimeout(function(){d({text:null,error:!1})},5e3)},[i]),Object(r.useEffect)(function(){m().then(function(e){o(e)})},[]);var I=function(e){return t.find(function(n){return n.name===e})};return a.a.createElement("div",null,a.a.createElement("h2",null,"Phone book"),a.a.createElement(E,{text:i.text,isError:i.error}),a.a.createElement(b,{filterName:N,handleFilterNameChange:function(e){x(e.target.value)}}),a.a.createElement("h2",null,"add new"),a.a.createElement(p,{addPerson:function(e){e.preventDefault();var n={name:O,number:P};void 0!==I(O)?window.confirm("".concat(O," is already added to phonebook, would you like to replace the old number with ").concat(P,"?"))&&s(I(O).id,P).then(function(e){o(t.map(function(n){return n.id!==e.id?n:e}))}).catch(function(e){d({text:"Information of ".concat(n.name," was already been removed from server"),error:!0})}):f(n).then(function(e){console.log(e),o(t.concat(e)),d({text:"".concat(n.name," added to the phone book"),error:!1}),k(""),D("")}).catch(function(e){console.log("here:",e.response.data.error),d({text:"".concat(e.response.data.error),error:!0})})},newName:O,handleNewNameChange:function(e){k(e.target.value)},newNumber:P,handleNewNumberChange:function(e){D(e.target.value)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(w,{persons:t,filterName:N,handlePersonDelete:function(e){window.confirm("Delete ".concat(e.name," from phonebook?"))&&h(e).then(o(t.filter(function(n){return n.id!==e.id})))}}))};c.a.render(a.a.createElement(g,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.847f2f7b.chunk.js.map