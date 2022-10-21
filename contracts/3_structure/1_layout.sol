// SPDX-License-Identifier: MIT

// Comentários
/**
 * Comentários
 */
/// Comentários

// version pragma: usado para indicar para qual versão do compilador este contrato foi escrito
pragma solidity 0.8.17;
// pragma solidity >=0.8.0 <=0.8.5;
// pragma solidity ^0.8.17;

// abi code pragma: utilizado para indicar que o contrato utilizava features experimentais, que foram incorporadas a partir da versão 0.7.4
pragma abicoder v2;

// importação de contratos: importante para a modularização do código; durante a compilação, todos os contratos são anexados e geram um único bytecode
import "hardhat/console.sol";
import "../2_greeter/Greetings.sol";

contract LayoutContract {}