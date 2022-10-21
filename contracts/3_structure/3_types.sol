// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "../2_greeter/Greetings.sol";

contract Types {
    // solidity é uma linguagem tipada, ou seja, os tipo de todas as variáveis deve ser sempre especificado

    // em solidity não existe os conceitos de null ou undefined; todas as variáveis nascem com seu valor "default", ou seja "zerado"

    // booleano
    bool state;

    // inteiros
    int signedValue; // int256
    uint unsignedValue; //uint256: 2**32 - 1
    uint8 oneByte; // uint16, uint32, uint64, uint128, uint256

    // bytes
    bytes code;
    bytes8 code8;
    bytes16 color;
    bytes32 seed;
    bytes29 what;

    // variáveis de ponto flutuante; sem grande utilidade pois têm suporte limitado da linguagem
    fixed foo;
    ufixed bar;

    // endereços (20 bytes: 0x57af10eD3469b2351AE60175d3C9B3740E1Bb649)
    address user;
    address payable account;

    // contratos
    Greeter greeter;

    // enums
    enum State {
        OPEN,
        CLOSED
    }

    // arrays
    uint256[] ids;
    string[] names;
    address[] accounts;
    bytes32[] seeds;

    // structs
    struct Box {
        uint256 id;
        string content;
    }

    // mappings
    mapping(address => uint256) balances;
}

contract ValueTypes {
    // VALUE TYPES: variáves que são passadas por valor

    // booleano
    bool state;

    // inteiros
    int signedValue; // int256
    uint unsignedValue; //uint256: 2**32 - 1
    uint8 oneByte; // uint16, uint32, uint64, uint128, uint256

    // bytes
    bytes code;
    bytes8 code8;
    bytes16 color;
    bytes32 word;
    bytes29 what;

    // variáveis de ponto flutuante; sem grande utilidade pois têm suporte limitado da linguagem
    fixed foo;
    ufixed bar;

    // endereços (20 bytes: 0x57af10eD3469b2351AE60175d3C9B3740E1Bb649)
    address user;
    address payable account;

    // contratos
    Greeter greeter;

    // enums
    enum State {
        OPEN,
        CLOSED
    }
}

contract RefereceTypes {
    // REFERENCE TYPES: variáves que não armazenam dados, mas sim o endereço do local do dado

    // arrays
    uint256[] ids;
    string[] names;
    address[] accounts;

    // structs
    struct Box {
        uint256 id;
        string content;
    }
}
