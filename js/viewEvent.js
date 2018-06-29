function friendTransferConfirm(){
    var nasValue = gbid('f_transfer_input').value;  
    qpayTransferNas(currentFriend.address, nasValue);
}