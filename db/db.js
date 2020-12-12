var mysql = require('mysql')
var connection = null
var data ;
    connection = mysql.createConnection({
        host:'us-cdbr-east-02.cleardb.com',
        post: 3306,
        user: 'b89dad7272a7b9',
        password: '17d0d32c',
        database: 'heroku_1b3b232092e971f'
    })
function dbConnection(){
    //    connection = mysql.createConnection({
    //     host:'localhost',
    //     post: 3000,
    //     user: 'root',
    //     password: 'tpwns1011',
    //     database: 'sns'
    // })
    connection.connect()
    return connection;
}

connection.on('error' , function(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){ // db connection이 끊어졌을때 재 연결을 위한 코드
        dbConnection()
    }
    else if(err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR'){
        dbConnection()
    }
    else{
        throw err
    }
})
function selectId(id, callBack){

    connection.query(`SELECT id FROM users WHERE id='${id}'`,(err, rows, fields) =>{
        
    if(!err){
        data = rows;   
        module.exports['data'] = data ;  
        callBack(data)
    }
    else {
            console.log(err)
        }
     });    
}
function selectEmail(email, callBack){
    connection.query(`SELECT email FROM email WHERE email='${email}'`, (err, rows, fields) => {
        if(!err){     
            module.exports['data'] = rows;
            callBack(rows)

        }
        else{
            console.log(err)
        }
    })

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
function insertEmail(email){
    connection.query(`
        INSERT INTO email VALUES(?)`,
        [email],
        function(err, rows, fields){
            if(err){
                console.log(`err:${err}`)
        
            }
        }
        )
        
    }

module.exports = {
    connect:dbConnection,
    selectId:selectId,
    selectEmail:selectEmail,
    insertUser:insertUser,
    insertEmail:insertEmail
};
