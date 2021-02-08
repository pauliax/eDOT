// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.7.6;

import "../lib/Select.sol";

contract IOracleMock {
    event ReturnValueUInt256(uint256 val);
}

contract SelectMock is IOracleMock {
    function computeMedian(uint256[] memory data, uint256 size) external returns (uint256)
    {
        uint256 result = Select.computeMedian(data, size);
        emit ReturnValueUInt256(result);
        return result;
    }
}
