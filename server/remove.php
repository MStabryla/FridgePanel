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
    if(CheckGet())
    {
        $q = "DELETE FROM notes WHERE Id = " . $_GET["nid"];
        $res = GetQuery($q);
        if($res)
        {
            echo '{ "completed": true , "nid" : "' . $_GET["nid"] . '" }';
        }
        else
        {
            echo '{ "completed": false , "nid" : "' . $_GET["nid"] . '" }';
        }
    }
?>