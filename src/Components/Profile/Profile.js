import React from 'react' ;
import axios from 'axios' ;

class Profile extends React.Component {
  state ={
    orders : []
  }
  componentDidMount = ()=>{
    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('token')}}

    axios.get('http://127.0.0.1:8000/api/order/side_list/',config).then(res=>{
    this.setState({orders:res.data.orders})    })
  }
  render(){
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12' >
      <center>
      <span style={{display:'block',fontSize:'60px',color:'#3fd13c'}}>
      <i class="fas fa-user"></i></span>
       <span style={{fontSize:'25px',fontFamily:'cursive',color:'grey'}}>{localStorage.getItem('username')}</span>
      </center></div>

      </div>
<div class='row'>
<div class='col-lg-12'>
<div style={{backgroundColor:'orange',padding:'10px',borderRadius:'10px 10px 0px 0px'}}>
<center>
<span style={{color:'white',fontSize:'25px',cursive:'cursive'}}>List of all your orders from mawlaty</span>
</center></div>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">date</th>
      <th scope="col">qty</th>
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
<td>{order.product_count}</td>
<td>{order.cart_total+'.00 dt'}</td>
<td> {order.delivered ?
      <span class="badge badge-success badge-pill">deliverede</span>
    : order.shipped ?
    <span class="badge badge-warning badge-pill">shipped</span>
    : <span class="badge badge-secondary badge-pill">runing</span>
  }</td>
<td><button class='btn btn-primary' onClick={()=>{this.props.history.push('/order/'+order.id+'/')}}>view</button></td>
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
export default Profile ;
