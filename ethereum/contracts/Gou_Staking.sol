// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Gou_Staking is Ownable {
    uint256 public totalStaked;
    uint256 public apy;

    address[] public stakers;

    mapping(address => bool) public isStaking;
    mapping(address => uint256) public stakedTime;
    mapping(address => uint256) public lastIssueTime;
    mapping(address => uint256) public rewards;
    mapping(address => uint256) public stakingBalance;

    ERC20 public gou;

    constructor(ERC20 _gou, uint256 _apy) {
        gou = ERC20(_gou);
        apy = _apy * 1e18;
    }

    function depositTokens(uint256 _amount) external {
        require(_amount > 99, "AMOUNT LESS THAN 100");
        require(
            gou.balanceOf(_msgSender()) / 1e18 >= _amount,
            "INSUFFICIENT BALANCE"
        );

        gou.transferFrom(_msgSender(), address(this), _amount * 1e18);
        stakingBalance[_msgSender()] += _amount;

        if (!isStaking[_msgSender()]) {
            stakedTime[_msgSender()] = block.timestamp;
            lastIssueTime[_msgSender()] = block.timestamp;
            isStaking[_msgSender()] = true;
            stakers.push(_msgSender());
        }

        totalStaked += _amount;
        apyUpdate();
    }

    function unstake() external {
        require(stakingBalance[_msgSender()] >= 100, "INSUFFICIENT BALANCE");
        require(isStaking[_msgSender()], "YOU ARE NOT STAKING!!!");

        uint256 bal = stakingBalance[_msgSender()];
        stakingBalance[_msgSender()] = 0;
        totalStaked -= bal;
        stakedTime[_msgSender()] = 0;
        lastIssueTime[_msgSender()] = 0;
        isStaking[_msgSender()] = false;
        gou.transfer(_msgSender(), bal * 1e18);
    }

    function claimRewards() external {
        require(rewards[_msgSender()] > 0, "YOU DONT REWARDS TO CLAIM!");
        require(
            (block.timestamp - stakedTime[_msgSender()]) >= 30 seconds,
            "WAIT FOR 24 HOURS BEFORE CLAIM!!!"
        );

        uint256 claimR = rewards[_msgSender()];
        rewards[_msgSender()] = 0;
        gou.transfer(_msgSender(), claimR);
    }

    function issueRewards() external onlyOwner {
        uint256 currentTime = block.timestamp;
        for (uint256 i = 0; i < stakers.length; i++) {
            address addy = stakers[i];
            uint256 duration = currentTime - lastIssueTime[addy];

            if (duration >= 1 days) {
                uint256 dRewards = ((apy / 100) * stakingBalance[addy]) / 365;
                uint256 dayss = duration / 1 days;
                rewards[addy] += dRewards * dayss;
                lastIssueTime[addy] = currentTime;
            }
        }
    }

    function apyUpdate() internal {
        apy = apy - (((apy / 100) * (10000 - totalStaked)) / 10000);
    }
}
