/* 
global $
*/
function Article(options)
{
    if (typeof(options)==="object")
    {
    this.id = options.id;
    this.title = options.title;
    this.category_id = options.category_id || 1;
    this.user_id = options.user_id || 1;
    this.content = options.content;
    this.main_image_url = options.main_image_url;
    this.date = options.date || new Date();
    this.main_image_content=options.main_image_content;
    }
    else
   this.id = options;
}

   Article.prototype.load = function(callback)
   {
   		var that=this;
   		var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/articles",
		method: "POST",
		dataType: "json", // expected format for response //am adaugat text si acum se vede requestul!
        contentType: 'application/json',// send as JSON
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		data:"{\"id\":\""+this.id+"\"}",
		
	
		success: function(resp) 
		{
		//	alert(resp);
		
			that.author = resp.first_name+" "+resp.last_name;
			that.title = resp.title;
			that.category_id = resp.category_id;
			that.user_id = resp.user_id;
			that.category_name= resp.category_name;
			that.content = resp.content;
			that.main_image_url = resp.main_image_url;
			that.date = resp.creation_date;
		    console.log("all good");
	
		   callback();
		},
		error: function() 
		{
			console.log("article was not added");
		}
	};
	return $.ajax(config);
   	
   };

   Article.prototype.save = function(callback) 
   {


	
	var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/articles/add",
		method: "POST",
		dataType: "json", // expected format for response //am adaugat text si acum se vede requestul!
        contentType: 'application/json',// send as JSON
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		data:JSON.stringify(this),
	
		success: function(resp) 
		{
	
		
			if(typeof(callback)==="function")
			{
				if (resp!==0)
				callback(true);
				else 
				callback(false);
			}
			console.log("all good");
		},
		error: function() 
		{
			if(typeof(callback)==="function")	callback(false);
			console.log("article was not added");
		}
	};
	//alert(config.data);
	return $.ajax(config);
};


Article.prototype.delete= function(callback) 
   {


	
	var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/articles/delete",
		method: "POST",
		dataType: "json", // expected format for response //am adaugat text si acum se vede requestul!
        contentType: 'application/json',// send as JSON
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		data:"{\"id\":\""+this.id+"\"}",
	
		success: function(resp) 
		{
	
		
			if(typeof(callback)==="function")
			{
				if (resp!==0)
				callback(true);
				else 
				callback(false);
			}
			console.log("all good");
		},
		error: function() 
		{
			if(typeof(callback)==="function")	callback(false);
			console.log("article was not deleted");
		}
	};
	//alert(config.data);
	return $.ajax(config);
};
