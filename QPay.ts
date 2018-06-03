class Qpay{
    
    constructor() {
        // define fields stored to state trie.
        LocalContractStorage.defineMapProperties(this, {
            walletAddress_UserInfo: null,
            idNumber: null,
            userName:null,
            sumAccountCount:null,

        });
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