import React from 'react' ;
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios' ;
class ParaAnalytics extends React.Component {

  state = {
  chartData:{
  labels: [],
  datasets:
[    {

      data:[

      ],

      backgroundColor:[

        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 99, 132, 0.6)'
      ]
    }]

}
  }
  componentDidMount(){

    let config =  {headers: {Authorization : 'Bearer '+localStorage.getItem('para_token')}}

    axios.get('http://127.0.0.1:8000/api/order/order_analytics/',config).then((res)=>{
     let state = this.state
     let labels = []
     let data = []
      res.data.analytics_data.map(product=>{
        labels.push(product.product.name)  ;
        data.push(product.count) ;
      })
      state.chartData.labels = labels
      state.chartData.datasets[0].data = data
      this.setState({state:state})

        })
  }
  render(){
    return(
  <div class='row'>
  <div class='col-lg-6'>
  <Line
data={this.state.chartData}
options={{
  maintainAspectRatio: true,
   title:{
      display:true,
      text:'product_count',
      fontSize:16
    },
    legend:{
       display:false,
      position:'top'
     }
}}
/>
  </div>
  <div class='col-lg-6'>
  <Pie
data={this.state.chartData}
options={{
  maintainAspectRatio: true,
   title:{
      display:true,
      text:'product_count',
      fontSize:16
    },
    legend:{
       display:false,
      position:'top'
     }
}}
/>
  </div>
  <div class='col-lg-12'>
    <Bar
  data={this.state.chartData}
  options={{

     title:{
        display:true,
        text:'product_count',
        fontSize:16
      },
      legend:{
         display:false,
        position:'top'
       }
  }}
/>
</div>
</div>)
  }
}
export default ParaAnalytics ;
