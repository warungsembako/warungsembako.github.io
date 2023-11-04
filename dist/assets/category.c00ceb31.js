import{D as s,E as e}from"./index.f5236f97.js";const i=s("category",{state:()=>({categories:[],category:null,addErrors:[]}),getters:{categories:t=>t.categories,category:t=>t.category,errors:t=>t.addErrors},actions:{async getToken(){await e.get("/sanctum/csrf-cookie")},async getCategories(){await this.getToken();const t=await e.get("/api/categories");this.categories=t.data.data},async getCategoryById(t){await this.getToken(),await e.get(`/api/categories/${t}`).then(a=>{this.category=a.data.data})},async addCategory(t){await this.getToken();try{const a=await e.post("/api/categories",t);this.categories.push(a.data.data)}catch(a){a.response.status===422&&(this.addErrors=a.response.data.errors)}},async updateCategory({id:t,categoryData:a}){await this.getToken();try{const r=await e.put(`/api/categories/${t}`,a)}catch(r){r.response.status===422&&(this.addErrors=r.response.data.errors)}},async deleteCategory(t){await this.getToken();try{await e.delete(`/api/categories/${t}`)}catch{}}}});export{i as u};