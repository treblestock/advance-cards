import{K as S,_ as m,f as v,o as s,a as r,b as l,t as x,e as d,w as u,q as f,u as i,h as P,c as y,F as k,r as B,g as C}from"./index.e1f24323.js";import{u as I}from"./useUpload.9605fec3.js";import{u as h}from"./stats.e66a6d2e.js";import{u as w}from"./sets.7527e434.js";import"./useStorage.a85a7265.js";function T(){return S("app")}function b(t){return T().config.globalProperties[t]}const $={class:"pinia-store-toolbar"},N={class:"pinia-store-toolbar__store-name"},V={class:"pinia-store-toolbar__btns"},q={__name:"PiniaStoreToolbar",props:{storeId:{type:String,required:!0}},setup(t){const a=t,n=b("$pinia")._s.get(a.storeId);function p(o){n.importState(o)}return(o,e)=>{const c=v("Btn");return s(),r("div",$,[l("div",N,x(t.storeId),1),l("div",V,[d(c,{class:"pinia-store-toolbar__upload pinia-store-toolbar__btn",onClick:e[0]||(e[0]=()=>i(I)({onload:({data:g})=>p(g)}))},{default:u(()=>[f("upload")]),_:1}),d(c,{class:"pinia-store-toolbar__download pinia-store-toolbar__btn",onClick:e[1]||(e[1]=()=>i(n).exportState())},{default:u(()=>[f("download")]),_:1})])])}}},A=m(q,[["__scopeId","data-v-d7f2fd88"]]),D=P("appConfig",{state:()=>({}),getters:{},actions:{}});const F={class:"pinia"},j={__name:"settingsPinia",props:{},setup(t){h(),w(),D();const a=b("$pinia"),_=y(()=>a._s);return(n,p)=>(s(),r("div",F,[(s(!0),r(k,null,B(i(_),([o])=>(s(),C(A,{class:"pinia__toolbar",key:o,storeId:o},null,8,["storeId"]))),128))]))}},z=m(j,[["__scopeId","data-v-e770e3ce"]]);export{z as default};
