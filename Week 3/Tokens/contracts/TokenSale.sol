// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AndrewERC20Token.sol";
import "./AndrewERC721Token.sol";

contract TokenSale is Ownable {
    uint256 public ratio;
    uint256 public price;
    AndrewERC20Token public paymentToken;
    AndrewERC721Token public nftContract;
    uint256 public withdrawableAmount;

    constructor(
        uint256 _ratio,
        uint256 _price,
        AndrewERC20Token _paymentToken,
        AndrewERC721Token _nftContract
    ) {
        ratio = _ratio;
        price = _price;
        paymentToken = _paymentToken;
        nftContract = _nftContract;
    }

    function buyTokens() external payable {
        paymentToken.mint(msg.sender, msg.value * ratio);
    }

    function returnTokens(uint256 _amount) external {
        paymentToken.burnFrom(msg.sender, _amount);
        payable(msg.sender).transfer(_amount / ratio);
    }

    function buyNFT(uint256 _tokenId) external {
        paymentToken.transferFrom(msg.sender, address(this), price);
        nftContract.safeMint(msg.sender, _tokenId);
        withdrawableAmount += price / 2;
    }

    function withdraw(uint256 _amount) external onlyOwner {
        withdrawableAmount -= _amount;
        paymentToken.transfer(owner(), _amount);
    }
}
