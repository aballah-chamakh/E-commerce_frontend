import React from 'react' ;
import {Route,withRouter,Switch} from 'react-router-dom' ;
import {connect} from 'react-redux' ;
import CrudProduct from '../Components/Admin/CrudProduct' ;
import CustomerList from '../Components/Admin/CustomerList' ;
import OrderList  from '../Components/Admin/OrderList' ;
import ParaList  from '../Components/Admin/ParaList' ;
import CustomerDetail from '../Components/Admin/CustomerDetail' ;
import OrderDetail from '../Components/Admin/OrderDetail' ;
import ParaDetail from '../Components/Admin/ParaDetail' ;
import AdminNavbar from '../Components/Navbar/AdminNavbar' ;
import Login from '../Components/Authentication/Login' ;
class AdminView extends React.Component {
  render(){
    return(
      <div >
        <AdminNavbar />
        <div class='container'  style={{marginTop:'100px'}}>

        <Switch>
           <Route  path='/admin/' exact render={()=><Login source='admin-view' />}  />
           <Route path='/admin/customers/' component={CustomerList}  />
           <Route path='/admin/paras/' component={ParaList}  />
           <Route path='/admin/orders/' component={OrderList}  />
           <Route path='/admin/order/:id/' component={OrderDetail}  />
           <Route path='/admin/customer/:id/' component={CustomerDetail}  />
           <Route path='/admin/para/:id/' component={ParaDetail}  />
           <Route path='/admin/create_product/' component={CrudProduct}  />
        </Switch>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return {
  'admin_authenticated' : state.admin_authenticated ,
  }

}
export default withRouter(connect(mapStateToProps)(AdminView)) ;
