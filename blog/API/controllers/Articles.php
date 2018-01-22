<?php
    require "./models/ArticlesModel.php";
    
    class Articles 
    {
        private $articlesModel;
        
        function __construct() 
        {
            $this->articlesModel = new ArticlesModel();   
        }
        
        function getAll()
        {
               global $REQUEST;
                 
              if(!isset($REQUEST))
              $data=$this->articlesModel->selectAll();
              else
              $data=$this->articlesModel->getItemById($REQUEST['id']);
            
              return $data;
        }
        
        function getByKeyword()
        {
             
               global $REQUEST;
               $data=$this->articlesModel->selectByContent($REQUEST['searchKeyword']);
               return $data;
               
        }
        
        function createItem() 
        {
             global $REQUEST;
            if(!isset($_SESSION["isLogged"]) || $_SESSION["isLogged"] !== TRUE)
            {
                http_response_code(401);
                return array("error" => "Unauthorized. You have to be logged.");
            }
            
           // var_dump($REQUEST);
            
            if (!empty($REQUEST['title']) && !empty($REQUEST['content']) && !empty($REQUEST['category_id'])  && !empty($REQUEST['user_id']) ) 
            {

                // $REQUEST['main_image_url'] = '';
                
                if (!empty($REQUEST['main_image_url']) && !empty($REQUEST['main_image_content']))
                {
                    $file = $REQUEST['main_image_url'];
                    $content=$REQUEST['main_image_content'];
                   // print_r ($file);
                    
                      //move_uploaded_file($file["tmp_name"], "uploads/" . $file["name"]);
                      $myfile = fopen("/home/ubuntu/workspace/blog/blog/UI/css/img/" .$file, "w");
                      fwrite($myfile, base64_decode($content));
                      fclose($myfile);
                    
                }
                return $this->articlesModel->insertItem($REQUEST);
            } 
            else 
            {
                return 0;
            }
        }
        function editItem() 
        {
        
            global $REQUEST;
           //     var_dump($REQUEST);
            return $this->articlesModel->updateItem($REQUEST);
        }
        
        function deleteItem() 
        {
            global $REQUEST;
            return $this->articlesModel->deleteItem($REQUEST['id']);
        }

    }

    