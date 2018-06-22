<?php
    $_ConData = '{
        "address": "localhost",
        "database" : "fridge",
        "login" : "root",
        "passwd" : "root"
    }';
    function GetConData()
    {
        global $_ConData;
        return json_decode($_ConData);
    }
    
?>