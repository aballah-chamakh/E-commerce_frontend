import React from 'react' ;
import Navbar from '../Components/Navbar/Navbar' ;
import ProductList from '../Components/Product/ProductList' ;
import ProductDetail from '../Components/Product/ProductDetail' ;
import Profile from '../Components/Profile/Profile' ;
import Cart from '../Components/Cart/Cart'
import {Route,withRouter} from 'react-router-dom' ;
import OrderDetail from '../Components/Order/OrderDetail';
class Routing extends React.Component {
  render(){
    return(
      <div>
<Navbar />
<div class='container'  style={{marginTop:180}}>
<Route path='/' exact component={ProductList} />
<Route path='/product/:id/' component={ProductDetail} />
<Route path='/cart/' component={Cart} />
<Route path='/profile/' exact component={Profile} />
<Route path='/order/:id/' component={OrderDetail} />
</div>

      </div>
    )
  }
}
export default withRouter(Routing) ;
