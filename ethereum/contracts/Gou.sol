// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Uchiha is ERC20 {
    address public _owner;
    uint public claimAmount = 100 * 1e18;
    mapping(address => bool) public whitelistedAddresses;
    mapping(address => bool) public claimedAddresses;


    constructor(uint totalSupply) ERC20('Ghost Of Uchiha', 'GOU') {
        _owner = msg.sender;
        _mint(address(this), totalSupply * 1e18);
    }

    function mint(uint amount) public owner {
        _mint(address(this), amount * 1e18);
    }

    function burn(uint amount) public owner {
        _burn(address(this), amount * 1e18);
    }

     function claimableAmount(uint amount ) public owner returns (uint){
         return claimAmount = amount * 1e18 ;
    }
    
    function whitelistAddress() public {
        whitelistedAddresses[msg.sender] = true;
    }

    function claim() public {
        require(whitelistedAddresses[msg.sender]);
        require(!claimedAddresses[msg.sender]);
        
        ERC20(address(this)).transfer(msg.sender, claimAmount);
        claimedAddresses[msg.sender] = true;
    }

    modifier owner() {
        require(msg.sender == _owner, 'Only owner!!!');
        _;
    }
}