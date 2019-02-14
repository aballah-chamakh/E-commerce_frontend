import React from 'react' ;
import ParaPage from './ParaPage' ;
import Routing from './Routing' ;
import {withRouter} from 'react-router-dom' ;
import AdminView from './AdminView' ;
class Container extends React.Component {
  render(){
    return(
      <div>
      {this.props.location.pathname.substring(0,5) == "/mpp/" || localStorage.getItem('sp') ?
        <ParaPage /> :
      this.props.location.pathname.substring(0,7) == "/admin/" || localStorage.getItem('admin') ?
        <AdminView /> :
       <Routing />}
      </div>
    )
  }
}
export default withRouter(Container);
