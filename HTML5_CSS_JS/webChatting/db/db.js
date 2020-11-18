var mysql = require('mysql')
var connection = null
var data = null
function dbConnection(){
       connection = mysql.createConnection({
        host:'localhost',
        post: 3000,
        user: 'root',
        password: 'tpwns1011',
        database: 'sns'
    })
    connection.connect()
    return connection;
}
function selectId(id){
    connection.query(`SELECT id FROM users WHERE id='${id}'`,returnData);


}
function returnData(err, rows, fields) {
    
    if(!err){
        data = rows;
            
        }
        else {
            console.log(err)
        }
    
    
    return data;
}
function insertUser( id, pw, name, email, number){
    connection.query(`
        INSERT INTO users VALUES(?, ?, ?, ?, ?)
    `, [id, pw, name, email, number],
    function(err, rows, fields){
        if(!err){
            console.log('success')
        }else{
            console.log(`err : ${err}`)
        }
    })
}
module.exports = {
    connect:dbConnection,
    selectId:selectId,
    insertUser:insertUser,
};
