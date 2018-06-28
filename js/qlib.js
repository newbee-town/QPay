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

function call(addr, j_constract, func, error_func){
    neb.api.call({
                    from: tmpAccount.getAddressString(),
                    to: addr,
                    value: 0,
                    nonce: 0,
                    gasPrice: '1000000',
                    gasLimit: '200000',
                    contract: j_constract
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
    var to = j_constract_addr;
    serialNumber = nebPay.call(to, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
        listener: function(resp){ func(resp);}        //设置listener, 处理交易返回信息
    });
}