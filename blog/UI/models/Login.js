/*global $*/
function Login(options) 
{
    if (typeof(options)!="undefined")
    {
    this.email = options.email;
    this.pass = options.pass;
    this.isLogged=false;
    this.userId=null;
    this.name=null;
    this.userIsAdmin=false;
    }
}

Login.prototype.signIn = function(callback)
{
    /*
     var userData = {
         email:this.email,
         pass: this.pass
     };
     var req = new XMLHttpRequest();
     req.open("POST","https://web-development-ciprian15.c9users.io/blog/API/login");
     req.setRequestHeader("Content-type","application/json");

     // convert to string the data before sending it to the server
     var strUserData = JSON.stringify(userData);
     // send the request to the server with the stringified data
     req.send(strUserData);
     */
     
     //do the login request to the server
     // prepare the data to send to the server
    var that = this;
    var config = {
        url: "https://web-development-ciprian15.c9users.io/blog/API/Login",
        method: "POST",
        data: JSON.stringify({email: this.email, pass: this.pass}),
        dataType: "json", // expected format for response 
        contentType: 'application/json',// send as JSON
        timeout: 3000,
        success: function(resp)
        {
            if (resp.success) 
            {
                that.isLogged = true;
                that.userId=resp.id;
                that.name=resp.name;
                that.userIsAdmin=resp.admin;
              if (typeof(callback)==="function")  callback(true);
            }
            
            if (resp.error)
            {
            
                that.isLogged = false;
                that.errorMessage = resp.error;
              if (typeof(callback)==="function")  callback(false);
            }
        },
        error: function(xhr, status, error) 
        {
             console.log("Something is wrong " + error);
           
        },
        complete: function()
        {
            console.log("The request is complete");
        }
    };
    
    // singIn method will return the jqXHR object returned by the ajax request
    
    return $.ajax(config);
    
};

Login.prototype.checkLogin=function (callBack)
{
      var that = this;
    var config = {
        url: "https://web-development-ciprian15.c9users.io/blog/API/checkLogin",
        method: "Get",
        timeout: 3000,
        dataType: "json", // expected format for response
       
        success: function(resp)
        {
           that.isLogged=resp;
           callBack();
        },
        error: function(xhr, status, error) 
        {
            alert("Something is wrong " + error);
            that.isLogged=false;
            callBack();    
        },
        complete: function()
        {
            console.log("The request is complete");
        }
        };
        
    $.ajax(config);
};
Login.prototype.signOut = function(callback)
{
    var that = this;
    var config = {
        url: "https://web-development-ciprian15.c9users.io/blog/API/Logout",
        method: "POST",
        data: null,
        dataType: "json", // expected format for response 
        contentType: 'application/json',// send as JSON
        timeout: 3000,
        success: function(resp)
        {
           
            
                that.isLogged = false;
                that.userId=null;
                that.name=null;
               callback(true);
            
            
        },
        error: function(xhr, status, error) 
        {
             console.log("Something is wrong " + error);
             callback(false);
           
        },
        complete: function()
        {
            console.log("The request is complete");
        }
    };
    
    // singIn method will return the jqXHR object returned by the ajax request
    
    return $.ajax(config);
    
};