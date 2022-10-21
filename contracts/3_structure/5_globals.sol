// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract Globals {
    function globals() public payable {
        assert(1 wei == 1); // 1
        assert(1 gwei == 1e9); // 1_000_000_000
        assert(1 ether == 1e18); // 1_000_000_000_000_000_000

        1 seconds;
        60 seconds;
        60 minutes;
        24 hours;
        7 days;

        block.number;
        block.timestamp + 10 days;
        block.gaslimit;

        gasleft();

        msg.sender;
        msg.value;
        msg.data;

        tx.origin;
    }
}
