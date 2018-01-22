<?php
    require "./models/UsersModel.php";
    
    class Account 
    {
        private $usersModel;
           
        function __construct()
        {
          $this->usersModel =  new UsersModel();
        }
        
        function login() 
        {
            global $REQUEST;
           // $JSON_raw = file_get_contents('php://input'); // raw request
           // $JSON_request = json_decode($JSON_raw, true); // decoded request
           // var_dump( $JSON_request);
           // var_dump($REQUEST);
            
            if (!isset($REQUEST)) return; // if request empty
            
            if (empty($REQUEST["email"]) || empty($REQUEST["pass"]))
            {
                return (array("error" => "Empty credentials.")); 
            }
            
            $email = $REQUEST["email"];
            $password = $REQUEST["pass"]; // crypt($JSON_request["pass"])
              
            $userExists = $this->usersModel->checkUser($email, $password);

            if ($userExists) 
            {
                // get profile data
                $profile =  $this->usersModel->getProfileByEmail($email);
                
                // set sessions
                $_SESSION["isLogged"] = TRUE;
                
                return (array("success" => "You have been successfully logged in !","id"=> $profile["id"],"name"=>($profile["first_name"]." ".$profile["last_name"]),"admin"=>($profile["role"]=="admin")?true:false)); //add user id
            } 
            else return((array("error" => "Invalid credentials.")));
        }
        
        
        function logout() 
        {
            unset($_SESSION["isLogged"]);
            unset($_SESSION["first_name"]);
            unset($_SESSION["last_name"]);
            session_destroy();
            return (array("success"=>TRUE));
        }
        
        
        function checkLogin()
        {
            
            if (isset($_SESSION["isLogged"])&& ($_SESSION["isLogged"]==true)) return true;
            return false;
        }
        
        function signUp()
        {
            global $REQUEST;
       
            if($this->checkLogin())
            {
                $this->logout();
            }
            
            if(empty($REQUEST["email"]) || empty($REQUEST["pass"]) || empty($REQUEST["fname"]) || empty($REQUEST["lname"]))
            {
                return array("error" => "Empty credentials."); 
            }
            
            $email = $REQUEST["email"];
            $pass =  $REQUEST["pass"];
            $fname = $REQUEST["fname"];
            $lname = $REQUEST["lname"];
            
           
           if($this->usersModel->getProfileByEmail($email))
           {
                return array("error" => "Duplicate email!");
           }
           else
           {
              if ($this->usersModel->save_user($email,$pass,$lname,$fname))
              {
                $_SESSION["isLogged"] = TRUE;
                $_SESSION["first_name"] = $fname;
                $_SESSION["last_name"] = $lname; 
                $profile =  $this->usersModel->getProfileByEmail($email);
                return array("success" => "User sign up!","id"=> $profile["id"]);
              }
              else
              return array("error" => "Database Error!"); 
           }
        }
    }