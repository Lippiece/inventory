import"./hoisted.BKH3BkdJ.js";/*!
 * swiped-events.js - v1.1.9
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */(function(d,a){typeof d.CustomEvent!="function"&&(d.CustomEvent=function(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=a.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n},d.CustomEvent.prototype=d.Event.prototype),a.addEventListener("touchstart",function(t){t.target.getAttribute("data-swipe-ignore")!=="true"&&(u=t.target,p=Date.now(),i=t.touches[0].clientX,r=t.touches[0].clientY,l=0,o=0,b=t.touches.length)},!1),a.addEventListener("touchmove",function(t){if(!(!i||!r)){var e=t.touches[0].clientX,n=t.touches[0].clientY;l=i-e,o=r-n}},!1),a.addEventListener("touchend",function(t){if(u===t.target){var e=parseInt(h(u,"data-swipe-threshold","20"),10),n=h(u,"data-swipe-unit","px"),s=parseInt(h(u,"data-swipe-timeout","500"),10),w=Date.now()-p,c="",v=t.changedTouches||t.touches||[];if(n==="vh"&&(e=Math.round(e/100*a.documentElement.clientHeight)),n==="vw"&&(e=Math.round(e/100*a.documentElement.clientWidth)),Math.abs(l)>Math.abs(o)?Math.abs(l)>e&&w<s&&(c=l>0?"swiped-left":"swiped-right"):Math.abs(o)>e&&w<s&&(c=o>0?"swiped-up":"swiped-down"),c!==""){var E={dir:c.replace(/swiped-/,""),touchType:(v[0]||{}).touchType||"direct",fingers:b,xStart:parseInt(i,10),xEnd:parseInt((v[0]||{}).clientX||-1,10),yStart:parseInt(r,10),yEnd:parseInt((v[0]||{}).clientY||-1,10)};u.dispatchEvent(new CustomEvent("swiped",{bubbles:!0,cancelable:!0,detail:E})),u.dispatchEvent(new CustomEvent(c,{bubbles:!0,cancelable:!0,detail:E}))}i=null,r=null,p=null}},!1);var i=null,r=null,l=null,o=null,p=null,u=null,b=0;function h(t,e,n){for(;t&&t!==a.documentElement;){var s=t.getAttribute(e);if(s)return s;t=t.parentNode}return n}})(window,document);
