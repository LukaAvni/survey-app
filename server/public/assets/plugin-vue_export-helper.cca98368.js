import{A as r,B as i}from"./index.ff82b4d1.js";const a=[Element,String],c=[null,document,document.body,document.scrollingElement,document.documentElement];function u(o,t){let e=r(t);if(e===void 0){if(o==null)return window;e=o.closest(".scroll,.scroll-y,.overflow-auto")}return c.includes(e)?window:e}function f(o){return o===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:o.scrollTop}function w(o){return o===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:o.scrollLeft}let l;function p(){if(l!==void 0)return l;const o=document.createElement("p"),t=document.createElement("div");i(o,{width:"100%",height:"200px"}),i(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(o),document.body.appendChild(t);const e=o.offsetWidth;t.style.overflow="scroll";let n=o.offsetWidth;return e===n&&(n=t.clientWidth),t.remove(),l=e-n,l}function m(o,t=!0){return!o||o.nodeType!==Node.ELEMENT_NODE?!1:t?o.scrollHeight>o.clientHeight&&(o.classList.contains("scroll")||o.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(o)["overflow-y"])):o.scrollWidth>o.clientWidth&&(o.classList.contains("scroll")||o.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(o)["overflow-x"]))}var h=(o,t)=>{const e=o.__vccOpts||o;for(const[n,s]of t)e[n]=s;return e};export{h as _,f as a,w as b,p as c,u as g,m as h,a as s};
