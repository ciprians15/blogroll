/* 
global $
*/

function Contact(options)
{
    this.name = options.name;
    this.email = options.email;
    this.subject = options.subject;
    this.message = options.message;

}

Contact.prototype.save = function(callback) 
   {

	var config = {
		url: "https://web-development-ciprian15.c9users.io/blog/API/subscription/add",
		method: "POST",
		dataType: "json", // expected format for response //am adaugat text si acum se vede requestul!
        contentType: 'application/json',// send as JSON
		processData:false,        // To send DOMDocument or non processed data file it is set to false
		data:JSON.stringify(this),
	
		success: function(resp) 
		{
		//	alert(resp);
			console.log("all good");
			
			callback(resp);
		},
		error: function() 
		{
			callback(false);
			console.log("subscription was not added");
		}
	};
	//alert(config.data);
	return $.ajax(config);
};