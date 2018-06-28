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
        questionLuckyMoney: null,
        questionLuckyMoneyList: null,
        questionLuckyMoneyRecord: null,
        questionLuckyMoneyCount: null,
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
        this.questionLuckyMoneyList.put(from, []);
        this.questionLuckyMoneyRecord.put(from, []);
        this.questionLuckyMoneyCount.put(from, 0);
        return true;
    },

    login: function(){
        var value = Blockchain.transaction.value;
        var from = Blockchain.transaction.from;
        if(value<1)
            throw new Error("login error");
        return this.walletAddress_UserInfo(from);
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

    setQuestionLuckyMoney:function(question, answer, num){
        var from = Blockchain.transaction.from;
        var tmpQuestionCount = this.questionLuckyMoneyCount.get(from);
        var question_id = from + "_" +tmpQuestionCount;
        this.questionLuckyMoneyCount.set(from, tmpQuestionCount+1);
        var tmpQuestionRecord = this.questionLuckyMoneyRecord.get(from);
        tmpQuestionRecord.push(question_id);
        this.questionLuckyMoneyRecord.set(from, tmpQuestionRecord);
        var tmpQuestionList = this.questionLuckyMoneyList.get(from);
        tmpQuestionList.push(question_id);
        this.questionLuckyMoneyList.set(from, tmpQuestionList);

        var value = this.transaction.value;
        if(value<parseInt(num))
            return false;
        else{
            this.questionLuckyMoney.put(question_id, {"question":question, "answer":answer, "value":value, "num":num, "receiverList":[]});
            return true;
        }
    },

    getQuestionLuckyMoney:function(owner ,question_id, answer){
        var question = this.questionLuckyMoney.get(question_id);
        if(question==null)
            throw new Error("红包不存在");
        if(question.num=="0")
            throw new Error("红包已经发完");
        if(question.answer==answer){
        var value = parseInt(question.value);
        var num = parseInt(question.num);
        var luckyMoney = 0;
        if(num == 1)
            luckyMoney = num;
        else
            luckyMoney = Math.floor(value/num);
        var receiverList = question.receiverList;
        for(var i =0;i<receiverList.length;i++)
            if(receiverList[i]==from)
                throw("你已经领取该红包");
        
        Blockchain.transfer(from, luckyMoney.toString());
        receiverList.push(from);
        num--;
        value -= luckyMoney;
        question.num = num.toString();
        question.value = value.toString();
        question.receiverList = receiverList;
        this.questionLuckyMoney.set(question_id, question);

        if(num==0){
            var tmpQuestionList = this.questionLuckyMoneyList.get(owner);
            for(var i=0;i<tmpQuestionList.length;i++)
                if(tmpQuestionList[i]==question_id){
                    tmpQuestionList.splice(i,1);
                    this.questionLuckyMoneyList.set(owner, tmpQuestionList);
                    break;
                }
        }
        return true;
        }
        else
            return false;
    },

    getQuestionLuckyMoneyList: function(owner){
        return this.questionLuckyMoneyList(owner);
    },
    getQuestionLuckyMoneyRecord: function(){
        return this.questionLuckyMoneyRecord(Blockchain.transaction.from);
    },
    test: function(s_address, d_address){
        return this._relationVerify(s_address, d_address);
    }
};

module.exports = QPay; 