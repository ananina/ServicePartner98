<?php
require_once 'model.php';
if(!empty($_POST['table'])){
    $table = $_POST['table'];
}
if(!empty($_POST['id_name'])){
    $id_name = $_POST['id_name'];
}
if(!empty($_POST['id'])){
    $id = (int)$_POST['id'];
}

if(isset($table) && isset($id_name) && isset($id)) {
    $model = model::GetInstance();
    $data = $model->select($table, $id_name, $id);
    print_r(json_encode($data));
    exit;
}