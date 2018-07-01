function friendTransferConfirm(){
    var nasValue = gbid('f_transfer_input').value;  
    qpayTransferNas(currentFriend.address, nasValue);
}

function loginButtonClick(){
    gbid('login_button').disabled = true;
    gbid('login_button').innerHTML= "正在登陆";
    gbid('login_info').style.display = "block";
    qLogin();
}

function showLoginDiv(){
    gbid('login_button').disabled = false;
    gbid('login_button').innerHTML= "立即登陆";
    gbid('login_info').style.display = "none";
    $('#login_div').modal('show');
}

function hideLoginDiv(){
    $('#login_div').modal('hide');
}

function registerButtonClick(){
    gbid('register_info').style.display = "block";
    gbid('register_button').style.display = "none";
    qRegister();
}

function showMainDiv(div_id){
    for(var i =0;i<mainDivList.length;i++)
        gbid(mainDivList[i]).style.display = "none";
    gbid(div_id).style.display = "block";
}

function afFindFriendButtonClick(){
    queryAccount(gbid('af_input').value);
}

function afAddFriendButtonClick(){
    if(gbid('af_note_name_input').value=="")
        alert("备注不能为空");
    else
        addFriend();
}

function userInfoButtonClick(){
    if(userInfo==null){
        showLoginDiv();        
    }
    else{
        viewInit();
    }
}

function viewInit(){
    gbid('user_info_button').innerHTML = "立即登陆";
    userInfo = null;
    friendList = null;
    currentFriend = null;
    gbid('parent_ul').innerHTML = "";
    gbid('af_info_user_name').innerHTML = "用户名:--";
    gbid('af_info_id_number').innerHTML = "QPay账号:--";
    gbid('af_info_wallet_address').innerHTML = "钱包地址:--";
    gbid('user_note_name').innerHTML = "用户名:--";
    gbid('user_wallet_address').innerHTML = "钱包地址:--";
    gbid('user_id_number').innerHTML = "QPay账号:--";
    showMainDiv('user_info_div');
    showLoginDiv(); 

}