import React from 'react' ;
import axios from 'axios' ;
import {Link} from 'react-router-dom' ;
class ParaOrderDetail extends React.Component {
  state = {order :{ cart_info:{products:[]},} ,checked:true}
  componentDidMount(){
    let url = 'http://127.0.0.1:8000/api/order/'+this.props.match.params.id+'/'
    axios.get(url).then(res=>{
      this.setState({order:res.data})
    console.log(res.data);
    })
  }
  handleCheckBoxchange = (e,field)=>{
  let order = this.state.order
  order[field] = e.target.checked
  this.setState({order:order})
  let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('para_token')}}

  let data = {state:order[field]}
  axios.put('http://127.0.0.1:8000/api/order/'+this.props.match.params.id+'/set_'+field+'/',data,config).then(res=>{
    this.setState({order:order})
  })

  }
  get_cart_total = ()=>{
    let total = 0
    this.state.order.cart_info.products.map((product)=>{
      total += product.product.price * product.count
    })
   return total }
  render(){
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12' style={{marginBottom:'20px'}}>
      <center><span style={{fontSize:'50px',color:'#3fd13c'}} ><i class="fa fa-shopping-cart"></i></span>
<h4>Total : {this.get_cart_total()}</h4>
<div class="form-check form-check-inline">
  <input  class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" checked={this.state.order.shipped} onChange={(e)=>{this.handleCheckBoxchange(e,'shipped')}} />
  <label class="form-check-label" for="inlineCheckbox2">shipped</label>
</div>
<div class="form-check form-check-inline">
  <input  class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" checked={this.state.order.delivered} onChange={(e)=>{this.handleCheckBoxchange(e,'delivered')}}/>
  <label class="form-check-label" for="inlineCheckbox3">delivered</label>
</div></center>
      </div>
      </div>

      <div class='row'>
      <div class='col-lg-12'>
      <table class="table">
<thead>
<tr>
  <th scope="col">Product</th>
  <th scope="col">price</th>
  <th scope="col">qty</th>
</tr>
</thead>
<tbody>
{this.state.order.cart_info.products.map((product,idx)=>{
return(
  <tr>
    <td  ><img height='100'  src={product.product.image} /><br/>
    <small><Link to={'/product/'+product.product.id} >{product.product.name}</Link></small>
    </td>
    <td  >{product.product.price}.00 dt</td>
    <td>{product.count}</td>
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
export default ParaOrderDetail ;
