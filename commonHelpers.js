import{S as f,i as v}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&e(a)}).observe(document,{childList:!0,subtree:!0});function r(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function e(t){if(t.ep)return;t.ep=!0;const n=r(t);fetch(t.href,n)}})();const g="/goit-js-hw-12/assets/info-28eb2f9b.svg",p="/goit-js-hw-12/assets/icon-error-9681c3d4.svg",w={info:g,error:p},m=new f(".gallery li a");function c(i,s){let r,e;switch(i.toLowerCase()){case"error":r="red";break;case"info":r="blue";break;case"success":r="green";break}window.innerWidth<768?e="100%":e="33%",v.show({title:`${i}`,color:r,maxWidth:e,iconUrl:w[i.toLowerCase()],position:"topRight",message:`${s}`})}async function y(i,s){const r=i.hits.map(e=>`<li>
                <a href="${e.largeImageURL}"><img src='${e.webformatURL}' alt='${e.tags}'></a>
                <div class="content">
                    <div class="item"><h3>Likes</h3><p>${e.likes}</p></div>
                    <div class="item"><h3>Views</h3><p>${e.views}</p></div>
                    <div class="item"><h3>Comments</h3><p>${e.comments}</p></div>
                    <div class="item"><h3>Downloads</h3><p>${e.downloads}</p></div>
                </div>
            </li>`).join("");s.textContent="",s.insertAdjacentHTML("beforeend",r),m.refresh()}async function L(i,s){const r=i.hits.map(e=>`<li>
                  <a href="${e.largeImageURL}"><img src='${e.webformatURL}' alt='${e.tags}'></a>
                  <div class="content">
                      <div class="item"><h3>Likes</h3><p>${e.likes}</p></div>
                      <div class="item"><h3>Views</h3><p>${e.views}</p></div>
                      <div class="item"><h3>Comments</h3><p>${e.comments}</p></div>
                      <div class="item"><h3>Downloads</h3><p>${e.downloads}</p></div>
                  </div>
              </li>`).join("");s.insertAdjacentHTML("beforeend",r),m.refresh()}class l{constructor(){this.element=document.querySelector(".js-loader-text"),this.options={text:"Loading images, please wait",loader:".",count:3}}createInterval({count:s,text:r,loader:e}){this.element.classList.remove("js-hidden");let t=0;this.interval=setInterval(()=>{t>s&&(t=0),this.element.innerText=r.padEnd(r.length+t,e),t++},200)}removeInterval(s){clearInterval(s),this.element.classList.add("js-hidden")}init(){this.element.classList.add("js-hidden")}}async function b(i,s){const r=new l;r.createInterval(r.options),await fetch(`https://pixabay.com/api/?${i}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{if(!e.hits||e.hits.length===0)throw new Error("Error! Nothing to load");y(e,s)}).catch(e=>{c("Error","Sorry, there are no images matching your search query. Please try again!")}).finally(()=>r.removeInterval(r.interval))}async function $(i,s){const r=new l;r.createInterval(r.options),await fetch(`https://pixabay.com/api/?${i}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()}).then(e=>{if(!e.hits||e.hits.length===0)throw new Error("Error! Nothing to load");L(e,s).then(()=>{let t=document.querySelector(".gallery li");t=t.getBoundingClientRect();let n=20;window.scrollBy({top:(t.height+n)*2,behavior:"smooth"})})}).catch(e=>{c("Error","We're sorry, but you've reached the end of search results.")}).finally(()=>r.removeInterval(r.interval))}const d=document.querySelector("form"),u=document.querySelector(".photo-list"),E=document.querySelector('button[data-request="load-more"]'),j=new l;j.init();let o=new URLSearchParams({key:"7706316-da1567048322714709989c4f8",q:"",image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:15}),h=1;d.addEventListener("submit",i=>{i.preventDefault();const s=d.elements[0].value.trim();if(!s){c("Info","Search input must be filled!");return}o.set("q",s),b(o,u)});E.addEventListener("click",i=>{i.preventDefault(),o.set("page",h),h++,$(o,u)});
//# sourceMappingURL=commonHelpers.js.map