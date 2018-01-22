<?php
// /articles -> list articles
// /articles/add -> add article

    session_start();
    
    require "configs/config.php";
    require "configs/routes.php";
    
    const BLOG = '/blog/API';
    
    if (!empty($_SERVER['REQUEST_URI'])) 
    {
        $url = $_SERVER['REQUEST_URI'];
        $page = strtolower(str_replace(BLOG,'',$url));
       //  echo  $url;
       
        if (array_key_exists($page, $routes)) 
        {
            
            $class = $routes[$page]["class"]; // "Articles"
            $method = $routes[$page]["method"]; // "getAll"
            $methodReq = $_SERVER["REQUEST_METHOD"];
            // echo  $methodReq;
            switch($methodReq) 
            {
               // case "GET":

                case "POST":
                    $content = file_get_contents("php://input");
                    $data = json_decode($content, true);
                    
                    if ($data) 
                    {
                        $REQUEST = $data;
                    }
                    else unset($REQUEST);
                    break;
                    
                    /*
                case "PUT":
                case "DELETE":
                    $content = file_get_contents("php://input");
                    $data = json_decode($content, true);

                    if ($data) 
                    {
                        $REQUEST = $data;
                    }
                    else 
                    {
                        parse_str($content, $REQUEST);
                    }
                    break;
                    */
                    
                    } 
                    
                    require "controllers/".$class.".php";
            $controller = new $class();
    
            $response = $controller->$method();
         
          //  echo  $response ;
            // RESPONSE FOR JS
            header("Content-Type: application/json");
           
           echo json_encode($response);
  
        } 
        else 
        {
            http_response_code(404); 
            echo "Page not found.";        
        }
    }
    else 
    {
        http_response_code(403);  
        echo "Access Forbidden.";
    }

    // require "controllers/Articles.php";
    // $articles = new Articles();
    // // LIST ARTICLES
    // $list = $articles->getAll();
    // print_r($list);
    
    // // ADD ARTICLE
    // $create = $articles->createItem();
    // echo "CREATE ARTICLE " . $create;
    
    // require "controllers/Comments.php";
    // $comments = new Comments();
    // $list = $comments->getAll();
    // print_r($list);
    