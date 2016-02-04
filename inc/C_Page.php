<?php
require_once("/model/model.php");


class C_Page extends C_Base
{
    public function action_get_all(){
        $model = model::GetInstance();
        $params = $model->get_all('repair');
        $clients = $model->get_all('clients');
        $type = $model->get_all('type');
        $brend = $model->get_all('brend');
        $status = $model->get_all('status');
        $location = $model->get_all('location');
        $users = $model->get_all('users');
        return $this->template("view/table.php", ["params" => $params, "clients" => $clients, "types" => $type, "brends" => $brend, "statuses" => $status, "locations" => $location, "users" => $users]);
    }

    public function action_index()
    {
        $content = $this->action_get_all();
        $this->content = $this->template("view/main.php", ['content' => $content]);
    }

    public function action_open(){
        $pageName = $this->params[2];
        $model = model::GetInstance();
        $params = $model->get_all($pageName);
        $this->content = $this->template("view/$pageName.php", ["params"=>$params]);
    }

}