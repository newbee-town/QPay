var testJ ={"idNumber":3536, "address":"dfsag4qtadg4ga", "userName":"考梵高", "password":"test", "friend":[
    {"idNumber":3536, "address":"dfsag4qtadg4ga", "userName":"考梵高","noteName":"mmp"},
    {"idNumber":3536, "address":"dfsag4qtadg4ga", "userName":"考高","noteName":"mmp"}
]};

var loginFunc = function(resp){

    var userInfo =resp; //JSON.parse(resp);
    //userInfo
    gbid('account_div').onclick = function(){
        gbid('user_info_div').style.display = "block";
        gbid('friend_info_div').style.display = "none";
    };

    gbid('user_note_name').innerHTML = userInfo.userName;
    gbid('user_wallet_address').innerHTML = userInfo.address;
    gbid('user_id_number').innerHTML = userInfo.idNumber;
    //friend

    var friendList = userInfo.friend;

    var nliClick = function(fi){
        gbid('user_info_div').style.display = "none";
        gbid('friend_info_div').style.display = "block";
      
        if(fi.noteName!="")
            if(fi.userName!="")
                gbid('f_note_name').innerHTML = fi.noteName+"("+fi.userName+")";
            else
                gbid('f_note_name').innerHTML = fi.noteName;
        else
            if(fi.userName!="")
                gbid('f_note_name').innerHTML = fi.userName;
            else
                gbid('f_note_name').innerHTML = "未设置备注和昵称";

        gbid('f_wallet_address').innerHTML = fi.address;
        gbid('f_id_number').innerHTML = fi.idNumber;
    };
    for(var i =0;i<friendList.length;i++){
        
        var friendInfo = friendList[i];
        var nli = document.createElement('li');
        nli.className = "list-group-item";
        nli.value = i;
        nli.style.textAlign = "center";
        nli.onclick = function(){ 
            alert(this.value);
            nliClick(testJ.friend[this.value]);
        };
        nli.innerHTML = friendInfo.noteName;
        gbid('parent_ul').appendChild(nli);
        
    }
};

function qLogin(){
    var loginFunc = function(resp){
        userInfo = JSON.parse(resp);
        //userInfo
        gbid('account_div').onclick = function(){
            gbid('user_info_div').style.display = "block";
            gbid('friend_info_div').style.display = "none";
        };
        gbid('user_note_name').innerHTML = userInfo.userName;
        gbid('user_wallet_address').innerHTML = userInfo.address;
        gbid('user_id_number').innerHTML = userInfo.idNumber;
        //friend
        friendList = userInfo.friend;
        var nliClick = function(fi){
            gbid('user_info_div').style.display = "none";
            gbid('friend_info_div').style.display = "block";
            if(fi.noteName!="")
                if(fi.userName!="")
                    gbid('f_note_name').innerHTML = fi.noteName+"("+fi.userName+")";
                else
                    gbid('f_note_name').innerHTML = fi.noteName;
            else
                if(fi.userName!="")
                    gbid('f_note_name').innerHTML = fi.userName;
                else
                    gbid('f_note_name').innerHTML = "未设置备注和昵称";

            gbid('f_wallet_address').innerHTML = fi.address;
            gbid('f_id_number').innerHTML = fi.idNumber;
        };
        for(var i =0;i<friendList.length;i++){
            var friendInfo = friendList[i];
            var nli = document.createElement('li');
            nli.className = "list-group-item";
            nli.style.textAlign = "center";
            nli.value = i;
            nli.onclick = function(){ nliClick(friendList[this.value])};
            
            gbid('parent_ul').appendChild(nli);
        }
    };
    nebPayCall(j_contract_address ,"1", "login", "[]", loginFunc);
}