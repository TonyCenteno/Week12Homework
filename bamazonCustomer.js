var mysql = require("mysql");
var inquirer = require("inquirer");
var displayAll = require("./data");
//var start = require("./prompts");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    displayAll(connection, question1);
});


var chosenItem;

var question1 = function(){
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the item you want to purchase?"
            }])
        .then(function(answer) {
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
            // based on their answer, see if the answer matches any of the items available
                
                for (var i = 0; i < results.length; i++) {
                    // console.log(answer.item);
                    // console.log(results[i].id);
                    if (results[i].id == answer.item) {
                        var chosenItem = results[i];
                        //console.log(chosenItem.product_name);
                    }
                }
                if (chosenItem) {
                    console.log("\nYou selected");
                    console.log("id: " + chosenItem.id + " --- " + chosenItem.product_name);
                    console.log("$" + chosenItem.price + "\n");
                    question2(chosenItem);
                    
                }else{
                    console.log("\nThis Item Does Not Exist\n");
                    question1();
                }

            });
        });
};

var question2 = function(chosenItem ){
    inquirer
        .prompt([
            {
                name: "qty",
                type: "input",
                message: "How many units would you like?"
            }])
        .then(function(answer) {
            var available = chosenItem.stock_quantity - JSON.parse(answer.qty);
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
            // based on their answer, see if the answer matches any of the items available
                if (available > 0) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                          {
                            stock_quantity: available
                          },
                          {
                            id: chosenItem.id
                          }
                        ],
                        function(error) {
                          if (error) throw err;
                          console.log("\nYour order has been placed!");
                          console.log("Your total is " + "$" + chosenItem.price);
                          console.log("We still have " + available + " available\n");
                          reStart();
                        }
                      );
                }else{
                    console.log("You can not order " + JSON.parse(answer.qty) + " units." + "\nWe only have " + chosenItem.stock_quantity + " available.");
                    question2();
                }

            });
        });
};

var reStart = function(){
    inquirer
        .prompt([
            {
                name: "again",
                type: "confirm",
                message: "Would you like to purchase anything else?",
                default: false
            }])
            .then(function(answer) {
                // when finished prompting, insert a new item into the db with that info
                if (answer.again) {
                    displayAll(connection, question1);
                  }
                else {
                    reStart();
                }
            });
};