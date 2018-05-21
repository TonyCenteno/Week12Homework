
var displayAll = function(connection, callback, data){
    var query = "SELECT id, product_name, price FROM products WHERE stock_quantity > 0";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("-------------------");
            console.log("Product Name: " + res[i].product_name + "\nProduct id: " + res[i].id + "\nPrice: " + res[i].price);
            console.log("-------------------");
        }
        callback(data);
      });
    //   connection.end(function(err) {
    //     if(err) {
    //         console.log(err.message);
    //     }
    // });
      
}


module.exports = displayAll;