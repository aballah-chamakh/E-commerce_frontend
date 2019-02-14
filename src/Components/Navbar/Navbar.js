import React from 'react' ;
import './navbar.css' ;
import {Link,withRouter} from 'react-router-dom' ;
import {connect} from 'react-redux' ;
import axios from 'axios' ;
class Navbar extends React.Component{




componentDidMount = ()=>{
  let url = 'http://127.0.0.1:8000/api/cart_count/'+localStorage.getItem('cart_id')+'/'
  axios.get(url).then((res)=>{
  this.props.set_cart_nb(res.data.count)
  })
}
logout = ()=>{
  localStorage.clear()
  this.props.history.push('/')
}
render(){
  return(

    <div class=' nav-wrapper'>
    <nav class='xnavbar'>
    <ul class='list'>
    <li><button onClick={this.logout} href='#' class='btn btn-warning'>logout</button></li>

    <li><Link to='/profile/' >{localStorage.getItem('username')}</Link></li>
    </ul>
    </nav>
    <nav class='bottom-navbar'>
    <ul>
    <li><Link to='/' class='brand' href='#' ><span >Mawlaty</span></Link></li>
    <li><input type='text' class='search-form' placeholder='search ...' /></li>
    <li><Link to='/cart/' class='cart' href='#' ><i class="fa fa-shopping-cart"><span class='cart-nb'>{this.props.cart_nb}</span></i></Link></li>

    </ul>
    </nav>
    <nav class='phone-navbar'>
    <ul>
    <li><span class='side-bar'><i class="fas fa-bars"></i></span></li>
    <li><a class='brand' href='#' ><span >Mawlaty</span></a></li>

     <li><a class='cart' href='#' ><i class="fa fa-shopping-cart">10</i></a></li>

    </ul>
    </nav>
    </div>

  )
}
}
const mapStateToProps = (state)=>{
return {
  'cart_nb' : state.cart_nb ,
}
}
const mapDispatchToProps = (dispatch)=>{
  return{
    set_cart_nb : (cart_count)=>dispatch({type:'set_cart_nb',cart_nb:cart_count})
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar)) ;
