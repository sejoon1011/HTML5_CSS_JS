var scrollCount = 0
window.onload = function(){
    //var btn = document.getElementById("btn")
   // btn.addEventListener("click", send)
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
        window.scrollTo({top:body.offsetTop, behavior:'smooth'})
       // scrollCount += 10
        }
    }
    function menu(event){
        var menu = document.getElementById('menu')
        console.log('hello')
        menu.style.display = 'block'
    }
    function removeMenu(event){
        var menu = document.getElementById('menu')
        menu.style.display = 'none'
    }
    
}