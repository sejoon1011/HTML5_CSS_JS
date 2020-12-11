window.onload() = () =>{
    $('#email').keypress(checkEmail)
    
    function checkEmail(){

        console.log('test')
    $.ajax({
        url: '/checkEmail',
        type: 'post',
        data: {
            'email': $('#email').val()
        },
        success: (data) => {
            if(data.data == 1){
                $('#error').val() = 'Your email already exists'
                $('#error').css('color', '#930000')
                $('#email').val('')
            }else{
                $('#error').val() = 'You can use the email'
                $('#error').css('color', '#009300')
            }
        }
    })
    
}
}