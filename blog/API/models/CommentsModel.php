<?php
require_once "DB.php";

class CommentsModel extends DB 
{
    
    function selectAll()
    {
        
    $sql = 'select * from comments';
    return $this->selectSql($sql);
    
    }  
    
    function selectCommentsByArticleId($id)
    { 
        
    $sql = 'SELECT comments.title,comments.content,comments.creation_date,users.id,users.first_name,users.last_name FROM comments,users WHERE comments.user_id=users.id AND comments.article_id='.$id;

    return $this->selectSql($sql);
    
    
    }  
    
     function insertItem($item) 
    {
 
        $creation_date=date('d/m/y H:i');
   
      
        $sql = 'insert into comments (title, content, user_id, article_id,creation_date) values( ?, ?, ?, ?, ?)';
       
        $stmt = $this->dbh->prepare($sql);

        $stmt->execute(array($item['title'],$item['content'], $item['user_id'], $item['article_id'],$creation_date));
                             
                   
        return   $stmt->errorInfo();         
    }
}