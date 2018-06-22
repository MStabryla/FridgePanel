<?php
    include("Lib.php");
    function CheckGet(){
        $args = array("w","h","t","l","n","o","fid");
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
        $q = "INSERT INTO notes (Width,Height,Top,notes.Left,notes.Text,notes.Order,FridgeId) VALUES (" . $_GET['w'] . "," . $_GET['h'] ."," . $_GET['t'] ."," . $_GET['l'] .",'" . $_GET['n'] ."'," . $_GET['o'] ."," . $_GET['fid'] .")";
        //echo $q . " | ";
        $res = GetQuery($q);
        if($res)
        {
            $qq = "SELECT * FROM notes WHERE FridgeId = " . $_GET["fid"];
            //echo $qq . " | ";
            $ress = GetQuery($qq);
            $resss = GetQuery("UPDATE fridges SET fridges.AddNotes = fridges.AddNotes + 1 WHERE Id = " . $_GET["fid"]);
            echo json_encode($ress[count($ress) - 1]);
        }
    }
    else
    {
        echo "Not GET Data included";
    }
    
?>