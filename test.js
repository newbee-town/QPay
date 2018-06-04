var f_list = ["test1","test2","test3"];
var l_len = f_list.length;
for(var i=0;i<l_len;i++){
    if(f_list[i]== "test1"){
        f_list.splice(i,1);
            break;
        }
    }
console.log(f_list);