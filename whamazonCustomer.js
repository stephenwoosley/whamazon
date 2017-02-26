var mysql = require("mysql");
var inquirer = require("inquirer");

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
  showProductList();
  userOrder();
});

function showProductList()  {
  connection.query("SELECT * FROM products", function(err, res){
    if(err) throw err;
    //console.log(res);
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
      // "ID: " + res[item].item_id + " | ");
      // console.log("Name: " + res[item].product_name + " | ");
      // console.log("Department: " + res[item].department_name + " | ");
      // console.log("Price: " + res[item].price + " | ");
      // console.log("Number In Stock: " + res[item].stock_quantity + " | ");
      // console.log("---------------------------");
    }
    console.log("-------------------------------------------------");;
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
          console.log("Unfortunately we don't have as many as you need! Please select a lower amount.");
          userOrder();
        }
        else {
          connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: "stock_quantity" - answer.quantity}, {item_id: answer.itemId}], function(err, res){
            if(err) throw err;
            console.log("Congratulations on your new purchase!!!");
          })
        }

      });
    });

}
