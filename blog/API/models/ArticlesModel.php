<?php
require_once "DB.php";

class ArticlesModel extends DB 
{
    function selectAll() 
    {
        $sql = 'select * from articles';
         
        return $this->selectSql($sql);
    }
    
    function insertItem($item) 
    {
        $sql = 'insert into articles (title, content, category_id, user_id, main_image_url) values(?, ?, ?, ?, ?)';

        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($item['title'], 
                             $item['content'], 
                             $item['category_id'], 
                             $item['user_id'],
                             $item['main_image_url']));
        
        return  $this->dbh->lastInsertId() ;
    }
    
    function updateItem($item) 
    {
        $sql = 'update articles set title = ?, content = ?, category_id = ?,main_image_url=?  where id = ?';
        $stmt = $this->dbh->prepare($sql);
  
        $stmt->execute(array($item['title'], 
                             $item['content'], 
                             $item['category_id'],
                             $item['main_image_url'],
                             $item['id']));
        return $stmt->rowCount();
        
    }
    
    function deleteItem($id) 
    {
        $sql = "delete from articles where id = ?";
        
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($id));
        return $stmt->rowCount(); 
    }
    
    function getItemById($id)
    {
       
        $sql= "SELECT articles.title,articles.content,articles.main_image_url,articles.creation_date,articles.user_id,articles.category_id,
               users.first_name,users.last_name,category.name AS category_name FROM articles,users,category 
               WHERE articles.id=? AND articles.user_id=users.id AND articles.category_id=category.id LIMIT 1";
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($id));
      // var_dump($stmt->fetchAll(PDO::FETCH_CLASS)[0]);
        return ($stmt->fetchAll(PDO::FETCH_CLASS)[0]);
    }
    
    function selectByContent($content)
    {
        $sql='SELECT * FROM articles WHERE articles.content LIKE "%'.$content.'%"';
        echo  $sql;
        return $this->selectSql($sql);
        
    }
    
    
}