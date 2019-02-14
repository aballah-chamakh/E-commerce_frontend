import React from 'react' ;
import axios from 'axios' ;

class ParaList extends React.Component {
  state = {
    para : [],

  }
  componentDidMount = ()=>{
    let url = 'http://127.0.0.1:8000/api/paraprofile/'
    axios.get(url).then(res=>{
this.setState({para:res.data})
    })
  }

  render(){
    return(
      <div >
<div class='row'><div class='col-lg-6 offset-lg-3' style={{marginTop:'15px'}}>
<input class='form-control' placeholder='search for the para that fit or near from your location ' />
</div></div>
<div style={{height:'500px',overflow:'scroll'}} >
{this.state.para.map(para=>{
  return(
    <div class='row' style={{marginTop:'30px',paddingBottom:'10px',borderBottom:'1px solid grey '}} >
      <div class='col-lg-3'>
        <center><img height='200px' width='200px' src={para.image} /></center>
      </div>
      <div class='col-lg-7'>
      <h4>{para.username}</h4>
      <h4>{para.city}</h4>
        <h4>{para.province}</h4>
        <h4>{para.address}</h4>
        <button onClick={()=>{this.props.select_para(para.id)}} class='btn btn-warning'>select</button>
      </div>
      <hr/>
  </div>
  )
})
}
  </div></div>
    )
  }
}
export default ParaList ;
