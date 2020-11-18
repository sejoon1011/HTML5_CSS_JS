var flag = true
window.onload= () =>{
setTimeout(()=>{
    var firstLogo = document.getElementById('firstLogo');
    firstLogo.style.display = 'none';
}, 1000)
    var change = document.getElementById('change')
    change.addEventListener('click', setEmailOrNumber)
    $('#id').keypress(duplicateCheck)


    function duplicateCheck(){
        $.ajax({
            url: '/join/checkId',
            type: 'post',
            data: {
                'id': $('#id').val()
            },
            success: (data) =>{
                if (data == 1){
                    
                    $('#id').css('background-color', 'red');
                }else{
                    $('#id').css('background-color', 'green');
                }
            }
        })
    }


    function setEmailOrNumber(){
        var decide = null
        //flag가 true일때 number에서 email로
        var change = document.getElementById('change')
        
        if(flag){
            decide = document.getElementById('number')
            decide.setAttribute('id', 'email')
            // decide.setAttribute('name', 'email')
            decide.setAttribute('placeholder', 'your email')
            change.innerHTML = 'I want to use my number instead'
            flag = false
        }else{
            decide = document.getElementById('email')
            decide.setAttribute('id', 'number')
            // decide.setAttribute('name', 'number')
            decide.setAttribute('placeholder', 'your number')
            change.innerHTML = 'I want to use my email instead'
            flag = true
        }
    }

}