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
