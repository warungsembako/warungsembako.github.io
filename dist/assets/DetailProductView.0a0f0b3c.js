import{M as n,o as l,c as u,w as o,_ as d,X as p,a as m,b as c,d as h,z as g,u as y,e as t,t as a,f as x,i as f,O as b}from"./index.9dfdff68.js";import{u as k}from"./product.bad98b5a.js";import"./sweetalert2.all.e9d3950e.js";const w=t("h1",{class:"text-center text-2xl mb-4"},"Detail Data Produk",-1),B={class:"mt-4"},D=t("h2",{class:"text-gray-500 mt-3"},"Kategori",-1),q={class:"mt-2 text-lg"},v=t("h2",{class:"text-gray-500 mt-3"},"Nama",-1),P={class:"mt-2 text-lg"},S=t("h2",{class:"text-gray-500 mt-3"},"Deskripsi",-1),$={class:"mt-2 text-lg"},C=t("h2",{class:"text-gray-500 mt-3"},"Harga Beli",-1),L={class:"mt-2 text-lg"},N=t("h2",{class:"text-gray-500 mt-3"},"Harga Jual",-1),R={class:"mt-2 text-lg"},V=t("h2",{class:"text-gray-500 mt-3"},"Jumlah",-1),z={class:"mt-2 text-lg"},H=t("h2",{class:"text-gray-500 mt-3"},"Satuan",-1),J={class:"mt-2 text-lg"},X={__name:"DetailProductView",setup(M){const r=p(),e=k(),s=n({category:"",name:"",desc:"",price_buy:"",price_sell:"",qty:"",unit:""}),i=r.params.id;return l(async()=>{await e.getProductById(i),s.category=e.product.relationships.category.attributes.category,s.name=e.product.attributes.name,s.desc=e.product.attributes.desc,s.price_buy=e.product.attributes.price_buy,s.price_sell=e.product.attributes.price_sell,s.qty=e.product.attributes.qty,s.unit=e.product.relationships.unit.attributes.desc}),(O,A)=>{const _=f("RouterLink");return m(),u(d,null,{default:o(()=>[c(x,null,{default:o(()=>[c(h,null,{default:o(()=>[c(_,{to:{name:"data-produk"},class:"hover:text-indigo-600"},{default:o(()=>[c(g,{path:y(b),size:"34",w:"",h:"h-16"},null,8,["path"])]),_:1}),w,t("div",B,[D,t("p",q,a(s.category),1),v,t("p",P,a(s.name),1),S,t("p",$,a(s.desc?s.desc:"-"),1),C,t("p",L,a(s.price_buy),1),N,t("p",R,a(s.price_sell),1),V,t("p",z,a(s.qty),1),H,t("p",J,a(s.unit),1)])]),_:1})]),_:1})]),_:1})}}};export{X as default};
