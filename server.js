//PART 1 IS WORKING

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.listen(3000, () => console.log('Server listening on port 3000!'));


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Conrol-Allow-Metods", "POST, GET, DELETE");
  res.header(
    "Access-Conrol-Allow-Metods",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// parse application/json
app.use(bodyParser.json());


//ITEMS 
let sizes = [];       
let toppings = [];
let sauces = [];
let crusts = [];
let allItems = [];

let id = 0;

app.post('/api/sizes', (req, res) => {         //ADDS SIZES
  id = id + 1;
  let size = {
    id: id,
    name: req.body.name,
    diam: req.body.diam,
    price: req.body.price,
    type: 'size',
  };
  sizes.push(size);
  allItems.push(size);
  res.send(size);
});

app.post('/api/toppings', (req, res) => {         //ADDS TOPPINGS
  id = id + 1;
  let topping = {
    id: id,
    name: req.body.name,
    price: req.body.price,
    type: 'topping',
    quantity: 1,
  };
  toppings.push(topping);
  allItems.push(topping);
  res.send(topping);
});

app.post('/api/sauces', (req, res) => {         //ADDS SIDES
  id = id + 1;
  let sauce = {
    id: id, 
    name: req.body.name,
    price: req.body.price,
    type: 'sauce',
  };
  sauces.push(sauce);
  allItems.push(sauce);
  res.send(sauce);
});

app.post('/api/crusts', (req, res) => {         //ADDS DRINK
  id = id + 1;
  let crust = {
    id: id,
    name: req.body.name,
    price: req.body.price,
    type: 'crust',
  };
  crusts.push(crust);
  allItems.push(crust);
  res.send(crust);
});

app.get('/api/sizes', (req, res) => {    //GETS ALL SIZES
  res.send(sizes);
});

app.get('/api/toppings', (req, res) => {    //GETS ALL TOPPINGS
  res.send(toppings);
});

app.get('/api/sauces', (req, res) => {    //GETS ALL SIDES
  res.send(sauces);
});

app.get('/api/crusts', (req, res) => {    //GETS ALL DRINKS
  res.send(crusts);
});

app.get('/api/total', (req, res) => {    //GETS ALL DRINKS
  res.send(total);
});
//order
let order = [];
let crustsCounter = 0;
let sizesCounter = 0;
let saucesCounter = 0;
let total = 0;

app.post('/api/order/:id', (req,res) => {
  let id = parseInt(req.params.id);
  let index = allItems.map(item => {
      return item.id;
    })
    .indexOf(id);
  if (index === -1) {
    res.status(404)
      console.log("Sorry, that item doesn't exist.");
    return;
  }
  
  let incart = order.map(item => {
    return item.id
  })
    .indexOf(id);
    
  if (incart === -1){
    if(allItems.at(index).type === 'topping'){
        order.push(allItems.at(index));
        total = total + allItems.at(index).price;
      }
    else if(sizesCounter == 0 && allItems.at(index).type === 'size'){
    order.push(allItems.at(index));
    total = total + allItems.at(index).price;
    }
    else if(saucesCounter == 0 && allItems.at(index).type === 'sauce'){
    order.push(allItems.at(index));
    total = total + allItems.at(index).price;
    }
    else if(crustsCounter == 0 && allItems.at(index).type === 'crust'){
    order.push(allItems.at(index));
    total = total + allItems.at(index).price;
    }
    else{
      console.log("FAILURE");
      res.send("BAD");
    }
    if(allItems.at(index).type === 'size'){
      sizesCounter = sizesCounter + 1;
    }
    else if(allItems.at(index).type === 'sauce'){
      saucesCounter = saucesCounter + 1;
    }
    else if(allItems.at(index).type === 'crust'){
      crustsCounter = crustsCounter + 1;
    }
    res.send("Done");
  }
  else if (allItems.at(index).type === 'topping'){
      allItems.at(index).quantity = allItems.at(index).quantity + 1;
      console.log(allItems.at(index).quantity);
      }
  else {
    res.send("BAD");
  }
})

app.get('/api/order', (req, res) => {    //GETS ALL ITEMS IN CART
  res.send(order);
});

app.delete('/api/restart', (req, res) => {    //CLEARS ALL ITEMS IN CART
  order = [];
  crustsCounter = 0;
  sizesCounter = 0;
  saucesCounter = 0;
  res.send("Done");
  
});
