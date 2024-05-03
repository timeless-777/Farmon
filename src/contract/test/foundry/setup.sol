// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test} from "forge-std/Test.sol";
import {Farmon} from "../../contracts/Farmon.sol";

contract setup is Test {
    Farmon public farmon;
    address public admin = address(1);
    address public user1 = address(2);
    address public user2 = address(3);
    address public user3 = address(4);
    string public baseUri = "https://ipfs.com/";
    uint256 public category = 3;
    uint256 public freeMintDuration = 1000;

    function setUp() public {
        vm.startPrank(admin);
        farmon = new Farmon(
            baseUri,
            category,
            freeMintDuration
        );

        vm.label(admin, "Admin");
        vm.label(user1, "User1");
        vm.label(user2, "User2");
        vm.label(user3, "User3");

        vm.stopPrank();
    }
}
