/* global Article 
global $
global localStorage
*/
function Articles()
{
	this.models = [];
}

Articles.prototype.findArticleById = function(id) 
{
	var result;
	for (var i=0; i<this.models.length; i++) 
	{
		if (this.models[i].id == id) 
		{
			result = this.models[i];
		}
	}
	return result;
};


Articles.prototype.getAll = function(callback) 
{
	//get all article items from server/localStorage
	/* 
	 var articlesStr = localStorage.getItem("articles");
	 alert(articlesStr );
	 var articles = JSON.parse(articlesStr);
	 if (articles) {
	 	for (var i=0; i<articles.length; i++) {
	 		var article = new Article(articles[i]);
	 		this.models.push(article);
	 	}

	 	//console.log(articles);
	 	//console.log(this.models);
	 }
	 */
	var that = this;
	var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/articles",
		method: "GET",
		dataType: "json", // expected format for response //am adaugat txt si acum se vede requestul!
        contentType: 'application/json',// send as JSON
		
		
		success: function(resp) {

			for (var i=0; i<resp.length; i++) 
			{ 
				var article = new Article(resp[i]);
				that.models.push(article);
			}
		
		callback(that.models);	

		},
		error: function()
		{
			console.log("Something went wrong while getting the articles");
		}
	};
	return $.ajax(config);
	
};

Articles.prototype.removeArticle = function(articleId) 
{
	//here we will search for article model by id
	//and we remove it from models array and from 
	//server/localStorage
};

