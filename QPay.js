"use strict";

var QPay = function(){
    LocalContractStorage.defineProperties(this, {
        sumAccountCount:null,
    });
    LocalContractStorage.defineMapProperties(this, {
        walletAddress_UserInfo: null,
        idNumber: null,
        userName: null,
        relation: null,
        
    });
};
    
QPay.prototype =  {
    init: function(){
        this.sumAccountCount = 0;
    },
    register: function(){
        var from = Blockchain.transaction.from;
        var tmpSumAccountCount = this.sumAccountCount;
        this.idNumber.put(tmpSumAccountCount, from);
        this.walletAddress_UserInfo.put(from, {"idNumber":tmpSumAccountCount, "address":from, "userName":null, "friend":[]});
        tmpSumAccountCount++;
        this.sumAccountCount = tmpSumAccountCount;
        return true;
    },

    setUserName: function(user_name){
        var from = Blockchain.transaction.from;
        var userInfo = this.walletAddress_UserInfo.get(from);
        userInfo.userName = user_name;
        return true;
    },

    addFriend: function(f_address){
        var from = Blockchain.transaction.from;
        var r = this.relation.get(from+'_'+f_address);
        if(r!=null)
            return ("You have been friend!");
        else{
        var userInfo = this.walletAddress_UserInfo.get(from);
        userInfo.friend.push({"address":f_address, "noteName":null});
        this.walletAddress_UserInfo.set(from, userInfo);
        this.relation.put(from+"_"+f_address, "true");
        return true;
        }
    },

    delFriend: function(f_address){
        var from = Blockchain.transaction.from;
        var userInfo = this.walletAddress_UserInfo.get(from);
        var f_list = userInfo.friend;
        var l_len = f_list.length;
        for(var i=0;i<l_len;i++){
            if(f_list[i].address == f_address){
                f_list.splice(i,1);
                break;
            }
        }
        userInfo.friend = f_list;
        this.walletAddress_UserInfo.set(from, userInfo);
        this.relation.del(from+"_"+f_address);
        return true;
    },

    getFriendList: function(){
        var from = Blockchain.transaction.from;
        var userInfo = this.walletAddress_UserInfo.get(from);
        return userInfo.friend;
    },

    _relationVerify: function(s_address, d_address){
        var r = this.relation.get(s_address+"_"+d_address);
        if(r==null)
            return false;
        else
            return true;
    },

    test: function(s_address, d_address){
        return this._relationVerify(s_address, d_address);
    }
};

module.exports = QPay;