(window["webpackJsonpquidditch-scheduler"]=window["webpackJsonpquidditch-scheduler"]||[]).push([[0],{166:function(e,t,a){e.exports=a(260)},182:function(e,t){},184:function(e,t){},216:function(e,t){},217:function(e,t){},260:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(9),c=a.n(i),s=a(18),o=a(16),l=a(22),d=a(23),u=a(24),p=a(19),h=a(13),m=a(293),g=a(294),f=a(301),y=a(302),v=a(35),b=a(299),E=a(98),w=a.n(E);a(175);w.a.initializeApp({apiKey:"AIzaSyBpqnQ8cxhPbRoN49bsEfy9oFnK-HG9Fgw",authDomain:"rpi-quidditch.firebaseapp.com",databaseURL:"https://rpi-quidditch.firebaseio.com",projectId:"rpi-quidditch",storageBucket:"rpi-quidditch.appspot.com",messagingSenderId:"1051970990113",appId:"1:1051970990113:web:b79f5666c401f46b"});var k=w.a.firestore(),_=a(67),O=a.n(_),P=a(312),j=a(298),C=a(297),S=a(75),D=a.n(S),x=a(74),L=a.n(x),I=a(157),M=a(150),A=a.n(M),N=a(151),W=a.n(N),F=Object(I.a)({palette:{primary:A.a,secondary:W.a}}),B={margin:15},R=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).handleClickShowPassword=function(){a.setState({showPassword:!a.state.showPassword})},a.handleMouseDownPassword=function(e){e.preventDefault()},a.state={username:"",password:"",showPassword:!1},a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keyup",function(e){13===e.keyCode&&(e.preventDefault(),document.getElementById("login_button").click())})}},{key:"handleChange",value:function(e){"username"===e.target.id?this.setState({username:e.target.value}):"password"===e.target.id&&this.setState({password:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;k.collection("users").where("username","==",this.state.username.toLowerCase()).get().then(function(e){var a=e.docs.map(function(e){return e.data()});1===a.length?O.a.compareSync(t.state.password,a[0].password)?(t.props.updateAuth(a[0].player_id),t.props.updateAdmin(a[0].admin)):console.log("Bad Password"):console.log("Username not found")})}},{key:"render",value:function(){return r.a.createElement(m.a,{theme:F},r.a.createElement(g.a,{container:!0,alignItems:"center",justify:"center"},r.a.createElement(g.a,{item:!0,xs:10,sm:6,md:4},r.a.createElement(P.a,{id:"username",label:"Username",value:this.state.username,onChange:this.handleChange,margin:"normal",variant:"outlined",fullWidth:!0}))),r.a.createElement(g.a,{container:!0,alignItems:"center",justify:"center"},r.a.createElement(g.a,{item:!0,xs:10,sm:6,md:4},r.a.createElement(P.a,{id:"password",variant:"outlined",type:this.state.showPassword?"text":"password",label:"Password",value:this.state.password,onChange:this.handleChange,fullWidth:!0,margin:"normal",InputProps:{endAdornment:r.a.createElement(C.a,{position:"end"},r.a.createElement(j.a,{edge:"end","aria-label":"toggle password visibility",onClick:this.handleClickShowPassword,onMouseDown:this.handleMouseDownPassword},this.state.showPassword?r.a.createElement(D.a,null):r.a.createElement(L.a,null)))}}))),r.a.createElement(g.a,{container:!0,alignItems:"center",justify:"center"},r.a.createElement(g.a,{item:!0},r.a.createElement(b.a,{id:"login_button",variant:"contained",size:"large",color:"primary",style:B,onClick:this.handleSubmit},"Login"))))}}]),t}(n.Component),U=Object(p.b)(function(e){return{}},function(e){return{updateAuth:function(t){return e({type:"authenticate",payload:t})},updateAdmin:function(t){return e({type:"set_admin",payload:t})}}})(R),z=a(300),q=a(313),T={margin:15},H=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).handleClickShowPassword=function(){a.setState({showPassword:!a.state.showPassword})},a.handleMouseDownPassword=function(e){e.preventDefault()},a.state={email:"",username:"",password:"",first_name:"",last_name:"",chck_chaser:!1,chck_beater:!1,chck_keeper:!1,chck_seeker:!1},a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){"username"===e.target.id?this.setState({username:e.target.value}):"password"===e.target.id?this.setState({password:e.target.value}):"email"===e.target.id?this.setState({email:e.target.value}):"first_name"===e.target.id?this.setState({first_name:e.target.value}):"last_name"===e.target.id?this.setState({last_name:e.target.value}):"chck_chaser"===e.target.id?this.setState({chck_chaser:e.target.checked}):"chck_beater"===e.target.id?this.setState({chck_beater:e.target.checked}):"chck_keeper"===e.target.id?this.setState({chck_keeper:e.target.checked}):"chck_seeker"===e.target.id&&this.setState({chck_seeker:e.target.checked})}},{key:"handleSubmit",value:function(e){var t=this;console.log("Registering"),k.collection("users").where("username","==",this.state.username).get().then(function(e){var a=e.docs.map(function(e){return e.data()});if(console.log(a),1===a.length)console.log("Username already exists");else{console.log("Username is avaliable");var n={first_name:t.state.first_name,last_name:t.state.last_name,positions:{chaser:t.state.chck_chaser,beater:t.state.chck_beater,keeper:t.state.chck_keeper,seeker:t.state.chck_seeker},practices:null,comments:null};k.collection("players").add(n).then(function(e){e.get().then(function(e){var a={email:t.state.email,username:t.state.username.toLowerCase(),password:O.a.hashSync(t.state.password,10),player_id:e.id,admin:!1};k.collection("users").add(a),t.props.updateAuth(e.id)})})}})}},{key:"render",value:function(){return r.a.createElement(m.a,{theme:F},r.a.createElement(P.a,{id:"first_name",label:"First Name",value:this.state.first_name,onChange:this.handleChange,margin:"normal",variant:"outlined",fullWidth:!0}),r.a.createElement(P.a,{id:"last_name",label:"Last Name",value:this.state.last_name,onChange:this.handleChange,margin:"normal",variant:"outlined",fullWidth:!0}),r.a.createElement("div",null,r.a.createElement(z.a,{label:"Chaser",control:r.a.createElement(q.a,{checked:this.state.chck_chaser,onChange:this.handleChange,color:"primary",id:"chck_chaser"})}),r.a.createElement(z.a,{label:"Beater",control:r.a.createElement(q.a,{checked:this.state.chck_beater,onChange:this.handleChange,color:"primary",id:"chck_beater"})}),r.a.createElement(z.a,{label:"Keeper",control:r.a.createElement(q.a,{checked:this.state.chck_keeper,onChange:this.handleChange,color:"primary",id:"chck_keeper"})}),r.a.createElement(z.a,{label:"Seeker",control:r.a.createElement(q.a,{checked:this.state.chck_seeker,onChange:this.handleChange,color:"primary",id:"chck_seeker"})})),r.a.createElement(P.a,{id:"email",label:"Email",value:this.state.email,onChange:this.handleChange,margin:"normal",variant:"outlined",fullWidth:!0}),r.a.createElement(P.a,{id:"username",label:"Username",value:this.state.username,onChange:this.handleChange,margin:"normal",variant:"outlined",fullWidth:!0}),r.a.createElement(P.a,{id:"password",variant:"outlined",type:this.state.showPassword?"text":"password",label:"Password",value:this.state.password,onChange:this.handleChange,margin:"normal",fullWidth:!0,InputProps:{endAdornment:r.a.createElement(C.a,{position:"end"},r.a.createElement(j.a,{edge:"end","aria-label":"toggle password visibility",onClick:this.handleClickShowPassword,onMouseDown:this.handleMouseDownPassword},this.state.showPassword?r.a.createElement(D.a,null):r.a.createElement(L.a,null)))}}),r.a.createElement(g.a,{container:!0,alignItems:"center",justify:"center"},r.a.createElement(b.a,{variant:"contained",size:"large",color:"primary",style:T,onClick:this.handleSubmit},"Register")))}}]),t}(n.Component),G=Object(p.b)(function(e){return{}},function(e){return{updateAuth:function(t){return e({type:"authenticate",payload:t})}}})(H),K={margin:15},V=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={username:"",password:"",loginscreen:[],loginmessage:"",buttonLabel:"Set-up a new account",isLogin:!0},a.handleSwitch=a.handleSwitch.bind(Object(h.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=[];e.push(r.a.createElement(U,{key:"login"}));this.setState({loginscreen:e,loginmessage:"Not registered yet, Register Now"})}},{key:"handleSwitch",value:function(){var e,t=[];this.state.isLogin?(t.push(r.a.createElement(G,{key:"register"})),e="Already registered.Go to Login",this.setState({loginscreen:t,loginmessage:e,buttonLabel:"Already have an account?",isLogin:!1})):(t.push(r.a.createElement(U,{key:"login"})),e="Not Registered yet.Go to registration",this.setState({loginscreen:t,loginmessage:e,buttonLabel:"Set-up a new account",isLogin:!0}))}},{key:"render",value:function(){return r.a.createElement(m.a,{theme:F},r.a.createElement(f.a,{position:"static"},r.a.createElement(y.a,null,r.a.createElement(v.a,{variant:"h6"},this.state.isLogin?"Login":"Register"))),r.a.createElement(g.a,{container:!0},r.a.createElement(g.a,{item:!0,xs:!0}),r.a.createElement(g.a,{item:!0,xs:9},this.state.loginscreen),r.a.createElement(g.a,{item:!0,xs:!0})),r.a.createElement("div",null,this.state.loginmessage,r.a.createElement(b.a,{variant:"contained",size:"large",color:"primary",style:K,onClick:this.handleSwitch},this.state.buttonLabel)))}}]),t}(n.Component),J=Object(p.b)(function(e){return{}},function(e){return{}})(V),Q=a(26),X=a(21),Y=a.n(X),$=a(303),Z=a(296),ee=a(304),te=a(307),ae=a(305),ne=a(306),re=a(154),ie=a.n(re),ce=a(308),se=a(76),oe=a.n(se),le=a(152),de=a.n(le),ue=a(153),pe=a.n(ue),he=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"isAccepted",value:function(e){for(var t in this.props.practices)if(this.props.practices[t].id===e&&this.props.practices[t].accepted)return!!this.props.practices[t].accepted.includes(this.props.player_id);return!1}},{key:"isDenied",value:function(e){for(var t in this.props.practices)if(this.props.practices[t].id===e&&this.props.practices[t].denied)return!!this.props.practices[t].denied.includes(this.props.player_id);return!1}},{key:"acceptPractice",value:function(e){var t=this;return e?this.isAccepted(e)?null:void k.collection("practices").doc(e).get().then(function(a){var n=a.data();n.accepted.push(t.props.player_id),t.isDenied(e)&&(n.denied=Y.a.remove(n.denied,function(t){return t===e})),k.collection("practices").doc(e).set(n);var r=Y.a.cloneDeep(t.props.practices);for(var i in r)r[i].id===e&&(r[i]=n,r[i].id=e);t.props.updatePractices(r),t.forceUpdate()}):null}},{key:"denyPractice",value:function(e){var t=this;if(this.isDenied(e))return null;k.collection("practices").doc(e).get().then(function(a){var n=a.data();n.denied.push(t.props.player_id),t.isAccepted(e)&&(n.accepted=Y.a.remove(n.accepted,function(t){return t===e})),k.collection("practices").doc(e).set(n);var r=Y.a.cloneDeep(t.props.practices);for(var i in r)r[i].id===e&&(r[i]=n,r[i].id=e);t.props.updatePractices(r),t.forceUpdate()})}},{key:"loadPractices",value:function(){if(!this.props.practices)return null;var e=this.props.practices,t=e.filter(function(e){return!e.expired}),a=Y.a.reverse(e.filter(function(e){return e.expired})),n=[];for(var i in t)n.push(this.genPracticeItem(t[i]));for(var c in n.push(r.a.createElement($.a,{key:"divider"})),a)n.push(this.genPracticeItem(a[c]));return n}},{key:"genPracticeItem",value:function(e){var t=this;return r.a.createElement(ee.a,{button:!0,key:e.id,onClick:function(){return t.props.setOpenPractice(e.id)}},r.a.createElement(ae.a,null,r.a.createElement(ne.a,{style:{width:"60px",height:"60px"}},r.a.createElement(v.a,{variant:"h5",style:{margin:"10px"}},e.day[0]+"/"+e.day[1]))),r.a.createElement(te.a,{primary:e.location,secondary:e.start[0]+":"+(e.start[1]<10?"0"+e.start[1]:e.start[1])+(e.start[2]===e.end[2]?"":" ("+e.start[2]+")")+" - "+e.end[0]+":"+(e.end[1]<10?"0"+e.end[1]:e.end[1])+" ("+e.end[2]+")",style:{marginLeft:"20px"}}),r.a.createElement(ce.a,null,e.expired?null:r.a.createElement(r.a.Fragment,null,r.a.createElement(j.a,{edge:"end",style:{marginRight:"10px"},color:this.isAccepted(e.id)?"primary":"default",onClick:function(){return t.acceptPractice(e.id)}},r.a.createElement(de.a,null)),r.a.createElement(j.a,{edge:"end",style:{marginRight:"10px"},color:this.isDenied(e.id)?"primary":"default",onClick:function(){return t.denyPractice(e.id)}},r.a.createElement(pe.a,null))),this.props.admin_mode?r.a.createElement(j.a,{edge:"end"},r.a.createElement(oe.a,null)):null))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(m.a,{theme:F},r.a.createElement(Z.a,null,r.a.createElement(f.a,{position:"static",color:"secondary"},r.a.createElement(y.a,null,r.a.createElement(v.a,{variant:"h5",style:{margin:"10px"}},"Practices"),this.props.admin_mode?r.a.createElement(j.a,{style:{marginLeft:"auto"},onClick:function(){return e.props.addPractice()}},r.a.createElement(ie.a,null)):r.a.createElement("div",null))),r.a.createElement($.a,null),this.loadPractices())))}}]),t}(n.Component),me=Object(p.b)(function(e){return{admin_mode:e.admin_mode,practices:e.practices,player_id:e.player_id}},function(e){return{updatePractices:function(t){return e({type:"update_practices",payload:t})},setOpenPractice:function(t){return e({type:"set_open_practice",payload:t})},addPractice:function(){return e({type:"set_open_practice",payload:"add"})}}})(he),ge=a(309),fe=a(310),ye=a(311);function ve(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function be(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?ve(a,!0).forEach(function(t){Object(Q.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):ve(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var Ee={location:"",day:[Number(we().split("-")[1]),Number(we().split("-")[2]),Number(we().split("-")[0])],start:[6,0,"PM"],end:[8,0,"PM"],accepted:[],denied:[]};function we(){var e=new Date;return e.getFullYear()+"-"+(e.getMonth()+1<9?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+e.getDate()}var ke=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={practice:Ee,id:""},console.log(a.state),a.handleChange=a.handleChange.bind(Object(h.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(h.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"handleChange",value:function(e){if("day"===e.target.id){var t=e.target.value.split("-");this.setState({practice:be({},this.state.practice,{day:[Number(t[1]),Number(t[2]),Number(t[0])]})})}else if("location"===e.target.id)this.setState({practice:be({},this.state.practice,{location:e.target.value})});else if("start_time"===e.target.id){var a=e.target.value.split(":");this.setState({practice:be({},this.state.practice,{start:[a[0]<=12?Number(a[0]):Number(a[0])-12,Number(a[1]),a[0]<12?"AM":"PM"]})})}else if("end_time"===e.target.id){var n=e.target.value.split(":");this.setState({practice:be({},this.state.practice,{end:[n[0]<=12?Number(n[0]):Number(n[0])-12,Number(n[1]),n[0]<12?"AM":"PM"]})})}}},{key:"handleSubmit",value:function(){var e=this;k.collection("practices").add(this.state.practice).then(function(t){console.log(t.id),e.setState({id:t.id})}).then(function(t){var a=Y.a.cloneDeep(e.props.practices),n=Y.a.cloneDeep(e.state.practice);n.id=e.state.id,a.push(n),a.sort(function(t,a){return e.getPracticeMilli(t.day,t.start)>e.getPracticeMilli(a.day,a.start)?1:-1}),e.props.storePractices(a),e.props.setOpenPractice(e.state.id)})}},{key:"getPracticeMilli",value:function(e,t){var a=e[0]+"/"+e[1]+"/"+e[2],n=t[0]+":"+t[1]+" "+t[2];return Date.parse(a+" "+n)}},{key:"indexFromId",value:function(e){if(!this.props.practices)return-1;for(var t in this.props.practices)if(this.props.practices[t].id===e)return t;return-1}},{key:"getTitle",value:function(){return"add"===this.props.open_practice?this.state.practice.location:this.props.practices&&this.props.open_practice&&this.props.practices[this.indexFromId(this.props.open_practice)]?this.props.practices[this.indexFromId(this.props.open_practice)].location:"..."}},{key:"getSubHeader",value:function(){if("add"===this.props.open_practice){var e=this.state.practice;return e.start[0]+":"+(e.start[1]<10?"0"+e.start[1]:e.start[1])+(e.start[2]===e.end[2]?"":" ("+e.start[2]+")")+" - "+e.end[0]+":"+(e.end[1]<10?"0"+e.end[1]:e.end[1])+" ("+e.end[2]+")"}if(!this.props.practices)return null;if(!this.props.open_practice)return null;if(!this.props.practices[this.indexFromId(this.props.open_practice)])return null;var t=this.props.practices[this.indexFromId(this.props.open_practice)];return t.start[0]+":"+(t.start[1]<10?"0"+t.start[1]:t.start[1])+(t.start[2]===t.end[2]?"":" ("+t.start[2]+")")+" - "+t.end[0]+":"+(t.end[1]<10?"0"+t.end[1]:t.end[1])+" ("+t.end[2]+")"}},{key:"getAvatar",value:function(){if("add"===this.props.open_practice){var e=this.state.practice;return e.day[0]+"/"+e.day[1]}if(!this.props.practices)return"...";if(!this.props.open_practice)return"...";if(!this.props.practices[this.indexFromId(this.props.open_practice)])return"...";var t=this.props.practices[this.indexFromId(this.props.open_practice)];return t.day[0]+"/"+t.day[1]}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(m.a,{theme:F},r.a.createElement(ge.a,null,r.a.createElement(fe.a,{avatar:r.a.createElement(ne.a,{style:{width:"60px",height:"60px"}},r.a.createElement(v.a,{variant:"h5",style:{margin:"10px"}},this.getAvatar())),action:this.props.admin_mode?r.a.createElement(j.a,{"aria-label":"settings"},r.a.createElement(oe.a,null)):null,title:this.getTitle(),subheader:this.getSubHeader()}),this.props.admin_mode&&"add"===this.props.open_practice?r.a.createElement("div",null,r.a.createElement($.a,{style:{margin:"10px"}}),r.a.createElement(ye.a,null,r.a.createElement(g.a,{container:!0},r.a.createElement(P.a,{id:"location",label:"Location",type:"text",variant:"outlined",onChange:this.handleChange,style:{marginBottom:"20px"}}),r.a.createElement(P.a,{id:"day",label:"Day",type:"date",format:"MM/dd/yyyy",defaultValue:we(),InputLabelProps:{shrink:!0},inputProps:{step:900},variant:"outlined",style:{marginLeft:"10px",marginBottom:"20px"},onChange:this.handleChange}),r.a.createElement(P.a,{id:"start_time",label:"Start Time",type:"time",defaultValue:"18:00",InputLabelProps:{shrink:!0},inputProps:{step:900},variant:"outlined",style:{marginLeft:"10px",marginBottom:"20px"},onChange:this.handleChange}),r.a.createElement(P.a,{id:"end_time",label:"End Time",type:"time",defaultValue:"20:00",InputLabelProps:{shrink:!0},inputProps:{step:900},variant:"outlined",style:{marginLeft:"10px",marginBottom:"20px"},onChange:this.handleChange}),r.a.createElement(b.a,{variant:"contained",size:"large",color:"primary",style:{marginLeft:"10px"},onClick:this.handleSubmit},"Add Practice")))):null)))}}]),t}(n.Component),_e=Object(p.b)(function(e){return{practices:e.practices,open_practice:e.open_practice,admin_mode:e.admin_mode,player_id:e.player_id}},function(e){return{storePractices:function(t){return e({type:"update_practices",payload:t})},setOpenPractice:function(t){return e({type:"set_open_practice",payload:t})}}})(ke),Oe=a(155),Pe=a.n(Oe),je=a(156),Ce=a.n(je);function Se(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var De=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={width:window.innerWidth,height:window.innerHeight,first_name:"",last_name:""},a.updateWindowDimensions=a.updateWindowDimensions.bind(Object(h.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(window.addEventListener("resize",this.updateWindowDimensions),!this.props.player_id)return null;k.collection("players").doc(this.props.player_id).get().then(function(t){e.setState(t.data())}),k.collection("practices").get().then(function(t){var a=t.docs.map(function(e){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Se(a,!0).forEach(function(t){Object(Q.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Se(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},e.data(),{id:e.id})});a=a.map(function(t){return t.expired=Date.now()>e.getPracticeMilli(t.day,t.start),t}).sort(function(t,a){return e.getPracticeMilli(t.day,t.start)>e.getPracticeMilli(a.day,a.start)?1:-1}),e.props.storePractices(a),a.length>0?e.props.setOpenPractice(a[0].id):e.props.setOpenPractice("add")})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateWindowDimensions",value:function(){this.setState({width:window.innerWidth,height:window.innerHeight})}},{key:"getPracticeMilli",value:function(e,t){var a=e[0]+"/"+e[1]+"/"+e[2],n=t[0]+":"+t[1]+" "+t[2];return Date.parse(a+" "+n)}},{key:"setupPage",value:function(){var e=this.state.width<960,t=r.a.createElement(g.a,{item:!0,xs:e?12:3,key:"practices"},r.a.createElement(me,null)),a=r.a.createElement(g.a,{item:!0,xs:e?12:9,key:"view"},r.a.createElement(_e,null));return e?[a,t]:[t,a]}},{key:"render",value:function(){var e=this;return r.a.createElement(m.a,{theme:F},r.a.createElement("div",null,r.a.createElement(f.a,{position:"static"},r.a.createElement(y.a,null,r.a.createElement(v.a,{variant:"h4"},"Welcome, ",this.state.first_name),this.props.admin_mode?r.a.createElement(Pe.a,null):null,r.a.createElement(j.a,{edge:"end",onClick:function(){return e.props.logout()},style:{marginLeft:"auto"}},r.a.createElement(Ce.a,null))))),r.a.createElement("br",null),r.a.createElement("div",null,r.a.createElement(g.a,{container:!0},this.setupPage())))}}]),t}(n.Component),xe=Object(p.b)(function(e){return{admin_mode:e.admin_mode,player_id:e.player_id}},function(e){return{updateAuth:function(){return e({type:"authenticate",payload:null})},logout:function(){return e({type:"logout",payload:null})},storePractices:function(t){return e({type:"update_practices",payload:t})},setOpenPractice:function(t){return e({type:"set_open_practice",payload:t})}}})(De),Le=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,this.props.authenticated?r.a.createElement("div",null,r.a.createElement(xe,null)):r.a.createElement("div",null,r.a.createElement(J,null)))}}]),t}(n.Component),Ie=Object(p.b)(function(e){return{authenticated:e.authenticated}},function(e){return{}})(Le);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Me=a(66),Ae={authenticated:!1,player_id:"",admin_mode:!1,practices:null,open_practice:0},Ne=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"dump_store":return console.log(e),e;case"authenticate":var a=Y.a.cloneDeep(e);return a.authenticated=!0,a.player_id=t.payload,a;case"logout":var n=Y.a.cloneDeep(e);return n.authenticated=!1,n.player_id="",n;case"set_admin":var r=Y.a.cloneDeep(e);return r.admin_mode=t.payload,r;case"set_open_practice":var i=Y.a.cloneDeep(e);return i.open_practice=t.payload,i;case"update_practices":var c=Y.a.cloneDeep(e);return c.practices=t.payload,c;default:return e}};var We,Fe=(We=window.REDUX_INITIAL_DATA,Object(Me.b)(Ne,We));c.a.render(r.a.createElement(p.a,{store:Fe},r.a.createElement(Ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[166,1,2]]]);
//# sourceMappingURL=main.022395f3.chunk.js.map