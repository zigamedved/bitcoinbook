// inspired by @simplyexplained on YT
const SHA256 = require('crypto-js/sha256')

class Block{
  constructor(index, timestamp, data, previousHash = ""){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      this.nonce +
      JSON.stringify(this.data)).toString();
  }    

  mineBlock(difficulty){
    while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("c")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: ", this.hash);
  }

}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 5
  }

  createGenesisBlock(){
    return new Block(0, "01/01/2017", "Genesis block", "0")
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i-1]

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false
      }

      if(currentBlock.previousHash !== previousBlock.hash){
        return false
      }
    }
    return true
  }
}

let aero = new Blockchain();

console.log("Mining block 1...")
aero.addBlock(new Block(1,"10/10/2017", { amount: 1 }))
console.log("Mining block 2...")
aero.addBlock(new Block(2,"10/11/2017", { amount: 5 }))