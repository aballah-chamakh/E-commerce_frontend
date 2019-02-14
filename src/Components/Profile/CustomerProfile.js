import React from 'react' ;
import {Link,Route} from 'react-router-dom' ;
import Cart from '../Cart/Cart' ;
import Order from '../Order/Order' ;
import ParaList from '../Cart/ParaList' ;
import './profile.css' ;
import {connect} from 'react-redux' ;

class CustomerProfile extends React.Component {

componentDidMount(){

}


  render(){
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12'>
      <div class='row' style={{border :' 1px solid #3fd13c',marginLeft:'0%',marginRight:'0',borderRadius:'25px 25px 0px 0px'}}>
      <div class='col-lg-3' >
      <center><span style={{fontSize:'60px',color:'#3fd13c'}}><i class="fas fa-user"></i></span></center></div>
      <div class='col-lg-9'>

      </div>
      </div>
      {!this.props.order_mode ?
        <nav class='profile-bar'>
          <ul >
                <li ><Link to='/profile/cart/' class='link' >Cart(s)</Link></li>
                <li><Link to='/profile/order/' class='link' >Order(s)</Link></li>


          </ul>
      </nav>
      : <div style={{backgroundColor:'orange'}}>
      <center>
      <h5 style={{padding:'10px',color:'white',fontFamily:'cursive'}}>Please choose the para that fit or near from your location</h5>
      </center>
      </div>}
      <div>
       <Route path='/profile/cart/' component={Cart}  />
       <Route path='/profile/order/' component={Order}  />
        <Route path='/profile/paralist/' component={ParaList}   />
      </div>
      </div>
      </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return{
    'order_mode' : state.order_mode ,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    'unset_order_mode' : ()=>dispatch({type:'unset_order_mode'})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CustomerProfile);
