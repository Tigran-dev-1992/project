(this["webpackJsonpjust-project"]=this["webpackJsonpjust-project"]||[]).push([[4],{318:function(e,t,a){e.exports={form:"Users_form__3a7N8",formContainer:"Users_formContainer__1DI56",selectStyle:"Users_selectStyle__17HYm",filterIconBlok:"Users_filterIconBlok__2QS3P",button:"Users_button__1WgoB",photos:"Users_photos__68yFE",userItem:"Users_userItem__OVGvM",itemName:"Users_itemName__1dX3F",followedUser:"Users_followedUser__2kPbo",container:"Users_container__3HVg9"}},323:function(e,t,a){e.exports={pageinator:"Pageinator_pageinator__1Gj5H",page:"Pageinator_page__1Hc9L",currentPage:"Pageinator_currentPage__1DcMj",changer:"Pageinator_changer__lQbjp"}},337:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(73),i=a.n(c),l=(a(106),a(321)),o=a(11),s=a(8),u=a(17),m=a(137),f=a.n(m),d=a(322),b=function(e){return e.usersPage.filter.term},p=function(e){return e.usersPage.filterVizibility},g=function(e){return e.usersPage.filter.friend},_=function(e){return e.usersPage.pageSize},j=function(e){return e.usersPage.totalCount},E=function(e){return e.usersPage.porcionSize},O=function(e){return e.usersPage.porceNumber},v=function(e){return e.usersPage.currentPage},P=Object(d.a)((function(e){return e.usersPage.users}),(function(e){return e.filter((function(e){return e}))})),N=function(e){return e.usersPage.followInProgres},h=function(e){return e.usersPage.showLoader},w=a(62),U=a(323),k=a.n(U),z=a(32),y=a(318),C=a.n(y),S=a(141),V=a(13),F=a(12),I=a(38),B=n.a.memo((function(e){e.meta;var t=e.input,a=Object(I.a)(e,["meta","input"]);return n.a.createElement("div",null,n.a.createElement("select",Object.assign({className:C.a.selectStyle},t,a,{name:"friend"}),n.a.createElement("option",{value:"all"},"All users"),n.a.createElement("option",{value:"true"},"Followed users"),n.a.createElement("option",{value:"false"},"Unfollowed users")))})),H=Object(S.a)({form:"usersFilter"})((function(e){var t=e.handleSubmit,a=e.filterVizibility,r=Object(o.c)();return n.a.createElement("div",{className:C.a.formContainer},n.a.createElement("div",{className:C.a.form},n.a.createElement("div",{className:C.a.filterIconBlok,onClick:function(){r(w.e.setFilterVizibility(!a))}},"Filter"),a?n.a.createElement("form",{onSubmit:t,className:C.a.blank},Object(V.a)("friend","",[],B,{type:"select"},""),Object(V.a)("term","enter user name",[],F.a,{type:"search"},""),n.a.createElement("button",null,"ppp")):""))})),M=a(324),x=a.n(M),L=n.a.memo((function(){var e=Object(o.d)(P),t=Object(o.d)(j),a=Object(o.d)(_),c=Object(o.d)(E),m=Object(o.d)(O),d=Object(o.d)(v),U=Object(o.d)(N),y=Object(o.d)(h),S=Object(o.d)(b),V=Object(o.d)(g),F=Object(o.d)(p);Object(r.useEffect)((function(){i.a.init({duration:1500})}),[]);var I=Object(s.f)(),B=Object(o.c)();Object(r.useEffect)((function(){var e=x.a.parse(I.location.search),t=d,r=S,n=V;switch(e.page&&(t=Number(e.page)),e.term&&(r=e.term),e.friend){case"true":n=!0;break;case"false":n=!1;break;case"null":n=null}B(Object(w.d)(a,t,r,n))}),[]),Object(r.useEffect)((function(){I.push({pathname:"/users",search:"?count=100&page=".concat(d,"&term=").concat(S,"&friend=").concat(V)})}),[S,V,d]);var M={term:S,friend:!0===V?"true":!1===V?"false":"all"},L=Object(l.debounce)((function(e){var t="true"===e.friend||"false"!==e.friend&&null;e!=M&&B(Object(w.d)(a,d=1,e.term,t))}),800);return n.a.createElement("div",null,n.a.createElement("div",null,n.a.createElement(H,{onChange:L,filterVizibility:F,enableReinitialize:!0,initialValues:M})),y?n.a.createElement("div",null,n.a.createElement(z.a,null)):n.a.createElement("div",null,n.a.createElement("div",{className:C.a.pagesss},function(e){for(var t=e.friend,a=e.term,r=e.totalCount,c=e.pageSize,i=e.porcionSize,l=e.porceNumber,s=e.currentPage,u=Object(o.c)(),m=[],f=Math.ceil(r/c),d=Math.ceil(f/i),b=(l-1)*i+1,p=l*i,g=1;g<=f;g++)g>=b&&g<=p&&m.push(g);var _=function(e){s=(e-1)*i+1,u(Object(w.c)(c,s,e,a,t))};return n.a.createElement("div",{className:k.a.pageinators},n.a.createElement("div",{className:k.a.pageinator},l>1&&n.a.createElement("span",{onClick:function(){return _(l-1)},className:k.a.changer},"Prev"),m.map((function(e){return n.a.createElement("span",{key:e,onClick:function(){return u(Object(w.c)(c,e,l,a,t))},className:s===e?k.a.currentPage:""+k.a.page},e)})),d>l&&n.a.createElement("span",{onClick:function(){return _(l+1)},className:k.a.changer},"Next")))}({term:S,friend:V,totalCount:t,pageSize:a,porcionSize:c,porceNumber:m,currentPage:d})),n.a.createElement("div",{className:C.a.container},e.map((function(e){return n.a.createElement("div",{className:C.a.userItem,key:e.id,"data-aos":"fade-down"},n.a.createElement("div",{className:C.a.itemName},e.name),n.a.createElement("div",null,n.a.createElement(u.b,{to:"/profile/".concat(e.id)},n.a.createElement("img",{src:e.photos.small||f.a,className:C.a.photos}))),n.a.createElement("div",{className:C.a.followedUser},n.a.createElement("button",{onClick:function(){return B(Object(w.b)(!e.followed,e.id))},disabled:U.some((function(t){return t===e.id}))},e.followed?"Unfollow":"Follow")))})))))})),D=a(6),G=a(34),J=w.e.setFilterVizibility,Q=Object(D.d)(G.a,Object(o.b)((function(e){return{term:b(e),friend:g(e),pageSize:_(e),totalCount:j(e),porcionSize:E(e),porceNumber:O(e),currentPage:v(e),users:P(e),followInProgres:N(e),showLoader:h(e),filterVizibility:p(e)}}),{getUsers:w.d,getCurrentPage:w.c,followUnfollowUser:w.b,setFilterVizibility:J}))((function(e){return n.a.createElement("div",null,n.a.createElement(L,null))}));t.default=n.a.memo(Q)}}]);
//# sourceMappingURL=4.d9cf45d3.chunk.js.map