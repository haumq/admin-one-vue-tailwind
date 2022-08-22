import{a as S,a8 as d,h as g,w as a,q as $,o as h,d as e,s as v,j as s,i as n,g as N,v as p,X as c,l as f,aa as m,ab as P,S as k,ac as _,ad as y,ae as U,af as x,ag as C,ah as w}from"./index.a0f54a48.js";import{_ as r}from"./FormCheckRadioPicker.e8640ecb.js";import{_ as M}from"./FormFilePicker.8b95de7f.js";import{_ as R}from"./UserCard.a66c9a09.js";const A={class:"grid grid-cols-1 lg:grid-cols-2 gap-6"},G={__name:"ProfileView",setup(B){const u=S(),t=d({name:u.userName,email:u.userEmail}),i=d({password_current:"",password:"",password_confirmation:""}),b=()=>{u.setUser(t)},V=()=>{};return(q,o)=>(h(),g($,null,{default:a(()=>[e(k,null,{default:a(()=>[e(v,{icon:s(_),title:"Profile",main:""},{default:a(()=>[e(n,{href:"https://github.com/justboil/admin-one-vue-tailwind",target:"_blank",icon:q.mdiGithub,label:"Star on GitHub",color:"contrast","rounded-full":"",small:""},null,8,["icon"])]),_:1},8,["icon"]),e(R,{class:"mb-6"}),N("div",A,[e(p,{title:"Edit Profile",icon:s(y),form:"",onSubmit:c(b,["prevent"])},{footer:a(()=>[e(f,null,{default:a(()=>[e(n,{color:"info",type:"submit",label:"Submit"}),e(n,{color:"info",label:"Options",outline:""})]),_:1})]),default:a(()=>[e(r,{label:"Avatar",help:"Max 500kb"},{default:a(()=>[e(M)]),_:1}),e(r,{label:"Name",help:"Required. Your name"},{default:a(()=>[e(m,{modelValue:t.name,"onUpdate:modelValue":o[0]||(o[0]=l=>t.name=l),icon:s(_),name:"username",required:"",autocomplete:"username"},null,8,["modelValue","icon"])]),_:1}),e(r,{label:"E-mail",help:"Required. Your e-mail"},{default:a(()=>[e(m,{modelValue:t.email,"onUpdate:modelValue":o[1]||(o[1]=l=>t.email=l),icon:s(U),type:"email",name:"email",required:"",autocomplete:"email"},null,8,["modelValue","icon"])]),_:1})]),_:1},8,["icon","onSubmit"]),e(p,{title:"Change Password",icon:s(x),form:"",onSubmit:c(V,["prevent"])},{footer:a(()=>[e(f,null,{default:a(()=>[e(n,{type:"submit",color:"info",label:"Submit"}),e(n,{color:"info",label:"Options",outline:""})]),_:1})]),default:a(()=>[e(r,{label:"Current password",help:"Required. Your current password"},{default:a(()=>[e(m,{modelValue:i.password_current,"onUpdate:modelValue":o[2]||(o[2]=l=>i.password_current=l),icon:s(C),name:"password_current",type:"password",required:"",autocomplete:"current-password"},null,8,["modelValue","icon"])]),_:1}),e(P),e(r,{label:"New password",help:"Required. New password"},{default:a(()=>[e(m,{modelValue:i.password,"onUpdate:modelValue":o[3]||(o[3]=l=>i.password=l),icon:s(w),name:"password",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]),_:1}),e(r,{label:"Confirm password",help:"Required. New password one more time"},{default:a(()=>[e(m,{modelValue:i.password_confirmation,"onUpdate:modelValue":o[4]||(o[4]=l=>i.password_confirmation=l),icon:s(w),name:"password_confirmation",type:"password",required:"",autocomplete:"new-password"},null,8,["modelValue","icon"])]),_:1})]),_:1},8,["icon","onSubmit"])])]),_:1})]),_:1}))}};export{G as default};
