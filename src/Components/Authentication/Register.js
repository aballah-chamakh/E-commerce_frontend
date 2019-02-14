import React from 'react' ;
import {ChangeHandler,CheckValidity} from '../Form/FormFunc' ;
import Input from '../Form/FormUI' ;
import axios from 'axios' ;
import {connect} from 'react-redux' ;
import {withRouter} from 'react-router-dom' ;
class Register extends React.Component {
state = {
  error : false ,
  form:{
    email : {
      props : {
        field:'email',
        label:'Email',
        msg:'',
        value : '',
        validators :{required:true,email:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    password : {
      type :'input',
      inputConfig:{type:'password',placeholder:'enter your password'},
      props : {
        field:'password',
        label:'Password',
        value : '',
        msg:'',
        validators :{required:true,password:true},
        isValid : false,
        classes : 'form-control',

      }
    },
username:{
      props : {
        field:'username',
        label:'Username',
        value : '',
        msg:'',
        validators :{required:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    familyName : {

      props : {
        field:'familyName',
        label:'familyName',
        value : '',
        msg:'',
        validators :{required:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    address : {

      props : {
        field:'address',
        label:'address',
        value : '',
        msg:'',
        validators :{required:true},
        isValid : true,
        classes : 'form-control',

      }
    },
    phone : {

      props : {
        field:'phone',
        label:'phone',
        value : '',
        msg:'',
        validators :{required:true},
        isValid : true,
        classes : 'form-control',

      }
    },



  }
}
change = (event,field)=>{
let state = ChangeHandler(event,this.state,field)
this.setState({state:state})
}
valid =()=>{
  let fields = ['email','password','username','familyName','address','phone',]
  let payload = null
  fields.map(field=>{
     payload = CheckValidity(this.state,field)
       if(!payload.isValid){this.setState({state:payload.state})}
     if (field == 'email' && payload.isValid){
       let state = this.state
       let value = state.form[field].props.value
       let url = 'http://127.0.0.1:8000/api/user/email_exist/'
         let data = {'email':value}
         axios.post(url,data).then((res)=>{
           if (res.data.exist){
           state.form[field].props.isValid = false ;
           state.form[field].props.msg = 'this email already exist' ;
           if(state.form[field].props.classes.indexOf('is-invalid') === -1){
           state.form[field].props.classes += ' is-invalid' ;}}
           this.setState({state:state})
     })
  }})
  let all_fields_valid = true
  for (let i = 0 ; i < fields.length ; i++){
    if(!payload.state.form[fields[i]].props.isValid){
      all_fields_valid = false ;
      break ;
    }
  }

  if(all_fields_valid){
    let form = {}
    fields.map(field=>{
          if (field == 'familyName'){
                  form['username'] = form['username']+' '+payload.state.form[field].props.value
          }
          if (field != 'familyName'){
          form[field] = payload.state.form[field].props.value }
    })
    if(this.props.source == 'para-view'){
      form['selling_point'] = true
    }
    console.log(form);

    let url = 'http://127.0.0.1:8000/api/user/'
    axios.post(url,form).then(res=>{
      let token_url ='http://127.0.0.1:8000/api/token/'
      let credantials = {'email':form['email'],'password':form['password']}
      axios.post(
      token_url,
      credantials,
      ).then( response => {
        console.log(response.data);
        let user_url =  'http://127.0.0.1:8000/api/user/get_user_info/'
        let token = response.data.token
        let config =  {headers: {Authorization : 'Bearer '+token}}
      axios.get(
      user_url,
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

      }else{
        localStorage.setItem('token',token)
        localStorage.setItem('cart_id',response.data.user_info.cart_id)
        this.props.history.push('/profile/')
      }
          // dipatch login this.props.login()
        //  this.props.history.push('/profile/'+localStorage.getItem('profile_slug')+'/')



      });
    } ).catch(error =>{console.log() });




    })
  //  console.log(this.state.form);
  }


}


  render(){
  //   let form =[]
  // for (let field in this.state.form){
  //   form.push({type:this.state.form[field].type,inputConfig:this.state.form[field].inputConfig,props:this.state.form[field].props})
  // }
    return(
      <div>
      <div class="form-row">
  <div class="form-group col-md-6">
    <label for="inputEmail4">Email</label>
    <input type="email" class={this.state.form['email'].props.classes} id="inputEmail4" placeholder="Email" value={this.state.form['email'].props.value} onChange={(event)=>{this.change(event,'email')}} />
    <div class="invalid-feedback">
          {this.state.form['email'].props.msg}
    </div>
  </div>
  <div class="form-group col-md-6">
    <label for="inputPassword4">Password</label>
    <input type="password" class={this.state.form['password'].props.classes} id="inputPassword4" placeholder="Password" value={this.state.form['password'].props.value} onChange={(event)=>{this.change(event,'password')}} />
    <div class="invalid-feedback">
          {this.state.form['password'].props.msg}
    </div>
  </div>
</div>
<div class="form-row">
<div class="form-group col-md-6">
<label for="username">Username</label>
<input type="text"  class={this.state.form['username'].props.classes}  id="username" placeholder="Username" value={this.state.form['username'].props.value} onChange={(event)=>{this.change(event,'username')}} />
<div class="invalid-feedback">
      {this.state.form['username'].props.msg}
</div>
</div>
<div class="form-group col-md-6">
<label for="FamilyName">FamilyName</label>
<input type="text" class={this.state.form['familyName'].props.classes} id="FamilyName" placeholder="FamilyName" value={this.state.form['familyName'].props.value} onChange={(event)=>{this.change(event,'familyName')}} />
<div class="invalid-feedback">
      {this.state.form['familyName'].props.msg}
</div>
</div>
</div>
<div class="form-group">
  <label for="inputAddress">Address</label>
  <input type="text" class={this.state.form['address'].props.classes} id="inputAddress" placeholder="Address" value={this.state.form['address'].props.value} onChange={(event)=>{this.change(event,'address')}}/>
  <div class="invalid-feedback">
        {this.state.form['address'].props.msg}
  </div>
</div>
<div class="form-group">
  <label for="inputphone">phone</label>
  <input type="text" class={this.state.form['phone'].props.classes} id="inputphone" placeholder="PhoneNumber" value={this.state.form['phone'].props.value} onChange={(event)=>{this.change(event,'phone')}}/>
  <div class="invalid-feedback">
        {this.state.form['phone'].props.msg}
  </div>
</div>

<center><button type="submit" class="btn btn-warning" onClick={this.valid}>Register</button></center>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    para_login : ()=>dispatch({type:'para_login'}) ,
  }
}
export default withRouter(connect(null,mapDispatchToProps)(Register)) ;
