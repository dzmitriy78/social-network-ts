"use strict";(self.webpackChunkreact_kabzda_1=self.webpackChunkreact_kabzda_1||[]).push([[458],{5458:function(e,s,n){n.r(s),n.d(s,{default:function(){return A}});var r=n(5671),t=n(3144),o=n(136),a=n(7277),i=n(8687),l=n(5732),u=n(2791),c="users_users__mPFCq",g="users_userAvatar__ouDUD",p="users_btn__ABwlx",h="users_page__vrJIF",d="users_selectedPage__QKaNP",f="users_follow__XF5za",P="users_usersDescr__aLFoW",_="users_usersName__QkRhs",x="users_pagination__VRIE4",m="users_disabled__cD2Mw",w=n(885),C=function(e){var s=e.contentPerPage,n=e.count,r=(0,u.useState)(1),t=(0,w.Z)(r,2),o=t[0],a=t[1],i=Math.ceil(n/s),l=o*s,c=function(e){a((function(s){return e?s===i?s:s+1:1===s?s:s-1}))};return{totalPages:i,nextPage:function(){return c(!0)},prevPage:function(){return c(!1)},setPage:function(e){a(e>i?i:e<1?1:e)},firstContentIndex:l-s,lastContentIndex:l,page:o}},v=n(4353),j=n(3504),N=n(184),k=function(e){var s=e.user,n=e.isAuth,r=e.following,t=e.followingInProgress,o=e.unfollowing;return(0,N.jsxs)("div",{children:[(0,N.jsxs)("span",{children:[(0,N.jsx)("div",{children:(0,N.jsx)(j.OL,{to:"/profile/"+s.id,children:(0,N.jsx)("img",{src:null!=s.photos.small?s.photos.small:v,className:g,alt:"ava"})})}),(0,N.jsx)("div",{className:f,children:s.followed?(0,N.jsx)("button",{className:p,disabled:!n||t.some((function(e){return e===s.id})),onClick:function(){o(s.id)},children:"Unfollow"}):(0,N.jsx)("button",{className:p,disabled:!n||t.some((function(e){return e===s.id})),onClick:function(){r(s.id)},children:"Follow"})})]}),(0,N.jsxs)("span",{children:[(0,N.jsx)("div",{className:_,children:s.name}),(0,N.jsx)("div",{className:P,children:s.status})]}),(0,N.jsxs)("span",{children:[(0,N.jsx)("div",{className:P,children:"user.location.city"}),(0,N.jsx)("div",{className:P,children:"user.location.country"})]})]})},b=function(e){for(var s=C({contentPerPage:10,count:e.totalUsersCount}),n=s.firstContentIndex,r=s.lastContentIndex,t=s.nextPage,o=s.prevPage,a=s.page,i=s.setPage,l=s.totalPages,u=Math.ceil(e.totalUsersCount/e.pageSize),g=[],f=1;f<=u;f++)g.push(f);return(0,N.jsxs)("div",{className:c,children:[(0,N.jsx)("div",{children:(0,N.jsxs)("div",{className:x,children:[(0,N.jsx)("button",{onClick:o,className:1===a?m:h,children:"\u2190"}),g.slice(n,r).map((function(s,n){return(0,N.jsx)("span",{onClick:function(){e.onPageChanged(s)},className:e.currentPage===s?d:h,children:s},n)})),(0,N.jsx)("button",{onClick:t,className:a===l?h&&m:h,children:"\u2192"}),(0,N.jsx)("button",{className:p,onClick:function(){var s=prompt("\u041f\u0435\u0440\u0435\u0445\u043e\u0434 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443...");i(Math.ceil(s/10)),e.onPageChanged(s)},children:"Go to"})]})}),e.users.map((function(s,n){return(0,N.jsx)(k,{user:s,isAuth:e.isAuth,following:e.following,followingInProgress:e.followingInProgress,unfollowing:e.unfollowing},n)}))]})},I=n(211),U=n(7781),z=function(e){(0,o.Z)(n,e);var s=(0,a.Z)(n);function n(){var e;(0,r.Z)(this,n);for(var t=arguments.length,o=new Array(t),a=0;a<t;a++)o[a]=arguments[a];return(e=s.call.apply(s,[this].concat(o))).onPageChanged=function(s){var n=e.props.pageSize;e.props.getUsers(s,n),e.props.setCurrentPage(s)},e}return(0,t.Z)(n,[{key:"componentDidMount",value:function(){var e=this.props,s=e.currentPage,n=e.pageSize;this.props.getUsers(s,n)}},{key:"render",value:function(){return(0,N.jsxs)(N.Fragment,{children:[this.props.isFetching?(0,N.jsx)(I.Z,{}):null,(0,N.jsx)(b,{totalUsersCount:this.props.totalUsersCount,users:this.props.users,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,following:this.props.following,unfollowing:this.props.unfollowing,pageSize:this.props.pageSize,followingInProgress:this.props.followingInProgress,isAuth:this.props.isAuth})]})}}]),n}(u.Component),A=(0,U.qC)((0,i.$j)((function(e){return{users:e.usersPage.users,pageSize:e.usersPage.pageSize,totalUsersCount:e.usersPage.totalUsersCount,currentPage:e.usersPage.currentPage,isFetching:e.usersPage.isFetching,followingInProgress:e.usersPage.followingInProgress,isAuth:e.auth.isAuth}}),{following:l.mG,unfollowing:l.aL,setCurrentPage:l.D4,getUsers:l.Rf}))(z)},4353:function(e,s,n){e.exports=n.p+"static/media/user.4ce1ce10ce20ffcefb44.png"}}]);
//# sourceMappingURL=458.7212ba79.chunk.js.map