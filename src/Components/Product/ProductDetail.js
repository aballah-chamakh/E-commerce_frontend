import React from 'react'
import ProductList from './ProductList'
import axios from 'axios'
import {connect} from 'react-redux'
class ProductDetail extends React.Component {
  state = {
    product : {}
  }
  addToCart = (id)=>{
    this.props.increase_cart()
    let url = 'http://127.0.0.1:8000/api/client_custom_product/add_product_to_cart/'
    let cart_id = localStorage.getItem('cart_id')
    let data = {'product_id':id}
    if (cart_id){
    data['cart_id'] = cart_id
    }
    axios.post(url,data).then((res)=>{
  console.log(res.data);
    if (!cart_id){
        localStorage.setItem('cart_id',res.data.cart_id)
      }
    }).catch((err)=>{console.log(err)})
  }
  componentDidMount(){
   axios.get('http://127.0.0.1:8000/api/product/'+this.props.match.params.id+'/').then(
   (res)=>{
     this.setState({product:res.data})
   }
 ).catch(err=>console.log(err))
  }
  render(){
    if(this.state.product.id != this.props.match.params.id){
      axios.get('http://127.0.0.1:8000/api/product/'+this.props.match.params.id+'/').then(
      (res)=>{
        this.setState({product:res.data})
        window.scrollTo(0,0)
      }
    ).catch(err=>console.log(err))
    }
    return(
      <div>
      <div class='row' >
              <div class='col-lg-4' style={{boxShadow:'0px 3px 7px grey'}}>
                     <img src={this.state.product.image} style={{width:'100%',height:400}} />
              </div>
              <div class='col-lg-8' >
              <div  style={{marginLeft:20}} >
                <h4 style={{fontSize:40}}>{this.state.product.name}</h4>
                <p > this is the best argan oil currently in world this is the best argan oil currently in world
                this is the best argan oil currently in worldthis is the best argan oil currently in worldthis is the best argan oil currently in world
                this is the best argan oil currently in worldthis is the best argan oil currently in world</p>
                <hr/>
                <h4>{this.state.product.price} dt</h4>
                <button onClick={()=>{this.addToCart(this.state.product.id)}} style={{padding:'10px',width:200}}>add to cart</button>
              </div>
              </div>
      </div>
      <div class='row' style={{marginTop:'50px'}}>
         <h3>Other Products </h3>
         <hr/>
         <div style={{marginTop:'20px'}} >
         <ProductList/>
         </div>
      </div>
      </div>    )
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    increase_cart : ()=>dispatch({type:'increase_cart'})
  }
}
export default connect(null,mapDispatchToProps)(ProductDetail) ;
