var io = io()
var socket = io.connect('http://localhost:3000')
var socket = io.connect('https://thesns.herokuapp.com/')
window.onload = function(){

    //server에 유저 이름을 보내주기 위한 입력

    var name = prompt('Type your nick name')
    var roomName = prompt('who do you want to send?')
    console.log(socket.id)
    socket.id = name
    //전송
    socket.emit('join', {
                            roomName : roomName,
                            room_name: name
                        })
        socket.on('reJoin', function(data){
            name = prompt(data.message)
            socket.emit('join', {
                roomName : roomName,
                room_name: name
            })
        })
        socket.emit('updateMessage', {comment:name})
        
        socket.on('members', function(member){
            console.log(member[0].room_name)
            var li = null
            var ul = document.querySelector('#menu #members')
            ul.style.listStyle = 'none'
            ul.style.fontFamily = 'fantasy'
            for(var i = 0; i < member.length; i++){
                li = document.createElement('li')
                ul.appendChild(li)
                if(member[i].room_name == name){
                    li.innerHTML = `${member[i].room_name}(Me)`
                }
                else{
                    li.innerHTML = member[i].room_name
                }
            }
        })
        
        //데이터 받는 함수
    socket.on('updateMessage', function(data){
        var body = document.querySelector('#body')
        var p = document.createElement('p')
        body.appendChild(p)
        p.style.fontFamily = 'fantasy'
        p.innerHTML = data.message
        var ul = document.querySelector('#menu #members')
        ul.style.listStyle = 'none'
        ul.style.fontFamily = 'fantasy'
        var li = null
        //새로운 멤버 추가
        li = document.createElement('li')
        ul.appendChild(li)
        if(data.member === name){
            li.innerHTML = data.member + `(me)`
        }
        li.innerHTML = data.member
        

    })
    socket.on('msg', function(data){
        console.log(`from : ${data.name}`)
        if(data.name == roomName){
        console.log(data)
        var body = document.querySelector('#body')
        var p = document.createElement('div')
        body.appendChild(p)
        p.style.backgroundColor = '#ADE23F'
        p.style.borderRadius = '10px 100px 100px 100px'
        p.innerHTML = `<Strong>`+ data.name + "</strong> <br>" + data.message
        }
    })
    
    
    var menu_btn = document.getElementById('menu-button')
    var menu_remove_btn = document.getElementById('remove-menu')
    menu_btn.addEventListener('click', menu)
    menu_remove_btn.addEventListener('click', removeMenu)
    document.addEventListener('keyup', send)
    
    function send(event){ 
        if(event.keyCode == '13'){
        var input = document.getElementById("text")
        var text = input.value
        console.log(text)
        var body = document.querySelector('#body')
        var p = document.createElement('div')
        body.appendChild(p)
        p.innerHTML = text
        input.value = ''
        
        socket.emit('msg', {
            name: name,
            message : text,
            to : roomName
        })
        
 
       
       window.scrollTo({top:body.offsetTop, behavior:'smooth'})
 
        }
    }
    
    function menu(event){
        var menu = document.getElementById('menu')
        
        menu.style.display = 'block'
    }

    function removeMenu(event){
        var menu = document.getElementById('menu')
        menu.style.display = 'none'
    }
    
    
}