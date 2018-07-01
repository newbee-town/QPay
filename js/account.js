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
    
        currentFriend = fi;
        
    };
    for(var i =0;i<friendList.length;i++){
        
        var friendInfo = friendList[i];
        var nli = document.createElement('li');
        nli.className = "list-group-item";
        nli.value = i;
        nli.style.textAlign = "center";
        nli.style.cursor = "pointer";
        nli.onclick = function(){ 
            nliClick(testJ.friend[this.value]);
        };
        nli.innerHTML = friendInfo.noteName;
        gbid('parent_ul').appendChild(nli);
        
    }
};

function qLogin(){
    var loginFunc = function(resp){
        if(resp.result=="null"){
            alert("该账号未注册");
            showLoginDiv();
            return;
        }
        userInfo = JSON.parse(resp.result);
        //userInfo

        gbid('user_note_name').innerHTML = "用户名:"+ userInfo.userName;
        gbid('user_wallet_address').innerHTML = "钱包地址:"+ userInfo.address;
        gbid('user_id_number').innerHTML = "QPay账号:"+  userInfo.idNumber;
        //friend
        friendList = userInfo.friend;
        var nliClick = function(fi){
            showMainDiv('friend_info_div');
            if(fi.noteName!="")
                if(fi.userName!="")
                    gbid('f_note_name').innerHTML = "用户名:"+ fi.noteName+"("+fi.userName+")";
                else
                    gbid('f_note_name').innerHTML = "用户名:"+ fi.noteName;
            else
                if(fi.userName!="")
                    gbid('f_note_name').innerHTML = "用户名:"+ fi.userName;
                else
                    gbid('f_note_name').innerHTML = "用户名:"+ "未设置备注和昵称";

            gbid('f_wallet_address').innerHTML = "钱包地址:"+ fi.address;
            gbid('f_id_number').innerHTML = "QPay账号:"+ fi.idNumber;
            currentFriend = fi;
        };
        for(var i =0;i<friendList.length;i++){
            var friendInfo = friendList[i];
            var nli = document.createElement('li');
            nli.className = "list-group-item";
            nli.style.textAlign = "center";
            nli.value = i;
            nli.innerHTML = friendList[i].noteName;
            nli.onclick = function(){ nliClick(friendList[this.value])};
            
            gbid('parent_ul').appendChild(nli);
        }
        hideLoginDiv();
        showMainDiv('user_info_div');
        gbid('user_info_button').innerHTML = "退出登陆";
    };
    nebPaySimulateCall((1e-18).toString(), "login", "[]", loginFunc);
}

function queryAccount(account_name){
    var queryAccountResultShow = function(resp){

        gbid('af_info_query_state').innerHTML = "";
        if(resp.result=="null"){
            gbid('af_info_query_state').innerHTML = "查询不到该用户信息";
            gbid('af_info_user_name').innerHTML = "用户名:--";
            gbid('af_info_id_number').innerHTML = "QPay账号:--";
            gbid('af_info_wallet_address').innerHTML = "钱包地址:--";
        }
        else{

            var userInfo = JSON.parse(resp.result);
            gbid('af_info_query_state').innerHTML = "";
            gbid('af_info_user_name').innerHTML = "用户名:"+userInfo.userName;
            gbid('af_info_id_number').innerHTML = "QPay账号:"+userInfo.idNumber;
            gbid('af_info_wallet_address').innerHTML = "钱包地址:"+userInfo.address;
            gbid('af_note_name_input').value = userInfo.userName;
        }
    };
    //regulation test
    var patt = /^[0-9]*$/;
    var if_number = patt.test(account_name);
    gbid('af_info_query_state').innerHTML = "正在查询...";
    //number
    if(if_number)
        nebPaySimulateCall("0", "getUserInfoById", "[\""+account_name+"\"]", queryAccountResultShow);
    else
        nebPaySimulateCall("0", "getUserInfoByAddress", "[\""+account_name+"\"]", queryAccountResultShow);
    //address
}

function addFriend(){
    var afAddress = gbid('af_info_wallet_address').innerHTML.substring(5);
    var afIdNumber =  gbid('af_info_id_number').innerHTML.substring(7);
    var afUserName = gbid('af_info_user_name').innerHTML.substring(4);
    var afNoteName = gbid('af_note_name_input').value;
    friendList.push({"address":afAddress,"idNumber":afIdNumber,"userName":afUserName, "noteName":afNoteName});
    
    var nliClick = function(fi){
        showMainDiv('friend_info_div');
        if(fi.noteName!="")
            if(fi.userName!="")
                gbid('f_note_name').innerHTML = "用户名:"+ fi.noteName+"("+fi.userName+")";
            else
                gbid('f_note_name').innerHTML = "用户名:"+ fi.noteName;
        else
            if(fi.userName!="")
                gbid('f_note_name').innerHTML = "用户名:"+ fi.userName;
            else
                gbid('f_note_name').innerHTML = "用户名:"+ "未设置备注和昵称";

        gbid('f_wallet_address').innerHTML = "钱包地址:"+ fi.address;
        gbid('f_id_number').innerHTML = "QPay账号:"+ fi.idNumber;
        currentFriend = fi;
    };
    var nli = document.createElement('li');
    nli.className = "list-group-item";
    nli.style.textAlign = "center";
    var index = friendList.length-1;
    nli.value = index;
    nli.innerHTML = friendList[index].noteName;
    nli.onclick = function(){ nliClick(friendList[this.value])};
            
    gbid('parent_ul').appendChild(nli);


    nebPayCall("0", "addFriend", getArgsS([afAddress, afNoteName]), function(){});
}

function qRegister(){
    
    var noteName = gbid('note_name_input').value;
    var password = gbid('password_input').value;

    var callFunc = function(resp){
        if(resp.result=="false")
            alert("该账号已注册");
        else
            nebPayCall("0", "register", "[\""+noteName+"\",\""+password+"\"]", function(resp){});
        gbid('register_info').style.display = "none";
        gbid('register_button').style.display = "block";
    };

    if(noteName==""||password==""){
        alert("昵称和密码不能为空");
        gbid('register_info').style.display = "none";
        gbid('register_button').style.display = "block";
    }
    else
        nebPaySimulateCall("0", "register", "[\""+noteName+"\",\""+password+"\"]", callFunc);
}