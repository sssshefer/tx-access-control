// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./AccessControl.sol";

contract Demo is AccessControl {
    bool paused;
    uint public mintedTokens;
    //for better optimization it is better to assign prepared keccak256 value to constant variables
    bytes32 public constant WITHDRAWER_ROLE =
        keccak256(bytes("WITHDRAWER_ROLE"));

    bytes32 public constant MINTER_ROLE = keccak256(bytes("MINTER_ROLE"));

    constructor(address _withdrawer, address _minter) {
        mintedTokens = 0;
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(WITHDRAWER_ROLE, _withdrawer);
        _grantRole(MINTER_ROLE, _minter);

        _setRoleAdmin(MINTER_ROLE, WITHDRAWER_ROLE);
    }

    function withdraw() external onlyRole(WITHDRAWER_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        paused = true;
    }

    function mint() external onlyRole(MINTER_ROLE) {
        mintedTokens += 1;
    }
}
