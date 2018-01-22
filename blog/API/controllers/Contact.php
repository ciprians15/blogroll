<?php
require "./models/SubscriptionModel.php";

class Contact
{
    private $subscriptionModel;
    
    function __construct()
    {
        $this->subscriptionModel = new SubscriptionModel();
    }
    function createItem()
    {
          global $REQUEST;
      //  var_dump($REQUEST['name']);
        
        if (!empty($REQUEST['name']) && !empty($REQUEST['email']) && !empty($REQUEST['subject']) && !empty($REQUEST['message'])) {
            $this->subscriptionModel->insertItem($REQUEST);
            return "true";
        } else {
            return "false";
        }
    }
    function getAll()
    {
 
             $data=$this->subscriptionModel->selectAll();
             return $data;
            
        
    
    }
}