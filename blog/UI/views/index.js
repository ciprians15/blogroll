/*
global Articles
global Article
global localStorage
global Login
global $
*/
    function appendArticle(title,image,content,article_id,admin)
    {
    var parent= document.getElementById("articlecontainer") ;
    var element=document.createElement("DIV");
    element.setAttribute("class","col-sm-12 articlecls");
 
    if(content.length > 50)
    {
        for(var i=49;i<content.length;i++)
        {
            if(content[i] === " ")
            {
                content=content.slice(0,i)+" ... ";
              
                break;
            }
        }
        
    if(content.length > 70)
    {
                content=content.slice(0,69)+" ... ";
    }
    }
    
    if(title.length > 30)
    {
        for(var i=29;i<title.length;i++)
        {
            if(title[i] === " ")
            {
                title=title.slice(0,i)+" ... ";
              
                break;
            }
        }
        
    if(title.length > 40)
    {
                title=title.slice(0,39)+" ... ";
    }
      
    }    
    var thtml=" <div class=\"thumbnail\" id=\"thumb\"> "+
                    "<img src=\""+image+" \" alt=\"...\"> "+
                    "<div class=\"caption\"> " +                           
                    "<a class=\"article_link\"  id=\""+article_id+"\" href=\"#\"><h1 id=\"h1-titlePost\">"+title+"</h1></a>"+
                    "<p>"+content+"</p>   "+
                    "<p>";
               
                
                
                if (admin==="true")
                {
                    thtml+="<a href=\"#\" class=\"btn btn-primary article-edit\" role=\"button\" id=\""+article_id+"\">Edit</a> ";
                    thtml+= "<a href=\"#\" class=\"btn btn-default article-delete\" role=\"button\" id=\""+article_id+"\">Delete</a>";
                }
                thtml+= "</p> " + " </div></div>";
                //alert( thtml);
                element.innerHTML=thtml;
                    
    
    parent.appendChild(element);
        
    }
    
    function appendArticles()
    {
        
    var admin=localStorage.getItem("admin");
    var articles= new Articles() ;
    
    articles.getAll( function (articlel) 
    {
    for (var i=0;i<articlel.length;i++)
    {
    appendArticle(articlel[i].title,"../css/img/"+articlel[i].main_image_url,articlel[i].content,articlel[i].id,admin);
    //alert(articlel[i].title+" "+ articlel[i].main_image_url);
    }    
    //in pagina index.html fiecare articol are un link care  trimite la un js ce va redirecta in pagina de articol
    //si apoi o va completa pe aceasta cu informatiile reobtinute din baza de date pentru articolul cu id curent.
    atachArticleRedirect();
    
    //modific dinamic meniul pt admin
    if (admin==="true")
    {
        $(".adminMenuItem").removeClass("adminMenuItem").css("display","block");
    }
    
    //dispare loader
    document.getElementById("loader").style.display="none";
    }
    );

    }
    
    function redirectArticle()
    {
        localStorage.setItem("articleId",this.id);
        window.location.href = "https://web-development-ciprian15.c9users.io/blog/UI/pages/article.html ";
    }
      
    function editArticle()
    {
       //alert(this.id);
    }
      
    function deleteArticle()
    {
        var art=new Article(this.id);
        art.delete(function(result)
        {
        if (result)    
        {
            window.location.reload();
        }
        });
    }
    
    
    function atachArticleRedirect()
    {
       
       var links=document.getElementsByClassName("article_link"); 
       //  alert(links.length);
       for ( var i=0;i<links.length;i++) 
       {
           //links[i].setAttribute("href",  links[i].getAttribute("id"));
           links[i].addEventListener("click",redirectArticle);
           
          //   links[i].id=links[i].id;
       }
        var edits=document.getElementsByClassName("article-edit"); 
        var delets=document.getElementsByClassName("article-delete"); 
        
        for ( var i=0;i<edits.length;i++) 
        {
          
           edits[i].addEventListener("click",editArticle);
         
        }
       
        for ( var i=0;i<delets.length;i++) 
        {
          
          delets[i].addEventListener("click",deleteArticle);
         
        }
  
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
    logOutButton.addEventListener("click",function(){
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
   
    $(document).ready(function()
    {
    appendArticles(); 
    var login=new Login("","");
    login.checkLogin(function(){
    if(login.isLogged)
    {addLogOut();
    }  
    else 
    afterLogOut();
    });
    
    });
   
    

