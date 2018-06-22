if(app)
{
    app.run(function($rootScope){
        $rootScope.notes = [];
        $rootScope.id = 1;
    })
    app.controller("Main",function($scope,$rootScope,$interval,rFA,$http,$location){
        /*$scope.notes = [
            {w:"50",h:"50",t:"50",l:"50",n:"Hello"}
        ];*/
        if(!$rootScope.fridge)
        {
            var fname = $location.$$path.replace("/fr/","");
            $http({
                url:"server/get.php",
                params:{
                    fridge:fname
                },
                method:"GET"
            }).then(function(data){
                $rootScope.fridge = data.data[0];
                _init();
            })
        }
        else
        {
            _init();
        }
        function _init(){
            $scope.notes = $rootScope.notes;
            $scope.id = $rootScope.fridge.AddNotes;
            $scope.add = function(){
                $scope.id++;
                //console.log("Id",$scope.id);
                
                var obj = {w:"100",h:"100",t:"100",l:"100",n:"Hello",id:$scope.id,o:$scope.notes.length+1};
                console.log("add",obj.o);
                $rootScope.notes.push(obj);
                obj.fid = $rootScope.fridge.Id;
                $http({
                    url:"server/ins.php",
                    params:obj,
                    method:"GET"
                }).then(function(data){
                    console.log("add-note",data);
                    $rootScope.notes[$rootScope.notes.length-1].id = parseInt(data.data.Id);
                    console.log($rootScope.notes[$rootScope.notes.length-1]);
                })
            }
            $http({
                url:"server/getF.php",
                params:{
                    fid:$rootScope.fridge.Id
                },
                method:"GET"
            }).then(function(data){
                //console.log("get-data",data);
                for(var i=0;i<data.data.length;i++)
                {
                    var helem = data.data[i];
                    var elem = {
                        w:helem.Width,
                        h:helem.Height,
                        t:helem.Top,
                        l:helem.Left,
                        o:parseInt(helem.Order),
                        id:parseInt(helem.Id),
                        n:helem.Text
                    }
                    //console.log(helem,elem);
                    $rootScope.notes.push(elem);
                }
                
                //$rootScope.$apply();
            })
        }
        
        /*$scope.remove = function(note){
            console.log("Remove from array");
            rFA.removeFromArray($scope.notes,note);
        }*/
    })
    app.controller("Start",function($scope,$rootScope,$http){
        $scope.fname = "";
        //console.log("Start");
        $scope.send = function(){
            $rootScope.fname = $scope.fname;
            //console.log($scope.fname);
            $http({
                url:"server/get.php",
                params:{
                    fridge:$scope.fname
                },
                method:"GET"
            }).then(function(data){
                console.log("Start",data);
                $rootScope.fridge = data.data[0];
                //console.log("rootScope.fridge",$rootScope.fridge);
                location.replace(location.href + "fr/" + $rootScope.fridge.Name);
            })
        }
    })
}
