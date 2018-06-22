if(app)
{
    app.service("move",function($interval,order,$http){
        //var notMain = false;
        this.setDrag = function(elem,note) {
            var coords = {
                x:0,
                y:0
            }
            function MouseOver(emo){
                emo.preventDefault();
                note.t =(emo.clientY - coords.y);
                note.l =(emo.clientX - coords.x);
                elem.style.top=(emo.clientY - coords.y) + "px";
                elem.style.left=(emo.clientX - coords.x) + "px";
                //console.log("MouseOver",note.t,note.l);
            }
            elem.onmousedown = function(e){
                coords.x = e.clientX - parseInt(elem.style.left.slice(0,elem.style.left.length-2));
                coords.y = e.clientY - parseInt(elem.style.top.slice(0,elem.style.top.length-2));;
                document.onmousemove = MouseOver;
                /*document.addEventListener("mouseup",function(){
                    //console.log("MouseUp");
                    document.removeEventListener("mousemove",MouseOver);
                });*/
                order.setOrder(this,note);
                document.onmouseup = function(){
                    
                    //console.log("MouseUp");
                    //document.removeEventListener("mousemove",MouseOver);
                    document.onmousemove = function(){

                    };
                    $http({
                        url:"server/update.php",
                        params:{
                            Top:note.t,
                            Left:note.l,
                            nid:note.id
                        },
                        method:"GET"
                    }).then(function(data){
                        //console.log("from move",data);
                    })
                }
            }
        }
        
    })
    app.service("resize",function($http){
        this.setResize = function(elem,note){
            var coords = {
                x:0,
                y:0
            }
            //console.log(elem);
            var parent = elem.parentNode;
            function GetPars(style)
            {
                return parseInt(style.slice(0,style.length-2))
            }
            
            function MouseOver(emo){
                emo.preventDefault();
                var cheight = (emo.clientY - GetPars(parent.style.top));
                var cwidth = (emo.clientX - GetPars(parent.style.left));
                if(cheight >= 25 )
                {
                    note.h =cheight;
                    parent.style.height=cheight + "px";
                }
                if(cwidth >= 25)
                {
                    note.w =cwidth;
                    parent.style.width=cwidth + "px";
                }
                return false;
                
            }
            elem.onmousedown = function(e){
                e.stopPropagation();
                coords.x = e.clientX - GetPars(parent.style.left);
                coords.y = e.clientY - GetPars(parent.style.top);
                document.onmousemove = MouseOver;
                document.onmouseup = function(){
                    document.onmousemove = function(){

                    };
                    $http({
                        url:"server/update.php",
                        params:{
                            Width:note.w,
                            Height:note.h,
                            nid:note.id
                        },
                        method:"GET"
                    }).then(function(data){
                        console.log("from resize",data);
                    })
                    notMain = false;
                }
            }
        }
    })
    app.service("order",function($rootScope,$http){
        this.setOrder = function(elem,note,callback){
            if(note.o == $rootScope.notes.length)
            {
                console.log("halt order");
                if(callback && callback instanceof Function)
                    callback();
                return;
            }
            //console.log("order",note.o,note.id);
            var impo = note.o;
            note.o = $rootScope.notes.length+1;
            //console.log("Order START impo = ",impo+1);
            function _rec(_note,inx)
            {
                if(!_note)
                {
                    $rootScope.$apply();
                    if(callback && callback instanceof Function)
                        callback();
                    //console.log("Order END");
                    return;
                }
                //console.log(_note.id,_note.e,_note.o);
                _note.o--;
                _note.e.style.zIndex = _note.o;
                _rec($rootScope.notes.find(x => x.o == inx+1),inx+1);
            }
            //console.log($rootScope.notes);
            _rec($rootScope.notes.find(x => x.o == impo+1),impo+1);
            console.log("impo",impo)
            $http({
                url:"server/order.php",
                params:{
                    Order:impo,
                    nid:note.id,
                    fid:$rootScope.fridge.Id
                },
                method:"GET"
            }).then(function(data){
                console.log("from order",data.data);
            })
            /*for(var i=0;i<$rootScope.notes.length;i++)
            {
                var elem = $rootScope.notes[i];
                if(elem.o > 1)
                {
                    elem.o--;
                }
            }*/
        }
    })
    app.service("rFA",function(){
        this.removeFromArray = function(array,elem){
            for(var i=0;i<array.length;i++)
            {
                if(array[i].id == elem.id)
                {
                    for(var j=i;j<array.length-1;j++)
                    {
                        array[j] = array[j+1];
                    }
                    array.pop();
                    break;
                }
            }
        };
    })
    
    app.service("remove",function(rFA,$rootScope,$http,order){
        this.setRemove = function(elem,note)
        {
            /*elem.onclick = function(){
                rFA.removeFromArray(list,note);
            }*/
            
            elem.onclick = function(){
                //console.log("Remove notes",note.id)
                order.setOrder(null,note,function(){
                    var tid = note.id;
                    rFA.removeFromArray($rootScope.notes,note);
                    $rootScope.$apply();
                    console.log("rem",note,$rootScope.notes);
                    $http({
                        url:"server/remove.php",
                        params:{
                            nid:tid
                        },
                        method:"GET"
                    }).then(function(data){
                        console.log("from remove",data);
                    })
                });
                
            }
        }
    })
    app.service("edit",function($rootScope,$http){
        this.setEdit = function(elem,note){
            //console.log("setEdit");
            elem.addEventListener("click",function(){
                //console.log("setEdit onclick");
                document.getElementById("WYS-alert").style.display = "block";
                var editor = tinymce.get('LOL');
                //console.log(elem.parentNode.children[0]);
                editor.setContent(elem.parentNode.children[0].innerHTML);
                document.getElementById("WYG-con").onclick = function(){
                    //console.log("confirm");
                    document.getElementById("WYS-alert").style.display = "none";
                    note.n = editor.getContent();
                    $http({
                        url:"server/update.php",
                        params:{
                            Text:note.n,
                            nid:note.id
                        },
                        method:"GET"
                    }).then(function(data){
                        console.log("from edit",data);
                    })
                    $rootScope.$apply();
                }
                document.getElementById("WYG-den").onclick = function(){
                    //console.log("deny");
                    document.getElementById("WYS-alert").style.display = "none";
                }
            })
        }
    })
}