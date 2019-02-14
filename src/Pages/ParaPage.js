import React from 'react' ;
import ParaNavbar from '../Components/Navbar/ParaNavbar' ;
import {Route,withRouter} from 'react-router-dom' ;
import Login from '../Components/Authentication/Login' ;
import Register from '../Components/Authentication/Register' ;
import ParaOrderDetail from '../Components/Profile/ParaProfile/ParaOrderDetail';
import CustomerList from '../Components/Admin/CustomerList' ;
import ParaList from '../Components/Admin/ParaList' ;
import OrderList from '../Components/Admin/OrderList' ;
import ParaProfile from '../Components/Profile/ParaProfile/ParaProfile' ;
import ParaAnalytics from '../Components/Profile/ParaProfile/ParaAnalytics' ;
import {connect} from 'react-redux' ;
import CrudProduct from '../Components/Admin/CrudProduct'
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";




class ParaPage extends React.Component {
  constructor(props){
      super(props);

      this.notificationDOMRef = React.createRef();
    }
  componentDidMount(){
    if (localStorage.getItem('para_token') && !this.props.para_authenticated){
      this.props.para_login()
      let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('para_token')}}
      let path = "ws://127.0.0.1:8000/order/210/"
      this.socketClient = new WebSocket(path+'?token='+localStorage.getItem('para_token'))
      this.socketClient.onopen = (e)=>{
        console.log(e);
      }
      this.socketClient.onmessage = (e)=>{
        let msg = JSON.parse(e.data)
        // if there many type we gonna go to switch structur
        if(msg.type == 'new_order'){
          this.props.new_order(msg)
          this.addNotification(msg)
        }



      }
      this.socketClient.onclose = (e)=>{
        this.socketClient = new WebSocket(path+'?token='+localStorage.getItem('para_token'))
      }
    }
  }
  addNotification =(order)=>{
console.log(order);
    this.notificationDOMRef.current.addNotification({
      title: "New Order",
      message: 'new order at '+order.shipping_address+' & the user phone number is : '+order.phone,
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
    //  dismiss: { duration: 2000 },
      dismissable: { click: true }
    });

  }
  render(){

    return(
      <div>
      <ReactNotification ref={this.notificationDOMRef} />
<ParaNavbar />
<div class='container' style={{marginTop:'100px'}}>

{this.props.para_authenticated || localStorage.getItem('para_token') ?
<div>
<Route path='/mpp/para/orders/'  component={ParaProfile} />
<Route path='/mpp/para/analitycs/' component={ParaAnalytics} />
<Route path='/mpp/para/order/:id/' component={ParaOrderDetail} />
<Route path='/mpp/para/create_product/' component={CrudProduct} />
<Route path='/mpp/order_list/' component={OrderList} />
<Route path='/mpp/customer_list/' component={CustomerList} />
<Route path='/mpp/para_list/' component={ParaList} />
</div> :
<div>
<Route path='/mpp/' exact render={()=><h1>hello world</h1>} />
<Route path='/mpp/login/'   render={()=><Login source='para-view'  />} />
<div class='row'>
<div class='col-lg-8 offset-lg-2'>
<Route path='/mpp/register/'   render={()=><Register source='para-view'  />} />
</div>
</div>
</div>}

</div>

      </div>
    )
  }
}
const mapStateToProps = (state)=>{
  return{
    'para_authenticated' : state.para_authenticated,
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    para_login : ()=>dispatch({type:'para_login'}) ,
    new_order : (order)=>dispatch({type:'new_order',order:order})
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ParaPage)) ;
