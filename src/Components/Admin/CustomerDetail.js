import React from 'react' ;
import axios from 'axios' ;
class CustomerDetail extends React.Component {
  state = {
    customer_detail : {orders:[]},
    no_orders : false ,
  }
  componentDidMount(){
     axios.get('http://127.0.0.1:8000/api/customer/'+this.props.match.params.id+'/').then(res=>{
       let state = this.state
       state.customer_detail = res.data
       if (res.data.length > 0 ){
           state.no_orders = true
       }
       this.setState({state:state})
     })
  }
  render(){
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12'>
<center><h1>{this.state.customer_detail.username}</h1></center>
      </div>
      </div>
      <div class='row'>
      <div class='col-lg-12'>
{this.state.customer_detail.orders.length > 0 && this.state.no_orders == false ?
        <table class="table">
<thead>
<tr>
  <th scope="col">date</th>
  <th scope="col">address</th>
  <th scope="col">phone</th>
  <th scope="col">price</th>
</tr>
</thead>
<tbody>
{this.state.customer_detail.orders.map((order)=>{
return(
  <tr>
      <td>{order.time}</td>
      <td>{order.shipping_address}</td>
      <td>{order.phone}</td>
      <td>{order.cart_total}</td>
  </tr>
)
})}
</tbody>
</table>:
<div class="alert alert-primary" role="alert">
  <center>Sorry , {this.state.customer_detail.username} have no orders for now </center>
</div>}
</div>
</div>
      </div>
    )
  }
}
export default CustomerDetail ;
