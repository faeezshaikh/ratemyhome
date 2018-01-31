import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Web3 from 'web3';

/*
  Generated class for the Web3ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Web3ServiceProvider {

  web3: any;
  icoContract: any;
  icoContractAddress: string;

  constructor(public http: HttpClient) {
    console.log('Hello Web3ServiceProvider Provider');
    this.icoContractAddress = '0xc3aeb85ccfee8f2e883e5cf7d03837cb192b12e8';

    if (typeof this.web3 !== 'undefined') {
          this.web3 = new Web3(this.web3.currentProvider);
    } else {
          this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

        // Step 2: Set default account (address)
        this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
        // Step 3: Get Interface to the contact - ABI from remix
        let abi = [
          {
            "constant": true,
            "inputs": [],
            "name": "getMaxPerContributor",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "getContribution",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "getTokenBalance",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getRegisteredTokenSupply",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getPoolCreator",
            "outputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "addr",
                "type": "address"
              }
            ],
            "name": "alreadyContributed",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getMyContribution",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getContributors",
            "outputs": [
              {
                "name": "",
                "type": "address[]"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getMinPerContributorn",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getMaxPoolAllocation",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [],
            "name": "getPoolBalance",
            "outputs": [
              {
                "name": "",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "name": "maxPoolAllocation1",
                "type": "uint256"
              },
              {
                "name": "maxPerContributor1",
                "type": "uint256"
              },
              {
                "name": "minPerContributor1",
                "type": "uint256"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "",
                "type": "uint256"
              }
            ],
            "name": "DepositForTokenReceived",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": false,
                "name": "contributor",
                "type": "address"
              },
              {
                "indexed": false,
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "withdrawal",
            "type": "event"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "contribution",
                "type": "uint256"
              }
            ],
            "name": "setMinPerContributorn",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "contribute",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "depositToken",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "tokenAddress",
                "type": "address"
              }
            ],
            "name": "registerToken",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [
              {
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "withdrawContribution",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          }
        ];
        var contract = this.web3.eth.contract(abi);
        
        // Step 4: Get Contract instance at the address from remix
        this.icoContract = contract.at(this.icoContractAddress);
        console.log("Got the smart contract ==> " , this.icoContract);

     
  }

   contribute(amount) {
      console.log('Calling contribute on smart contract' , amount);
      let res = this.icoContract.contribute({value:amount, gas:3000000});
      console.log('Result ===> ',res);
  }

  getPoolBalance() {
    let res = this.icoContract.getPoolBalance({gas:3000000});
    console.log("Pool Balance ==> ", res.toString());
    return res;
  }

  getMyContribution() {
    let res = this.icoContract.getMyContribution({gas:3000000});
    console.log('My contribution: ', res.toString());
    return res;
  }

}
