<?php
abstract class C_Base extends C_Controller
{
    protected $title;
    protected $content;

    protected function before()
    {
        $this->title = "Партнер-98";
        $this->content = "MyContent";
        setlocale(LC_ALL, "ru_RU.UTF-8");
        mb_internal_encoding("UTF-8");
    }

    public function render()
    {
        $params = ["title" => $this->title, "content" => $this->content];
        $page = $this->template("view/base.php", $params);
        echo $page;
    }

}