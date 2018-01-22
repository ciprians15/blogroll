<?php
    require "./models/CommentsModel.php";
    
    class Comments 
    {
        function getAllById() 
        {
           global $REQUEST;
       
            $commentsModel = new CommentsModel();
           if (empty($REQUEST))
            return $commentsModel->selectAll();
            else 
            return $commentsModel->selectCommentsByArticleId($REQUEST['id']);
        }
        
        function createItem() 
        {
            global $REQUEST;
         //   var_dump($REQUEST);
            $commentsModel = new CommentsModel();
            return $commentsModel->insertItem($REQUEST);    
        }
    }