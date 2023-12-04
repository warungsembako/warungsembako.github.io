import{M as h,o as v,c as S,w as a,_ as w,X as $,a as i,b as t,d as C,K as b,z as U,u as o,j as p,e as d,t as m,k as _,f as q,i as B,O as P}from"./index.98607a94.js";import{_ as u,a as n}from"./FormControl.ed1e14bc.js";import{a as D,_ as V}from"./BaseButtons.2b711a00.js";import{u as N}from"./satuan.7e625d93.js";import{u as R}from"./category.cc00319c.js";import{u as E}from"./product.23afebaa.js";import"./sweetalert2.all.e9d3950e.js";const L=d("h1",{class:"text-center text-2xl mb-4"},"Edit Data Produk",-1),M={key:0},z={class:"text-red-400 text-sm p-2"},H={key:0},J={class:"text-red-400 text-sm p-2"},K={key:0},O={class:"text-red-400 text-sm p-2"},j={key:0},A={class:"text-red-400 text-sm p-2"},I={key:0},T={class:"text-red-400 text-sm p-2"},X={key:0},F={class:"text-red-400 text-sm p-2"},se={__name:"EditProductView",setup(G){const g=$(),c=N(),y=R(),s=E(),e=h({unit:"",category:"",name:"",price_buy:0,price_sell:0,qty:0}),f=g.params.id,x=()=>{e.unit="",e.category="",e.name="",e.price_buy="",e.price_sell="",e.qty=""};return v(async()=>{await c.getSatuan(),await y.getCategory(),await s.getProductById(f),e.unit=s.product.relationships.unit,e.category=s.product.relationships.category,e.name=s.product.attributes.name,e.price_buy=s.product.attributes.price_buy,e.price_sell=s.product.attributes.price_sell,e.qty=s.product.attributes.qty}),(Q,r)=>{const k=B("RouterLink");return i(),S(w,null,{default:a(()=>[t(q,null,{default:a(()=>[t(C,{"is-form":"",onSubmit:r[7]||(r[7]=b(l=>o(s).handleUpdateData(e,o(f)),["prevent"]))},{footer:a(()=>[t(D,null,{default:a(()=>[t(V,{type:"submit",color:"info",label:"Submit"}),t(V,{type:"reset",color:"danger",outline:"",label:"Reset",onClick:b(x,["prevent"])},null,8,["onClick"])]),_:1})]),default:a(()=>[t(k,{to:{name:"data-produk"},class:"hover:text-indigo-600"},{default:a(()=>[t(U,{path:o(P),size:"34",w:"",h:"h-16"},null,8,["path"])]),_:1}),L,t(u,{label:"Pilih Satuan"},{default:a(()=>[t(n,{modelValue:e.unit,"onUpdate:modelValue":r[0]||(r[0]=l=>e.unit=l),type:"select",options:o(c).units,"select-label":"desc"},{default:a(()=>[o(c).errors.unit_id?(i(),p("div",M,[d("span",z,m(o(c).errors.unit_id[0]),1)])):_("",!0)]),_:1},8,["modelValue","options"])]),_:1}),t(u,{label:"Pilih Kategori"},{default:a(()=>[t(n,{modelValue:e.category,"onUpdate:modelValue":r[1]||(r[1]=l=>e.category=l),type:"select",options:o(y).categories,"select-label":"category"},{default:a(()=>[o(y).errors.category_id?(i(),p("div",H,[d("span",J,m(o(y).errors.category_id[0]),1)])):_("",!0)]),_:1},8,["modelValue","options"])]),_:1}),t(u,{label:"Nama"},{default:a(()=>[t(n,{modelValue:e.name,"onUpdate:modelValue":r[2]||(r[2]=l=>e.name=l),placeholder:"Nama..."},{default:a(()=>[o(s).errors.name?(i(),p("div",K,[d("span",O,m(o(s).errors.name[0]),1)])):_("",!0)]),_:1},8,["modelValue"])]),_:1}),t(u,{label:"Deskripsi"},{default:a(()=>[t(n,{modelValue:e.desc,"onUpdate:modelValue":r[3]||(r[3]=l=>e.desc=l),placeholder:"Deskripsi..."},null,8,["modelValue"])]),_:1}),t(u,{label:"Harga Beli"},{default:a(()=>[t(n,{modelValue:e.price_buy,"onUpdate:modelValue":r[4]||(r[4]=l=>e.price_buy=l),type:"number",min:"0"},{default:a(()=>[o(s).errors.price_buy?(i(),p("div",j,[d("span",A,m(o(s).errors.price_buy[0]),1)])):_("",!0)]),_:1},8,["modelValue"])]),_:1}),t(u,{label:"Harga Jual"},{default:a(()=>[t(n,{modelValue:e.price_sell,"onUpdate:modelValue":r[5]||(r[5]=l=>e.price_sell=l),type:"number",min:"0"},{default:a(()=>[o(s).errors.price_buy?(i(),p("div",I,[d("span",T,m(o(s).errors.price_sell[0]),1)])):_("",!0)]),_:1},8,["modelValue"])]),_:1}),t(u,{label:"Jumlah"},{default:a(()=>[t(n,{modelValue:e.qty,"onUpdate:modelValue":r[6]||(r[6]=l=>e.qty=l),type:"number",min:"0"},{default:a(()=>[o(s).errors.price_buy?(i(),p("div",X,[d("span",F,m(o(s).errors.qty[0]),1)])):_("",!0)]),_:1},8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1})}}};export{se as default};
