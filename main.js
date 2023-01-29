(()=>{"use strict";var t={d:(e,r)=>{for(var s in r)t.o(r,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:r[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};t.d({},{p:()=>d});class e{constructor(t,e){this.gameboard=t,this.name=e}attack(t,e){return this.gameboard.receiveAttack(t,e)}}class r extends e{constructor(t,e){super(t,e),this.previousAttacks=[]}randomAttack(){let t,e;do{t=Math.floor(10*Math.random()),e=Math.floor(10*Math.random())}while(this.previousAttacks.some((r=>r.x===t&&r.y===e)));return this.previousAttacks.push({x:t,y:e}),this.attack(t,e)}}const s=new class{constructor(){this.grid=new Array(20).fill(null).map((()=>new Array(10).fill(null))),this.ships=[],this.missedAttacks=[]}placeShip(t,e,r){for(let s=t;s<t+r.length;s++)this.grid[s][e]=r;return this.ships.push(r),r}receiveAttack(t,e){return null!==this.grid[t][e]?(this.grid[t][e].hit(),this.grid[t][e].sunk?"sunk":"hit"):(this.missedAttacks.push({x:t,y:e}),"miss")}allSunk(){return this.ships.every((t=>t.sunk))}};class i{constructor(t,e){this.length=t,this.hits=0,this.sunk=!1,this.owner=e}hit(){this.hits++,this.hits===this.length&&(this.sunk=!0)}isSunk(){return this.sunk}}const a=new i(2,"ai"),n=new i(5,"ai"),l=new i(4,"ai"),h=new i(3,"ai"),c=new i(3,"ai");s.placeShip(y(2).x,y(2).y,a),s.placeShip(y(5).x,y(5).y,n),s.placeShip(y(4).x,y(4).y,l),s.placeShip(y(3).x,y(3).y,h),s.placeShip(y(3).x,y(3).y,c);const o=new class{constructor(){this.player1=new e(s,"Player"),this.player2=new r(s,"Computer"),this.currentPlayer=this.player1}player1Turn(t,e){const r=this.currentPlayer.attack(t,e);d(t,e,r),"sunk"===r&&this.checkForWinner(),this.currentPlayer=this.player2,this.player2Turn()}player2Turn(){const t=this.player2.randomAttack();d(this.player2.previousAttacks[this.player2.previousAttacks.length-1].x,this.player2.previousAttacks[this.player2.previousAttacks.length-1].y,t),"sunk"===t&&this.checkForWinner()}ownerOfShip(){const t=[...s.ships];return{player1ships:t.filter((t=>"player"==t.owner)),player2ships:t.filter((t=>"ai"==t.owner))}}checkForWinner(){(this.ownerOfShip().player1ships.every((t=>t.sunk))||this.ownerOfShip().player2ships.every((t=>t.sunk)))&&this.endGame()}endGame(){let t=this.ownerOfShip().player1ships.every((t=>t.sunk))?this.player2.name:this.player1.name;alert(`${t} wins!`)}};document.querySelectorAll(".coordinate").forEach((t=>{t.addEventListener("click",(t=>{if("coordinate"==t.target.className){const e=t.target.id.split("-"),r=e[0],s=e[1];(r>=10||s>10)&&o.player1Turn(r,s)}}))}));const p=document.querySelector(".player-grid");let u;function d(t,e,r){let s=document.getElementById(t+"-"+e);"miss"===r?s.classList.add("miss"):"hit"===r?s.classList.add("hit"):"sunk"===r&&s.classList.add("sunk")}function y(t){const e=Math.floor(19*Math.random()),r=Math.floor(9*Math.random());if(e<10||null!=s.grid[e][r]||20<e+t)return y(t);for(let i=e;i<e+t;i++)if(null!=s.grid[i][r])return y(t);return{x:e,y:r}}function k(t){let e;switch(t){case"battleship":e=4;break;case"carrier":e=5;break;case"submarine":case"destroyer":e=3;break;case"patrolboat":e=2}return e}document.querySelectorAll(".ship").forEach((t=>{t.addEventListener("dragstart",(t=>{u=t.target}))})),p.addEventListener("drop",(t=>{t.preventDefault();const e=t.target.id.split("-"),r=parseInt(e[0]),a=parseInt(e[1]);if(!(null!=s.grid[r][a]||10-r<k(u.id))){for(let t=r;t<r+k(u.id);t++)if(null!=s.grid[t][a])return;s.placeShip(r,a,new i(k(u.id),"player")),u.remove(),r<10&&function(t,e,r){let s;const i=k(r);for(let r=t;r<t+i;r++)s=document.getElementById(r+"-"+e),s.classList.add("myShip")}(r,a,u.id),0==document.querySelectorAll(".ship").length&&(document.querySelector(".ai-grid").style.display="grid")}})),p.addEventListener("dragenter",(t=>{t.preventDefault()})),p.addEventListener("dragover",(t=>{t.preventDefault()}))})();