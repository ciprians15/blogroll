/*
global $
global Articles
global Login
global localStorage
global Article
global getBase64
*/
$(document).ready(onHtmlLoaded);

   
    /*
   function redirectUserToArticlesPage() 
   {
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/article.html ";
   }
    */
    
    function onHtmlLoaded() 
    {
    /*
    $("#save_article").on("click", function(){
        var articleTitle = $("input[name='title']").val();
        var articleContent = $("textarea[name='content']").val();
        var imgFile = $("#article_file")[0].files[0];
        
        var articles = new Articles();
        var saveOperation = articles.save({
            title: articleTitle,
            content: articleContent,
            img: imgFile,
        });
        
        saveOperation.done(redirectUserToArticlesPage);
    });
    */
    document.getElementById("loader").style.display="none";
    document.getElementById("message_btn").addEventListener("click",function()
    {  
    document.getElementById("message").style.display="none";
    });


    var login=new Login("","");
    login.checkLogin(function(){
    if(login.isLogged)
    {addLogOut();
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
    
    function getBase64(file,result) 
    {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
        if (typeof(result)==="function") result(reader.result);
        };
        reader.onerror = function (error) {
        if (typeof(result)==="function") result(null);
        console.log('Error Converting file: ', error);
        };
   }
    
    
    var saveResult=function(succes)
        {
        if(succes) 
        {
            
        document.getElementById("message").style.display="block";
        document.getElementById("message_text").innerHTML="Article saved!";
        document.getElementById("message_btn").addEventListener("click",function()
        {  
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/newArticle.html ";
        });
        }
        
        else  
        {
        document.getElementById("message").style.display="block";
        document.getElementById("message_text").innerHTML="Article not saved!";
        document.getElementById("message_btn").addEventListener("click",function()
        {  
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/newArticle.html ";
        });
        }
        };
    
    function save_article()        
    {
    var localStorageId=null;
    localStorageId=localStorage.getItem("articleId");
    var userId=localStorage.getItem("userId");
    var categoryId=localStorage.getItem("categoryId");
      
      if (localStorageId===null) 
      {
      document.write("Error Saving Article!");
      return;
      }
      
        var array=new Array();
        array.id = localStorageId;
        array.title = document.getElementById("title").value;
        array.category_id = categoryId;
        array.user_id = userId;
        array.content =document.getElementById("content").value;
        array.main_image_url =document.getElementById("article_file").value.replace(/^.*[\\\/]/, '');
        var files=document.getElementById("article_file").files;
        if (files.length>0)
        {
        getBase64(files[0],function(result)
        {
        if (result!==null)
        {
        array.main_image_content=result.replace(/^.*?base64,/,'');
            
            
        //alert(array.main_image_content);
        var article = new Article(array);
        article.save(saveResult);
        }
        });
        }
        else
        {   
        array.main_image_content="";    
        array.main_image_url="";
        var article = new Article(array);
        article.save(saveResult);
        }
  
    }