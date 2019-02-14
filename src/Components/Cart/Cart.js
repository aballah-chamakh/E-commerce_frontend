import React from 'react' ;
import axios from 'axios' ;
import {connect} from 'react-redux' ;
import {Link} from 'react-router-dom' ;
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';
import ParaList from './ParaList';
import CartSubmit from './CartSubmit' ;
class Cart  extends React.Component {
  state = {
  cart : {products:[]},
  login : true ,
  order_mode : false ,
  submit_order_mode : false ,
  para_id : null ,
  msg : "you don't have an account ? register"
  }

  select_para = (id)=>{
    let state = this.state
    state.submit_order_mode = true
    state.para_id = id
    this.setState({state:state})
  }
  ChangeAuth = ()=>{
    let state = this.state
    state.login = !this.state.login

    if (state.login){
      state.msg = "you don't have an account ? register"
    }
    else {
      state.msg = "you already have an account ? login"
    }
    this.setState({state:state})
  }
  change_product_count = (idx,action)=>{
    let products = this.state.cart.products  ;
    let url = 'http://127.0.0.1:8000/api/client_custom_product/'+products[idx].id+'/'
    if (action == 'increase'){
      products[idx].count += 1 ;
      url += 'increase_count/' ;
      this.props.increase_cart()
      this.setState({cart:{...this.state.cart,products:products}}) ;

    }else if(action=='decrease' && products[idx].count > 1  ){
      products[idx].count -= 1 ;
      this.props.decrease_cart()
      url += 'decrease_count/' ;
      this.setState({cart:{...this.state.cart,products:products}}) ;
    }
    if (products[idx].count >= 1 ){

      axios.put(url).then((res)=>{
    }).catch((err)=>{
      console.log(err);
    })
}
  }
  get_cart_total = ()=>{
    let total = 0
    this.state.cart.products.map((product)=>{
      total += product.product.price * product.count
    })
    return total+'.00 dt'
  }
  set_order_mode = ()=>{
    this.setState({order_mode:true})
  }
  componentDidMount(){
    let url = 'http://127.0.0.1:8000/api/cart/'+localStorage.getItem('cart_id')+'/'
    axios.get(url).then(
      (res)=>{
        this.setState({cart:res.data})
      }
    ).catch((error)=>{console.log(error)})
  }
  render(){
    console.log(this.state.cart);
    return(
      <div >
{this.state.order_mode ?
  <div>
  {this.state.submit_order_mode ?
    <CartSubmit para_id={this.state.para_id} />
: <ParaList select_para={this.select_para} />
  }</div>

  :<div class='row' >
{ !localStorage.getItem('token') ?
      <div class='col-lg-5' style={{}} >
             {this.state.login ? <Login/> :<Register />}
             <center><button class='btn btn-link' onClick={this.ChangeAuth}>{this.state.msg}</button></center>
      </div> : null  }
          <div class={localStorage.getItem('token') ? 'col-lg-12' :'col-lg-7'} style={{height:'500px',overflow:'scroll'}} >
          <center>
          <span style={{fontSize:'50px',color:'#3fd13c'}} ><i class="fa fa-shopping-cart"></i></span>
              <h4>Total : {this.get_cart_total()}</h4>
           {localStorage.getItem('token') && this.state.cart.products.length > 0 ?
           <div><button class='btn btn-warning' onClick={this.set_order_mode}>order now</button>
           <br/>
           <br/></div> : null}

          <table class="table">
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">price</th>
      <th scope="col">qty</th>
    </tr>
  </thead>
  <tbody>
  {this.state.cart.products.map((product,idx)=>{
    return(
      <tr>
        <td  ><img height='100'  src={product.product.image} /><br/>
        <small><Link to={'/product/'+product.product.id} >{product.product.name}</Link></small>
        </td>
        <td  >{product.product.price}.00 dt</td>
        <td>
        <button onClick={()=>{this.change_product_count(idx,'increase')}}>u</button><br/>
        <input  onChange={()=>{console.log('change')}} style={{maxWidth:25,width:'100%',margin:'5px 0',borderRadius:'5px grey',textAlign:'center'}} value={product.count} /><br/>
          <button onClick={()=>{this.change_product_count(idx,'decrease')}} >D</button>

        </td>
      </tr>
    )
  })}
  </tbody>
</table>
  </center>
          </div>
      </div>}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    increase_cart : ()=>dispatch({type:'increase_cart'}) ,
    decrease_cart : ()=>dispatch({type:'decrease_cart'}) ,

  }
}
export default connect(null,mapDispatchToProps)(Cart) ;
