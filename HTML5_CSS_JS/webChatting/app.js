const express = require('express')
const app = express()
const http = require('http')
const server = http.Server(app)
const socket = require('socket.io')
const path = require('path')
const { emit } = require('process')
var io = socket(server)
var port = 3000
var names = new Array()
var count = 0
var roomName = null
app.set('port', process.env.PORT || 3000) 
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/public/chatting.html')
})

io.on('connection', function(socket){
    
    socket.on('join', (data) => {
        roomName = data.roomName;
        console.log(roomName)
        socket.join(roomName);
    })
    socket.emit('members', {members : names})
    

    socket.on('updateMessage', function(name){
        names[count] = name.comment
        //console.log(count)
        count += 1
        //socket.name = name.comment
        console.log(name.comment)
        var message =` '${name.comment}' participated in the chat`
        socket.in(roomName).emit(`updateMessage`, {
            name : 'server',
            message : message,
            member : name
        })
        for(var i = 0; i < names.length; i++){
            console.log(names)
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
        // socket.emit(`${names[]}`, {
        //     name : 
        // })  
    })
})
server.listen(app.get('port'), function(){
    console.log('server on')
})
