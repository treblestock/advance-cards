import{_,o as i,c as w,a as d,t as l,n as S,G as h,g,h as C,u as o,f as q,B as y}from"./index.15cd588f.js";import{u as A}from"./task.5bbd4fe6.js";import"./setsCards.cfb7e34b.js";import"./stats.d1e9083e.js";const x={class:"set-card"},V={class:"set-card__question"},N={__name:"TaskViewSingleCardQuestion",props:{question:{type:String,required:!0},answer:{type:String,required:!1},isShownAnswer:{type:Boolean,default:!1}},setup(t){return(c,e)=>(i(),w("div",x,[d("div",V,l(t.question),1),d("div",{class:S(["set-card__answer",{_hidden:!t.isShownAnswer}])},l(t.answer),3)]))}},B=_(N,[["__scopeId","data-v-35e2d80e"]]);const T={__name:"taskViewSingleCard",props:{setName:{type:String,required:!0}},setup(t){const c=t,e=A();h(()=>{e.setName=c.setName,e.createTask()});const n=g(()=>e.currentCard),a=C(!1);function m(s){const u=document.documentElement.clientWidth;return{isCorrect:~~(s.clientX/u*100)>50,time:Date.now(),setName:e.setName,card:n.value}}function p(s){a.value?k(m(s)):f()}var f=()=>a.value=!0,v=()=>a.value=!1,k=s=>{v(),e.onAnswer(s)};return(s,u)=>{var r;return i(),w("div",{class:"task",onPointerup:p},[(r=o(n))!=null&&r.question?(i(),q(B,{key:0,question:o(n).question,answer:o(n).answer,isShownAnswer:a.value},null,8,["question","answer","isShownAnswer"])):y("",!0)],32)}}},W=_(T,[["__scopeId","data-v-c5145fd1"]]);export{W as default};
