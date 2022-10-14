// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

 contract Dao {
    mapping(address => uint256) public balances;

    function deposit() public payable {
        require(msg.value >= 1 ether, "Deposits must be no less than 1 Ether");
        balances[msg.sender] += msg.value;
    }

    function withdraw() public {
        // Check user's balance
        require(
            balances[msg.sender] >= 1 ether,
            "Insufficient funds.  Cannot withdraw"
        );
        uint256 bal = balances[msg.sender];

        // Withdraw user's balance
        (bool sent, ) = msg.sender.call{value: bal}("");
        require(sent, "Failed to withdraw sender's balance");

        // Update user's balance.
        balances[msg.sender] = 0;
    }

    function daoBalance() public view returns (uint256) {
        return address(this).balance;
    }
}