var flag = true
window.onload= () =>{

  
setTimeout(()=>{
    var firstLogo = document.getElementById('firstLogo');
    firstLogo.style.display = 'none';
}, 1000)
    var change = document.getElementById('change')
    change.addEventListener('click', setEmailOrNumber)
    $('#id').blur(duplicateCheck)
    $('#auth').blur(regularExpression)

    function regularExpression(){
        var auth = $('#auth').val();
        var className = document.getElementById('auth').getAttribute('class')

        if('number' == className){
            $('#auth').css('background',' #ff4321');

        } else if($('#email') !== undefined){
            console.log('email');
            
        }

    }

    function duplicateCheck(){
        $.ajax({
            url: '/join/checkId',
            type: 'post',
            data: {
                'id': $('#id').val()
            },
            success: (data) =>{
                if (data.data == 1){

                    $('#id').css('background-color', 'red');
                    $('#id').val('');
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
            decide = document.getElementById('auth')
            decide.setAttribute('class', 'email')
            decide.setAttribute('placeholder', 'your email')
            change.innerHTML = 'I want to use my number instead'
            flag = false
        }else{
            decide = document.getElementById('auth')
            decide.setAttribute('class', 'number')
            // decide.setAttribute('name', 'number')
            decide.setAttribute('placeholder', 'your number')
            change.innerHTML = 'I want to use my email instead'
            flag = true
        }
    }

}