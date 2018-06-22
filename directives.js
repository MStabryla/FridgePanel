if(app)
{
    app.directive("note",function(move,resize,remove,edit,$rootScope){
        return {
            templateUrl:"elem.html",
            scope:{
                note:"=elem",
                notes:"=notes",
                name:"=name",
                //remo:"&remove"
            },
            link:function(scope,elements,attr){
                if(elements[0])
                {
                    //Drag.setDrag(elements[0]);
                    scope.note.e = elements[0];
                    //console.log(scope.note);
                    move.setDrag(elements[0],scope.note);
                    //console.log(elements[0].children[2]);
                    //console.log("resize",scope.note);
                    resize.setResize(elements[0].children[1],scope.note);
                    remove.setRemove(elements[0].children[2],scope.note);
                    edit.setEdit(elements[0].children[3],scope.note);
                }
            }
        }
    })
}