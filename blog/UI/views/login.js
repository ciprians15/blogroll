/*global $
  global Login
  global localStorage
  global admin
  */
$(document).ready(onHtmlLoaded);

    function onHtmlLoaded() 
    {
    document.getElementById("message_btn").addEventListener("click",function()
    {  
    document.getElementById("message").style.display="none";
    });

    var loginBtn = $("#login_btn");
    var loginModel;

    loginBtn.on("click", function(ev) 
    {
        ev.preventDefault();
        var emailValue = $("[name='user_email']").val().trim();
        var passValue = $("[name='user_password']").val().trim();
        
        document.getElementById("in1").style.border="none";
        document.getElementById("in2").style.border="none";
        // alert((emailValue.length-emailValue.indexOf(".",emailValue)));
        var ok=true;
        if(emailValue==="" || emailValue.length<5 || emailValue.indexOf("@")<3 || 
        emailValue.indexOf(".")===-1 || (emailValue.length-emailValue.indexOf(".",emailValue))<4)
        {
        document.getElementById("in1").style.border="2px solid red";
        ok=false;
        }
        if(passValue === "")
        {
        document.getElementById("in2").style.border="2px solid red";
        ok=false;
        }
        
        if(!ok)  
        {
        document.getElementById("message").style.display="block";
        document.getElementById("message_text").innerHTML="Error in email field or password field!\nPlease check.";
        return;
        }
         
        loginModel = new Login({
        email: emailValue,
        pass: passValue
        });
        
        var loginReq = loginModel.signIn(function(result)
        {
            if (result==true)
            {
            
            localStorage.setItem("admin",loginModel.userIsAdmin);    
            localStorage.setItem("userId",loginModel.userId); 
            localStorage.setItem("name",loginModel.name); 
                
            }
            else
            {
            document.getElementById("message").style.display="block";
            document.getElementById("message_text").innerHTML="Login Error!";
               
            }

        });
        
        loginReq.done(redirectUserToArticlesPage);
    
    //modific dinamic meniul pt admin
    if (admin==="true")
    {
        $(".adminMenuItem").removeClass("adminMenuItem").css("display","block");
    }
    });
    function redirectUserToArticlesPage() 
    {
        //alert(loginModel.email);
        if (loginModel.isLogged) 
        {
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/index.html ";
        } 
    }
    
    }