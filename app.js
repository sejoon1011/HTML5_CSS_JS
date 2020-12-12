const express = require('express')
const app = express()
const http = require('http')
const mysql = require('mysql')
const db = require('./db/db.js')
const router = express.Router()
const server = http.Server(app)
const socket = require('socket.io')
const path = require('path')
const socketSession = {}; 
const { emit } = require('process')
var io = socket(server)
var port = 3000
var bodyParser = require('body-parser');
const { selectId } = require('./db/db.js')
app.use(bodyParser.urlencoded({ extended: false}));
var names = new Array()
var count = 0
var roomName = null
var room_name = new Array()//사용자가 어떤 방에 있는지 식별하기 위한 json 타입 변수
var serveStatic = require('serve-static')
var cool = require('cool-ascii-faces');
var session = require('express-session')
const { data } = require('jquery')


function getDataFromDb(res, id){
      var data
      db.selectId(id, (result) => {
          data = result;
          if (data.length > 0) res.send({data : 1})
          else if (data.length == 0) res.send({data: 0});
        })
  }
  
  function getEmailFromDB(res, email){
      db.selectEmail(email, (result) => {

          if(result.length > 0) {
              res.send({data : 1})
          }
          else if(result.length == 0){
              res.send({data : 0})
            }
            
      })
    }
    app.get('/cool', function(request, response) {
        response.send(cool());
      });
app.use(serveStatic(path.join(__dirname, 'dist')))
app.set('port', process.env.PORT || 3000) 
//chatting ui 가져오기
app.use(express.static(path.join(__dirname, 'public/chattingUi')))
app.use(express.static(path.join(__dirname, 'public/mainUi')))
app.use(express.static(path.join(__dirname, 'node_modules')))

var connection = db.connect();
app.get('/join', (req, res) => {
    res.sendFile(__dirname + '/public/mainUi/main.html')
})
//getDataFromDb -> db.selectId -> 
//connection.query의 익명함수의 파라미터인 콜백함수 사용 -> 프론트엔드로 데이터 전송
app.post('/join/checkId', (req, res) =>{  
    getDataFromDb(res,req.body.id)
})
app.post('/checkemail', (req, res)=> {
    let email = req.body.email
    getEmailFromDB(res, email)
})

app.use(session({
            secret: 'asdfwqef',
            resave: false,
            saveUninitialized: true
            }))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/first.html')
    req.session.check = true
})


// 사용자 사전 등록을 위한 프로세스
app.post('/', (req, res) => {
    res.sendFile(__dirname + '/public/process/registerEmail.html')

})


app.get('/chatting',(req, res) =>{
     res.sendFile(__dirname + '/public/chattingUi/chatting.html')
    
})

app.post('/join',(req, res) => {
    var regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/ ;
    var regNumber = /^[0-9]*$/;
    if(regEmail.test(req.body.numberOrEmail)){
      db.insertUser(req.body.id, req.body.pw, req.body.numberOrEmail, null)
    }
    else if(regNumber.test(req.body.numberOrEmail)){
        db.insertUser(req.body.id, req.body.pw, req.body.name, null, req.body.numberOrEmail)
    }
    })  


io.on('connection', function(socket){
    
    socket.on('join', (data) => {
    
        roomName = data.roomName
        room_name[count] = {
            roomName : roomName,
            room_name : data.room_name
        }
        socketSession[data.room_name] = socket.id;
        socket.emit('members', room_name)
    })

    
    
    socket.on('updateMessage', function(name){
        names[count] = name.comment
        socket.in(roomName).emit('members', {member : names[count]})
        count += 1
        console.log(`in join ` + name.comment)
        var message =` '${name.comment}' participated in the chat`
        socket.in(roomName).emit(`updateMessage`, {
            name : 'server',
            message : message,
            member : name.comment
        })
        for(var i = 0; i < names.length; i++){
            console.log('test' + names[i])
        }
    })

    socket.on('msg', function(msg) {
        console.log(msg)
        io.to(socketSession[msg.to]).emit('msg', {
            name: msg.name,
            message: msg.message
        })
    })

    socket.on('SEND', function(msg){
        socket.in(roomName).emit('message', {
            from : msg.name,
            message : msg.message
        })
        
    })
})
server.listen(app.get('port'), function(){
    console.log('server on')
})
