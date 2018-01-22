<?php
require_once "DB.php";

class CategoriesModel extends DB
{
    
    function selectAll()
    {
         $sql = 'select * from category';
         
        return $this->selectSql($sql);
    }
   
   function getItemById($id)
   {
       $sql= 'select * from category where category.id = ?';
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($id));
      // var_dump($stmt->fetchAll(PDO::FETCH_CLASS)[0]);
        return ($stmt->fetchAll(PDO::FETCH_CLASS)[0]);
   } 
}