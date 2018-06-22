<?php
    include("_data.php");
    $_ConData = GetConData();
    $conn = new mysqli($_ConData->address,$_ConData->login,$_ConData->passwd,$_ConData->database);
    //echo json_encode($conn);
    mysqli_set_charset($conn, "utf8");
    function GetUser($login){
        global $conn;
        $login = SQLInjectionsFilter($login);
        $str = "SELECT login,role,id FROM user WHERE login = '" . $login . "' ";
        //echo "str: " . $str;
        $query = $conn->query($str) or die("Error: Problem with executing command");
        switch(gettype($query))
        {
            case "boolean":
                return null;
                break;
            default:
                while($row = $query->fetch_array())
                {
                    if($row != null)
                    {
                        return $row;
                    }
                }
                break;
        }
        $query_>close();
        return null;
    }
    function GetQuery($q)
    {
        global $conn;
        $table = [];
        //echo $q . "</br>";
        $query = $conn->query($q);
        switch(gettype($query))
        {
            case "boolean":
                return $query;
            default:
                while($row = $query->fetch_array())
                {
                    
                    array_push($table,$row);
                }
                return $table;
        }
        $query->close();
    }
    function SQLInjectionsFilter($string){
        $sChars = ['.',';',',',':','\\','>','<'];
        for($i = 0;$i < count($sChars);$i++)
        {
            str_replace($sChars[$i],"",$string);
        }
        return $string;
    }
?>