import{h as a}from"./index.e1f24323.js";import{u as e}from"./useStorage.a85a7265.js";const r=a("stats",{state:()=>({total:{setsCount:null,revisedSetsCount:null,cardsCount:null,revisedCardsCount:null,accurance:null,time:null,timePerCard:null,timePerSet:null},today:{setsCount:null,revisedSetsCount:null,cardsCount:null,revisedCardsCount:null,accurance:null,time:null,timePerCard:null,timePerSet:null},prevTask:{},sets:{}}),getters:{},actions:{onAnswer(s){},_loadTodayStats(){if(new Date(e("stats.today")||0).getDate()===new Date().getDate())for(const t in this.today)this.today[t]=e("stats.today."+t);else{for(const t in this.today)e("stats.today."+t,0);e("stats.today",new Date)}},loadSetStats(){},onRegister(){}}});export{r as u};
