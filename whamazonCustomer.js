var mysql = require("mysql");
var inquirer = require("inquirer");
var figlet = require('figlet');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "whamazon"
});

connection.connect(function(err){
  if(err) throw err;
  console.log("Connected as User #" + connection.threadId);

  asciiTitle();
  // userOrder();
  // quitOrContinue();
});

function asciiTitle(){
  figlet('whamazon', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
  console.log(data)
  showProductList()
  });
}

function showProductList()  {
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    console.log("-------------------------------------------------");
    console.log("ID | PRODUCT NAME | DEPARTMENT | PRICE | QUANTITY");
    console.log("-------------------------------------------------");
    for (var item in res) {
      console.log(
        [
          res[item].item_id,
          res[item].product_name,
          res[item].department_name,
          res[item].price,
          res[item].stock_quantity
        ].join(" | ")
      );
    }
    console.log("-------------------------------------------------");
    userOrder();
  });
}

function userOrder() {

  inquirer.prompt([
    {
      name: "itemId",
      type: "input",
      message: "What is the ID of item you would like to buy?"
    }, {
      name: "quantity",
      type: "input",
      message: "How many would you like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }]).then(function(answer){
      console.log("Chosen item ID is " + answer.itemId + " & you'd like to buy " + answer.quantity + " of them.");
      connection.query("SELECT stock_quantity FROM products WHERE item_id =" + answer.itemId, function(err, res){
        if(err) throw err;
        if (res[0].stock_quantity < answer.quantity) {
          console.log("\n Unfortunately we don't have as many as you need! Please select a lower amount.\n");
          userOrder();
        }
        else {
          connection.query("UPDATE products SET stock_quantity = stock_quantity - "+answer.quantity+" WHERE item_id = "+answer.itemId, function(err, res){
            if(err) throw err;
            console.log("\n$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
            console.log("Congratulations on your new purchase!!!");
            connection.query("SELECT price FROM products WHERE item_id = "+ answer.itemId, function(err, res){
              //asciiCar();
              console.log("$"+res[0].price * answer.quantity + " has been deducted from your account.");
              console.log("\n$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$\n");
              quitOrContinue();
            })

          })
        }
      });
    });
}

function quitOrContinue() {
  inquirer.prompt([
    {
      name: "contOrExit",
      type: "list",
      message: "Would you like to [Continue] or [Exit]?",
      choices: ["Continue", "Exit"]
  }]).then(function(answer){
    if(answer.contOrExit === "Continue"){
      asciiTitle();
    }
    else if (answer.contOrExit === "Exit"){
      process.exit();
    }
  });
}

function asciiCar() {
  figlet('congrats!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
  console.log(data)
  });
}
