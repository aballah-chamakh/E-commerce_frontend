import React from 'react' ;
import axios from 'axios' ;
import {connect} from 'react-redux'
import {ChangeHandler,CheckValidity} from '../Form/FormFunc' ;
import Input from '../Form/FormUI' ;
import {withRouter} from 'react-router-dom' ;
class Login extends React.Component {


state = {
  error : false ,
  errorText : '',
  form:{
    email : {
      type :'input',
      inputConfig:{type:'text',placeholder:'enter your email'},
      props : {
        field:'email',
        label:'Email',
        value : '',
        msg:'',
        validators :{required:true,email:true},
        isValid : false,
        classes : 'form-control',

      }
    },
    password : {
      type :'input',
      inputConfig:{type:'password',placeholder:'enter your password'},
      props : {
        field:'password',
        label:'Password',
        value:'',
        msg:'',
        validators :{required:true},
        isValid : false,
        classes : 'form-control',
      }
    }
  }
}

change(event,field){
  if (this.state.error){
  this.setState({error:false})
    this.setState({errorText:false})}
let state = ChangeHandler(event,this.state,field)
this.setState({state:state})

}
valid(){

  let fields = ['email','password']
  fields.map(field=>{
    let payload = CheckValidity(this.state,field)
    if(!payload.isValid){ this.setState({state:payload.state}) }
  })
console.log('done');
let emailValidity    = this.state.form.email.props.isValid ;
let passwordValidity = this.state.form.password.props.isValid ;
if (emailValidity && passwordValidity){
let credantial = {email : this.state.form.email.props.value,password:this.state.form.password.props.value}
let url ='http://127.0.0.1:8000/api/token/'
axios.post(
url,
credantial,
).then( response => {
  console.log(response.data);
  let newUrl =  'http://127.0.0.1:8000/api/user/get_user_info/'
  let token = response.data.token
  let config =  {headers: {Authorization : 'Bearer '+token}}
axios.get(
newUrl,
config,
).then(response => {

    localStorage.setItem('user_id',response.data.user_info.id)
    localStorage.setItem('username',response.data.user_info.username)
    localStorage.setItem('profile_id',response.data.user_info.profile_id)


if (response.data.user_info.selling_point){
  localStorage.setItem('sp',response.data.user_info.selling_point)
  localStorage.setItem('para_token',token)
  this.props.para_login()
  this.props.history.push('/mpp/para/orders/')

}else if (response.data.user_info.is_admin){
  localStorage.setItem('admin_token',token)
  localStorage.setItem('admin',true)
  this.props.admin_login()
  this.props.history.push('/admin/analytic/')
}
else{
  localStorage.setItem('token',token)
  localStorage.setItem('cart_id',response.data.user_info.cart_id)
  this.props.history.push('/profile/')
}
    // dipatch login this.props.login()
  //  this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/')



});
} ).catch(error =>{this.setState({error:true}) });

}else {
  console.log('not valid form ');
}

}

  render(){
    let form =[]
for (let field in this.state.form){
  form.push({type:this.state.form[field].type,inputConfig:this.state.form[field].inputConfig,props:this.state.form[field].props})
}
    return(
<div style={{marginTop:'10%'}}>
<div class='row'>
<div class={this.props.source=='para-view' || this.props.source=='admin-view' ? 'col-lg-6 offset-lg-3':'col-lg-12'} ><center><span style={{fontSize:'60px',color:'grey'}}><i class="fas fa-user"></i></span></center></div>
</div>
{ this.state.error ?
<div class="alert alert-danger" role="alert">
<center>your email or password are not correct</center>
</div> : null }
<div class={this.props.source=='para-view' || this.props.source=='admin-view' ? 'col-lg-6 offset-lg-3':'col-lg-12'}>
{form.map(field=>(
<Input inputConfig={field.inputConfig}
type ={field.type}
value = {field.props.value}
classes={field.props.classes}
option={field.props.options}
label = {field.props.label}
msg = {field.props.msg}
changed = {(event)=>{this.change(event,field.props.field)}}
/>
))}


<center><button onClick={this.valid.bind(this)} class='btn btn-warning'>login</button></center>


</div>
</div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
return{
  para_login : ()=>dispatch({type:'para_login'}),
  admin_login : ()=>dispatch({type:'admin_login'}),
}
}
export default withRouter(connect(null,mapDispatchToProps)(Login)) ;
