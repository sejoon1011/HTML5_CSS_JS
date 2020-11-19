### The SNS



##### Page Structure
/ : 메인페이지, 회원가입 버튼과 로그인 폼으로 구성<br> 
/join(get) : 회원가입 폼<br>
/join(post) : db에 회원 추가<br>
/join/checkId : ID 중복 확인<br>
/chatting : 채팅만을 위한 뷰<br>

##### DB Structure
> SNS
> >users
> > > id (primary) <br>
> > > password <br>
> > > name <br>
> > > phoneNum <br>
> > > email <br>
  
