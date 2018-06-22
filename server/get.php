<?php
    include("Lib.php");
    $queryone = "SELECT * FROM fridges WHERE Name = '" . $_GET['fridge'] . "'";
    //echo $queryone . " | ";
    $check = GetQuery($queryone);
    if($check != null)
    {
        echo json_encode($check);
    }
    else
    {
        //echo "Name = " . $_GET['fridge'];
        $querytwo = "INSERT INTO fridges (Name) VALUES ('" . $_GET['fridge'] . "')";
        //echo $querytwo;
        $insert = GetQuery($querytwo);
        //echo json_encode($insert);
        if($insert)
        {
            $seccheck = GetQuery("SELECT * FROM fridges WHERE Name = '" . $_GET['fridge'] . "'");
            echo json_encode($seccheck);
        }
    }
?>