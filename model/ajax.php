<?php
require_once 'model.php';

if(!empty($_POST['count'])){
    $count = $_POST['count'];
}
if(!empty($_POST['table'])){
    $table = $_POST['table'];
}
if(!empty($_POST['id_name'])){
    $id_name = $_POST['id_name'];
}
if(!empty($_POST['id'])){
    $id = (int)$_POST['id'];
}
if(!empty($_POST['params'])){
    $params = ($_POST['params']);
}
if(!empty($_POST['action'])){
    $action = ($_POST['action']);
}

if(isset($count)){
    if($count == 'one'){
        if(isset($table) && isset($id_name) && isset($id)) {
            $model = model::GetInstance();
            $data = $model->select($table, $id_name, $id);
            print_r(json_encode($data));
            exit;
        }
    }
    if($count == 'all') {
        if(isset($table)) {
            $model = model::GetInstance();
            $data = $model->get_all($table);
            print_r(json_encode($data));
            exit;
        }
    }
    if($count == 'many'){
        if(isset($table) && isset($id_name) && isset($id)) {
            $model = model_some::GetInstance();
            $data = $model->select_some($table, $id_name, $id);
            print_r(json_encode($data));
            exit;
        }
    }
}
if(isset($action) && $action == 'add') {
    if (isset($table) && isset($params)) {
        $model = model::GetInstance();
        $idNew = $model->add($table, $params);
        print_r($idNew);
    }
}
if(isset($action) && $action == 'edit'){
    if(isset($table) && isset($id_name) && isset($id) && isset($params)){
        $model = model::GetInstance();
        $rows = $model->edit($table, $id_name, $id, $params);
        print_r($rows);
    }
}

if(isset($action) && $action == 'delete'){
    if(isset($table) && isset($id_name) && isset($id)){
        $model = model::GetInstance();
        $rows = $model->delete($table, $id_name, $id);
        print_r($rows);
    }
}
