// ===================
// DEPENDENCIES
// ===================
// packages
import React, { Component } from 'react'; 
import Header from './Header.js'
import Submit from './Submit.js'


// ===================
// Variables
// ===================
var https = require('https');
var apiKey = process.env.REACT_APP_API_KEY


// ===================
// COMPONENT
// ===================
class App extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      artist: '',
      time: '',
      amount: 0,
      MainCountry: 'USD' ,
      convertedCountry: 'USD' ,
      converted: 0
    }
  }
  handleChange= (e) => {
    this.setState( { [e.target.id]: e.target.value } )
    //this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit = (e) => {
   
    e.preventDefault()
    console.log(this.state.amount);
    console.log(this.state.MainCountry);
    console.log(this.state.convertedCountry);
  
    convertCurrency(this.state.amount, this.state.MainCountry, this.state.convertedCountry, (err, amount) => {
      console.log(amount);
      this.setState({
        converted: amount      
      })

    })

  
    
  }

  render() {
    return (

      <div className="container">
       
        {/* call header component */}
        <Header/>
        <div className="main">
        
        <form onSubmit={this.handleSubmit}>
        
          {/* amount box */}
          <label htmlFor='amount'>Amount:</label>               &nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;
          <input type='text' value={this.state.amount} onChange={this.handleChange} id='amount'/><br/>
                  
          {/* dropdown for main country */}

          <label htmlFor='MainCountry'>Main Country:  </label>           &emsp;&emsp;&emsp;
          <select id = 'MainCountry' value={this.state.value} onChange={this.handleChange}>
            <option value="USD">US Dollar</option>
            <option value="JPY">Japanese Yen</option>
            <option value="EUR">EURO</option>
            <option value="CNY">Chinese Yuan</option>

            <option value="USD">US Dollar</option>
            <option value="JPY">Japanese Yen</option>
            <option value="EUR">EURO</option>
            <option value="CNY">Chinese Yuan</option>
           
            <option value="CAD">Canadian Dollar</option>
            <option value="BGN">Bulgarian lev</option>
            <option value="KHR">Cambodian riel</option>
            <option value="CLP">Chilean Peso</option>
           
            <option value="COP">Columbian Peso</option>
            <option value="CRC">Costa Rican colon</option>
            <option value="CZK">Czech koruna</option>
            <option value="DOP">Dominican peso</option>

            <option value="NZD">New Zealand Dollar</option>
            <option value="AUD">Australian Dollar</option>
            <option value="PHP">Philippine peso</option>
            <option value="RUB">Russian ruble</option>
           
            <option value="SGD">Singapore dollar</option>
            <option value="KRW">South Korean won</option>
            <option value="TWD">New Taiwan Dollar</option>
            <option value="THB">Thai baht</option>
            
            <option value="HKD">Hong Kong dollar</option>
            <option value="INR">Indian rupee</option>
            <option value="SYP">Syrian pound</option>
            <option value="UYU">Ukrainian hryvnia</option>
          </select><br/>         
 
         {/* dropdown for converted country */}

          <label htmlFor='convertedCountry'>Converted Country: </label>                   &emsp;
          <select id = 'convertedCountry' value={this.state.value} onChange={this.handleChange}>
            <option value="USD">US Dollar</option>
            <option value="JPY">Japanese Yen</option>
            <option value="EUR">EURO</option>
            <option value="CNY">Chinese Yuan</option>

            <option value="USD">US Dollar</option>
            <option value="JPY">Japanese Yen</option>
            <option value="EUR">EURO</option>
            <option value="CNY">Chinese Yuan</option>
           
            <option value="CAD">Canadian Dollar</option>
            <option value="BGN">Bulgarian lev</option>
            <option value="KHR">Cambodian riel</option>
            <option value="CLP">Chilean Peso</option>
           
            <option value="COP">Columbian Peso</option>
            <option value="CRC">Costa Rican colon</option>
            <option value="CZK">Czech koruna</option>
            <option value="DOP">Dominican peso</option>

            <option value="NZD">New Zealand Dollar</option>
            <option value="AUD">Australian Dollar</option>
            <option value="PHP">Philippine peso</option>
            <option value="RUB">Russian ruble</option>
           
            <option value="SGD">Singapore dollar</option>
            <option value="KRW">South Korean won</option>
            <option value="TWD">New Taiwan Dollar</option>
            <option value="THB">Thai baht</option>

            <option value="HKD">Hong Kong dollar</option>
            <option value="INR">Indian rupee</option>
            <option value="SYP">Syrian pound</option>
            <option value="UYU">Ukrainian hryvnia</option>
          </select><br/> 
         <Submit/>
         
        </form>         
        <h2> Converted : {this.state.converted} </h2>
       </div>
  
       
    </div>
    );
  }
}

// ===================
// EXPORT
// ===================
export default App;

//function to convert money uses key

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
 

  fromCurrency = encodeURIComponent(fromCurrency);
  toCurrency = encodeURIComponent(toCurrency);
  var query = fromCurrency + '_' + toCurrency;

  var url = 'https://free.currconv.com/api/v7/convert?q='
            + query + '&compact=ultra&apiKey=' + apiKey;

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          try {
            var jsonObj = JSON.parse(body);

            var val = jsonObj[query];
            if (val) {
              var total = val * amount;
              cb(null, Math.round(total * 100) / 100);
              return total;
            } else {
              var err = new Error("Value not found for " + query);
              console.log(err);
              cb(err);
            }
          } catch(e) {
            console.log("Parse error: ", e);
            cb(e);
          }
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
        cb(e);
  });
}
