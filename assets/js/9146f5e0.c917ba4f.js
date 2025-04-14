"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1355],{80138:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>i,toc:()=>c});var i=t(52325),s=t(62540),o=t(43023);const r={title:"Build your Kubernetes application with Podman Desktop",description:"Covers the end-to-end workflow to create a Kubernetes application",authors:["shipsing"],tags:["podman-desktop","podman","Kubernetes-application","deployment"],hide_table_of_contents:!1},a="Using Podman Desktop to create a Kubernetes application",l={authorsImageUrls:[void 0]},c=[{value:"Building a containerized application",id:"building-a-containerized-application",level:2},{value:"Creating a pod",id:"creating-a-pod",level:2},{value:"Setting up a local Kubernetes cluster",id:"setting-up-a-local-kubernetes-cluster",level:2},{value:"Deploying the application to Kubernetes",id:"deploying-the-application-to-kubernetes",level:2},{value:"Verifying the running service",id:"verifying-the-running-service",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",img:"img",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"The integration of Podman Desktop with Kubernetes helps you to run your application on a Kubernetes cluster, such as Kind or Minikube."}),"\n",(0,s.jsx)(n.p,{children:"This blog covers the following aspects:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Build a containerized application from registry images"}),"\n",(0,s.jsx)(n.li,{children:"Create a pod"}),"\n",(0,s.jsx)(n.li,{children:"Set up a local Kubernetes cluster"}),"\n",(0,s.jsx)(n.li,{children:"Deploy the application to Kubernetes"}),"\n",(0,s.jsx)(n.li,{children:"Verify the running service"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"building-a-containerized-application",children:"Building a containerized application"}),"\n",(0,s.jsx)(n.p,{children:"With this blog, you will build a containerized application that uses:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"a back-end Redis server container"}),"\n",(0,s.jsx)(n.li,{children:"a front-end Python application container"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["To do so, you can pull the relevant images from the ",(0,s.jsx)(n.code,{children:"quay.io"})," registry."]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to the ",(0,s.jsx)(n.strong,{children:"Images"})," component page."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Pull"}),".\n",(0,s.jsx)(n.img,{alt:"pull from registry",src:t(44102).A+"",width:"1530",height:"360"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Start the first container:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Enter the image name to pull from a registry. For example, ",(0,s.jsx)(n.code,{children:"quay.io/podman-desktop-demo/podify-demo-backend"}),".\n",(0,s.jsx)(n.img,{alt:"enter image name",src:t(38210).A+"",width:"1602",height:"458"})]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Pull image"}),". A download complete notification opens."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Done"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Run Image"})," icon corresponding to the new image added.\n",(0,s.jsx)(n.img,{alt:"running an image",src:t(60423).A+"",width:"1952",height:"350"})]}),"\n",(0,s.jsxs)(n.li,{children:["Enter the container name ",(0,s.jsx)(n.code,{children:"redis-server"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Start Container"}),".\n",(0,s.jsx)(n.img,{alt:"start a back-end container",src:t(73043).A+"",width:"1972",height:"1202"})]}),"\n",(0,s.jsxs)(n.li,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Logs"})," tab to view that the Redis server is running in standalone mode.\n",(0,s.jsx)(n.img,{alt:"view Logs tab",src:t(83661).A+"",width:"1980",height:"856"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Start the second container:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Enter the image name to pull from a registry. For example, ",(0,s.jsx)(n.code,{children:"quay.io/podman-desktop-demo/podify-demo-frontend"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Pull image"})," and then ",(0,s.jsx)(n.strong,{children:"Done"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click the ",(0,s.jsx)(n.code,{children:"Run Image"})," icon corresponding to the new image added."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Enter the container name ",(0,s.jsx)(n.code,{children:"python-app"}),".\n",(0,s.jsx)(n.img,{alt:"enter image name",src:t(55484).A+"",width:"1970",height:"1200"})]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["If the default port is already in use, you can specify a different port in the ",(0,s.jsx)(n.code,{children:"Port mapping"})," field."]})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Select the ",(0,s.jsx)(n.strong,{children:"Networking"})," tab and enter hostname as ",(0,s.jsx)(n.code,{children:"redis-server"})," and IP address as ",(0,s.jsx)(n.code,{children:"10.88.0.2"})," to enable communication with the Redis server."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["You can find the IP address in the ",(0,s.jsx)(n.strong,{children:"Inspect"})," tab of the ",(0,s.jsx)(n.code,{children:"redis-server"})," Container Details page."]})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Start Container"}),".\n",(0,s.jsx)(n.img,{alt:"start a front-end container",src:t(57287).A+"",width:"1964",height:"1206"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Logs"})," tab to view that the application is running on port ",(0,s.jsx)(n.code,{children:"5000"}),".\n",(0,s.jsx)(n.img,{alt:"front-end app running",src:t(69512).A+"",width:"1580",height:"468"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Open browser"})," icon on the right side of the page."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["View the running front-end application.\n",(0,s.jsx)(n.img,{alt:"running front-end application",src:t(42701).A+"",width:"1680",height:"1164"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"creating-a-pod",children:"Creating a pod"}),"\n",(0,s.jsx)(n.p,{children:"You can use both the containers to create a pod. This way both the front-end and back end container applications can share resources, such as storage and network."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:"Pod creation with existing containers"})})}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Go to the ",(0,s.jsx)(n.strong,{children:"Containers"})," page."]}),"\n",(0,s.jsx)(n.li,{children:"Select both the front-end and back-end containers."}),"\n",(0,s.jsxs)(n.li,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Create Pod"})," button.\n",(0,s.jsx)(n.img,{alt:"create a pod from containers",src:t(65057).A+"",width:"1568",height:"642"})]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Create Pod"}),".\n",(0,s.jsx)(n.img,{alt:"copying containers to a pod",src:t(57478).A+"",width:"1562",height:"918"})]}),"\n",(0,s.jsx)(n.li,{children:"View the newly created pod on the Pods page."}),"\n",(0,s.jsxs)(n.li,{children:["Click the name of the pod and then click the ",(0,s.jsx)(n.strong,{children:"Summary"})," tab to view its summary.\n",(0,s.jsx)(n.img,{alt:"viewing pod details",src:t(81624).A+"",width:"1558",height:"574"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.em,{children:"Alternative: Pod creation with Kubernetes YAML"})})}),"\n",(0,s.jsx)(n.p,{children:"You can generate a Kubernetes manifest for any existing pod or container and use it to create a local Kubernetes YAML file. Then, you can customize that file and create a pod from it."}),"\n",(0,s.jsx)(n.p,{children:"At the time of pod creation, you can select a runtime to indicate whether you want to run the pod on a Podman engine or a Kubernetes cluster. Based on the selection, you get to see the newly created pod running in that environment on the Pods component page."}),"\n",(0,s.jsx)(n.p,{children:"The following procedure creates a pod that runs on a Podman engine."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Go to the ",(0,s.jsx)(n.strong,{children:"Pods"})," page."]}),"\n",(0,s.jsxs)(n.li,{children:["Click the overflow menu icon corresponding to the pod.\n",(0,s.jsx)(n.img,{alt:"overflow menu icon",src:t(45544).A+"",width:"1574",height:"638"})]}),"\n",(0,s.jsxs)(n.li,{children:["Select the ",(0,s.jsx)(n.strong,{children:"Generate Kube"})," option from the dropdown list."]}),"\n",(0,s.jsxs)(n.li,{children:["View the Kubernetes YAML configuration in the ",(0,s.jsx)(n.strong,{children:"Kube"})," tab.\n",(0,s.jsx)(n.img,{alt:"kube manifest",src:t(23733).A+"",width:"1332",height:"630"})]}),"\n",(0,s.jsx)(n.li,{children:"Copy the configuration and paste it into a YAML file on your machine."}),"\n",(0,s.jsx)(n.li,{children:"Edit the YAML configuration and save it."}),"\n",(0,s.jsxs)(n.li,{children:["Go to the ",(0,s.jsx)(n.strong,{children:"Pods"})," component page."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Play Kubernetes YAML"}),".\n",(0,s.jsx)(n.img,{alt:"play kubernetes yaml",src:t(52329).A+"",width:"1474",height:"414"})]}),"\n",(0,s.jsx)(n.li,{children:"Select the YAML file from your machine."}),"\n",(0,s.jsxs)(n.li,{children:["Check that the ",(0,s.jsx)(n.strong,{children:"Runtime"})," field is set to ",(0,s.jsx)(n.code,{children:"Podman container engine"}),"."]}),"\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.strong,{children:"Play"})," and then ",(0,s.jsx)(n.strong,{children:"Done"}),"."]}),"\n",(0,s.jsx)(n.li,{children:"View the newly created pod on the same page."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"After creating the pod, set up a local Kubernetes cluster to deploy the pod."}),"\n",(0,s.jsx)(n.h2,{id:"setting-up-a-local-kubernetes-cluster",children:"Setting up a local Kubernetes cluster"}),"\n",(0,s.jsx)(n.p,{children:"You can set up a local Kubernetes cluster. Once the cluster is connected and running, you can deploy your application on it."}),"\n",(0,s.jsx)(n.p,{children:"Based on your preference, use the Kind or Minikube extension:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"/docs/extensions/install",children:"Install the extension"})," from the Extensions catalog."]}),"\n",(0,s.jsxs)(n.li,{children:["Create a Kubernetes cluster. See ",(0,s.jsx)(n.a,{href:"/docs/kind/installing-extension",children:"Kind cluster creation"})," or ",(0,s.jsx)(n.a,{href:"/docs/minikube/installing-extension",children:"Minikube cluster creation"}),"."]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Once a kubernetes cluster is created, you can view a running control plane node and a running Kubernetes service on the Kubernetes component page. The page also shows that the cluster is connected."}),"\n",(0,s.jsx)(n.h2,{id:"deploying-the-application-to-kubernetes",children:"Deploying the application to Kubernetes"}),"\n",(0,s.jsx)(n.p,{children:"You can deploy the application pod to a Kubernetes cluster that has an active connection and access it through a service. Also, any container that is part of a pod is deployable to a Kubernetes cluster."}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Select your ",(0,s.jsx)(n.a,{href:"/docs/kubernetes/viewing-and-selecting-current-kubernetes-context",children:"Kubernetes context"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go to the ",(0,s.jsx)(n.strong,{children:"Pods"})," component page."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click the overflow menu icon corresponding to the pod.\n",(0,s.jsx)(n.img,{alt:"overflow menu icon",src:t(45544).A+"",width:"1574",height:"638"})]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Select the ",(0,s.jsx)(n.strong,{children:"Deploy to Kubernetes"})," option from the dropdown list."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Select the checkbox to expose the service locally using the ingress controller.\n",(0,s.jsx)(n.img,{alt:"expose the service locally",src:t(41395).A+"",width:"1566",height:"1192"})]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["When you configure custom port mapping while running an image, you get the option to select an Ingress host port from the dropdown list.\n",(0,s.jsx)(n.img,{alt:"ingress-host-port",src:t(59478).A+"",width:"1604",height:"180"}),"\nOtherwise, you do not see the option."]})}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click ",(0,s.jsx)(n.strong,{children:"Deploy"})," and then ",(0,s.jsx)(n.strong,{children:"Done"}),"."]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"verifying-the-running-service",children:"Verifying the running service"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Go the ",(0,s.jsx)(n.strong,{children:"Kubernetes"})," component page."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Perform the following steps:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Services"})," option to view the newly created service, ",(0,s.jsx)(n.code,{children:"my-pod-5000"}),".\n",(0,s.jsx)(n.img,{alt:"service created",src:t(68684).A+"",width:"1756",height:"466"})]}),"\n",(0,s.jsxs)(n.li,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Ingresses and Routes"})," option to view the newly created ingress, ",(0,s.jsx)(n.code,{children:"my-pod"}),".\n",(0,s.jsx)(n.img,{alt:"ingress created",src:t(27320).A+"",width:"1764",height:"346"})]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Use the ",(0,s.jsx)(n.strong,{children:"Apply YAML"})," button to directly apply a Kubernetes YAML file to create a resource."]})}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},57478:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/copying-containers-to-a-pod-4368ef9c4ab3f08f009e314aaa4837c1.png"},65057:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/creating-pod-from-containers-fc106863f5660d686b50e46f0871a7e8.png"},38210:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/enter-image-name-5b7015d24d349426b31fd138a182c39d.png"},41395:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/expose-the-service-locally-c0f9ff42272180112432dd0dc98eda5e.png"},69512:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/frontend-app-running-0c82f8d9a8484e70579224c97d751324.png"},27320:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/ingress-created-625b73bb0e09109411c8a7848a94cde5.png"},59478:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/ingress-host-port-add5711cd5105afc5d53138e02d0a380.png"},23733:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/kube-manifest-67dc07cdb16442a7af6c510352dab0ad.png"},45544:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/overflow-menu-icon-d4b2789f34e65233c6e3df4e59b5a127.png"},52329:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/play-kubernetes-yaml-c83bfcd65f2f776e574ab4cd78e45851.png"},44102:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/pulling-from-registry-c4c0b2921003af4f79c5f783f32f3a51.png"},55484:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/python-app-image-aafec2361e2144a143e5e830a711c591.png"},83661:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/redis-running-in-logs-7e3927e1f11739df5719ff4458b84f55.png"},60423:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/running-an-image-d2a93525e1128e16f6d39dc008043d06.png"},42701:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/running-application-locally-72420503fbcf4acae0a9544540102f35.png"},68684:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/service-created-35d86f1be064c3ce5fe87f3a75dccbc8.png"},73043:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/starting-a-backend-container-e1428c8b7c671b3c7567cd59c05dd847.png"},57287:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/starting-a-frontend-container-61596531d5bd533fb79852144e44c792.png"},81624:(e,n,t)=>{t.d(n,{A:()=>i});const i=t.p+"assets/images/viewing-pod-details-55d5a9d6d339fbe68fa2705c9035df13.png"},43023:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>a});var i=t(63696);const s={},o=i.createContext(s);function r(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:n},e.children)}},52325:e=>{e.exports=JSON.parse('{"permalink":"/blog/2024/10/05/kubernetes-blog","source":"@site/blog/2024-10-05-kubernetes-blog.md","title":"Build your Kubernetes application with Podman Desktop","description":"Covers the end-to-end workflow to create a Kubernetes application","date":"2024-10-05T00:00:00.000Z","tags":[{"inline":true,"label":"podman-desktop","permalink":"/blog/tags/podman-desktop"},{"inline":true,"label":"podman","permalink":"/blog/tags/podman"},{"inline":true,"label":"Kubernetes-application","permalink":"/blog/tags/kubernetes-application"},{"inline":true,"label":"deployment","permalink":"/blog/tags/deployment"}],"readingTime":4.85,"hasTruncateMarker":false,"authors":[{"name":"Shipra Singh","title":"Tech writer","url":"https://github.com/shipsing","imageURL":"https://github.com/shipsing.png","key":"shipsing","page":null}],"frontMatter":{"title":"Build your Kubernetes application with Podman Desktop","description":"Covers the end-to-end workflow to create a Kubernetes application","authors":["shipsing"],"tags":["podman-desktop","podman","Kubernetes-application","deployment"],"hide_table_of_contents":false},"unlisted":false,"prevItem":{"title":"Podman Desktop 1.13 Release","permalink":"/blog/podman-desktop-release-1.13"},"nextItem":{"title":"Podman Desktop 1.12 Release","permalink":"/blog/podman-desktop-release-1.12"}}')}}]);