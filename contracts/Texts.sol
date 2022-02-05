// SPDX-License-Identifier: None
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

// Defines `Texts` contract.
contract Texts is Ownable {
    event Write(address owner, uint256 i);
    event Erase(address owner, uint256 i);

    mapping(address => string[]) public texts;

    // @dev Make this payable later.
    function write(string memory text) public returns (uint256) {
        texts[msg.sender].push(text);
        uint256 i = texts[msg.sender].length;
        emit Write(msg.sender, i);
        return i;
    }

    function erase(uint256 i) public returns (bool) {
        delete texts[msg.sender][i];
        emit Erase(msg.sender, i);
        return true;
    }
}
