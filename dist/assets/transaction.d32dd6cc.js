import{x as n,y as e}from"./index.98607a94.js";import{S as s}from"./sweetalert2.all.e9d3950e.js";const d=n("transaction",{state:()=>({_transactions:[],_transaction:null,addErrors:[],filter:new Date}),getters:{transactions:t=>t._transactions.filter(a=>{const r=a.attributes.created_at.split("-"),i=r[1]+"-"+r[0]+"-"+r[2];return new Date(i).toDateString("id-ID")==new Date(t.filter).toDateString("id-ID")}),transaction:t=>t._transaction,errors:t=>t.addErrors},actions:{getToken(){return JSON.parse(localStorage.getItem("user")).token},async getTransactions(){await this.getToken();const t=await e.get("/api/transaction",{headers:{Authorization:"Bearer "+this.getToken()}});this._transactions=t.data.data},async handleAddData(t){this.addErrors=[],await this.getToken();try{await e.post("/api/transaction",{product_id:t.product.id,qty:t.qty,total:t.qty*t.product.attributes.price_sell},{headers:{Authorization:"Bearer "+this.getToken()}}).then(()=>{s.fire({icon:"success",title:"Sukses!",text:"Transaksi berhasil disimpan."}),this.addErrors.length==0&&this.router.push({name:"data-riwayat-transaksi"})}).catch(()=>{s.fire({icon:"error",title:"Gagal Transaksi!",text:"Jumlah yang anda masukan melebihi stock."})})}catch(a){a.response.status===422&&(this.addErrors=a.response.data.errors)}},setFilter(t){this.filter=t}}});export{d as u};