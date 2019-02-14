import React from 'react'


class Input extends React.Component {
  render(){
    let inputElement = null ;
    switch (this.props.type) {
      case 'fileInput':
      inputElement =<center>

      <input ref={(inpFile)=>{this.inpFile=inpFile}} id='input'  style={{display:'none'}}
                    onChange={this.props.changed}
                    {...this.props.inputConfig}


                         />
  <button class='btn btn-info' onClick={()=>{this.inpFile.click()}}>upload</button>
                         <br/><br/>
                         { this.props.imageUrl ?
                        <img class="img-thumbnail" height='350' width='350' src={this.props.imageUrl} />
                         :<div class={this.props.classes}><p>preview image</p></div>
                       }

                         </center> ;
      break ;
      case 'input':
      inputElement = <input  onChange={this.props.changed} {...this.props.inputConfig} value={this.props.value}  class={this.props.classes} /> ;
        break;
      case 'textarea':
      inputElement = <textarea {...this.props.inputConfig} onChange={this.props.changed} value={this.props.value} class={this.props.classes} /> ;
        break;
      case 'select':
       inputElement = (
         <select class={this.props.classes} onChange={this.props.changed} value={this.props.value}>
         {
           this.props.options.map(option => <option>{option}</option>)
         }
         </select>
       )
        break;
    }
  return(
  <div class='form-group row text-secondary  '>
  { this.props.type != 'fileInput' ?
  <label  class="col-sm-2 col-form-label text-secondary">{this.props.label}</label> : null}
  <div class="col-sm-10">
  {inputElement}
  <div class="invalid-feedback">
        {this.props.msg}
  </div>
  </div>
  </div>
  )}






}
export default Input  ;
