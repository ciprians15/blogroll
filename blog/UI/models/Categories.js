/*
global Category,$
*/
function Categories(options)
{
   
   this.categories=[];
   
    
}

   Categories.prototype.load = function(callback)
   {
   	var that=this;
   	var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/categories",
		method: "GET",
		dataType: "json", // expected format for response //am adaugat text si acum se vede requestul!
       

		
	
		success: function(resp) 
		{
			for (var i=0; i<resp.length; i++) 
			{
				var category = new Category(resp[i]);
				that.categories.push(category);
			
			}
		
		    console.log("all good");
		// alert(resp);
		   callback(that);
		},
		error: function() 
		{
			console.log("Categories was not added");
		}
	};
	return $.ajax(config);
   	
   };