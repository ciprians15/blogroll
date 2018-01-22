/*
global Categories,$

*/
    function appendCategory(title,category_id)
    {
    var parent= document.getElementById("categoriesContainer") ;
    var element=document.createElement("LI");
    element.setAttribute("id","\""+category_id+"\"");
    
    element.innerHTML=""+
                    " <a href=\"#\"> "+title+"</a>";
                 
                    parent.appendChild(element);
    }
    
    function appendCategories()
    {

    var cat= new Categories() ;
    
    cat.load( function (categ) 
    {
    for (var i=0;i<categ.categories.length;i++)
    {
    appendCategory(categ.categories[i].name,categ.categories[i].id);
    } 
    });
    }
 
    // atachArticleRedirect();
    
    $(document).ready(function()
    {
    appendCategories();
    });