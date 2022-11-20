import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  
  const [error, setError] = useState("");
  const [sizes, setSizes] = useState([]);
  const [crusts, setCrusts] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, fetchTotal] = useState([]);
  
  
  const fetchSizes = async() => {
    try {      
      const response = await axios.get("/api/sizes");
      setSizes(response.data);
    } catch(error) {
      setError("error retrieving books: " + error);
    }
  }
  
  const fetchCrusts = async() => {
    try {
      const response = await axios.get("/api/crusts");
      setCrusts(response.data);
    } catch(error) {
      setError("Error gettings lists: " + error);
    }
  }
  
  const fetchSauces = async() => {
    try {
      const response = await axios.get("/api/sauces");
      setSauces(response.data);
    } catch(error) {
      setError("Error gettings lists: " + error);
    }
  }
  
  const fetchToppings = async() => {
    try {
      const response = await axios.get("/api/toppings");
      setToppings(response.data);
    } catch(error) {
      setError("Error gettings lists: " + error);
    }
  }
  
  const fetchOrder = async() => {
    try {
      const response = await axios.get("/api/order");
      setOrder(response.data);
    } catch(error) {
      setError("Error gettings lists: " + error);
    }
  }
  
  
  useEffect(() => {
    fetchSizes();
  },[]);
  
  useEffect(() => {
    fetchCrusts();
  },[]);
  
  useEffect(() => {
    fetchSauces();
  },[]);
  
  useEffect(() => {
    fetchToppings();
  },[]);
  
  useEffect(() => {
    fetchOrder();
    //fetchTotal();
  },[]);
  
//   useEffect(() => {
//      fetchTotal();
//   })
  
  const addToPizza = async(thing) => {
    console.log(thing);
      const response = axios.post("/api/order/" + thing);
     if (response == "BAD"){
       console.log("BAD");
       alert("Please finish this order before starting a new one");
     }
    else{
      console.log(response);
      fetchOrder();
    }
  }
  
  const restart = async() => {
      await axios.delete("/api/restart");
    fetchOrder();
  }
  
  const submit = async() => {
    alert("Order Submitted! Start your next pizza!");
      await axios.delete("/api/restart");
    fetchOrder();
  }
  
  let total1 = 0;
  
  function updateTotal(characteristic){
    total1 = parseInt(total1) + parseInt(characteristic.price);
}
  
  return (
    <div className="App">
    <h1>Welcome to Papas Pizzaria! Let's make your custom pizza!</h1>
    <div>
    <img src={require("./pizza.png")} width='300' alt='A Pizza Man'/>
    </div>
    <h2>Select a single size, crust, and sauce, and as many toppings as you'd like!</h2>
    <div className='options'>
      <div className='allSizes'>
        <h1>Choose A Size</h1>
        {sizes.map( size => (
          <div key={size.id}>
            <h2>{size.name}</h2>
            <h4>{size.diam}</h4>
            <h3>${size.price}</h3>
            <button onClick ={e => addToPizza(size.id)}>Add</button>
          </div>
        ))}
      </div>
      <div id='allCrusts'>
        <h1>Choose A Crust</h1>
        {crusts.map( crust => (
          <div key={crust.id}>
            <h2>{crust.name}</h2>
            <h3>${crust.price}</h3>
            <button onClick ={e => addToPizza(crust.id)}>Add</button>
          </div>
        ))}
      </div>
      <div id='allSauces'>
        <h1>Choose A Sauce</h1>
        {sauces.map( sauce => (
          <div key={sauce.id}>
            <h2>{sauce.name}</h2>
            <h3>${sauce.price}</h3>
            <button onClick ={e => addToPizza(sauce.id)}>Add</button>
          </div>
        ))}
      </div>
      
      <div id='allToppings'>
        <h1>Choose A Topping</h1>
        {toppings.map( topping => (
          <div key={topping.id}>
            <h2>{topping.name}</h2>
            <h3>${topping.price}</h3>
            <button onClick ={e => addToPizza(topping.id)}>Add</button>
          </div>
        ))}
      </div>
      
      </div>
      <div id='order'>
        <h1>Your custom pizza!</h1>
        {order.map( characteristic => (
          <div key={order.id}>
            <h2>{characteristic.name}</h2>
            <h3>{characteristic.price}</h3>
            {updateTotal(characteristic)}
          </div>
        ))}
        <h3>Total: ${total1}</h3>
      </div>
      
        
      
      <button onClick = {e => restart()}>Restart Pizza</button>
      <h3>All done? Go ahead and submit your pizza!</h3>
      <button onClick = {e => submit()}>Submit Order.</button>
      
      <h5> Github: https://github.com/Cycl0path/pizza</h5>
    </div>
      
    
  );
}

export default App;

//Trying to do books

