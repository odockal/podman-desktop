"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[30487],{81064:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>l,frontMatter:()=>a,metadata:()=>t,toc:()=>d});const t=JSON.parse('{"id":"interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent","title":"Interface: AuthenticationProviderAuthenticationSessionsChangeEvent","description":"Defined in4140","source":"@site/api/interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent.md","sourceDirName":"interfaces","slug":"/interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent","permalink":"/api/interfaces/AuthenticationProviderAuthenticationSessionsChangeEvent","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"typedocSidebar","previous":{"title":"AuthenticationProvider","permalink":"/api/interfaces/AuthenticationProvider"},"next":{"title":"AuthenticationProviderInformation","permalink":"/api/interfaces/AuthenticationProviderInformation"}}');var s=i(62540),o=i(43023);const a={},r="Interface: AuthenticationProviderAuthenticationSessionsChangeEvent",c={},d=[{value:"Properties",id:"properties",level:2},{value:"added?",id:"added",level:3},{value:"changed?",id:"changed",level:3},{value:"removed?",id:"removed",level:3}];function h(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",p:"p",strong:"strong",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"interface-authenticationproviderauthenticationsessionschangeevent",children:"Interface: AuthenticationProviderAuthenticationSessionsChangeEvent"})}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/odockal/podman-desktop/blob/0b8fa85cd5635847a86a1fa511178c45248f2c5c/packages/extension-api/src/extension-api.d.ts#L4140",children:"packages/extension-api/src/extension-api.d.ts:4140"})]}),"\n",(0,s.jsxs)(n.p,{children:["An ",(0,s.jsx)(n.a,{href:"#Event",children:"event"})," which fires when an ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"})," is added, removed, or changed."]}),"\n",(0,s.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(n.h3,{id:"added",children:"added?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"readonly"})," ",(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"added"}),": readonly ",(0,s.jsx)(n.a,{href:"/api/interfaces/AuthenticationSession",children:(0,s.jsx)(n.code,{children:"AuthenticationSession"})}),"[]"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/odockal/podman-desktop/blob/0b8fa85cd5635847a86a1fa511178c45248f2c5c/packages/extension-api/src/extension-api.d.ts#L4144",children:"packages/extension-api/src/extension-api.d.ts:4144"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"}),"s of the ",(0,s.jsx)(n.a,{href:"#AuthentiationProvider",children:"AuthenticationProvider"})," that have been added."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"changed",children:"changed?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"readonly"})," ",(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"changed"}),": readonly ",(0,s.jsx)(n.a,{href:"/api/interfaces/AuthenticationSession",children:(0,s.jsx)(n.code,{children:"AuthenticationSession"})}),"[]"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/odockal/podman-desktop/blob/0b8fa85cd5635847a86a1fa511178c45248f2c5c/packages/extension-api/src/extension-api.d.ts#L4156",children:"packages/extension-api/src/extension-api.d.ts:4156"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"}),"s of the ",(0,s.jsx)(n.a,{href:"#AuthentiationProvider",children:"AuthenticationProvider"})," that have been changed.\nA session changes when its data excluding the id are updated. An example of this is a session refresh that results in a new\naccess token being set for the session."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h3,{id:"removed",children:"removed?"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"readonly"})," ",(0,s.jsx)(n.code,{children:"optional"})," ",(0,s.jsx)(n.strong,{children:"removed"}),": readonly ",(0,s.jsx)(n.a,{href:"/api/interfaces/AuthenticationSession",children:(0,s.jsx)(n.code,{children:"AuthenticationSession"})}),"[]"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Defined in: ",(0,s.jsx)(n.a,{href:"https://github.com/odockal/podman-desktop/blob/0b8fa85cd5635847a86a1fa511178c45248f2c5c/packages/extension-api/src/extension-api.d.ts#L4149",children:"packages/extension-api/src/extension-api.d.ts:4149"})]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.a,{href:"#AuthenticationSession",children:"AuthenticationSession"}),"s of the ",(0,s.jsx)(n.a,{href:"#AuthentiationProvider",children:"AuthenticationProvider"})," that have been removed."]})]})}function l(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},43023:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>r});var t=i(63696);const s={},o=t.createContext(s);function a(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);