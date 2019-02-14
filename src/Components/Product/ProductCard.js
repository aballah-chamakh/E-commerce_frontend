import React from 'react' ;
import './ProductCard.css' ;
import {Link} from 'react-router-dom' ;
class ProductCard extends React.Component {

render(){

  return(
    <div>
    <div class="product-card">
  		<div class="product-tumb">
  			<img src={this.props.image} alt=""  />
  		</div>
  		<div class="product-details">
  			<center><Link to={'/product/'+this.props.id+'/'} class='title' href="">{this.props.name}</Link>
  			<div class="product-bottom-details">
  				<div class="product-price"><span>{this.props.price} dt</span></div>
  				<div class="product-links">
          {this.props.source == 'create-product' ?
          <button type='button' class={!this.props.selected ? 'btn btn-secondary': 'btn btn-success' } onClick={()=>{this.props.select(this.props.id)}}  >select</button>
          : <button type='button' class='cart-btn' onClick={()=>{this.props.addToCart(this.props.id)}}  >add to <span><i class="fa fa-shopping-cart"></i></span></button>
          }
          </div>
  			</div>
        </center>
  		</div>
  	</div>
    </div>
  )
}


}
export default ProductCard ;
