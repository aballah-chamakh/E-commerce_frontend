import React from 'react' ;
import axios from 'axios' ;
import ProductCard from '../Product/ProductCard' ;
class CrudProduct extends React.Component {
state = {
  products : [],
  form : {
    image : {imgFile:'',imgUrl:'',classes:'',valid:true} ,
    title : {value:'',classes:'',valid:true} ,
    description : {value:'',classes:'',valid:true},
    related_products : ''

  }
}
componentDidMount(){
axios.get('http://127.0.0.1:8000/api/product').then(res=>{
this.setState({products:res.data})
})
}
change =(event,field)=>{
let form = this.state.form
switch (field) {
  case 'image':
  console.log('img handling');
  let imgFile = event.target.files[0]
  if(imgFile){
  let imgUrl = URL.createObjectURL(imgFile)
  form[field].imgFile = imgFile
  form[field].imgUrl = imgUrl}
  break;
  case 'title':
  form[field].value = event.target.value
  break;
  case 'description':
  form[field].value = event.target.value
  break;
}
this.setState({form:form})
}
select = (id,idx)=>{
  let state = this.state
  if(state.form.related_products.indexOf(String(id)+',') != -1){
    state.form.related_products = state.form.related_products.replace(String(id)+',','')
  }else{
  state.form.related_products = state.form.related_products+id+','

}
  state.products[idx]['selected'] = !state.products[idx]['selected']
  this.setState({state:state})
}

createProduct = ()=>{
  let fields = ['image','title','description']
  let form = {}
  fields.map(field=>{
    if (field == 'image'){
form[field] = this.state.form[field].imgFile
    }else{
form[field] = this.state.form[field].value
    }
  })
}

  render(){
    return(
      <div>
      <div class='row'>
      <div class='col-lg-12'><center><h3 class='text-success'>Hey <span class='text-warning'>Fatma</span> What's your new product for today ! </h3></center></div>
      </div>
      <div class='row' style={{backgroundColor:'#eae8e1'}}>

      <div class='col-lg-4' style={{marginTop:'30px'}}>
      <input type='file' ref={(inpFile)=>{this.inpFile=inpFile}} id='input'  style={{display:'none'}} onChange={(event)=>{this.change(event,'image')}}/>
      <center><button  class='btn btn-success' onClick={()=>{this.inpFile.click()}}>upload</button></center>

      {!this.state.form.image.imgUrl ?
      <div style={{width:'100%',height:'350px',marginTop:'15px',border:'1px solid',borderRadius:'15px',color:'grey'}}>
      <center>Preview Image</center></div>
      : <img style={{width:'100%',height:'350px',marginTop:'15px',borderRadius:'15px'}}  src={this.state.form.image.imgUrl} width='400px' width='400px' /> }
      </div>

      <div class='col-lg-8' style={{marginTop:'30px'}}>

      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
           <input type="text" class="form-control" id="title" placeholder="product title" onChange={(event)=>{this.change(event,'title')}} />
        </div>
      </div>
      <div class="form-group row">
        <label for="description" class="col-sm-2 col-form-label">Description</label>
        <div class="col-sm-10">
           <textarea rows='15' type="text" class="form-control" id="description" placeholder="product description" onChange={(event)=>{this.change(event,'description')}} />
        </div>
      </div>
      </div>
      </div>

      <div class='row'>
 <div class='col-lg-12'><center><h3 class='text-success'>Up Sell Products</h3></center></div>
      {this.state.products.map((product,idx)=>{
        return(
          <div class='col-lg-3'>
          <ProductCard source='create-product' selected={product.selected? true : false} select={()=>{this.select(product.id,idx)}} id={product.id} name={product.name} price={product.price} image={product.image}  />
          </div>
         )
      })}

      </div>
  </div>

    )
  }
}

export default CrudProduct ;
