if(app)
{
    app.run(function($rootScope){
        $rootScope.notes = [
            {w:"50",h:"50",t:"50",l:"50",n:"Hello",o:1,id:1}
        ];
        $rootScope.id = 1;
    })
    app.controller("Main",function($scope,$rootScope,$interval,rFA){
        /*$scope.notes = [
            {w:"50",h:"50",t:"50",l:"50",n:"Hello"}
        ];*/
        $scope.notes = $rootScope.notes;
        $scope.id = $rootScope.id;
        $scope.add = function(){
            $scope.id++;
            //console.log("Id",$scope.id);
            $rootScope.notes.push({w:"100",h:"100",t:"100",l:"100",n:"Hello",id:$scope.id,o:$scope.notes.length+1});
            
        }
        console.log($scope.notes);
        /*$scope.remove = function(note){
            console.log("Remove from array");
            rFA.removeFromArray($scope.notes,note);
        }*/
    })
}
