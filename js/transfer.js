function qpayTransfer(to, value){
    value = parseFloat(value);
    value /= 1e18;
    qpayTransferNas(to, value.toString());
}

function qpayTransferNas(to, value){
    nebPay.pay(to, value);
}