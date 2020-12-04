!function(e){var t={};function n(o){if(t[o])return t[o].exports;var s=t[o]={i:o,l:!1,exports:{}};return e[o].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(o,s,function(t){return e[t]}.bind(null,s));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t){const n=document.getElementById("question"),o=document.getElementById("questionText"),s=document.getElementById("questionNo"),r=document.getElementById("start"),i=document.getElementById("answer"),a=document.getElementById("hintsAllowed"),d=document.getElementById("hint"),c=document.querySelectorAll(".keyboard__btns"),l=document.getElementById("windowBindPara"),u=document.getElementById("darkMode"),m=document.getElementById("gameOver"),h=document.getElementById("music"),y=document.getElementById("musicIcon"),f=document.getElementById("noMusicIcon"),v=document.getElementsByClassName("windowCountdown__progressbar")[0],L=document.querySelector(".windowCountdown__progressbar");var g={_current:0,getNew:function(){return this._current++,this._current}};HTMLElement.prototype.pseudoStyle=function(e,t,n){var o=document.head||document.getElementsByTagName("head")[0],s=document.getElementById("pseudoStyles")||document.createElement("style");s.id="pseudoStyles";var r="pseudoStyle"+g.getNew();return this.className+=" "+r,s.innerHTML+="\n."+r+":"+e+"{"+t+":"+n+"}",o.appendChild(s),this};let p,w,T;function b(){return fetch("https://gist.githubusercontent.com/jaygal0/d3619c250da85a7c0aeee6b33f07ad4d/raw/6f1bbf7947339ac8767cb5ab2e157f4854a2cb31/shortcut.json").then(e=>e.json()).then(e=>e.filter(e=>e))}window.onload=()=>{b(),async function(){w=await b()}()},r.addEventListener("click",()=>{"START GAME"===r.innerText?(T=new B(100/90,5),T.startGame(),T.startTimer(),o.classList.remove("hidden"),r.innerHTML="reset",l.innerText="type in your answer using your keyboard"):(clearInterval(p),o.classList.remove("remove"),m.classList.add("remove"),v.style.setProperty("--top",1),l.innerText="type in your answer using your keyboard",T.startTimer(),T.reset(),T.startGame())}),d.addEventListener("click",()=>{m.classList.contains("remove")&&T.showHint()}),c.forEach(e=>{window.addEventListener("keydown",t=>{t.code==e.dataset.code&&e.classList.add("activeBtn")}),window.addEventListener("keyup",t=>{t.code==e.dataset.code&&e.classList.remove("activeBtn")})}),h.addEventListener("click",()=>{y.classList.toggle("remove"),f.classList.toggle("remove")});class B{constructor(e,t){this.timeLimit=e,this.score=0,this.hintsAllowed=t,this.random,this.questionNo=1}randomNo(){this.random=Math.floor(Math.random()*w.length)}startGame(){this.randomNo(),n.innerText=w[this.random].action,s.innerText=this.questionNo,a.innerHTML=this.hintsAllowed,window.addEventListener("keydown",e=>{e.preventDefault(),e.code===w[this.random].code&&e.ctrlKey===w[this.random].ctrlKey&&e.shiftKey===w[this.random].shiftKey&&e.altKey===w[this.random].altKey&&m.classList.contains("remove")&&(this.score++,this.questionNo++,s.innerText=this.questionNo,this.startGame())})}hint(){i.innerHTML=w[this.random].hint,c.forEach(e=>{e.dataset.code===w[this.random].code&&(e.classList.add("activeBtn"),setTimeout(()=>{i.innerHTML="",e.classList.remove("activeBtn")},1e3)),w[this.random].ctrlKey&&"ControlLeft"===e.dataset.code&&(e.classList.add("activeBtn"),setTimeout(()=>{i.innerHTML="",e.classList.remove("activeBtn")},1e3)),w[this.random].shiftKey&&"ShiftLeft"===e.dataset.code&&(e.classList.add("activeBtn"),setTimeout(()=>{i.innerHTML="",e.classList.remove("activeBtn")},1e3)),w[this.random].altKey&&"AltLeft"===e.dataset.code&&(e.classList.add("activeBtn"),setTimeout(()=>{i.innerHTML="",e.classList.remove("activeBtn")},1e3))})}showHint(){this.hintsAllowed>0&&(this.hintsAllowed--,a.innerHTML=this.hintsAllowed,this.hint())}startTimer(){L.pseudoStyle("before","background-color","#b7fcf8"),p=setInterval(()=>{const e=getComputedStyle(v),t=parseFloat(e.getPropertyValue("--top"))||0;v.style.setProperty("--top",Math.round(t+this.timeLimit)),t>=93&&clearInterval(p),t>=93&&(o.classList.add("remove"),m.classList.remove("remove"),this.score<=9?(n.innerHTML=`You only answered ${this.score} questions correctly.`,l.innerText="better luck next time!"):this.score>=27&&this.score<=63?(n.innerHTML=`You answered ${this.score} questions correctly.`,l.innerText="Good job, but you can do better!"):this.score>63&&(n.innerHTML=`You answered ${this.score} questions correctly.`,l.innerText="well done! keep it up!")),t>=50&&L.pseudoStyle("before","background-color","#FD7B7B")},1e3)}reset(){this.questionNo=1,this.score=0,this.hintsAllowed=5,a.innerHTML=this.hintsAllowed}}const E=new Darkmode;u.addEventListener("click",()=>{E.toggle()})}]);
//# sourceMappingURL=bundle.js.map