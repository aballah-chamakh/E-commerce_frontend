import React from 'react' ;
import axios from 'axios' ;
import {Link} from 'react-router-dom' ;


class OrderDetail extends React.Component {
  state = {
    order : {cart_info : {products:[] } }
  }
  componentDidMount(id){
    let url = 'http://127.0.0.1:8000/api/order/'+this.props.match.params.id+'/'
    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
    axios.get(url,config).then(res=>{
      this.setState({order:res.data});
    })
  }
  render(){
    return(
      <div class='row'>
      <div class='col-lg-12'>
      <table class="table">
     <thead>
        <tr>
          <th scope="col">product</th>
          <th scope="col">price</th>
          <th scope="col">qty</th>
        </tr>
     </thead>
    <tbody>
        { this.state.order.cart_info.products.map(product=>{
        return(
        <tr>
        <td>
        <img height='100'  src={product.product.image} /><br/>
        <small><Link to={'/product/'+product.product.id} >{product.product.name}</Link></small>
        </td>
        <td  >{product.product.price}.00 dt</td>
        <td>{product.count}</td>
        </tr>
        )
        })
        }
  </tbody>
</table>
      </div>
      </div>
    )
  }
}
export default OrderDetail ;
