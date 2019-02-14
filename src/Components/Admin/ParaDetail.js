import React from 'react' ;
import axios from 'axios' ;
class ParaList extends React.Component {
  state = {
    para_detail :{ orders:[]},
  }
  componentDidMount(){
     axios.get('http://127.0.0.1:8000/api/para/'+this.props.match.params.id+'/').then(res=>{
       this.setState({para_detail:res.data})
     })
  }
  render(){
    let fields = ['email','phone','address','revenue','join_at']
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12' style={{backgroundColor:'#e5e5e5',padding:'20px',borderRadius:'25px',marginBottom:'10px'}} >
    <div class='row'>
    <div class='col-lg-4'><center>
    <img class='fluid-img' style={{height:'150px'}} src={this.state.para_detail.image} />
    <h5>{this.state.para_detail.username}</h5>
    </center></div>
    <div class='col-lg-8' style={{backgroundColor:'white',borderRadius:'25px',color:'grey',fontSize:'22px',fontFamily:'cursive'}}>

{this.state.para_detail.join_at ?
  <div>
    {fields.map(field=>{
      return(
      <div class='row'>
        <div class="col-sm-4">b
      {field}   :
        </div>
     <div class="col-sm-8">
    {field == 'join_at' ?
      <span>{this.state.para_detail[field].substring(0,19).replace('T',' / ')}</span> : this.state.para_detail[field] }
     </div>
     </div>
      )
    })}
</div> : null }

    </div>
    </div></div>


      </div>
      <div class='row'>
      <div class='col-lg-12'>
      <table class="table">
<thead class='bg-success' style={{color:'white'}}>
<tr>
  <th scope="col">date</th>
  <th scope="col">customer</th>
  <th scope="col">phone</th>
  <th scope="col">address</th>
  <th scope="col">Revenue</th>
  <th scope="col">detail</th>

</tr>
</thead>
<tbody>
{this.state.para_detail.orders.map((order)=>{
return(
  <tr>
  <td>{order.time}</td>
  <td>{order.customer_username}</td>
  <td>{order.phone}</td>
  <td>{order.shipping_address}</td>
  <td>{order.cart_total}</td>
    <td><button class='btn btn-success' onClick={()=>{this.props.history.push('/admin/order/'+order.id+'/')}}>view</button></td>
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
export default ParaList ;
