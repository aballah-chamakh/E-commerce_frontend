const initialState = {
  // authentication related state
  para_authenticated : false ,
  customer_authenticated : false ,
  admin_authenticated : false ,
  // cart related state
  cart_id : null ,
  cart_nb : 0,
  new_order : false ,
  order : {}

}
const Reducer = (state=initialState,action)=>{
  let newState =  Object.assign({},state) ;
  switch (action.type) {
    // Para Authentication related actions
    case 'para_login' :
    newState.para_authenticated = true
    return newState
    break
    case 'para_logout' :
    newState.para_authenticated = false
    return newState
    break;
    // Customer Authentication related actions
    case 'customer_login' :
    newState.customer_authenticated = true
    return newState
    break
    case 'customer_logout' :
    newState.customer_authenticated = false
    localStorage.clear()
    return newState
    break;
    // Admin Authentication related actions
    case 'admin_login':
    newState.admin_authenticated = true
    return newState
    break;
    case 'admin_logout':
    newState.admin_authenticated = false
    localStorage.clear()
    return newState
    break;
    // Cart related actions
    case 'increase_cart':
    newState.cart_nb = newState.cart_nb + 1 ;
    return newState ;
    break;
    case 'decrease_cart':
    newState.cart_nb = newState.cart_nb - 1 ;
    return newState ;
    break;
    case 'set_cart_nb':
    newState.cart_nb = action.cart_nb  ;
    return newState ;
    break;
    case 'reset_cart_nb':
    newState.cart_nb = 0  ;
    return newState ;
    break;

    // Handiing websocket msg
    case 'new_order':
    newState.new_order = true
    newState.order = action.order
    return newState
    break;
    case 'order_handled':
    newState.new_order = false
    newState.order = {}
    return newState
    break;

    default:
    return newState ;

  }

}
export default Reducer ;
