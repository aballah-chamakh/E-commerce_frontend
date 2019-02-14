import React from 'react' ;
import axios from 'axios' ;
import {Link} from 'react-router-dom' ;
class Order extends React.Component {


state = {
  order : {
    cart_info : {products : []},
  },
  order_list : []
}

componentDidMount(){

  let url = 'http://127.0.0.1:8000/api/order/last_order/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
  axios.get(url,config).then(res=>{
    console.log('last order ');
    console.log(res.data);
    this.setState({order:res.data.last_order});
  })
  url = 'http://127.0.0.1:8000/api/order/side_list/' ;
  axios.get(url,config).then(res=>{
  //  console.log(res.data);
    this.setState({order_list:res.data.orders})
  })
  //axios.get
}
previewOrder  = (id)=>{
  let url = 'http://127.0.0.1:8000/api/order/'+id+'/'
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}
  axios.get(url,config).then(res=>{
    this.setState({order:res.data});
  })
}


  render(){
    return(
      <div class='row' style={{height:500,overflow:'scroll'}}>
           <div class='col-lg-6' style={{borderRight:'1px solid grey'}}>
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
        <div class='col-lg-6'>
        <center><h4>all your Orders</h4></center>
        <ul class="list-group">
{this.state.order_list.map(order=>{
  return(

<span>
{ this.state.order.id == order.id ?
   <button onClick={()=>{this.previewOrder(order.id)}}  type='button'  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center active ">
Order at {order.timestamp} ({order.product_count} product) ({order.cart_total}.00 dt)
   {order.delivered ?
     <span class="badge badge-success badge-pill">deliverede</span>
   : order.shipped ?
   <span class="badge badge-warning badge-pill">shipped</span>
   : <span class="badge badge-secondary badge-pill">runing</span>
 }
  </button> :
  <button onClick={()=>{this.previewOrder(order.id)}} type='button' class="list-group-item list-group-item-action d-flex justify-content-between align-items-center ">
    Order at {order.timestamp} ({order.product_count} product) ({order.cart_total}.00 dt)
    {order.delivered ?
      <span class="badge badge-success badge-pill">deliverede</span>
    : order.shipped ?
    <span class="badge badge-warning badge-pill">shipped</span>
    : <span class="badge badge-secondary badge-pill">runing</span>
  }
   </button>
}</span>
  )
})
}

</ul>
        </div>
      </div>
    )
  }
}

export default Order ;
