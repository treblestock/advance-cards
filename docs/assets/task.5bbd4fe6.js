import{m as o,g as i,A as h,H as l,i as r}from"./index.15cd588f.js";import{u as c,a as n}from"./setsCards.cfb7e34b.js";import{u as d}from"./stats.d1e9083e.js";function*m(t){for(;t.size;)for(const s of t)yield s}let a;const C=o("task",{state:()=>({setName:null,toRevise:new Set,cardsCount:null,timeStart:null,timeFinish:null,currentCard:{question:null,answer:null},stats:new Set}),getters:{},actions:{reset(){this.timeFinish=null,this.timeStart=null,this.cardsCount=null,this.currentCard&&(this.currentCard.answer=null,this.currentCard.question=null),this.toRevise.clear(),this.stats.clear()},createTask(){const t=i(()=>c().sets[this.setName]),s=i(()=>n().sets[this.setName]);h([t,s],()=>{!t.value||!s.value||(Array.isArray(t.value)?this._createChainTask(t.value,s.value):this._createPairsTask(t.value,s.value),this.toRevise=l(this.toRevise),a=m(this.toRevise),this.cardsCount=this.toRevise.size,this.timeStart=Date.now(),this.currentCard=a.next().value)},{immediate:!0})},_createChainTask(t,s){for(const e of t)r(s[e])&&this.toRevise.add({question:e})},_createPairsTask(t,s){for(const e in t){const u=t[e];r(s[e])&&this.toRevise.add({question:e,answer:u})}},_updateTaskStats(t){this.stats.add(t)},iterateTask(){this.currentCard=a.next().value},_updateTask(t){t.isCorrect&&this.toRevise.delete(t.card),this.currentCard=a.next().value,this.currentCard||this.onFinish()},onAnswer(t){this._updateTaskStats(t),d().onAnswer(t),n().updateRevisionCardData(t),this._updateTask(t)},onFinish(){this.timeFinish=Date.now(),this.$router.push({name:"taskReport"})}}});export{C as u};