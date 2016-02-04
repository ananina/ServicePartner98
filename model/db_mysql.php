<?php
require_once "config.php";

class dbMYSQL{

    private static $instance;
    public $link;

    private function __construct(){
        $this->link = mysqli_connect(HOST, USER, PASSWORD, DATABASE)
        or die(mysqli_error($this->link));
        mysqli_query($this->link, "SET NAMES utf8");
    }

    public function __destruct(){
        mysqli_close($this->link);
    }

    public static function GetInstance(){
        if(self::$instance == null)
            self::$instance = new dbMYSQL();

        return self::$instance;
    }

    public function select($query){
        $result = mysqli_query($this->link, $query);

        if(!$result)
            die(mysqli_error($this->link));

        $mass = array();
        while($row = mysqli_fetch_assoc($result)){
            $mass[] = $row;
        }
        mysqli_free_result($result);

        return $mass;
    }

    //INSERT INTO T1 (A,B,C) VALUES (VA,VB,VC)
    public function insert($table, array $fields){
        $columns = [];
        $values = [];

        $table = mysqli_real_escape_string($this->link, $table);
        foreach ($fields as $field => $value) {
            $field = mysqli_real_escape_string($this->link, $field);

            $columns[] = $field;
            if($value == null){
                $values[] = "NULL";
            }else{
                $value = mysqli_real_escape_string($this->link, $value);
                $values[] = "'$value'";
            }
        }

        $columns_str = implode(",", $columns);
        $values_str = implode(",", $values);

        $query = "INSERT INTO `$table` ($columns_str) VALUES ($values_str)";
        $result = mysqli_query($this->link, $query);

        if(!$result){
            die(mysqli_error($this->link));
        }

        return mysqli_insert_id($this->link);
    }

    //DELETE FROM T1 WHERE id = (SELECT id FROM T2 WHERE name = "george")
    public function delete($table, $where){
        $table = mysqli_real_escape_string($this->link, $table);
        $query = "DELETE FROM `$table` WHERE $where";
        $result = mysqli_query($this->link, $query);
        if(!$result){
            die(mysqli_error($this->link));
        }

        return mysqli_affected_rows($this->link);
    }

    //UPDATE T1 SET f1=v1, f2=v2, f3=v3 WHERE
    public function update($table, $fields, $where){
        $sets = [];
        $table = mysqli_real_escape_string($this->link, $table);
        foreach ($fields as $field => $value) {
            $field = mysqli_real_escape_string($this->link, $field);
            if($value == null)
            {
                $sets[] = "$field=NULL";
            }else{
                $value = mysqli_real_escape_string($this->link, $value);
                $sets[] = "$field='$value'";
            }
        }

        $sets_str = implode(",", $sets);
        $query = "UPDATE `$table` SET $sets_str WHERE $where";
        $result = mysqli_query($this->link, $query);

        if(!$result)
        {
            die(mysqli_error($this->link));
        }

        return mysqli_affected_rows($this->link);
    }
}