import{x as i,y as e}from"./index.9dfdff68.js";import{S as r}from"./sweetalert2.all.e9d3950e.js";const u=i("satuan",{state:()=>({satuans:[],satuan:null,addErrors:[],filter:"terbaru"}),getters:{units:a=>{if(a.filter==="terbaru")return a.satuans;if(a.filter==="terlama")return[...a.satuans].reverse()},unit:a=>a.satuan,errors:a=>a.addErrors},actions:{getToken(){return JSON.parse(localStorage.getItem("user")).token},async getSatuan(){await this.getToken();const a=await e.get("/api/unit",{headers:{Authorization:"Bearer "+this.getToken()}});this.satuans=a.data.data},async getSatuanById(a){await this.getToken(),await e.get(`/api/unit/${a}`,{headers:{Authorization:"Bearer "+this.getToken()}}).then(t=>{this.satuan=t.data.data})},async handleAddData(a){this.addErrors=[],await this.getToken();try{await e.post("/api/unit",{unit:a.satuan,desc:a.keterangan},{headers:{Authorization:"Bearer "+this.getToken()}}),r.fire({icon:"success",title:"Sukses!",text:"Data telah berhasil disimpan ke database."}),this.addErrors.length==0&&this.router.push({name:"data-satuan"})}catch(t){t.response.status===422?this.addErrors=t.response.data.errors:t.response.status===409&&(this.addErrors.unit=["Unit sudah ada dalam database."])}},async handleUpdateData(a,t){this.addErrors=[],await this.getToken();try{await e.put(`/api/unit/${t}`,{unit:a.satuan,desc:a.keterangan},{headers:{Authorization:"Bearer "+this.getToken()}}).then(this.router.push({name:"data-satuan"}))}catch(s){s.response.status===422&&(this.addErrors=s.response.data.errors)}},async handleDeleteData(a){await this.getToken();try{await e.delete(`/api/unit/${a}`,{headers:{Authorization:"Bearer "+this.getToken()}}).then(()=>{const t=this.satuans.findIndex(s=>s.id===a);this.satuans.splice(t,1)})}catch{r.fire({icon:"error",title:"Gagal!",text:"Data sudah memiliki relasi terhadap data lain"})}},setFilter(a){this.filter=a}}});export{u};
