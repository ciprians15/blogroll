/* 
global $
*/
function Comment(options)
{
    this.title = options.title;
    this.user_id = options.user_id;
    this.content = options.content;
    this.article_id=options.article_id;
    this.date = options.creation_date;

    this.name=options.first_name+" "+options.last_name;
    
}

   Comment.prototype.save = function(callback) 
   {

	var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/Comments/add",
		method: "POST",
		dataType: "json", // expected format for response //am adaugat text si acum se vede requestul!
        contentType: 'application/json',// send as JSON
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		data:JSON.stringify(this),
	
		success: function(resp) 
		{
	            
	   if (typeof(callback)==="function")  callback(true);
			console.log("all good comment request");
		},
		error: function() 
		{
		if (typeof(callback)==="function")	callback(false);
			console.log("Comment was not added");
		}
	};
	//alert(config.data);
	return $.ajax(config);
};
