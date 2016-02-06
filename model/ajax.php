<?php
require_once 'db_mysql.php';
if(!empty($_POST['id_client'])){
    $id_client = (int)$_POST['id_client'];
}
if(isset($id_client)) {
    $dbMYSQL = dbMYSQL::GetInstance();
    $q = 'SELECT * FROM `clients` WHERE `id_client`='.$id_client.'';
    $data = $dbMYSQL->select($q);
    print_r(json_encode($data));
    exit;
}