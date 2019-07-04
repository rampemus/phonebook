(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),l=t.n(o),u=t(2),c=t(3),i=t.n(c),d="http://localhost:3001/api/persons",m=function(){return i.a.get(d).then(function(e){return console.log("here:",e.data),e.data})},f=function(e){return i.a.post(d,e).then(function(e){return e.data})},h=function(e,n){var t=d+"/".concat(e);return i.a.patch(t,{number:n}).then(function(e){return e.data})},s=function(e){console.log(e);var n=d+"/".concat(e.id);console.log(n);var t=i.a.delete(n);return console.log("Person deleted"),t.then(function(e){return e.data})},b=function(e){return a.a.createElement("div",null,"filter shown with: ",a.a.createElement("input",{value:e.filterName,onChange:e.handleFilterNameChange}))},p=function(e){return a.a.createElement("form",{onSubmit:e.addPerson},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:e.newName,onChange:e.handleNewNameChange})),a.a.createElement("div",null,"phone number: ",a.a.createElement("input",{value:e.newNumber,onChange:e.handleNewNumberChange})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add")))},E=function(e){var n=e.persons,t=e.filterName,r=e.handlePersonDelete;return a.a.createElement("div",null,n.filter(function(e){return e.name.toLowerCase().includes(t.toLowerCase())}).map(function(e,n){return a.a.createElement("div",{key:n},e.name," ",e.number," ",a.a.createElement("button",{onClick:function(){return r(e)}},"delete"))}))},v=function(e){var n=e.text,t=e.isError;return null!==n?a.a.createElement("p",{style:{color:t?"red":"green",fontWeight:"bold",backgroundColor:"lightgrey",padding:"10px",borderStyle:"solid",borderColor:t?"red":"green",borderRadius:"5px"}},n):a.a.createElement("div",null)},w=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],l=Object(r.useState)({text:"Notification will be printed here",error:!0}),c=Object(u.a)(l,2),i=c[0],d=c[1],w=Object(r.useState)(""),g=Object(u.a)(w,2),N=g[0],C=g[1],j=Object(r.useState)(""),O=Object(u.a)(j,2),k=O[0],x=O[1],y=Object(r.useState)(""),S=Object(u.a)(y,2),P=S[0],D=S[1];Object(r.useEffect)(function(){setTimeout(function(){return d({text:null,error:!1})},3e3)},[i]),Object(r.useEffect)(function(){m().then(function(e){o(e)})},[]);var F=function(e){return t.find(function(n){return n.name===e})};return a.a.createElement("div",null,a.a.createElement("h2",null,"Phone book"),a.a.createElement(v,{text:i.text,isError:i.error}),a.a.createElement(b,{filterName:N,handleFilterNameChange:function(e){C(e.target.value)}}),a.a.createElement("h2",null,"add new"),a.a.createElement(p,{addPerson:function(e){e.preventDefault();var n={name:k,number:P};void 0!==F(k)?window.confirm("".concat(k," is already added to phonebook, would you like to replace the old number with ").concat(P,"?"))&&h(F(k).id,P).then(function(e){o(t.map(function(n){return n.id!==e.id?n:e}))}).catch(function(e){d({text:"Information of ".concat(n.name," was already been removed from server"),error:!0})}):(f(n).then(function(e){o(t.concat(e)),d({text:"".concat(n.name," added to the phone book"),error:!1})}),x(""),D(""))},newName:k,handleNewNameChange:function(e){x(e.target.value)},newNumber:P,handleNewNumberChange:function(e){D(e.target.value)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(E,{persons:t,filterName:N,handlePersonDelete:function(e){window.confirm("Delete ".concat(e.name," from phonebook?"))&&s(e).then(o(t.filter(function(n){return n.id!==e.id})))}}))};l.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.9f6f76e7.chunk.js.map