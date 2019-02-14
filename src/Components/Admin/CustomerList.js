import React from 'react' ;
import axios from 'axios' ;
class CustomerList extends React.Component {
  state = {
    customer_list : [],
  }
  componentDidMount(){
     axios.get('http://127.0.0.1:8000/api/customer/').then(res=>{
       this.setState({customer_list:res.data.customer_list})
     })
  }
  render(){
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12'>
      <table class="table table-striped">
<thead>
<tr class='bg-success' style={{color:'white'}} >
  <th scope="col">join at</th>
  <th scope="col">Name</th>
  <th scope="col">address</th>
  <th scope="col">phone</th>
  <th scope="col">revenue</th>
  <th scope="col">detail</th>
</tr>
</thead>
<tbody>
{this.state.customer_list.map((customer)=>{
return(
  <tr>
  <td>{customer.join_at.substring(0,19).replace('T',' / ')}</td>
  <td>{customer.username}</td>
  <td>{customer.address}</td>
  <td>{customer.phone}</td>
  <td>{customer.revenue}</td>
  <td><button class='btn btn-success' onClick={()=>{this.props.history.push('/admin/customer/'+customer.id+'/')}}>view</button></td>
  </tr>
)
})}
</tbody>
</table>
</div>
</div>
      </div>
    )
  }
}
export default CustomerList ;
