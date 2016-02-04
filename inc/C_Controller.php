<?php
abstract class C_Controller
{
    protected $params;

    protected abstract function render();

    protected abstract function before();

    public function request($action, $params){
        $this->params = $params;
        $this->before();
        $this->$action();
        $this->render();
    }

    protected function template($file, $params = []){
        foreach ($params as $k => $v) {
            $$k = $v;
        }
        if (isset($$k) && is_array($$k)) {
            foreach ($$k as $key => $value) {
                $$key = $value;
            }
        }

        ob_start();
        include($file);
        return ob_get_clean();
    }

    public function __call($method, $params){
        die("Unknown method");
    }


    public function get($name, $default = NULL){
        return isset($_GET[$name]) ? $_GET[$name] : $default;
    }

    public function post($name, $default = NULL){
        return isset($_POST[$name]) ? $_POST[$name] : $default;
    }
}