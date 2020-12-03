var mysql = require('mysql')
var connection = null
var data ;
// function dbConnection(){
//        connection = mysql.createConnection({
//         host:'localhost',
//         post: 3000,
//         user: 'root',
//         password: 'tpwns1011',
//         database: 'sns'
//     })
    connection = mysql.createConnection({
        host:'us-cdbr-east-02.cleardb.com',
        post: 3306,
        user: 'b89dad7272a7b9',
        password: '17d0d32c',
        database: 'heroku_1b3b232092e971f'
    })
    connection.connect()
    return connection;
}
function selectId(id, callBack){

    connection.query(`SELECT id FROM users WHERE id='${id}'`,(err, rows, fields) =>{
        
    if(!err){
        data = rows;   
        module.exports['data'] = data ;
        console.log(`db : ${data}`)   
        callBack(data)
    }
    else {
            console.log(err)
        }
    
    });

    

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
