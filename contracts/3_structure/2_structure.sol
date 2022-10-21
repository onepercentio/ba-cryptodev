// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// Contratos em solidity são simliares a classes em linguagens orientadas a objetos
// interface StructureContract {
// library StructureContract {
contract StructureContract {

    // state variables: variáveis cujos valores são armazenados no storage do contrato
    address payable public owner;
    string public greeting;
    Payment public payment;

    // events: interfaces de conveniência para o sistema de logging da EVM
    event GreetingChanged(string _old, string _new);

    // errors: permite criar erros com nomes descritivos e adicionar valores
    error UnauthorizedUser(address received, address expected);

    // function modifiers: blocos de código que podem ser "enxertados" em funções
    modifier onlyOwner() {
      if (msg.sender != owner) {
        revert UnauthorizedUser(msg.sender, owner);
      }
      _;
    }

    // structs: tipos definidos pelo usuário
    struct Payment {
      address payer;
      uint256 value;
      PaymentState state;
    }

    // enums: constantes definidas pelo usuário
    enum PaymentState {
      PAID, // 0
      CANCELED // 1
    }

    // constructor: tipo especial de função executado somente na publicação do contrato
    constructor(string memory _greeting, address _paymentToken) {
        greeting = _greeting;
        owner = payable(msg.sender);
        payment = Payment(msg.sender, 1000, PaymentState.PAID);
    }

    // funções: unidades executáveis de código, permitem a interação com o contrato
    function greet(string memory _name) view public returns (string memory) {
        return string.concat(greeting, _name, "!");
    }

    function updateGreeting(string memory _newGreeting) public payable {
        require(msg.value >= 1 ether, "You should pay at least 1 ETH do update the greeting");


        owner.transfer(msg.value);

        emit GreetingChanged(greeting, _newGreeting);

        greeting = _newGreeting;
    }

    function adminUpdate(string memory _newGreeting)
      public
      onlyOwner
    {
      // >>
      emit GreetingChanged(greeting, _newGreeting);

      greeting = _newGreeting;
    }
}