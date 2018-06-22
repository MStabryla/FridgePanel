<?php
    include("Lib.php");
    function CheckGet(){
        $args = array("nid");
        for($i=0;$i<count($args);$i++)
        {
            if(!isset($_GET[$args[$i]]))
            {
                return false;
            }
        }
        return true;
    }
    function GetParameters()
    {
        $par = [];
        $args = array("Width","Height","Top","Left");
        for($i=0;$i<count($args);$i++)
        {
            if(isset($_GET[$args[$i]]))
            {
                $elem = json_decode('{ "name":"' . $args[$i] . '","con":"' . $_GET[$args[$i]] . '","type":"number" }');
                //echo json_encode($elem);
                array_push($par,$elem);
            }
        }
        $args = array("Text");
        for($i=0;$i<count($args);$i++)
        {
            if(isset($_GET[$args[$i]]))
            {
                $elem = json_decode('{ "name":"' . $args[$i] . '","con":"' . $_GET[$args[$i]] . '","type":"text" }');
                //echo json_encode($elem);
                array_push($par,$elem);
            }
        }
        return $par;
    }
    if(CheckGet())
    {
        $q = "UPDATE notes SET ";
        $params = GetParameters();
        //echo json_encode($params);
        for($i=0;$i<count($params);$i++)
        {
            
            if($params[$i]->type == "number")
            {
                $q = $q . " notes." . $params[$i]->name . " = " . $params[$i]->con;

            }
            else if($params[$i]->type == "text")
            {
                $q = $q . " notes." . $params[$i]->name  . " = '" . $params[$i]->con . "'";
            }
            if($i < count($params)-1)
            {
                $q = $q . ", ";
            }
        }
        $q = $q . " WHERE Id = " . $_GET["nid"];
        echo $q;
        $res = GetQuery($q);
    }
?>