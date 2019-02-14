import React from 'react' ;
import {Link,withRouter} from 'react-router-dom' ;
import {connect} from 'react-redux' ;

class AdminNavbar extends React.Component {
logout = ()=>{
  this.props.logout()
  this.props.history.push('/admin/')
}
  render(){
    return(
      <div>
      {this.props.admin_authenticated || localStorage.getItem('admin_token') ?
        <nav class="navbar navbar-expand-lg navbar-dark bg-success  fixed-top">
           <div class="container">
             <Link class="navbar-brand" to='/admin/analytic/'>Admin</Link>
             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
             </button>
             <div class="collapse navbar-collapse" id="navbarResponsive">
               <ul class="navbar-nav ml-auto">
               <li class="nav-item">
                 <Link class="nav-link" to='/admin/customers/'>Customers</Link>
               </li>
               <li class="nav-item">
                 <Link class="nav-link" to='/admin/paras/'>Paras</Link>
               </li>
               <li class="nav-item">
                 <Link class="nav-link" to='/admin/orders/'>Orders</Link>
               </li>
               <li class="nav-item active">
                 <Link class="nav-link" to='/admin/create_product/'>New Product</Link>
               </li>
                 <li class="nav-item">
                   <button class="btn btn-warning" onClick={this.logout} >logout</button>
                 </li>
               </ul>
             </div>
           </div>
         </nav>:
         <nav class="navbar navbar-expand-lg navbar-dark bg-success  fixed-top">
              <div class="container">
                <Link class="navbar-brand" to='/admin/'>Admin</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                  <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <Link class="nav-link" to='/admin/'>Login</Link>
                  </li>

                  </ul>
                </div>
              </div>
            </nav>}
      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return{
    'admin_authenticated' : state.admin_authenticated ,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return {
    logout : ()=>dispatch({type:'admin_logout'})
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AdminNavbar)) ;
