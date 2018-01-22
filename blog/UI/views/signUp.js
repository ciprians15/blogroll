/*global $
  global SignUp
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
    
    var signUpBtn = $("#signup_btn");
    var signupModel;
    signUpBtn.on("click", function(ev) 
    {
        ev.preventDefault();
        var emailValue = $("[id='user_email']").val();
        var passValue = $("[id='user_password']").val();
        var firstName = $("[id='firstName']").val();
        var lastName = $("[id='lastName']").val();
        
        signupModel = new SignUp({
            email: emailValue,
            pass: passValue,
            first_name:firstName,
            last_name:lastName
        });
        var signupresult= signupModel.signUp();
        signupresult.done(redirectUserToArticlesPage);
        
    //modific dinamic meniul pt admin
    /*
    if (admin==="true")
    {
        $(".adminMenuItem").removeClass("adminMenuItem").css("display","block");
    }
    */
     
    });
    function redirectUserToArticlesPage() 
    {
        //alert(loginModel.email);
        if (signupModel.isLogged) 
        {
        localStorage.setItem("admin","false");
        localStorage.setItem("userId",signupModel.id);
        localStorage.setItem("name",signupModel.last_name+" "+signupModel.first_name);
        
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/index.html ";
        } 
        else 
        {
        document.getElementById("message").style.display="block";
        document.getElementById("message_text").innerHTML="SignUp Error!";
        }
    }

    }