var mysql = require('mysql')
var connection = null
var data = new Object();
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

    return data;

}
function returnData(err, rows, fields) {
    
    if(!err){
        data.result = rows;   
        console.log('returnData :' + data.result)
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
