(function(w,T){typeof exports=="object"&&typeof module<"u"?T(exports):typeof define=="function"&&define.amd?define(["exports"],T):(w=typeof globalThis<"u"?globalThis:w||self,T(w.DrawingPlugin={}))})(this,(function(w){"use strict";const T="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let C=(d=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(d|=0));for(;d--;)e+=T[n[d]&63];return e};class B{activeTool="move";startPoint=null;currentDrawingId=null;lines=[];get tool(){return this.activeTool}setTool(e){this.activeTool=e,this.lines=this.lines.filter(n=>!n.preview),document.querySelectorAll(".tool-btn").forEach(n=>n.classList.toggle("active",n.id===e+"-button"))}onClick(e,n,t){if(this.activeTool!=="pen")switch(this.activeTool){case"trendline":case"fibonacci":case"measure":case"rectangle":if(!this.startPoint){this.startPoint={time:e,price:n};return}this.lines=this.lines.filter(s=>!s.preview),this.lines.push({id:C(),p1:this.startPoint,p2:{time:e,price:n},type:this.activeTool==="fibonacci"?"fib":this.activeTool==="measure"?"measure":this.activeTool==="rectangle"?"rectangle":"line"}),t.applyOptions({handleScroll:!0,handleScale:!0}),this.startPoint=null;break}}onMove(e,n){this.activeTool!=="pen"&&this.startPoint&&(this.lines=this.lines.filter(t=>!t.preview),this.lines.push({id:"preview",p1:this.startPoint,p2:{time:e,price:n},preview:!0,type:this.activeTool==="fibonacci"?"fib":this.activeTool==="measure"?"measure":this.activeTool==="rectangle"?"rectangle":"line"}))}startDrawing(e,n,t){if(this.activeTool!=="pen")return;const s=C();this.currentDrawingId=s,this.lines.push({id:s,p1:{time:e,price:n},p2:{time:e,price:n},type:"pen",points:[{time:e,price:n,logical:t}]})}continueDrawing(e,n,t){if(this.activeTool!=="pen"||!this.currentDrawingId)return;const s=this.lines.find(o=>o.id===this.currentDrawingId);!s||!s.points||(s.points.push({time:e,price:n,logical:t}),s.p2={time:e,price:n})}endDrawing(){this.activeTool==="pen"&&(this.currentDrawingId=null)}removeLine(e){this.lines=this.lines.filter(n=>n.id!==e)}}function k(d,e){return d.startsWith("rgba")?d.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,`rgba($1,$2,$3,${e})`):d.startsWith("rgb")?d.replace("rgb","rgba").replace(")",`,${e})`):d}function O(d,e=30){const n=d.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(!n)return d;const t=Math.min(+n[1]+e,255),s=Math.min(+n[2]+e,255),o=Math.min(+n[3]+e,255);return`rgb(${t}, ${s}, ${o})`}class q{lines=[];options;hoveredLineId=null;selectedLineId=null;dragState=null;hitEndpoint(e,n,t,s,o=6){return Math.hypot(e-t,n-s)<=o}update(e){this.lines=e}draw(e){e.useBitmapCoordinateSpace(n=>{const t=n.context,s=n.horizontalPixelRatio,o=n.verticalPixelRatio;for(const i of this.lines){const c=i.id===this.hoveredLineId,h=i.id===this.selectedLineId;t.save();const r=i.color??this.options?.color??"rgba(32,108,237,1)",p={normal:r,hovered:k(r,.6),selected:O(r,40)};if(i.interaction===!1?t.strokeStyle=p.normal:t.strokeStyle=h?p.selected:c?p.hovered:p.normal,t.lineWidth=((this.options?.lineWidth??1)+(c||h?1:0))*o,i.type==="rectangle"){const a=i.x1*s,l=i.y1*o,u=i.x2*s,f=i.y2*o,g=u-a,b=f-l;if(t.fillStyle=k(r,.15),t.fillRect(a,l,g,b),t.beginPath(),t.rect(a,l,g,b),t.stroke(),(c||h)&&i.interaction!==!1){const x=4*o,y=(m,v)=>{t.fillStyle=p.normal,t.beginPath(),t.arc(m*s,v*o,x,0,Math.PI*2),t.fill(),t.strokeStyle=p.normal,t.lineWidth=1*o,t.stroke()};y(i.x1,i.y1),y(i.x2,i.y1),y(i.x2,i.y2),y(i.x1,i.y2)}t.restore();continue}if(i.type==="measure"){const a=i.x1*s,l=i.y1*o,u=i.x2*s,f=i.y2*o,g=u-a,b=f-l;if(t.fillStyle=k(r,.12),t.fillRect(a,l,g,b),t.strokeStyle=p.normal,t.lineWidth=1*o,t.setLineDash([4,4]),t.beginPath(),t.rect(a,l,g,b),t.stroke(),t.setLineDash([]),i.measureLabel){const x=(a+u)/2,y=(l+f)/2,m=10*s,v=8*o,S=11*o;t.font=`500 ${S}px sans-serif`;const L=[i.measureLabel.priceChange,`${i.measureLabel.bars}, ${i.measureLabel.duration}`];let M=0;for(const V of L){const _=t.measureText(V).width;_>M&&(M=_)}const I=M+m*2,$=S*2+v*2+4*o,R=x-I/2,P=y-$/2;t.fillStyle="#1e222d",t.strokeStyle=r,t.lineWidth=1*o,t.beginPath();const j=6*o;t.roundRect(R,P,I,$,j),t.fill(),t.stroke(),t.fillStyle="#ffffff",t.textAlign="center",t.textBaseline="middle",t.fillText(L[0],x,P+v+S/2),t.fillText(L[1],x,P+v+S*1.5+4*o)}if((c||h)&&i.interaction!==!1){const x=4*o,y=(m,v)=>{t.fillStyle=p.normal,t.beginPath(),t.arc(m*s,v*o,x,0,Math.PI*2),t.fill(),t.strokeStyle=p.normal,t.lineWidth=1*o,t.stroke()};y(i.x1,i.y1),y(i.x2,i.y2)}t.restore();continue}if(i.type==="text"){const a=i.x1*s,l=i.y1*o,u=i.text||"",f=14*o;t.font=`bold ${f}px sans-serif`,t.fillStyle=p.normal,t.textAlign="center",t.textBaseline="bottom";const b=t.measureText(u).width,x=f,y=6*o,m=6*o;if(i.textWidth=b/s,i.textHeight=x/o,(c||h)&&i.interaction!==!1){t.strokeStyle=k(r,.4),t.lineWidth=1*o,t.setLineDash([2,2]),t.strokeRect(a-b/2-y,l-x-m-y,b+y*2,x+y*2),t.setLineDash([]);const v=4*o;t.fillStyle=p.normal,t.beginPath(),t.arc(i.x1*s,i.y1*o,v,0,Math.PI*2),t.fill()}t.fillText(u,a,l-m),t.restore();continue}if(t.setLineDash(i.preview?[4,4]:[]),t.beginPath(),i.points&&i.points.length>0){const a=i.points;t.moveTo(a[0].x*s,a[0].y*o);let l=1;for(;l<a.length-2;l++){const u=(a[l].x+a[l+1].x)/2,f=(a[l].y+a[l+1].y)/2;t.quadraticCurveTo(a[l].x*s,a[l].y*o,u*s,f*o)}l<a.length-1?t.quadraticCurveTo(a[l].x*s,a[l].y*o,a[l+1].x*s,a[l+1].y*o):a.length>1&&t.lineTo(a[a.length-1].x*s,a[a.length-1].y*o)}else t.moveTo(i.x1*s,i.y1*o),t.lineTo(i.x2*s,i.y2*o);if(t.stroke(),(c||h)&&i.interaction!==!1&&!i.points){const a=4*o,l=(u,f)=>{t.fillStyle=p.normal,t.beginPath(),t.arc(u*s,f*o,a,0,Math.PI*2),t.fill(),t.strokeStyle=p.normal,t.lineWidth=1*o,t.stroke()};l(i.x1,i.y1),l(i.x2,i.y2)}i.label&&(t.font=`${10*o}px sans-serif`,t.fillStyle=i.textColor??i.color??r,t.textAlign="left",t.textBaseline="bottom",t.fillText(i.label,i.x1*s+2*s,i.y1*o-2*o)),t.restore()}})}distanceToLine(e,n,t,s,o,i){const c=e-t,h=n-s,r=o-t,p=i-s,a=c*r+h*p,l=r*r+p*p,u=Math.max(0,Math.min(1,a/l)),f=t+u*r-e,g=s+u*p-n;return Math.sqrt(f*f+g*g)}findLineAt(e,n,t=6){for(let s=this.lines.length-1;s>=0;s--){const o=this.lines[s];if(o.interaction!==!1){if(o.type==="rectangle"||o.type==="measure"){const i=Math.min(o.x1,o.x2),c=Math.max(o.x1,o.x2),h=Math.min(o.y1,o.y2),r=Math.max(o.y1,o.y2);if(e>=i-t&&e<=c+t&&n>=h-t&&n<=r+t){const p=Math.abs(n-o.y1),a=Math.abs(n-o.y2),l=Math.abs(e-o.x1),u=Math.abs(e-o.x2);if(p<=t||a<=t||l<=t||u<=t||e>i&&e<c&&n>h&&n<r)return o}}else if(o.type==="text"){const i=o.textWidth||80,c=o.textHeight||14,h=6,r=6;if(e>=o.x1-i/2-h&&e<=o.x1+i/2+h&&n>=o.y1-c-r-h&&n<=o.y1-r+h)return o}else if(o.points&&o.points.length>0)for(let i=0;i<o.points.length-1;i++){const c=o.points[i],h=o.points[i+1];if(this.distanceToLine(e,n,c.x,c.y,h.x,h.y)<=t)return o}else if(this.distanceToLine(e,n,o.x1,o.y1,o.x2,o.y2)<=t)return o}}return null}onHover(e,n,t){const s=this.findLineAt(e,n);this.hoveredLineId=s?.id??null,s?this.setCursor("pointer",t):this.setCursor("default",t)}getDragState(){return this.dragState}rendererLines(){return this.lines}onPointerDown(e,n){const t=this.findLineAt(e,n);if(t){if(this.selectedLineId=t.id,t.points){this.dragState={lineId:t.id,type:"poly",pointsSnapshot:t.points.map(s=>({...s})),dragOrigin:{x:e,y:n}};return}if(this.hitEndpoint(e,n,t.x1,t.y1)){this.dragState={lineId:t.id,type:"start",grabOffset:{x1:t.x1-e,y1:t.y1-n,x2:0,y2:0}};return}if(this.hitEndpoint(e,n,t.x2,t.y2)){this.dragState={lineId:t.id,type:"end",grabOffset:{x1:0,y1:0,x2:t.x2-e,y2:t.y2-n}};return}this.dragState={lineId:t.id,type:"line",grabOffset:{x1:t.x1-e,y1:t.y1-n,x2:t.x2-e,y2:t.y2-n}}}}onPointerMove(e,n){if(!this.dragState)return;const t=this.lines.find(o=>o.id===this.dragState.lineId);if(!t)return;if(this.dragState.type==="poly"&&this.dragState.pointsSnapshot&&this.dragState.dragOrigin){const o=e-this.dragState.dragOrigin.x,i=n-this.dragState.dragOrigin.y;t.points=this.dragState.pointsSnapshot.map(c=>({x:c.x+o,y:c.y+i}));return}const s=this.dragState.grabOffset;this.dragState.type==="line"&&(t.x1=e+s.x1,t.y1=n+s.y1,t.x2=e+s.x2,t.y2=n+s.y2),this.dragState.type==="start"&&(t.x1=e+s.x1,t.y1=n+s.y1,t.type==="text"&&(t.x2=t.x1,t.y2=t.y1)),this.dragState.type==="end"&&(t.x2=e+s.x2,t.y2=n+s.y2)}onPointerUp(){this.dragState=null}setCursor(e,n){n.chartElement().querySelectorAll("canvas").forEach(o=>{o.style.cursor=e})}onClick(e,n){const t=this.findLineAt(e,n);this.selectedLineId=t?.id??null}getSelected(){return this.selectedLineId}setOptions(e){this.options={...e}}}function D(d){return typeof d=="string"?new Date(d):typeof d=="number"?new Date(d*1e3):d&&typeof d=="object"&&"year"in d&&"month"in d&&"day"in d?new Date(d.year,d.month-1,d.day):new Date}function A(d,e){const n=Math.abs(e.getTime()-d.getTime()),t=Math.floor(n/(1e3*60)),s=Math.floor(t/60),o=Math.floor(s/24);return o>0?`${o}d`:s>0?`${s}h`:`${t}m`}class H{constructor(e,n,t,s){this.chart=e,this.series=n,this.tools=t,this.requestUpdate=s,this._renderer=new q,this.initializeHandlers()}_renderer;isDragging=!1;initializeHandlers(){this.chart.subscribeCrosshairMove(n=>{n.point&&this._renderer?.onHover(n.point.x,n.point.y,this.chart)}),this.chart.subscribeClick(n=>{n.point&&this.handleClick(n.point.x,n.point.y)});const e=this.chart.chartElement();e.addEventListener("mousedown",this.handlePointerDown.bind(this)),e.addEventListener("mousemove",this.handlePointerMove.bind(this)),window.addEventListener("mouseup",this.handlePointerUp.bind(this))}handleClick(e,n){if(this.tools.tool==="remover"){const t=this._renderer.findLineAt(e,n);t&&(this.tools.removeLine(t.id),this._renderer.onHover(e,n,this.chart));return}if(this.tools.tool==="text"){const s=this.chart.timeScale().coordinateToTime(e),o=this.series.coordinateToPrice(n);s&&o&&this.showInlineEditor(e,n,"",i=>{i.trim()!==""&&(this.tools.lines.push({id:C(),p1:{time:s,price:o},p2:{time:s,price:o},type:"text",text:i}),this.update(),this.requestUpdate?.())});return}if(this.tools.tool==="move"){const t=this._renderer.findLineAt(e,n);if(t&&t.type==="text"){const s=this.tools.lines.find(o=>o.id===t.id);if(s&&s.type==="text"){const i=this.chart.timeScale().timeToCoordinate(s.p1.time),c=this.series.priceToCoordinate(s.p1.price);if(i!==null&&c!==null){const h=s.text||"";s.text="",this.update(),this.requestUpdate?.(),this.showInlineEditor(i,c,h,r=>{r.trim()!==""?s.text=r:s.text=h,this.update(),this.requestUpdate?.()})}return}}}this._renderer?.onClick(e,n)}showInlineEditor(e,n,t,s){const o=this.chart.chartElement(),i=document.createElement("input");i.type="text",i.value=t,i.style.position="absolute",i.style.left=`${e}px`,i.style.top=`${n-28}px`,i.style.transform="translateX(-50%)",i.style.textAlign="center",i.style.font="bold 14px sans-serif",i.style.color="#ffffff",i.style.background="#1e222d",i.style.border="1px solid rgba(32, 108, 237, 0.6)",i.style.borderRadius="4px",i.style.padding="2px 6px",i.style.outline="none",i.style.zIndex="10000000",i.style.boxShadow="0 2px 8px rgba(0,0,0,0.5)",o.appendChild(i),i.focus(),i.select();let c=!1;const h=r=>{c||(c=!0,r&&s(i.value),i.remove())};i.addEventListener("keydown",r=>{r.key==="Enter"?(h(!0),r.preventDefault()):r.key==="Escape"&&(h(!1),r.preventDefault())}),i.addEventListener("blur",()=>{h(!0)})}handlePointerDown(e){const t=this.chart.chartElement().getBoundingClientRect(),s=e.clientX-t.left,o=e.clientY-t.top;if(this.tools.tool==="pen"){const i=this.chart.timeScale(),c=i.coordinateToTime(s),h=i.coordinateToLogical(s),r=this.series.coordinateToPrice(o);c&&r&&h!==null&&(this.tools.startDrawing(c,r,h),this.update(),e.preventDefault());return}this.isDragging=!0,this._renderer.onPointerDown(s,o)}handlePointerMove(e){const t=this.chart.chartElement().getBoundingClientRect(),s=e.clientX-t.left,o=e.clientY-t.top;if(this.tools.tool==="pen"){const i=this.chart.timeScale(),c=i.coordinateToTime(s),h=i.coordinateToLogical(s),r=this.series.coordinateToPrice(o);c&&r&&h!==null&&(this.tools.continueDrawing(c,r,h),this.update());return}this.isDragging?(this._renderer.onPointerMove(s,o),this.syncDragState()):this._renderer.onHover(s,o,this.chart)}handlePointerUp(){if(this.tools.tool==="pen"){this.tools.endDrawing();return}this.isDragging&&(this.isDragging=!1,this._renderer.onPointerUp())}syncDragState(){const e=this._renderer.getDragState();if(!e){this.chart.applyOptions({handleScroll:!0,handleScale:!0});return}this.chart.applyOptions({handleScroll:!1,handleScale:!1});const n=this._renderer.rendererLines().find(r=>r.id===e.lineId);if(!n)return;const t=this.chart.timeScale(),s=this.tools.lines.find(r=>r.id===e.lineId);if(!s)return;if(n.points&&s.points){for(let r=0;r<n.points.length&&!(r>=s.points.length);r++){const p=n.points[r],a=t.coordinateToLogical(p.x),l=this.series.coordinateToPrice(p.y);if(a!==null&&l!==null){s.points[r].logical=a,s.points[r].price=l;const u=t.coordinateToTime(p.x);u&&(s.points[r].time=u)}}return}const o=t.coordinateToTime(n.x1),i=t.coordinateToTime(n.x2),c=this.series.coordinateToPrice(n.y1),h=this.series.coordinateToPrice(n.y2);o==null||i==null||c==null||h==null||(s.p1.time=o,s.p1.price=c,s.p2.time=i,s.p2.price=h)}update(){const e=this.chart.timeScale(),n=[];for(const t of this.tools.lines){const s=e.timeToCoordinate(t.p1.time),o=e.timeToCoordinate(t.p2.time),i=this.series.priceToCoordinate(t.p1.price),c=this.series.priceToCoordinate(t.p2.price),h=t.id;if(s==null||i==null)continue;const r=o!==null?o:s,a={id:h,x1:s,y1:i,x2:r,y2:c!==null?c:i,preview:t.preview,type:t.type,text:t.text};if(t.type==="measure"){const l=t.p2.price-t.p1.price,u=t.p1.price!==0?l/t.p1.price*100:0,f=e.coordinateToLogical(s),g=o!==null?e.coordinateToLogical(o):f,b=f!==null&&g!==null?Math.abs(g-f):0,x=D(t.p1.time),y=D(t.p2.time),m=A(x,y);a.measureLabel={priceChange:`${l>=0?"+":""}${l.toFixed(2)} (${l>=0?"+":""}${u.toFixed(2)}%)`,bars:`${b} bar${b!==1?"s":""}`,duration:m}}if(t.points&&(a.points=t.points.map(l=>{let u=null;l.logical!==void 0?u=e.logicalToCoordinate(l.logical):u=e.timeToCoordinate(l.time);const f=this.series.priceToCoordinate(l.price);return u!==null&&f!==null?{x:u,y:f}:null}).filter(l=>l!==null)),n.push(a),t.type==="fib"){const l=[0,.236,.382,.5,.618,.786,1],u={0:"#787b86",.236:"#f23645",.382:"#ff9800",.5:"#4caf50",.618:"#089981",.786:"#2962ff",1:"#787b86"},f=t.p2.price-t.p1.price;for(const g of l){const b=t.p1.price+f*g,x=this.series.priceToCoordinate(b);x!==null&&n.push({id:`${h}-fib-${g}`,x1:s,y1:x,x2:r,y2:x,preview:t.preview,interaction:!1,color:u[g]||"#787b86",label:`${g} (${b.toFixed(2)})`,textColor:u[g]||"#787b86"})}}}this._renderer.update(n)}setOptions(e){e&&this._renderer.setOptions(e)}setCursor(e){this.chart.chartElement().querySelectorAll("canvas").forEach(s=>{s.style.cursor=e})}renderer(){return this._renderer}}function E(d){if(d===void 0)throw new Error("Value is undefined");return d}class U{_chart;_series;_requestUpdate;tools=new B;pane=null;toolbox;options;requestUpdate(){this._requestUpdate?.()}attached({chart:e,series:n,requestUpdate:t}){this._chart=e,this._series=n,this._requestUpdate=t,this.pane=new H(e,n,this.tools,t),this.pane.setOptions(this.options),this.mountToolbox(),this.bindEvents(),this.pane?.update(),this.requestUpdate()}detached(){this.unBindEvents(),this.toolbox?.remove(),this.toolbox=void 0,this.pane=null}paneViews(){return this.pane?[this.pane]:[]}get chart(){return E(this._chart)}get series(){return E(this._series)}mountToolbox(){const e=this.chart.chartElement();e.style.position="relative";const n=document.createElement("div");n.style.position="absolute",n.style.top=`${this.options?.toolBoxOffset?.y??100}px`,n.style.left=`${this.options?.toolBoxOffset?.x??10}px`,n.style.zIndex="9999999",n.className="lwc-toolbox",n.innerHTML=`
  <button data-tool="move" class="tool-btn" id="move-button" title="Move">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#2252cc" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    </svg>
  </button>

  <button data-tool="trendline" class="tool-btn" id="trendline-button" title="Trendline">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#2252cc">
      <line x1="4" y1="18" x2="18" y2="6"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="4" cy="18" r="2" fill="currentColor" />
      <circle cx="18" cy="6" r="2" fill="currentColor" />
    </svg>
  </button>

  <button data-tool="fibonacci" class="tool-btn" id="fibonacci-button" title="Fibonacci Retracement">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="1" y1="20" x2="23" y2="20" />
      <line x1="1" y1="14" x2="23" y2="14" />
      <line x1="1" y1="8" x2="23" y2="8" />
      <line x1="3" y1="2" x2="3" y2="22" />
    </svg>
  </button>

  <button data-tool="rectangle" class="tool-btn" id="rectangle-button" title="Rectangle">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </svg>
  </button>

  <button data-tool="text" class="tool-btn" id="text-button" title="Text">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  </button>

  <button data-tool="measure" class="tool-btn" id="measure-button" title="Measure">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.3 8.11 15.89 2.7a1 1 0 0 0-1.41 0L2.7 14.48a1 1 0 0 0 0 1.41l5.41 5.41a1 1 0 0 0 1.42 0L21.3 9.52a1 1 0 0 0 0-1.41z" />
      <path d="m7.5 10.5 1.5-1.5" />
      <path d="m10.5 13.5 1.5-1.5" />
      <path d="m13.5 16.5 1.5-1.5" />
      <path d="m9 7.5 1.5-1.5" />
      <path d="m12 10.5 1.5-1.5" />
      <path d="m15 13.5 1.5-1.5" />
    </svg>
  </button>

  <button data-tool="pen" class="tool-btn" id="pen-button" title="Pen Tool">
     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
  </button>

  <button data-tool="remover" class="tool-btn" id="remover-button" title="Eraser">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#2252cc">
      <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M8 6V4H16V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <path d="M6 6L7 20H17L18 6" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
      <path d="M10 11V17M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  </button>
`;const t=document.createElement("style");t.textContent=`
.lwc-toolbox {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;

  background: #020817;
  border: 1px solid #1e222d;
  border-radius: 12px;


}

.tool-btn {
  width: 40px;
  height: 40px;

  border: 1px solid #1e222d;
  background: #090d16;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  color: #cfd3dc;

  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease,
    color 0.15s ease;
}

.tool-btn:hover {
  background: #1f2430;
  color: #ffffff;
}

.tool-btn.active {
  background: #2252cc;
  border-color: #2252cc;
  color: #ffffff;

  box-shadow:
    0 0 0 1px rgba(32,108,237,0.6),
    0 4px 12px rgba(32,108,237,0.35);
}

.tool-btn svg {
  pointer-events: none;
}
`,document.head.appendChild(t),n.onclick=s=>{const o=s.target.closest("button");if(!o)return;const i=o.dataset.tool;this.tools.setTool(i),this.chart.applyOptions({handleScroll:i==="move",handleScale:i==="move"})},n.onclick=s=>{const o=s.target.closest("button");if(!o)return;const i=o.dataset.tool;switch(this.tools.setTool(i),n.querySelectorAll(".tool-btn").forEach(c=>c.classList.toggle("active",c===o)),i){case"trendline":case"fibonacci":case"pen":case"measure":case"rectangle":case"text":this.setCursor("crosshair");break;case"remover":this.setCursor("pointer");break;default:this.setCursor("default");break}this.chart.applyOptions({handleScroll:i==="move",handleScale:i==="move"})},e.appendChild(n),this.toolbox=n}setCursor(e){this.chart.chartElement().querySelectorAll("canvas").forEach(s=>{s.style.cursor=e})}bindEvents(){this.chart.subscribeClick(this.handleClick),this.chart.subscribeCrosshairMove(this.handleCrosshairMove)}handleClick=e=>{if(!e.time||!e.point)return;const n=this.series.coordinateToPrice(e.point.y);n!=null&&(this.tools.onClick(e.time,n,this.chart),this.pane?.update(),this.requestUpdate())};handleCrosshairMove=e=>{if(!e.time||!e.point)return;const n=this.series.coordinateToPrice(e.point.y);n!=null&&(this.tools.onMove(e.time,n),this.pane?.update(),this.requestUpdate())};unBindEvents(){this.chart.unsubscribeClick(this.handleClick),this.chart.unsubscribeCrosshairMove(this.handleCrosshairMove)}}class W extends U{constructor(e){super(),e&&(this.options=e)}}w.DrawingPlugin=W,Object.defineProperty(w,Symbol.toStringTag,{value:"Module"})}));
