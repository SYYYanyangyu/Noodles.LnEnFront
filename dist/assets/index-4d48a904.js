import{Q as p,d as Q,r as m,u as G,a as H,c as L,R as J,E as C,e as i,o as K,f as O,m as d,g as e,w as t,j as u,N as I,t as k,S as W,F as X,U as Y,p as Z,k as ee,_ as te}from"./index-3887b05b.js";const ae=n=>p.post("/Listening.Admin/Album/Add",n),le=n=>p.get(`/Listening.Admin/Album/FindByCategoryId/${n}`),se=n=>p.get(`/Listening.Admin/Album/FindById/${n}`),ne=(n,h)=>p.put(`/Listening.Admin/Album/Update/${n}`,h),oe=n=>p.delete(`/Listening.Admin/Album/DeleteById/${n}`),ie=n=>(Z("data-v-f509d600"),n=n(),ee(),n),de={class:"listentype_container"},ce={class:"card-header"},ue=ie(()=>d("span",null,"分类管理",-1)),re={class:"type-table"},me={class:"type-pagenation"},_e={class:"type_modal"},pe={class:"dialog-footer"},fe=Q({__name:"index",setup(n){const h=m(0),N=m(10),F=m(1);let S=G(),r=H();const b=m("添加"),_=m(!1),$=m([]),o=L({english:"",chinese:"",desc:"",currentId:"",categoryId:r.query.id}),f=L({name:{english:"",chinese:""},categoryId:r.query.id});J(async()=>{if((r.query.id||"default")!="default"){const s=r.query.id;await g(s)}else C({type:"info",message:"选择对应的目录后可查看对应的专辑"})});const g=async l=>{let s=await le(l);$.value=s},D=async l=>{F.value=l,(r.query.id||"default")!=="default"&&await g(r.query.id)},V=l=>l.name.chinese,w=l=>l.name.english,U=async()=>{f.name.english=o.english,f.name.chinese=o.chinese;let l=b.value;l=="修改"?await ne(o.currentId,f):await ae(f),C({type:"success",message:`${l}完成`}),await g(o.categoryId)},A=async l=>{_.value=!0,b.value="修改";let s=await se(l.id);o.english=s.name.english,o.chinese=s.name.chinese,o.currentId=l.id},T=async l=>{Y.confirm("Are you sure to close this dialog?").then(async()=>{await oe(l.id),C({type:"success",message:"删除完成"}),await g(o.categoryId)}).catch(()=>{})},P=async l=>{S.push({path:"/listenadmin/episode",query:{id:l.id}})};return(l,s)=>{const c=i("el-button"),q=i("el-row"),E=i("el-card"),x=i("el-col"),y=i("el-table-column"),R=i("el-table"),z=i("el-input"),B=i("el-form-item"),M=i("el-form"),j=i("el-dialog");return K(),O(X,null,[d("div",de,[e(q,null,{default:t(()=>[e(x,{span:24},{default:t(()=>[e(E,{class:"button-card"},{header:t(()=>[d("div",ce,[ue,e(q,{class:"mb-4"},{default:t(()=>[e(c,{type:"primary",onClick:s[0]||(s[0]=a=>_.value=!0)},{default:t(()=>[u("添加")]),_:1}),e(c,{type:"primary"},{default:t(()=>[u("排序")]),_:1})]),_:1})])]),_:1})]),_:1}),e(x,{span:24},{default:t(()=>[e(E,{class:"table-card"},{default:t(()=>[d("div",re,[e(R,{data:$.value,style:{width:"100%"}},{default:t(()=>[e(y,{prop:"name",label:"中文标题",formatter:V},{default:t(({row:a})=>[d("span",{class:I(a.isVisible===!1?"strike":"")},k(V(a)),3)]),_:1}),e(y,{prop:"name",label:"英文标题",formatter:w},{default:t(({row:a})=>[d("span",{class:I(a.isVisible===!1?"strike":"")},k(w(a)),3)]),_:1}),e(y,{prop:"creationTime",label:"创建时间"},{default:t(({row:a})=>[d("span",{class:I(a.isVisible===!1?"strike":"")},k(a.creationTime),3)]),_:1}),e(y,{label:"操作"},{default:t(a=>[e(c,{size:"small",type:"danger",onClick:v=>T(a.row)},{default:t(()=>[u("删除")]),_:2},1032,["onClick"]),e(c,{size:"small",onClick:v=>A(a.row)},{default:t(()=>[u("修改")]),_:2},1032,["onClick"]),e(c,{size:"small",type:"primary",onClick:v=>A(a.row)},{default:t(()=>[u("显示音频")]),_:2},1032,["onClick"]),e(c,{size:"small",type:"primary",onClick:v=>P(a.row)},{default:t(()=>[u("管理专辑")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"])]),d("div",me,[e(W,{total:h.value,"page-size":N.value,onChange:D},null,8,["total","page-size"])])]),_:1})]),_:1})]),_:1})]),d("div",_e,[e(j,{modelValue:_.value,"onUpdate:modelValue":s[4]||(s[4]=a=>_.value=a),title:b.value},{footer:t(()=>[d("span",pe,[e(c,{onClick:s[3]||(s[3]=a=>_.value=!1)},{default:t(()=>[u("取消")]),_:1}),e(c,{type:"primary",onClick:U},{default:t(()=>[u(" 确认 ")]),_:1})])]),default:t(()=>[e(M,{model:o},{default:t(()=>[e(B,{label:"english title"},{default:t(()=>[e(z,{modelValue:o.english,"onUpdate:modelValue":s[1]||(s[1]=a=>o.english=a),autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(B,{label:"chinese title"},{default:t(()=>[e(z,{modelValue:o.chinese,"onUpdate:modelValue":s[2]||(s[2]=a=>o.chinese=a),autocomplete:"off"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue","title"])])],64)}}});const ye=te(fe,[["__scopeId","data-v-f509d600"]]);export{ye as default};