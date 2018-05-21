

var start = function(connection, callback, inquirer){
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the item you want to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of the product they would like to buy?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  }
            }
        ])
        .then(function(answer) {
            connection.query("SELECT id FROM products", function(err, results) {
                if (err) throw err;
            // based on their answer, either call the bid or the post functions
                for (var i = 0; i < results.length; i++) {
                    if (results[i].id === answer.item) {
                        chosenItem = results[i];
                        console.log(chosenItem);
                    }
                }

            // if (answer.item.toLowerCase() === "POST") {
            //   postAuction();
            // }
            // else {
            //   bidAuction();
            // }

            });
        });
};

module.exports = start;