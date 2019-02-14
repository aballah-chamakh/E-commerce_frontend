import React from 'react' ;
import ProductCard from './ProductCard' ;
import './ProductList.css' ;
import axios from 'axios' ;
import {connect} from 'react-redux' ;
class ProductList extends React.Component {

state = {
  products : [],
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
  axios.get('http://127.0.0.1:8000/api/product/').then(
    (res)=>{
      console.log(res.data);
      this.setState({products:res.data})
    }
  ).catch((error)=>{console.log(error)})
}
render(){
  return(
    <div class='product-list ' >
    <div class='row'>
    {this.state.products.map((product)=>{
      return(
        <div class='col-lg-3 col-md-6 col-xs-5 '>
        <ProductCard addToCart={this.addToCart} id={product.id} name={product.name} price={product.price} image={product.image}  />
       </div>
      )
    })

  }

    </div>
    </div>
  )
}
}
const mapDispatchToProps = (dispatch)=>{
  return {
   increase_cart : () => dispatch({type:'increase_cart'}),
  }
}
export default connect(null,mapDispatchToProps)(ProductList) ;
