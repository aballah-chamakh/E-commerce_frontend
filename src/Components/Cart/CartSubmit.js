import React from 'react' ;
import axios from 'axios' ;
import {withRouter} from 'react-router-dom' ;
import {connect} from 'react-redux' ;
class CartSubmit extends React.Component {
  state = {
    para_profile : {},
    form : {
      address : {value:'',massage:'',classes:'form-control',valid:true },
      phone : {value:'',massage:'',classes:'form-control',valid:true },
    }
  }
  change = (event,field)=>{
    let state = this.state
    let classes = state.form[field].classes.replace('is-invalid','')
    state.form[field].classes = classes
    state.form[field].msg = '' ;
    if(field=='phone' && (event.target.value[event.target.value.length -1] in [0,1,2,3,4,5,6,7,8,9] || event.target.value =='')){
    if(event.target.value.length <= 8){
    state.form[field].value = event.target.value ;
    this.setState({state:state}) }}
    else if(field=='address') {
      state.form[field].value = event.target.value ;
      this.setState({state:state})
    }
  }
  checkFieldValidity = (field)=>{
    let state = this.state
    let value = state.form[field].value
    if (value == ''){
      if(state.form[field].classes.indexOf('is-invalid') == -1){
        state.form[field].classes += ' is-invalid' ;
        state.form[field].msg = 'this field is required' ;
      }
        state.form[field].valid = false ;
    }
    return {state:state,valid:state.form[field].valid}
  }
  submit =()=>{
    let form = ['address','phone']
    let isFormValid = true

    form.map(field=>{
      let payload = this.checkFieldValidity(field)
      if (!payload.valid){
        console.log('invalid field');
        isFormValid = false
        this.setState({state:payload.state})
      }
    })
    if (isFormValid){
      let data = {para_id:this.state.para_profile.id,shipping_address:this.state.form['address'].value,phone:String(this.state.form['phone'].value)}
      let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
      let cart_id = localStorage.getItem('cart_id')
      axios.post('http://127.0.0.1:8000/api/cart/'+cart_id+'/order_cart/',data,config).then(res=>{
          localStorage.setItem('cart_id',res.data.cart_id)
          this.props.reset_cart()
          this.props.history.push('/profile/') ;
      }).catch(err=>{
        console.log(err);
      })
    }

  }
  componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/paraprofile/'+this.props.para_id+'/').then(
      res=>{
        this.setState({para_profile:res.data})
      }
    )
  }
  render(){
    return(
      <div >
      <div class='row'>
      <div class='col-lg-3'>
        <center><img height='200px' width='200px' src={this.state.para_profile.image} /></center>
      </div>
      <div class='col-lg-7'>
      <h4>{this.state.para_profile.username}</h4>
      <h4>{this.state.para_profile.city}</h4>
        <h4>{this.state.para_profile.province}</h4>
        <h4>{this.state.para_profile.address}</h4>

      </div>
      </div>
      <div class='row'><div class='form-group col-md-6'>
      <br/>
      <label for='address'>shipping address</label>
      <input  id='address'
             class={this.state.form.address.classes}
               value={this.state.form.address.value}
                 onChange={(event)=>{this.change(event,'address')}} />
                 <div class="invalid-feedback">
                       {this.state.form.address.msg}
                 </div>
      </div>
      </div>
      <div class='row'>
      <div class='form-group col-md-6'>
      <label for='phone'>phone number</label>
      <input id='phone'
            class={this.state.form.phone.classes}
               value={this.state.form.phone.value}
                onChange={(event)=>{this.change(event,'phone')}}/>
      <div class="invalid-feedback">
            {this.state.form.phone.msg}
      </div>
      </div>
      </div>
      <button onClick={this.submit}>submit order</button>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    reset_cart : ()=>dispatch({type:'reset_cart_nb'})
  }
}
export default withRouter(connect(null,mapDispatchToProps)(CartSubmit)) ;
