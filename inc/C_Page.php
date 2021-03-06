<?php
require_once("/model/model.php");


class C_Page extends C_Base
{
    public function action_get_all(){
        $model = model::GetInstance();
        $params = $model->get_all('repair', 'number', 'desc');
        $clients = $model->get_all('client');
        $type = $model->get_all('type');
        $brend = $model->get_all('brend');
        $status = $model->get_all('status');
        $location = $model->get_all('location');
        $users = $model->get_all('user');
        return $this->template("view/table.php", ["params" => $params, "clients" => $clients, "types" => $type, "brends" => $brend, "statuses" => $status, "locations" => $location, "users" => $users]);
    }

    public function action_index()
    {
        $content = $this->action_get_all();
        $modal = $this->template("view/modal.php");
        $this->content = $this->template("view/main.php", ['content' => $content, 'modal'=>$modal]);
    }

    public function action_open(){
        $pageName = $this->params[2];
        $model = model::GetInstance();
        $params = $model->get_all($pageName, $pageName, 'asc');
        $content = $this->template("view/modal.php");
        $this->content = $this->template("view/$pageName.php", ["params"=>$params, "content"=>$content]);
    }

    public function action_form_repair (){
        $pageName = $this->params[2];
        $form = $this->params[3];
        if($form == 'add'){
            $head = 'Новый документ';
        }else{
            $head = 'Редактирование документа';
        }
        $model = model::GetInstance();
        $clients = $model->get_all('client');
        $type = $model->get_all('type');
        $brend = $model->get_all('brend');
        $status = $model->get_all('status');
        $location = $model->get_all('location');
        $users = $model->get_all('user');
        $allRepairs = $model->get_all('repair');
        $lastNumber = [0];
        foreach($allRepairs as $key=>$value) {
            array_push($lastNumber, $value['number']);
        }
        $number = max($lastNumber) + 1;
        $today = date("d.m.Y");
        $content = $this->template("view/modal.php");
        $this->content = $this->template("view/$pageName.php", ["clients" => $clients, "type" => $type, "brend" => $brend, "status" => $status, "location" => $location, "users" => $users, "number" => $number, "date" => $today, "content"=>$content, "form"=>$form, "head" => $head]);
    }

    public function action_add(){
        $pageName = $this->params[2];
        if(isset($_POST)){
            $model = model::GetInstance();
            $id = $model->add($pageName, $_POST);
        }
        $this->action_open($pageName);
    }

    public function action_edit()
    {
        $idName = $this->params[3];
        $id = $this->params[4];
        $pageName = $this->params[2];

        if ($id != NULL) {
                    $params = $_POST;
                    $model = model::GetInstance();
                    $model->edit($pageName, $idName, $id, $params);
            $this->action_open($pageName);
        }
    }
    public function action_delete()
    {
        $idName = $this->params[3];
        $id = $this->params[4];
        $pageName = $this->params[2];

        if ($id != NULL) {
                    $model = model::GetInstance();
                    $model->delete($pageName, $idName, $id);

            $this->action_open($pageName);
        }
    }

}