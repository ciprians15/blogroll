/*global $*/
function SignUp(options) 
{
    this.email = options.email;
    this.pass = options.pass;
    this.first_name = options.first_name;
    this.last_name = options.last_name;
    this.isLogged=false;
    
    this.id=null;

}

SignUp.prototype.signUp = function()
{

     //do the login request to the server
     // prepare the data to send to the server
    var that = this;
    var config = {
        url: "https://web-development-ciprian15.c9users.io/blog/API/signup",
        method: "POST",
        data: JSON.stringify({email: this.email, pass: this.pass, fname:this.first_name, lname:this.last_name}),
        dataType: "json", // expected format for response 
        contentType: 'application/json',// send as JSON
        timeout: 3000,
        success: function(resp)
        {
            if (resp.success) 
            {
                that.isLogged = true;
                that.errorMessage="No error!"; 
                that.id=resp.id;
            
             
                
            }
            
            if (resp.error)
            {
                that.isLogged = false;
                that.errorMessage = resp.error;
                
            }
        },
        error: function(xhr, status, error) 
        {
            alert("Something is wrong " + error);
        },
        complete: function()
        {
            console.log("The request is complete");
        }
    };
    
    // singIn method will return the jqXHR object returned by the ajax request
    
    return $.ajax(config);
    
};

