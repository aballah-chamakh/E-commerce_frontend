//  in this component we get all the orders in the platform
import React from 'react' ;
import axios from 'axios' ;


class OrderList extends React.Component {
state = {
  orders : []
}
componentDidMount(){
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('admin_token')}}

axios.get('http://127.0.0.1:8000/api/order/',config).then(res=>{
  this.setState({orders:res.data.order_list})
})
}
render(){
return(
<div>
<div class='row'>
<div class='col-lg-12'>
<center><h5>Admin order list</h5></center>
<br/><br/><br/>
<table class="table table-striped">
<thead class='bg-warning' style={{color:'white'}}>
<tr>
<th scope="col">date</th>
<th scope="col">customer</th>
<th scope="col">para</th>
<th scope="col">phone</th>
<th scope="col">address</th>

<th scope="col">price</th>
<th scope="col">state</th>
<th scope="col">view</th>
</tr>
</thead>
<tbody>
{this.state.orders.map((order,idx)=>{
return(
<tr>
<td>{order.time.substring(0,19).replace('T',' / ')}</td>
<td>{order.customer_username}</td>
<td>{order.para_username}</td>
<td>{order.phone}</td>
<td>{order.shipping_address}</td>

<td>{order.cart_total+'.00 dt'}</td>
<td> {order.delivered ?
<span class="badge badge-success badge-pill">deliverede</span>
: order.shipped ?
<span class="badge badge-warning badge-pill">shipped</span>
: <span class="badge badge-secondary badge-pill">runing</span>
}</td>
<td><button class='btn btn-success' onClick={()=>{this.props.history.push('/admin/order/'+order.id+'/')}}>view</button></td>
</tr>
)
})}
</tbody>
</table>
</div>
</div>
</div>)
}
}
export default OrderList ;
