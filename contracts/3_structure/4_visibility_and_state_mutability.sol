// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

contract Visibility {

    address public owner;
    address[] internal balances;
    uint256 private maxDepositAmount;
    string name; // padrão: internal

    function externalOnly() external {}

    function everyone() public {}

    function internalOnly() internal {}

    function thisContractOnly() private {}

    // function defaultPublic() {} // compiler error
}

contract StateMutability {

    function modifyState() public {}

    function readStateOnly() view public {}

    function onlyLogic() pure public {}

    function receivesETH() payable public {}

    // executada quando uma transferência de ETH é recebida sem payload
    receive() payable external {}

    // executada quando uma função desconhecida é chamada (opcionalmente recebe eth)
    fallback() external {}
    // fallback() external payable {}

}