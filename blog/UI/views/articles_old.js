/*global $*/
/*global Article
  global Articles
  global localStorage
  */
$(document).ready(onHtmlLoaded);
//always check if HTML is loaded before doing anything
//HTML operations on view

function addMockedData() 
{
		var articles = [{
			title:"Title1",
			content:"Content1",
			id:1
		},{
			title:"Title2",
			content:"Content2",
			id:2
		},{
			title:"Title3",
			content:"Content3",
			id:3
		},{
			title:"Title4",
			content:"Content4",
			id:4
		},{
			title:"Title5",
			content:"Content5",
			id:5
		}];

		var stringifiedData = JSON.stringify(articles);
		localStorage.setItem("articles",stringifiedData);
}
addMockedData();

function onHtmlLoaded() {
	var articles = new Articles();
	articles.getAll().done(function()
	{
		var container = $("#container");
		for(var i = 0; i<articles.models.length; i++) 
		{
			var articleElem = $("<li data-value="+articles.models[i].id+"></li>");
			articleElem.html(articles.models[i].title);
			if (articles.models[i].main_image_url) 
			{
				articleElem.append($("<img src='../../../curs21-PHP-API/uploads/" + articles.models[i].main_image_url + "' >"));
			}
			articleElem.on("click", goToArticlePage);
			container.append(articleElem);
		}	
	});
}

function goToArticlePage() {
	var currentArticleId = $(this).attr("data-value");
	window.location.href = "https://web-development-ciprian15.c9users.io/blog/blog/API/article.html?id="+currentArticleId;
}