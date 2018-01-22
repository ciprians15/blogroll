<?php
    $routes=array();
    //$routes['/users/update'] = array( "class" => "", "method" => "");
    $routes['/articles'] = array("class"=>"Articles", "method"=>"getAll");
    $routes['/articles/add'] = array("class"=>"Articles", "method"=>"createItem");
    $routes['/articles/edit'] = array("class"=>"Articles", "method"=>"editItem");
    $routes['/articles/delete'] = array("class"=>"Articles", "method"=>"deleteItem");
    $routes['/articles/search'] = array("class"=>"Articles", "method"=>"getByKeyword");
    
    $routes['/categories'] = array("class"=>"Categories", "method"=>"getAll");
    
    $routes['/comments'] = array("class"=>"Comments", "method"=>"getAllById");
    $routes['/comments/add'] = array("class"=>"Comments", "method"=>"createItem");
    $routes['/subscription/add'] = array("class"=>"Contact", "method"=>"createItem");
    $routes['/subscription'] = array("class"=>"Contact", "method"=>"getAll");
    $routes['/login'] = array("class"=>"Account", "method"=>"login");
    
    $routes['/logout'] = array("class"=>"Account", "method"=>"logout");
    $routes['/signup'] = array("class"=>"Account", "method"=>"signUp");
    $routes['/checklogin'] = array("class"=>"Account", "method"=>"checkLogin");
    