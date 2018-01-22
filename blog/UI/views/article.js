/*global $*/
/*global Article
  global Articles
  global localStorage
  global Comments
  global Comment
  global Login
  global Categories
  */
  
    function checkLogin() 
    {
    var login=new Login("","");
    login.checkLogin(function()
    {
    if(!login.isLogged) 
        window.location.href="https://web-development-ciprian15.c9users.io/blog/UI/pages/login.html";
    });
    }  
  
    checkLogin(); 

    function appendCategory(title,category_id)
    {
    var parent= document.getElementById("categoriesContainer") ;
    var element=document.createElement("LI");
    element.setAttribute("id","\""+category_id+"\"");
    
    element.innerHTML=""+ " <a href=\"#\"> "+title+"</a>";
                 
    parent.appendChild(element);
    }
    
    
    function appendCategories()
    {
    var cat= new Categories();
    cat.load(function (categ) 
    {
    // document.getElementById("loader").style.display="none";

    for (var i=0;i<categ.categories.length;i++)
    {
    appendCategory(categ.categories[i].name,categ.categories[i].id);
    } 
    
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
  
    function save_article()        
    {
    var localStorageId=null;
    localStorageId=localStorage.getItem("articleId");
    var userId=localStorage.getItem("userId");
      
    if (localStorageId===null) 
    {
    document.write("Error Saving Article!");
    return;
    }
      
    var array=new Array();
    array.id = localStorageId;
    //se inlocuiesc valorile puse aici cu valorile obtinute din campurile editabile din html in cazul in care userul logat este administrator
        
    array.title = "ArticolM3";
    array.category_id = 2;
    array.user_id = userId;
    array.content =document.getElementById("content").value;
    array.main_image_url ="img_articol2";
    array.date =  new Date();
     
    var article = new Article(array);
        
    article.save();
    }
    
    function loadComments()
    {
    var localStorageId=null;
    var  articleId=localStorage.getItem("articleId");
    var userId=localStorage.getItem("userId");
      
    if (articleId===null || userId===null) 
    {
    document.write("Error Loading Comments!");
    return;
    }
    document.getElementById("commentcontainer").innerHTML="";
      
    var comments= new Comments(articleId);
    comments.load(function()
    {
    // for pentru fiecare comment din arrayul de commentsArticle.
    // alert(comments.commentsArticle[0].title);
    for(var i=0;i<comments.commentsArticle.length;i++)
    appendComment(comments.commentsArticle[i].title,comments.commentsArticle[i].content,
    comments.commentsArticle[i].name,comments.commentsArticle[i].date);
    document.getElementById("loader").style.display="none";
    document.getElementById("buttonComment").addEventListener("click",saveComment);
       
    //modific dinamic meniul pt admin
    var admin=localStorage.getItem("admin");
        
    if (admin==="true")
    {
        $(".adminMenuItem").removeClass("adminMenuItem").css("display","block");
    }

    });
    }
    
    function saveComment()
    {
    var localStorageId=null;
    var articleId=localStorage.getItem("articleId");
    var userId=localStorage.getItem("userId");
     
    if (articleId===null || userId===null) 
    {
    document.write("Error Saving Comment!");
    return;
    }
    document.getElementById("loader").style.display="block";
    
    var array=new Array();
    array.article_id = articleId;
    array.title=document.getElementById("commentTitle").value;
    array.content=document.getElementById("commentText").value;
    array.user_id=userId;

    var comment= new Comment(array);
    comment.save(function(succes){
    //  alert(succes);
        if (succes)
        {
        loadComments();
        }
        });

    }

    function appendComment(title,content,author,date)
    {
    var parent= document.getElementById("commentcontainer") ;
    
    var element=document.createElement("DIV");
    element.innerHTML="<div class=\"media\">"+
                        "<a class=\"pull-left\" href=\"#\"><img class=\"media-object\" src=\"https://upthemes.com/wp-content/uploads/2016/05/avatar-100x100.png\" alt=\"\"></a>"+
                        "<div class=\"media-body\">"+
                        "<h4 class=\"media-heading\">"+title+
                        "&nbsp<small>"+date+""+
                        "&nbsp by</small>&nbsp"+author+"</h4>"+content+
                        "</div>"+"</div>";
                        
    var elementhr=document.createElement("HR");
    parent.appendChild(element);
    parent.appendChild(elementhr);
    }
    

    function loadArticle()
    {
    //get id from local storage
    var localStorageId=null;
    localStorageId=localStorage.getItem("articleId");

    if (localStorageId===null) 
    {
    document.write("Error Loading article!");
    return;
    }
      
    var article= new Article(localStorageId);
    article.load(function()
    {
    //alert(article.title); 
    //alert( document.getElementById("art_title"));
    document.getElementById("art_title").innerHTML=article.title;
    document.getElementById("art_author").innerHTML=article.author;
    document.getElementById("art_date").innerHTML=article.date;
    document.getElementById("art_image").src="../css/img/"+article.main_image_url;
    document.getElementById("art_content").innerHTML=article.content;
    // localStorage.setItem("userId",article.user_id);
    localStorage.setItem("categoryId",article.category_id);

    });
    }
    
    function appendArticle(title,image,content,article_id)
    {
    var parent= document.getElementById("articlecontainer") ;
    var element=document.createElement("DIV");
    element.setAttribute("class","col-sm-6 col-md-4 articlecls");
    
    element.innerHTML=""+
                    " <div class=\"thumbnail\" id=\"thumb\"> "+
                    " <img src=\""+image+" \" alt=\"...\"> "+
                    " <div class=\"caption\"> " +                           
                    " <a class=\"article_link\"  id=\""+article_id+"\" href=\"#\"><h1 id=\"h1-titlePost\">"+title+"</h1></a>"+
                    " <p>"+content+"</p>   "+
                    " <p><a href=\"#\" class=\"btn btn-primary\" role=\"button\">Edit</a> "+ 
                    " <a href=\"#\" class=\"btn btn-default\" role=\"button\">Delete</a></p> "+
                    " </div></div>";

    parent.appendChild(element);
    }
    

    $(document).ready(function()
    {
    //  document.getElementById("loader").style.display="block";

    loadArticle(); loadComments();  appendCategories();

    var login=new Login("","");
    
    login.checkLogin(function(){
    if(login.isLogged)
    {addLogOut();
    }  
    else 
    afterLogOut();
    });
    
    });
