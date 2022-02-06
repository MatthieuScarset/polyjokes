// SPDX-License-Identifier: None
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

// Defines `Texts` contract.
contract Texts is Ownable {
    event WriteText(address owner, uint256 i);
    event EraseText(address owner, uint256 i);

    mapping(address => string[]) private texts;

    function getTexts() public view returns (string[] memory) {
        return texts[msg.sender];
    }

    function getTexts(address author) public view returns (string[] memory) {
        return texts[author];
    }

    // @dev Make this payable later.
    function writeText(string memory text) public returns (uint256) {
        texts[msg.sender].push(text);
        uint256 i = texts[msg.sender].length;
        emit WriteText(msg.sender, i);
        return i;
    }

    function eraseText(uint256 i) public returns (bool) {
        delete texts[msg.sender][i];
        emit EraseText(msg.sender, i);
        return true;
    }
}
