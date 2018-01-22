/* 
global $
global Contact 
global Login
global localStorage
global admin
*/
$(document).ready(onHtmlLoaded);
    function onHtmlLoaded()
    {
    
    document.getElementById("loader").style.display="none";
    document.getElementById("message_btn").addEventListener("click",function()
    {  
    document.getElementById("message").style.display="none";
    
    });
    
    function submit()
    {
    var name = document.getElementById("contactName").value;
    var email = document.getElementById("contactEmail").value;
    var subject = document.getElementById("contactSubject").value;
    var message = document.getElementById("contactMessage").value;
        
    if (name==="" || email===""||subject===""||message==="")
        
    {
    document.getElementById("message").style.display="block";
    document.getElementById("message_text").innerHTML="All fields are required!";
    document.getElementById("message_btn").addEventListener("click",function()
    {  
    window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/contact.html ";
    });
    }
        
    else
    {
    var array= new Array();
    array.name=name;
    array.email=email;
    array.subject=subject;
    array.message=message;
    var contact= new Contact(array);
    contact.save(function(ok)
    {
    if (ok) 
    {
    
    document.getElementById("message").style.display="block";
    document.getElementById("message_text").innerHTML="Contact data saved!";
    document.getElementById("message_btn").addEventListener("click",function()
    {  
    window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/contact.html ";
    });
    } 
    else 
    {
    document.getElementById("message").style.display="block";
    document.getElementById("message_text").innerHTML="Error saving contact data!";
    document.getElementById("message_btn").addEventListener("click",function()
    {  
    window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/contact.html ";
    });
    }
    });
    }
    
    //modific dinamic meniul pt admin
    
    if (admin==="true")
    {
        $(".adminMenuItem").removeClass("adminMenuItem").css("display","block");
   
    }
    }
    document.getElementById("contactSubmit").addEventListener("click", submit);
    
    var login=new Login("","");
    login.checkLogin(function()
    {
    if(login.isLogged)
    {
    addLogOut();
    }  
    else 
    afterLogOut();
    });

    }
 
    function afterLogOut()
    {
    var mainLoginField=document.getElementById("mainLoginField");
    mainLoginField.style.display="none";
    }

    function addLogOut()
    {
    var mainLoginField=document.getElementById("mainLoginField");
    mainLoginField.style.display="inline";
    
    var userNameField=document.getElementById("welcomeName");
    userNameField.innerHTML=localStorage.getItem("name");
    var logOutButton=document.getElementById("logOut");
    logOutButton.addEventListener("click",function()
    {
    var login= new Login();
    login.signOut(function(result)
    {
        if (result) 
        {
        document.getElementById("message").style.display="block";
        document.getElementById("message_text").innerHTML="You have been succesfully logout!";
       
        document.getElementById("message_btn").addEventListener("click",function()
        {  
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/login.html ";
        });
        
        }
        else
        {
        document.getElementById("message").style.display="block";
        document.getElementById("message_text").innerHTML="Logout Error!"; 
        document.getElementById("message_btn").addEventListener("click",function()
        { 
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/index.html ";
        });
        }
        
    });
        
    });
    }