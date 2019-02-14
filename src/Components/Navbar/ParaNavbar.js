import React from 'react' ;
import {Link,withRouter} from 'react-router-dom' ;
import {connect} from 'react-redux' ;
class ParaNavbar extends React.Component {
  logout = ()=>{
    localStorage.clear()
    this.props.para_logout()
    this.props.history.push('/mpp/login/')
  }
  render(){
    return(
      <div>
{this.props.para_authenticated || localStorage.getItem('para_token') ?
  <nav class="navbar navbar-expand-lg navbar-dark bg-success  fixed-top">
       <div class="container">
         <Link class="navbar-brand" to='/mpp/para/orders/'>Mawlaty Partner program</Link>
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
         </button>
         <div class="collapse navbar-collapse" id="navbarResponsive">
           <ul class="navbar-nav ml-auto">
           <li class="nav-item">
             <Link class="nav-link" to='/mpp/para_list/'>Admin Para</Link>
           </li>
           <li class="nav-item">
             <Link class="nav-link" to='/mpp/order_list/'>Admin Orders</Link>
           </li>
           <li class="nav-item active">
             <Link class="nav-link" to='/mpp/para/create_product/'>New Product</Link>
           </li>
             <li class="nav-item active">
               <Link class="nav-link" to='/mpp/para/analitycs/'>Analitycs
                 <span class="sr-only">(current)</span>
               </Link>
             </li>
             <li class="nav-item">
               <Link class="nav-link" to='/mpp/para/orders/'>Orders</Link>
             </li>
             <li class="nav-item">
               <button class="btn btn-warning" onClick={this.logout} >logout</button>
             </li>
           </ul>
         </div>
       </div>
     </nav>
     : <nav class="navbar navbar-expand-lg navbar-dark bg-success  fixed-top">
          <div class="container">
            <Link class="navbar-brand" to='/mpp/'>Mawlaty Partner program</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <Link class="nav-link" to='/mpp/'>Home
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to='/mpp/login/'>login</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to='/mpp/register'>register</Link>
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
    'para_authenticated' : state.para_authenticated ,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    para_logout : ()=>dispatch({type:'para_logout'})
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ParaNavbar)) ;
