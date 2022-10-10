var bt=Object.defineProperty;var wt=(o,t,i)=>t in o?bt(o,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[t]=i;var d=(o,t,i)=>(wt(o,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const L of l.addedNodes)L.tagName==="LINK"&&L.rel==="modulepreload"&&e(L)}).observe(document,{childList:!0,subtree:!0});function i(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerpolicy&&(l.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?l.credentials="include":n.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function e(n){if(n.ep)return;n.ep=!0;const l=i(n);fetch(n.href,l)}})();const Mt=1/3,g=1/6,ct=o=>Math.floor(o)|0,ut=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function At(o=Math.random){const t=St(o),i=new Float64Array(t).map(l=>ut[l%12*3]),e=new Float64Array(t).map(l=>ut[l%12*3+1]),n=new Float64Array(t).map(l=>ut[l%12*3+2]);return function(L,U,X){let Y,K,W,$;const H=(L+U+X)*Mt,J=ct(L+H),Q=ct(U+H),V=ct(X+H),_=(J+Q+V)*g,pt=J-_,xt=Q-_,vt=V-_,p=L-pt,x=U-xt,y=X-vt;let b,w,M,A,S,P;p>=x?x>=y?(b=1,w=0,M=0,A=1,S=1,P=0):p>=y?(b=1,w=0,M=0,A=1,S=0,P=1):(b=0,w=0,M=1,A=1,S=0,P=1):x<y?(b=0,w=0,M=1,A=0,S=1,P=1):p<y?(b=0,w=1,M=0,A=0,S=1,P=1):(b=0,w=1,M=0,A=1,S=1,P=0);const tt=p-b+g,et=x-w+g,ot=y-M+g,it=p-A+2*g,nt=x-S+2*g,st=y-P+2*g,rt=p-1+3*g,lt=x-1+3*g,at=y-1+3*g,D=J&255,Z=Q&255,j=V&255;let R=.6-p*p-x*x-y*y;if(R<0)Y=0;else{const a=D+t[Z+t[j]];R*=R,Y=R*R*(i[a]*p+e[a]*x+n[a]*y)}let z=.6-tt*tt-et*et-ot*ot;if(z<0)K=0;else{const a=D+b+t[Z+w+t[j+M]];z*=z,K=z*z*(i[a]*tt+e[a]*et+n[a]*ot)}let F=.6-it*it-nt*nt-st*st;if(F<0)W=0;else{const a=D+A+t[Z+S+t[j+P]];F*=F,W=F*F*(i[a]*it+e[a]*nt+n[a]*st)}let T=.6-rt*rt-lt*lt-at*at;if(T<0)$=0;else{const a=D+1+t[Z+1+t[j+1]];T*=T,$=T*T*(i[a]*rt+e[a]*lt+n[a]*at)}return 32*(Y+K+W+$)}}function St(o){const i=new Uint8Array(512);for(let e=0;e<512/2;e++)i[e]=e;for(let e=0;e<512/2-1;e++){const n=e+~~(o()*(256-e)),l=i[e];i[e]=i[n],i[n]=l}for(let e=256;e<512;e++)i[e]=i[e-256];return i}const E=Math.PI*2,N=(o,t,i,e=1)=>{o.beginPath(),o.arc(t,i,e,0,E),o.fill()},O=(o,t)=>(o%t+t)%t,f=class{constructor(t,i){d(this,"x");d(this,"y");this.x=t,this.y=i}add(t){return new f(this.x+t.x,this.y+t.y)}sub(t){return new f(this.x-t.x,this.y-t.y)}mul(t){return typeof t=="number"?new f(this.x*t,this.y*t):new f(this.x*t.x,this.y*t.y)}mag(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}norm(){return new f(this.x,this.y).mul(1/this.mag())}rotate(t){return new f(this.x*Math.cos(t)-this.y*Math.sin(t),this.x*Math.sin(t)+this.y*Math.cos(t))}dot(t){return t.x*this.x+t.y*this.y}angle(){return Math.atan2(this.y,this.x)}static random(){return new f(Math.random()*2-1,Math.random()*2-1)}static fromAngle(t){return new f(Math.cos(t),Math.sin(t))}};let r=f;d(r,"ZERO",new f(0,0)),d(r,"ONE",new f(1,1));class Pt{constructor(t,i){d(this,"position");d(this,"previousPosition");d(this,"velocity");d(this,"acceleration");d(this,"damping",.01);this.position=t!=null?t:r.ZERO,this.velocity=i!=null?i:r.ZERO,this.acceleration=r.ZERO,this.previousPosition=this.position}applyAcceleration(t){this.acceleration=this.acceleration.add(t)}update(t,i){this.previousPosition=this.position,this.position=this.position.add(this.velocity),this.velocity=this.velocity.add(this.acceleration).mul(1-this.damping),this.acceleration=r.ZERO;const e={x:this.position.x,y:this.position.y};this.position.x=O(this.position.x,t),this.position.y=O(this.position.y,i),(Math.floor(e.x)!==Math.floor(this.position.x)||Math.floor(e.y)!==Math.floor(this.position.y))&&(this.previousPosition=this.position)}}const ht=At(),k=document.querySelector("canvas"),G=k.getBoundingClientRect(),s=k.getContext("2d"),[h,m]=[1e3,1e3],mt=[h/G.width,m/G.height];k.width=h;k.height=m;const B=new r(h/2,m/2);k.addEventListener("mousemove",o=>{B.x=(o.clientX-G.left)*mt[0],B.y=(o.clientY-G.top)*mt[1]});let C=!1,I=!1;k.addEventListener("mousedown",o=>{o.button===0&&(C=!0),o.button===2&&(I=!0),o.preventDefault()});k.addEventListener("mouseup",o=>{o.button===0&&(C=!1),o.button===2&&(I=!1),o.preventDefault()});k.addEventListener("contextmenu",o=>o.preventDefault());const dt=()=>Array.from({length:5e3},()=>new Pt(r.random().mul(Math.min(h,m)),r.random().mul(2)));let ft=0,q=0,yt=performance.now(),v=dt(),u="vortex";document.querySelector("select#mode").addEventListener("change",o=>{u=o.target.value,v=dt(),s.clearRect(0,0,h,m)});let c="rainbow";document.querySelector("select#draw-mode").addEventListener("change",o=>{c=o.target.value,s.clearRect(0,0,h,m)});const gt=o=>{ft+=o,q+=o-yt,yt=o,v.forEach((t,i)=>{if(u==="vortex"){const e=B.sub(t.position).norm();t.applyAcceleration(e.mul(C?-.5:I?1.5:.5))}if(u==="weak-vortex"){const e=B.sub(t.position).norm();t.applyAcceleration(e.mul(C?-.5:I?1.5:.1))}if(u==="random"&&t.applyAcceleration(r.random()),u==="indecisive"){const e=ft/500%E;t.applyAcceleration(r.fromAngle(e).mul(2))}if(u==="noise"){const n=E*(1+ht(.003*t.position.x,.003*t.position.y,q/2e3))/2;t.velocity=r.fromAngle(n)}if(u==="static-noise"){const n=E*(1+ht(.003*t.position.x,.003*t.position.y,0))/2;t.velocity=r.fromAngle(n)}if(u==="spin"&&(t.velocity=t.velocity.rotate(E/50).norm().mul(3*(.1+(1+Math.sin(ft/1e5))/2))),u==="arch-enemies"){const e=v[i%2==0?O(i+1,v.length):O(i-1,v.length)];t.applyAcceleration(e.position.sub(t.position).norm().mul(-.1))}if(u==="monogamy"){const e=v[i%2==0?O(i+1,v.length):O(i-1,v.length)];t.applyAcceleration(e.position.sub(t.position).norm().mul(.1))}if(u==="pulse"&&t.applyAcceleration(new r(h/2,m/2).sub(t.position).norm().mul(.1*Math.sin(q/800))),u==="hula-hoops"){const e=E*(q/3e3%1),n=new r(h/2,m/2).sub(t.position).norm();t.applyAcceleration(n.mul(.5*Math.max(1,1-n.dot(r.fromAngle(e))))),t.velocity=t.velocity.norm().mul(Math.max(t.velocity.mag(),10))}if(u==="spinny-orbs"){const e=E*(q/3e3%1),n=new r(h/2,m/2).sub(t.position).norm();t.applyAcceleration(n.mul(.2*Math.min(0,n.dot(r.fromAngle(e))))),t.applyAcceleration(n.mul(.5*Math.max(1,1-n.dot(r.fromAngle(e)))))}t.update(h,m)}),c==="rainbow"&&(s.fillStyle="rgba(255, 255, 255, .2)"),(c==="sand"||c==="line-segment-sand")&&(s.fillStyle="rgba(255, 255, 255, 0)"),(c==="ghost"||c==="line-segment-ghost")&&(s.fillStyle="rgba(255, 255, 255, 0.005)"),c==="simple"&&(s.fillStyle="rgba(255, 255, 255, 1)"),c==="line-segment"&&(s.fillStyle="rgba(255, 255, 255, .2)"),s.fillRect(0,0,h,m),v.forEach(t=>{c==="rainbow"&&(s.fillStyle=`hsla(${t.velocity.angle()/E*360} 50% 50% / 1)`,N(s,t.position.x,t.position.y,4)),c==="sand"&&(s.fillStyle="rgba(0, 0, 0, .01)",N(s,t.position.x,t.position.y,2)),c==="ghost"&&(s.fillStyle="rgba(0, 0, 0, .01)",N(s,t.position.x,t.position.y,3)),c==="simple"&&(s.fillStyle="rgba(0, 0, 0, 1)",N(s,t.position.x,t.position.y,1)),c==="line-segment"&&(s.strokeStyle="rgba(0, 0, 0, .5)",s.beginPath(),s.moveTo(t.previousPosition.x,t.previousPosition.y),s.lineTo(t.position.x,t.position.y),s.stroke()),c==="line-segment-sand"&&(s.strokeStyle="rgba(0, 0, 0, .1)",s.beginPath(),s.moveTo(t.previousPosition.x,t.previousPosition.y),s.lineTo(t.position.x,t.position.y),s.stroke()),c==="line-segment-ghost"&&(s.strokeStyle="rgba(0, 0, 0, .02)",s.beginPath(),s.moveTo(t.previousPosition.x,t.previousPosition.y),s.lineTo(t.position.x,t.position.y),s.stroke())}),requestAnimationFrame(gt)};requestAnimationFrame(gt);