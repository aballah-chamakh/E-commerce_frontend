import React from 'react' ;
import axios from 'axios' ;
class ParaList extends React.Component {
  state = {
    para_list : []
  }
  componentDidMount(){
     axios.get('http://127.0.0.1:8000/api/para/').then(res=>{
       this.setState({para_list:res.data.para_list})
     })
  }
  render(){
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12'>
      <table class="table table-striped">
<thead class='bg-success' style={{color:'white'}} >
<tr>
  <th scope="col">Name</th>
  <th scope="col">phone</th>
  <th scope="col">address</th>
  <th scope="col">Revenue</th>
    <th scope="col">detail</th>
</tr>
</thead>
<tbody>
{this.state.para_list.map((para)=>{
return(
  <tr>
  <td>{para.username}</td>
  <td>{para.phone}</td>
  <td>{para.address}</td>
  <td>{para.revenue+'.00 dt'}</td>
  <td><button class='btn btn-success' onClick={()=>{this.props.history.push('/admin/para/'+para.id+'/')}}>view</button></td>

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
