"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var n=require("react/jsx-runtime"),e=require("@ionic/react"),r=require("react"),i=function(){return(i=Object.assign||function(n){for(var e,r=1,i=arguments.length;r<i;r++)for(var t in e=arguments[r])Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n}).apply(this,arguments)};exports.AirLoginModal=function(t){var o=t.onWillDismiss,s=t.triggerId,a=r.useRef(null),l=r.useState(""),u=l[0],c=l[1],d=r.useState(""),I=d[0],p=d[1],h=r.useState(!0),j=h[0],x=h[1],m=!1;function f(n,e){m=e.trim().length>=3&&n.trim().length>=3}var g=n.jsxs(n.Fragment,{children:[n.jsxs(e.IonItem,{children:[n.jsx(e.IonLabel,i({position:"stacked"},{children:"Username"})),n.jsx(e.IonInput,{value:u,onIonChange:function(n){return function(n){c(I),f(n,I)}(n.detail.value)}})]}),n.jsxs(e.IonItem,{children:[n.jsx(e.IonLabel,i({position:"stacked"},{children:"Password"})),n.jsx(e.IonInput,{value:I,onIonChange:function(n){return function(n){p(n),f(u,n)}(n.detail.value)}})]}),n.jsx(e.IonItem,{children:n.jsx(e.IonButton,i({disabled:m,expand:"block",onClick:function(n){return function(){var n;x(!1),null===(n=a.current)||void 0===n||n.dismiss({email:u+"@random-email-provider.com",password:I,username:u},"signUp")}()}},{children:"Sign Up"}))})]});return n.jsxs(e.IonModal,i({isOpen:j,onWillDismiss:function(n){return o(n)},ref:a,trigger:s},{children:[n.jsx(e.IonHeader,{children:n.jsx(e.IonToolbar,{children:n.jsx(e.IonTitle,{children:"Sign Up"})})}),n.jsx(e.IonContent,i({className:"ion-padding"},{children:g}))]}))};
//# sourceMappingURL=index.js.map