<?php
require_once "DB.php";

class UsersModel extends DB 
{
    function checkUser($email, $pass) 
    {
        $sql = 'SELECT * FROM users where email = ? and password = ?';
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($email, $pass));
        return ($stmt->rowCount() > 0);    
    }
    
    function save_user($email, $pass,$lname,$fname) 
    {
        $sql = 'insert into users (email, password,last_name,first_name) values(?,?,?,?)';
        
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($email, $pass,$lname,$fname));
        return ($this->dbh->lastInsertId()!=0);
    }
    
    function getProfileByEmail($email) 
    {
        $sql = 'SELECT first_name, last_name, id,role FROM users where email = ?';
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array($email));
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}