import React from 'react'  ;
import axios from 'axios'  ;
import {connect} from 'react-redux' ;


class ParaProfile extends React.Component {



      state ={
        orders : []
      }


  componentDidMount = ()=>{

    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('para_token')}}

    axios.get('http://127.0.0.1:8000/api/order/side_list/',config).then(res=>{
    this.setState({orders:res.data.orders}) })
    axios.get('http://127.0.0.1:8000/api/order/order_analytics/',config).then(res=>{
    let products = res.data.analytics_data
    products.sort((a, b)=>{return b.count - a.count});
    console.log(products);

     })

// setInterval(()=>{
//   axios.get('http://127.0.0.1:8000/api/order/side_list/',config).then(res=>{
//   this.setState({orders:res.data.orders})    })
// },1000)

  }
  render(){
    if (this.props.new_order){

       let orders = this.state.orders
       orders.unshift(this.props.order)
       this.setState({orders:orders})
       this.props.order_handled()
    }
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12' >
      <center>
      <span style={{display:"block",fontSize:'60px',color:'#3fd13c'}}>
      <i class="fas fa-user"></i></span>
       <span style={{fontSize:'25px',fontFamily:'cursive',color:'grey',width:'100%'}}>{localStorage.getItem('username')}</span>
      </center></div>

      </div>
<div class='row'>
<div class='col-lg-12'>
<div style={{backgroundColor:'orange',padding:'10px',borderRadius:'10px 10px 0px 0px'}}>
<center>
<span style={{color:'white',fontSize:'25px',cursive:'cursive'}}>List of the orders on you</span>
</center></div>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">date</th>
      <th scope="col">phone</th>
      <th scope="col">address</th>
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
<td>{order.phone}</td>
<td>{order.shipping_address}</td>
<td>{order.product_count}</td>
<td>{order.cart_total+'.00 dt'}</td>
<td> {order.delivered ?
      <span class="badge badge-success badge-pill">deliverede</span>
    : order.shipped ?
    <span class="badge badge-warning badge-pill">shipped</span>
    : <span class="badge badge-secondary badge-pill">runing</span>
  }</td>
<td><button class='btn btn-primary' onClick={()=>{this.props.history.push('/mpp/para/order/'+order.id+'/')}}>view</button></td>
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
const mapStateToProps = (state)=>{
  return{
    'new_order' : state.new_order,
     'order' : state.order ,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    order_handled : ()=>dispatch({type:'order_handled'})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ParaProfile) ;
