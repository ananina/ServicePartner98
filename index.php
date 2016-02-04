<?php
spl_autoload_register(function ($class) {
    require_once "inc/$class.php";
});

session_start();

$info = array();

if(isset($_GET['q'])){
    $info = explode('/', $_GET['q']);
}

$params = array();
foreach($info as $value){
    if($value != ''){
        $params[] = $value;
    }
}



$action = "action_";
$action .= isset($params[1])?$params[1]:"index";

$c = "page";
if(isset($params[0])){
    $c = $params[0];
}

switch($c){
    case "page":    $controller = new C_Page();
        break;
    default:        $controller = new C_Page();
}

date_default_timezone_set('Asia/Krasnoyarsk');
$controller->request($action, $params);