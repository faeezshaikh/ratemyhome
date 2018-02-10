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
    event PercentContribution(address indexed contributor, uint percentage);
    event TokenBalance(address indexed contributor, uint percentage);
    
    
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
  
    
    // Token owner  invokes this method. msg.sender is the token owner that calls this function
      function depositToken(uint amount) public returns (bool) {
        require(token.transferFrom(msg.sender, address(this), amount) == true);
        require(tokenBalanceForAddress[poolCreator] + amount >= tokenBalanceForAddress[poolCreator]);
        // tokenBalanceForAddress[poolCreator] += amount;
        tokenBalanceForAddress[address(this)] += amount;
        // DepositForTokenReceived(poolCreator, amount, now);
        DepositForTokenReceived(address(this), amount, now);
        return true;
    }
    
    function registerAndDeposit(address tokenAddress,uint amount) public returns (bool) {
        registerToken(tokenAddress);
        depositToken(amount);
        return true;
    }
    
    function distributeTokens() public returns (bool) {
        uint tokens = tokenBalanceForAddress[address(this)];
          for(uint i=0;i<contributorsList.length;i++) {
            // var percentContribution = getPercentContribution(contributorsList[i]);
            // var numberOfTokens = getTokenPercentReward(percentContribution,tokens);
            var numberOfTokens = foo(contributorsList[i],tokens);
            // token.transferFrom(address(this),contributorsList[i],numberOfTokens);
            tokenBalanceForAddress[contributorsList[i]] += numberOfTokens;
            tokenBalanceForAddress[address(this)] -= numberOfTokens;
        }
        return true;
    }
    
    
     function foo(address addr,uint totalTokens) private constant returns (uint) {
        uint contrib = contributions[addr];
        uint poolBal = this.balance;
        uint ans = (contrib * totalTokens) / poolBal;
       return ans;
     }
    
    function getPercentContribution(address addr) private constant returns (uint) {
        uint contrib = contributions[addr];
        uint poolBal = this.balance;
        uint ans = contrib / poolBal;
       return ans;
     }
    
    function getTokenPercentReward(uint percentContribution,uint amt) internal pure  returns (uint) {
        uint p = percentContribution * amt;
        uint r = p/100;
            return r;
    }
    /*
            
       
        
        1. Anyone checks his ICO owner’s balance. GetTokenBalance(his addr)
        2. Anyone  checks the ‘getRegisteredTokenSupply’ (should be zero)
        3. Token owner approves the ICO pool creator(failed), ICO contract passed  —> In Token Contract
        4. Token Owner registers and deposits to token to ICO
        5. Anyone checks the ‘getRegisteredTokenSupply’ (should be max supply)
        6. Anyone checks his balance.. If its 10K that means ICO contract passed it on to the ICO pool creator

        -----
        1. User 1 logs to metamask and checks token total. (already registered token)
        2. User 2 logs to metamask and checks token total. (already registered token))
        1. User 1 sends ETH to ICO Pool Contract.
        2. User 2 sends ETH to ICO Pool.
        3. User 2 Closes the Pool and sends the ETH to ICO.
        4. ICO Owner deposits Tokens to ICO Pool.
        5. User 1 logs to metamask and checks token total.
        6. USer 2 logs to metamaks and checks token total.


        Prep:
        1. Start testrpc, connect remix to testrpc and use the THIRD addr to deploy FSCoin using the last address.
        2. Use First address to deploy ICO contract ...this needs to be made dynamic in the future.
        2. Connect Metamask to testrpc and add 3 accounts.. First two will be user1 and user2, third will be ICO owner.
        3. Register STAR Token in Metamask

        FSCoin Contract
        0x3d43cb0ae468f9414c983b62370d04dce9f0d789
        
        FSCoin Owner
        0x59cbf2040069fbd55e3430b53d1508dc1d83cd1e
        
        
        IcoPool Contract
        0x40371c6ed8307a4c0281fe623e5cbd4f266859e7
        
        IcoPool Owner
        0x9682760d9ce370cab9ded51ca71be04ea88fe796


        1. Logout of Metamask, Start testrpc, refresh remix and connect to testrpc and deploy IcoPool contract in remix using addr 1. 
        2. Copy ICO contract from remix to code. Copy ABI from remix to code.
        3. Login to Metamask using seed words from testrpc.
        4. Switch between main network and localhost:8545 in Metamask to refresh .
        5. Using addr 1 contribute 10 ETH. Check Pool balance and My contribution for addr 1.
        6. In Metamask 'create account' to switch to addr 2. Using addr2 contribute 20 ETH. Check balances.
        7. In Remix deploy FSCoin using addr3. Add FSCoin in Metamask using its contract address.

    */
     
     
  
}