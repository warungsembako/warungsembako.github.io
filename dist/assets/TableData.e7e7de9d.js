import{g as U,h as f,r as k,i as q,a as l,j as o,b as c,w as d,c as y,u,m as H,k as m,e as t,F as p,l as g,t as h,n as K,p as Y,q as z,s as G,v as J}from"./index.9dfdff68.js";import{_ as E}from"./CardBoxModal.c1cba6d1.js";import{_ as v,a as A}from"./BaseButtons.38767723.js";const O=t("p",null,[J("Lorem ipsum dolor sit amet "),t("b",null,"adipiscing elit")],-1),Q=t("p",null,"This is sample modal",-1),W=t("p",null,"Apakah anda yakin menghapus data ini?",-1),X=t("th",null,"No",-1),Z={key:0},ee=["data-label"],le={key:0,class:"before:hidden lg:w-1 whitespace-nowrap"},te={class:"p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"},se={__name:"TableData",props:{items:{type:Array,default:()=>[]},thead:{type:Array,default:()=>[]},columns:{type:Array,default:()=>[]},link:{type:String,default:null},linkEdit:{type:String,default:null},linkDetail:{type:String,default:null},isEdit:{type:Boolean,default:!0},isDelete:{type:Boolean,default:!0},isDetail:{type:Boolean,default:!0},add:{type:Boolean,default:!0},action:{type:Boolean,default:!0}},emits:["update:modelValue","cancel","confirm"],setup(n,{emit:L}){const _=n,V=U(),B=f(()=>_.items),w=k(),P=k(!1),C=k(!1),D=k(10),r=k(0),x=f(()=>B.value.slice(D.value*r.value,D.value*(r.value+1))),$=f(()=>Math.ceil(B.value.length/D.value)),I=f(()=>r.value+1),N=f(()=>{const s=[];for(let i=0;i<$.value;i++)s.push(i);return s}),S=()=>{L("confirm",w.value)},T=s=>{V.push({name:_.linkEdit,params:{id:s}})},M=s=>{V.push({name:_.linkDetail,params:{id:s}})},j=s=>{C.value=!0,w.value=s};return(s,i)=>{const R=q("RouterLink");return l(),o(p,null,[c(E,{modelValue:P.value,"onUpdate:modelValue":i[0]||(i[0]=e=>P.value=e),title:"Sample modal"},{default:d(()=>[O,Q]),_:1},8,["modelValue"]),c(E,{modelValue:C.value,"onUpdate:modelValue":i[1]||(i[1]=e=>C.value=e),title:"Konfirmasi",button:"danger","button-label":"Ya","has-cancel":"",onConfirm:S},{default:d(()=>[W]),_:1},8,["modelValue"]),n.add?(l(),y(R,{key:0,to:{name:n.link}},{default:d(()=>[c(v,{color:"success",label:"Tambah Data",icon:u(H),class:"mb-2"},null,8,["icon"])]),_:1},8,["to"])):m("",!0),t("table",null,[t("thead",null,[t("tr",null,[X,(l(!0),o(p,null,g(n.thead,(e,b)=>(l(),o("th",{key:b},h(e),1))),128)),n.action?(l(),o("th",Z)):m("",!0)])]),t("tbody",null,[(l(!0),o(p,null,g(u(x),(e,b)=>(l(),o("tr",{key:e.id},[t("td",null,h(b+1),1),(l(!0),o(p,null,g(n.columns,(a,F)=>(l(),o("td",{key:F,"data-label":a.label},h(a.type=="relationships"?a.keyItems(a.relationships(e.relationships))?a.keyItems(a.relationships(e.relationships)):"-":a.keyItems(e.attributes)?a.keyItems(e.attributes):"-"),9,ee))),128)),n.action?(l(),o("td",le,[c(A,{type:"justify-start lg:justify-end","no-wrap":""},{default:d(()=>[n.isEdit?(l(),y(v,{key:0,color:"warning",icon:u(K),small:"",onClick:a=>T(e.id)},null,8,["icon","onClick"])):m("",!0),n.isDetail?(l(),y(v,{key:1,color:"info",icon:u(Y),small:"",onClick:a=>M(e.id)},null,8,["icon","onClick"])):m("",!0),n.isDelete?(l(),y(v,{key:2,color:"danger",icon:u(z),small:"",onClick:a=>j(e.id)},null,8,["icon","onClick"])):m("",!0)]),_:2},1024)])):m("",!0)]))),128))])]),t("div",te,[c(G,null,{default:d(()=>[c(A,null,{default:d(()=>[(l(!0),o(p,null,g(u(N),e=>(l(),y(v,{key:e,active:e===r.value,label:e+1,color:e===r.value?"lightDark":"whiteDark",small:"",onClick:b=>r.value=e},null,8,["active","label","color","onClick"]))),128))]),_:1}),t("small",null,"Page "+h(u(I))+" of "+h(u($)),1)]),_:1})])],64)}}};export{se as _};
