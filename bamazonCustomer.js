var mysql = require("mysql");
var inquire = require("inquirer");
var Table = require('cli-table');
var productData = [];
var table = new Table({
    head:['item_id', 'product_name', 'department_name', 'price', 'stock_quantity' ],
    style:{
        colWidths: [25,25,25,25,25],
        colAligns:['center'],
        head:['red'],
    }
});

var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Hurricane23$",
    database: "bamazon_db"
});



connection.connect(function(err){
    if (err) throw err;
});

connection.query(
    'SELECT item_id, product_name, department_name, price, stock_quantity FROM products',
    function(err,res){
        if (err) throw err;

        for(var i = 0; i < res.length; i++){
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }

        displayTable();
}
);

function askProduct(){
    inquire.prompt([
        {
            type:'input',
            name:'item_id',
            message:"Which product would you like? Input the item ID."
        }
    ]).then ( answers =>
        askQuantity(answers)
    );
}

function askQuantity(id){
    inquire.prompt([{
        type:'input',
        name:'quantity',
        message:'How many would you like?'
    }]).then ( answers =>
        checkQuantity(answers, id)
    )
}

function checkQuantity(quantity, id){
    connection.query(
        "SELECT item_id, stock_quantity, price FROM products", 
        function(err, res){
            if(err) throw err;
            // console.log(res[id.item_id-1].stock_quantity, quantity);
            if(res[id.item_id-1].stock_quantity < quantity.quantity ){
                console.log("Not enough items in stock. Please restart transaction for less. Thank you.")
                connection.end();
            }
            else{
                checkOut(quantity,id,res[id.item_id-1].stock_quantity,res[id.item_id-1].price);
            }
        }
    );
}

function checkOut(quantity,id,stock,price){
    var itemsLeft = stock-quantity.quantity;
// console.log(itemsLeft);
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
            stock_quantity: itemsLeft
        },
    {
        item_id: id.item_id
    }],
    
    console.log("Please pay: $" + quantity.quantity*price + ". Thank you. Visit again!")
    );
    connection.end();
    }

   
    function displayTable() {
        console.log(table.toString());
        askProduct();
    }