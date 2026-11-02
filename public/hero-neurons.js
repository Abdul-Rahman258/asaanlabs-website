(function(){
var wrap=document.getElementById('neural');
if(!wrap)return;
var cv=wrap.querySelector('canvas'),ctx=cv.getContext('2d');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var TEAL='40,176,167',LIGHT='150,232,224';
var load=0.5,loadA=0.5,loadT=0.5,loadD=4,loadE=0;var N=160,nodes=[],edges=[],pulses=[],W=0,H=0,dpr=1,rotY=0.4,rotX=0.3,thought=1.5,last=0;
function rnd(a,b){return a+Math.random()*(b-a)}
function P(z){return 2.4/(2.4+z)}
function da(z){return Math.min(1,Math.max(0.12,(1.3-z)/2.6))}
for(var i=0;i<N;i++){
var u=rnd(-1,1),t=rnd(0,6.2832),s=Math.sqrt(1-u*u),r=1+rnd(-0.12,0.12);
nodes.push({x:s*Math.cos(t)*r,y:u*r,z:s*Math.sin(t)*r,c:rnd(0,0.6),fire:0,links:[]});
}
var seen={};
for(var i=0;i<N;i++){
var d=[];
for(var j=0;j<N;j++){if(j===i)continue;var a=nodes[i],b=nodes[j];d.push({j:j,k:(a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z)})}
d.sort(function(p,q){return p.k-q.k});
for(var m=0;m<3;m++){var j2=d[m].j,key=Math.min(i,j2)+'-'+Math.max(i,j2);if(!seen[key]){seen[key]=1;edges.push([i,j2]);nodes[i].links.push(j2);nodes[j2].links.push(i)}}
}
function fire(i){var n=nodes[i];n.fire=1;n.c=0;for(var k=0;k<n.links.length;k++){if(Math.random()<0.7)pulses.push({a:i,b:n.links[k],t:0,v:rnd(1.1,1.9)})}}
function step(dt){
loadE+=dt;if(loadE>=loadD){loadA=loadT;loadT=rnd(0.05,1);loadD=rnd(3,6);loadE=0}load=loadA+(loadT-loadA)*(0.5-0.5*Math.cos(Math.PI*Math.min(1,loadE/loadD)));thought-=dt;if(thought<=0){thought=(1.2+3.3*(1-load))*rnd(0.8,1.2);fire(Math.floor(Math.random()*N))}
for(var i=0;i<N;i++){var n=nodes[i];n.c+=dt*(0.02+0.09*load)*(0.6+Math.random()*0.8);if(n.c>=1)fire(i);n.fire=Math.max(0,n.fire-dt*2.4)}
for(var p=pulses.length-1;p>=0;p--){var q=pulses[p];q.t+=dt*q.v*(0.45+1.1*load);if(q.t>=1){pulses.splice(p,1);var b=nodes[q.b];b.c+=0.3;if(b.c>=1)fire(q.b);else b.fire=Math.max(b.fire,0.5)}}
rotY+=dt*(0.06+0.12*load);rotX=0.3+Math.sin(performance.now()/9000)*0.15;
}
function draw(){
ctx.clearRect(0,0,W,H);
var cy=Math.cos(rotY),sy=Math.sin(rotY),cx=Math.cos(rotX),sx=Math.sin(rotX),S=Math.min(W,H)*(0.22+0.16*load);
for(var i=0;i<N;i++){var n=nodes[i],x=n.x*cy+n.z*sy,z0=-n.x*sy+n.z*cy,y=n.y*cx-z0*sx,z=n.y*sx+z0*cx;n.pz=z;n.pp=P(z);n.px=W/2+x*S*n.pp;n.py=H/2+y*S*n.pp}
ctx.lineWidth=0.8;
for(var e=0;e<edges.length;e++){var A=nodes[edges[e][0]],B=nodes[edges[e][1]],al=0.08+0.2*((da(A.pz)+da(B.pz))/2);ctx.strokeStyle='rgba('+TEAL+','+al.toFixed(3)+')';ctx.beginPath();ctx.moveTo(A.px,A.py);ctx.lineTo(B.px,B.py);ctx.stroke()}
ctx.globalCompositeOperation='lighter';
for(var p=0;p<pulses.length;p++){var q=pulses[p],A=nodes[q.a],B=nodes[q.b],x=A.px+(B.px-A.px)*q.t,y=A.py+(B.py-A.py)*q.t,g=ctx.createRadialGradient(x,y,0,x,y,8);g.addColorStop(0,'rgba('+LIGHT+',0.95)');g.addColorStop(1,'rgba('+TEAL+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,8,0,6.2832);ctx.fill()}
ctx.globalCompositeOperation='source-over';
for(var i=0;i<N;i++){var n=nodes[i],a=da(n.pz),f=n.fire,r=(1.2+f*2.2)*n.pp;
if(f>0.05){var g=ctx.createRadialGradient(n.px,n.py,0,n.px,n.py,r*5);g.addColorStop(0,'rgba('+LIGHT+','+(0.5*f).toFixed(3)+')');g.addColorStop(1,'rgba('+TEAL+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.px,n.py,r*5,0,6.2832);ctx.fill()}
ctx.fillStyle='rgba('+(f>0.3?LIGHT:TEAL)+','+(0.35+0.6*a*(0.4+0.6*f)).toFixed(3)+')';ctx.beginPath();ctx.arc(n.px,n.py,r,0,6.2832);ctx.fill()}
}
function size(){var r=wrap.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0)}
function frame(now){var dt=Math.min(0.05,(now-last)/1000||0.016);last=now;step(dt);draw();requestAnimationFrame(frame)}
size();
window.addEventListener('resize',size);
for(var k=0;k<60;k++)step(0.05);
if(reduce){draw()}else{last=performance.now();requestAnimationFrame(frame)}
})();
