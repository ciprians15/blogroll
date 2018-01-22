<?php

class DB 
{
    protected $dbh;
    
    function __construct()
    {
    try 
        {
            $this->dbh = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);    
        }
    catch (PDOException $e) 
        {
        echo 'DB ERROR PLS CONTACT ADMIN';
        die();
        }
    }
    function selectSql($sql)
    {
    
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}
    

