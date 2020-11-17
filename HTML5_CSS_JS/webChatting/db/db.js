var mysql = require('mysql')
var connection = null
function dbConnection(){
       var connection = mysql.createConnection({
        host:'localhost',
        post: 3000,
        user: 'root',
        password: 'tpwns1011',
        database: 'sns'
    })
    connection.connect()
    return connection;
}
function select(connection){
    dbConnection()
    connection.query('select * from users', function(err, rows, fields){
        if(!err){
            console.log(rows);
            console.log(fields)
            
        }
    })
}
module.exports = {
    connect:dbConnection,
    selectAll:select,

};
