const express = require('express')
const app = express()
const http = require('http')
const mysql = require('mysql')
const db = require('./db/db.js')
const router = express.Router()
const server = http.Server(app)
const socket = require('socket.io')
const path = require('path')
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
app.set('port', process.env.PORT || 3000) 
//chatting ui 가져오기
app.use(express.static(path.join(__dirname, 'public/chattingUi')))
app.use(express.static(path.join(__dirname, 'public/mainUi')))
app.use(express.static(path.join(__dirname, 'node_modules')))

var connection = db.connect();
// app.use('/', (req,res) =>{
//     res.sendFile(__dirname + '/public/first.html')
// })
app.get('/join', (req, res) => {
    res.sendFile(__dirname + '/public/mainUi/main.html')
})
app.post('/join/checkId', (req, res) =>{
    var data= db.selectId(req.body.id)
    if (data != undefined) res.send({data : 0})
    else if (data == undefined) res.send({data: 1});
})
app.use('/', (req, res) => {
    res.sendFile(__dirname + '/public/first.html')
})
app.use('/chatting',(req, res) =>{
     res.sendFile(__dirname + '/public/chattingUi/chatting.html')
    //res.render(__dirname + '/public/chattingUi/chatting.html')
})

app.post('/join',(req, res) => {
    console.log('this is testsssssss')
    var regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/ ;
    var regNumber = /^[0-9]*$/;
    console.log(req.body.id)
    if(regEmail.test(req.body.numberOrEmail)){
        console.log('req.')
      db.insertUser(req.body.id, req.body.pw, req.body.numberOrEmail, null)
    }
    else if(regNumber.test(req.body.numberOrEmail)){
        db.insertUser(req.body.id, req.body.pw, req.body.name, null, req.body.numberOrEmail)
    }
    })  


io.on('connection', function(socket){
    
    socket.on('join', (data) => {
        for(var i = 0 ; i < room_name.length; i++){
            if(room_name[i].room_name == data.room_name)
                socket.emit('reJoin', {message : 'this name already exists'})
                return
            }
        roomName = data.roomName
        socket.join(roomName)
        room_name[count] = {
            roomName : roomName,
            room_name : data.room_name
        }
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

    socket.on('SEND', function(msg){
        console.log(msg.name)
        console.log(msg.message)
        console.log(msg.destination)
        socket.in(roomName).emit('message', {
            from : msg.name,
            message : msg.message
        })
        
    })
})
server.listen(app.get('port'), function(){
    console.log('server on')
})
