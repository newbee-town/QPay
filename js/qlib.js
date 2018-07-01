var NebPay = require("nebpay");     //https://github.com/nebulasio/nebPay
var nebPay = new NebPay();

var HttpRequest = require("nebulas").HttpRequest;
var Neb = require("nebulas").Neb;
var Account = require("nebulas").Account;
var Transaction = require("nebulas").Transaction;
var Unit = require("nebulas").Unit;
var neb = new Neb();
neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
var account, tx, txhash;
var tmpAccount = new Account();
var netchainID = 1001;
var tmpAccount = Account.NewAccount();
var j_contract_address = "n1qbJS9QzAEsb1A1xv4cw8VtCdBcd1pbYg3";


function gbid(id){
    return document.getElementById(id);
}

function input_focus(event, default_value){
    el = event.target;
    if(el.value == default_value)
        el.value="";
    el.style.color=black;
}



function call(callFunction, callArgs, func, error_func){
    var addr = j_contract_address;
    neb.api.call({
                    from: tmpAccount.getAddressString(),
                    to: addr,
                    value: 0,
                    nonce: 0,
                    gasPrice: '1000000',
                    gasLimit: '200000',
                    contract: getContract(callFunction, callArgs)
                })
                .then(function (resp) {
                    func(resp.result);
                })
                .catch(function (err) {
                    if(error_func!="undefine")
                        error_func(err);
                });
}

function nebPayCall(value, callFunction, callArgs, func){
    var to = j_contract_address;
    var serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: function(resp){ func(resp);}        //设置listener, 处理交易返回信息
    });
}

function nebPaySimulateCall(value, callFunction, callArgs, func){

    var to = j_contract_address;
    var serialNumber = nebPay.simulateCall(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: function(resp){ func(resp);}        //设置listener, 处理交易返回信息
    });
}

function getContract(func_name, args){
    return {"function":func_name,"args":args};
}

function getArgsS(args_array){
    var args_s = "["
    for (var i=0;i<args_array.length;i++){
        var new_node = "\""+args_array[i]+"\"";
        args_s += new_node;
        if(i!=args_array.length-1)
            args_s += ",";
    }
    args_s += "]";
    return args_s;
}