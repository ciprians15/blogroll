<?php
require_once "DB.php";

class SubscriptionModel extends DB 
{
    function insertItem($item) 
    {
        $sql = 'insert into subscription (name, email, subject, message) values(?, ?, ?, ?)';

        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($item['name'], 
                            $item['email'], 
                            $item['subject'], 
                            $item['message']));
        return $this->dbh->lastInsertId();
    }
    
    function selectAll()   
    {
        $sql = 'select * from subscription';
        return $this->selectSql($sql);
    }
    
}