pragma solidity ^0.4.18;

import "./ERC20Lib.sol";
import "./OpenBountyLib.sol";
import "./OpenBounty.sol";

contract Ownable {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function Ownable() public {
	    owner = msg.sender;
	}

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }
}

contract TokenRegistry is Ownable {

	event TokenAdded(address indexed token, bytes32 dataVerHash);
	event TokenRemoved(address indexed token, bytes32 dataVerHash);


	struct TokenDataStruct {
		address token;
		bytes32 dataVerHash;
	}

	mapping(address => TokenDataStruct) public tokens;
	mapping(bytes32 => address) tokenDataHash;

	address[] public tokenAddressList;

	modifier alreadyRegistered(address _token) {
		require(tokens[_token].token != address(0));
		_;
	}

	modifier notYetRegistered(address _token) {
		require(tokens[_token].token == address(0));
		_;
	}

	modifier noNameRegistered(bytes32 _dataVerHash) {
		require(tokenDataHash[_dataVerHash] == address(0));
		_;
	}

	modifier notNullAddress(address _address) {
		require(_address != address(0));
		_;
	}

	function addToken(uint _initialSupply, bytes32 _dataVerHash) public
		noNameRegistered(_dataVerHash)
	{
		OpenBounty OB = new OpenBounty(_initialSupply);
		tokens[OB] = TokenDataStruct({
			token: OB,
			dataVerHash: _dataVerHash
		});
		tokenAddressList.push(OB);
		tokenDataHash[_dataVerHash] = OB;
		TokenAdded(OB, _dataVerHash);
	}

	function removeToken(address _token, uint _index) public
		onlyOwner
		alreadyRegistered(_token)
	{
		require(tokenAddressList[_index] == _token);
		tokenAddressList[_index] = tokenAddressList[tokenAddressList.length - 1];	//moves indexed address to last entry
		tokenAddressList.length -= 1;												//delete last entry
		delete tokenDataHash[tokens[_token].dataVerHash];
		delete tokens[_token];
	}

	function getTokenByDataHash(bytes32 _dataVerHash) public view returns (address) {
		return tokenDataHash[_dataVerHash];
	}

	function getDataHashByAddress(address _token) public view returns (bytes32) {
		return tokens[_token].dataVerHash;
	}

	function getTokenAddressList() public view returns (address[]) {
        return tokenAddressList;
	}
}
