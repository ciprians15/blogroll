<?php

require_once"./models/CategoriesModel.php";
class Categories
{
    private $categoriesModel;
      function __construct() 
        {
            $this->categoriesModel = new CategoriesModel();   
        }
        
    
    function getAll()
    {
           global $REQUEST;
           if(!isset($REQUEST))
              $data=$this->categoriesModel->selectAll();
              else
              $data=$this->categoriesModel->getItemById($REQUEST['id']);
            
            return $data;
    }
}