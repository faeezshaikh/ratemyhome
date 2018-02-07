pragma solidity ^0.4.18;


contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

contract IcoPool {
    
    address icoContract;
    address poolCreator;
    uint maxPoolAllocation;
    uint maxPerContributor;
    uint minPerContributor;
    address[] admins;
    address[] whitelist;
    mapping (address => bool) contributors;
    address[] contributorsList;
    uint fee;
    bool automaticDistribution;
    
    struct erc20token {
        address tokenAddress;
        string name;
    }
    mapping (address => uint) tokenBalanceForAddress;
    
    ERC20Interface token;
   
    mapping (address => uint) contributions;
    
    modifier onlyPoolCreator() {
        if (msg.sender == poolCreator) {
            _;
        }
    }
    
    event withdrawal(address contributor, uint amount);
    event DepositForTokenReceived(address, uint, uint);
    
    function IcoPool( uint maxPoolAllocation1, uint maxPerContributor1, uint minPerContributor1) public {
        poolCreator = msg.sender;
        minPerContributor = minPerContributor1;
        maxPerContributor = maxPerContributor1;
        maxPoolAllocation = maxPoolAllocation1;
    }
    
    //// Getters /////
    
    function getMaxPoolAllocation() constant public returns(uint) {
        return maxPoolAllocation;
    }
    function getMaxPerContributor() constant public returns(uint) {
        return maxPerContributor;
    }
    
     function getMinPerContributorn() constant public returns(uint) {
        return minPerContributor;
    }
    
     
     function getPoolBalance() constant public returns(uint) {
        return this.balance;
    }
     function getPoolCreator() constant public returns(address) {
        return poolCreator;
    }
    
     function getContributors() public constant returns(address[]) {
        return contributorsList;
    }
    function getMyContribution() public constant returns (uint) {
        return contributions[msg.sender];
    }
    function getContribution(address addr) public constant returns (uint) {
        return contributions[addr];
    }
      
    function getRegisteredTokenSupply() public constant returns (uint) {
        return token.totalSupply();
    }
    
      
    function getTokenBalance(address addr) public constant returns (uint) {
        return tokenBalanceForAddress[addr];
    }
    ////// Setters ////////
    
      function setMinPerContributorn(uint contribution) public {
          require(contribution < maxPerContributor);
         minPerContributor = contribution;
    }
    
    function contribute() public payable {
        contributions[msg.sender] += msg.value;
        
           if(!alreadyContributed(msg.sender)) contributorsList.push(msg.sender); 
           contributors[msg.sender] = true;
    }
    
    
    function alreadyContributed(address addr) public constant returns (bool) {
        if(contributors[addr]) return true;
        return false;
    }
    
   
    
    function withdrawContribution(uint amount) public  returns (bool) {
        require(contributions[msg.sender] > 0);
        require(contributions[msg.sender] >= amount);
        require(this.balance >= amount);
        
        contributions[msg.sender] -= amount;
        msg.sender.transfer(amount);
        
        if(contributions[msg.sender] == 0) contributors[msg.sender] = false;
        withdrawal(msg.sender,amount);
        return true;
    }
    
    function registerToken(address tokenAddress) public returns (bool){
        require(tokenAddress != address(0));
        token = ERC20Interface(tokenAddress);
        return true;
    }
  
    
    // Token owner most likely invokes this method. msg.sender is the token owner that calls this function
     function depositToken(uint amount) public returns (bool) {
        require(token.transferFrom(msg.sender, address(this), amount) == true);
        require(tokenBalanceForAddress[poolCreator] + amount >= tokenBalanceForAddress[poolCreator]);
        tokenBalanceForAddress[poolCreator] += amount;
        DepositForTokenReceived(poolCreator, amount, now);
        return true;
    }
    
    function registerAndDeposit(address tokenAddress,uint amount) public returns (bool) {
        registerToken(tokenAddress);
        depositToken(amount);
        return true;
    }
    
    function distributeTokens(uint tokens) public  {
          for(uint i=0;i<=contributorsList.length;i++) {
            var percentContribution = getPercentContribution(contributorsList[i]);
            var numberOfTokens = getTokenPercentReward(percentContribution,tokens);
            tokenBalanceForAddress[contributorsList[i]] += numberOfTokens;
        }
    }
    
    function getPercentContribution(address addr) private constant returns (uint) {
       return contributions[addr] / this.balance;
    }
    
    function getTokenPercentReward(uint percentContribution,uint amt) internal pure  returns (uint) {
            return (percentContribution * amt) / 100;
    }
    /*
            
        FSCoin Contract
        0x063ff877d3b5f65d263c1be6cbe7f2ad9449d8d0
        
        FSCoin Owner
        0x685b52098293cfb4e93be80303f7d667e8106035
        
        
        IcoPool Contract
        0x116044f5d5b966be963cb4d7de4e741eeb52c127
        
        IcoPool Owner
        0x67a1e27c036fe8325feb30812ded1b51475c4915
        
        1. Anyone checks his ICO owner’s balance. GetTokenBalance(his addr)
        2. Anyone  checks the ‘getRegisteredTokenSupply’ (should be zero)
        3. Token owner approves the ICO pool creator(failed), ICO contract passed  —> In Token Contract
        4. Token Owner registers and deposits to token to ICO
        5. Anyone checks the ‘getRegisteredTokenSupply’ (should be max supply)
        6. Anyone checks his balance.. If its 10K that means ICO contract passed it on to the ICO pool creator

    */
     
  
}