/* 
global $
global Comment
*/
function Comments(options)
{
   
   this.commentsArticle= [];
   this.id = options;
    
}

   Comments.prototype.load = function(callback)
   {
   	var that=this;
   	var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/comments",
		method: "POST",
		dataType: "json", // expected format for response //am adaugat text si acum se vede requestul!
        contentType: 'application/json',// send as JSON
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		data:"{\"id\":\""+this.id+"\"}",
		
	
		success: function(resp) 
		{
			for (var i=0; i<resp.length; i++) 
			{
				var comment = new Comment(resp[i]);
				that.commentsArticle.push(comment);
			}
		
		    console.log("all good");
		// alert(resp);
		   callback();
		},
		error: function() 
		{
			console.log("Comments was not added");
		}
	};
	return $.ajax(config);
   	
   };


