class Qpay{
    
    constructor() {        // define fields stored to state trie.
        LocalContractStorage.defineProperties(this, {
            sumAccountCount:null,
        });
        LocalContractStorage.defineMapProperties(this, {
            walletAddress_UserInfo: null,
            idNumber: null,
            userName:null,
            
            
        });
    }

    register(){
        var from = Blockchain.transaction.from;
        var tmpSumAccountCount = this.sumAccountCount;
        
    }
    // init function.
    init(height, width) {
        this.height = height;
        this.width = width;
    }

    // calc area function.
    calcArea() {
        return this.height * this.width;
    }

    // verify function.
    verify(expected) {
        let area = this.calcArea();
        if (expected != area) {
            throw new Error("Error: expected " + expected + ", actual is " + area + ".");
        }
    }
}