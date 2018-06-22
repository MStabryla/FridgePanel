<?php
    include("Lib.php");
    function CheckGet(){
        $args = array("nid","Order","fid");
        for($i=0;$i<count($args);$i++)
        {
            if(!isset($_GET[$args[$i]]))
            {
                return false;
            }
        }
        return true;
    }
    function SetOrder($i,$o){
        $q = "UPDATE notes SET notes.Order = " . $o. " WHERE Id = " . $i;
        $res = GetQuery($q);
        return $res;
    }
    if(CheckGet())
    {
        $list = GetQuery("SELECT * FROM notes WHERE notes.FridgeId = " . $_GET["fid"]);                     //Pobranie listy z bazy danych
        for($j=0;$j<count($list);$j++)                                                                      //Wprowadzanie dodatkowego indeksu do elementów list - by można było wygodnie się odwołać
        {
            $list[$j]["supId"] = $j;
        }
        $impo = intval($_GET["Order"]);                                                                     //Zmienna odpowiedzialna za określenie zmiennej order wybranego elementu
        $startElem = array_filter_upd($list,function ($el) {                                                //Funkcja szukająca elementu startowego
            //echo "Finding startElem " . intval($el["Order"]) . " == " . intval($_GET["Order"]) ."\n";
            return intval($el["Order"]) == intval($_GET["Order"]);
        });
        //echo "Start " . json_encode($startElem) . "\n---\n";                                                //Wyświetlenie początkowego elementu
        //echo "StartElem = " . json_encode($startElem) . "\n";
        $list[$startElem[0]["supId"]]["Order"] = count($list)+1;                                            //Modyfikacja zmiennej order początkowego elementu
        function _rec($_note,$inx,$list){                                                                   //Funkcja rekurencyjna modyfikująca order elementów od wybranego elementu do ostatniego elementu
            //echo "Start _rec _note = " . json_encode($_note) . "\n";
            if($_note[0] == null)
            {
                //echo "\n\n\n";
                for($i = 0;$i<count($list);$i++)
                {
                    $tElem = $list[$i];
                    //echo json_encode($tElem) . "\n";
                    SetOrder($tElem["Id"],$tElem["Order"]);
                }
                //echo "\n\n\n" . json_encode($list);
                //echo json_encode("{ 'completed' : true }");
                return;
            }
            $temElem = array_filter_upd($list,function ($el) use ($_note) {
                //echo "lambda " . json_encode($el["Id"]) . " _note " . json_encode($_note[0]) . "\n"; 
                return $el["Id"] == $_note[0]["Id"];
            });
            
            $list[$temElem[0]["supId"]]["Order"] = intval($temElem[0]["Order"]) - 1;
            
            _rec(array_filter_upd($list,function ($elem) use ($inx) {
                return intval($elem["Order"]) == $inx+1;
            }),$inx+1,$list);
        }
        _rec(array_filter_upd($list,function ($elem) use ($impo){
            //echo "mlambda " . json_encode($elem) . " order = " . intval($elem["Order"]) . " impo = " . $impo . "\n"; 
            return intval($elem["Order"]) == $impo+1;
        }),$impo+1,$list);
    }
    function array_filter_upd($input,$callback){
        $ret = [];
        $int = array_filter($input,$callback);
        //echo "array_filter " . is_array($int) .  " " .  is_object($int) . "\n";
        if(!isset($int[0]))
        {
            
            //$vart = get_object_vars($int);
            //echo "array change \n" . json_encode($int) . " \n " . json_encode(reset($int)) . "\n";
            array_push($ret,reset($int));
            //echo "ret " . json_encode($ret) . "\n";
            return $ret;
        }
        else
        {
            //echo "int " . json_encode($ret) . "\n";
            return $int;
        }
        
    }
?>