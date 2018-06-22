<?php
    include("Lib.php");
    function CheckGet(){
        $args = array("fid");
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
        $q = "SELECT * FROM notes WHERE FridgeId = " . $_GET["fid"];
        //echo $q . " | ";
        $res = GetQuery($q);
        echo json_encode($res);
    }
    else
    {
        echo "Not GET Data included";
    }
?>