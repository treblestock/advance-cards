import{h as f,j as S,k as R,l as _,m as D,n as T}from"./index.e1f24323.js";import{u as c}from"./useStorage.a85a7265.js";const g="./setsRevisions",p=n=>g+"/"+n+".json",h={n:-1,dateStart:new Date().toJSON().split("T")[0]},I=f("setsRevisions",()=>{const n=S(c("setsList")||[]),s=S({});function o(t,e){c("sets.revisions."+t,e)}async function r(t){const e=JSON.parse(localStorage.getItem("sets.revisions."+t),R);if(e){s.value[t]=e;return}const a=p(t),i=(await _(()=>import(a),[])).default;for(const l in i){const v=i[l];v.dateStart=new Date(v.dateStart)}s.value[t]=i,o(t,i)}function u(){n.value.forEach(t=>r(t))}function d({setName:t,question:e,isCorrect:a}){if(!a)return;const i=s.value[t][e];i||(s.value[t][e]=h,o(t,s.value[t])),!!D(i.dateStart)&&T(i)<Date.now()&&(s.value[t][e].n++,o(t,s.value[t]))}return{setsList:n,sets:s,loadSetRevisions:r,updateRevisionCardData:d,onRegister:u}});export{I as u};