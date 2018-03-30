pragma solidity ^0.4.18;

//SafeMathLib.sol
library SafeMathLib {
	function SafeMul(uint256 a, uint256 b) internal pure returns (uint256) {
		if (a == 0) {
			return 0;
		}
		uint256 c = a * b;
		assert(c / a == b);
		return c;
	}

	function SafeDiv(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a / b;
		return c;
	}

	function SafeSub(uint256 a, uint256 b) internal pure returns (uint256) {
		assert(b <= a);
		return a - b;
	}

	function SafeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
		uint256 c = a + b;
		assert(c >= a);
		return c;
	}
}

//ERC20Lib.sol
library ERC20Lib {
    using SafeMathLib for uint;

    struct TokenStorage {
        mapping (address => uint) balances;
        mapping (address => mapping (address => uint)) allowed;
        uint totalSupply;
    }

    function init(TokenStorage storage self, uint _initialSupply) public {
        self.totalSupply = _initialSupply;
        self.balances[msg.sender] = _initialSupply;
    }

    function balanceOf(TokenStorage storage self, address _owner) public constant returns (uint balance) {
        return self.balances[_owner];
    }

    function transfer(TokenStorage storage self, address _to, uint _value) public returns (bool success) {
        self.balances[msg.sender] = self.balances[msg.sender].SafeSub(_value);
        self.balances[_to] = self.balances[_to].SafeAdd(_value);
        Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(TokenStorage storage self, address _from, address _to, uint _value) public returns (bool success) {
        uint _allowance = self.allowed[_from][msg.sender];

        self.balances[_from] = self.balances[_from].SafeSub(_value);
        self.balances[_to] = self.balances[_to].SafeAdd(_value);
        self.allowed[_from][msg.sender] = _allowance.SafeSub(_value);
        Transfer(_from, _to, _value);
        return true;
    }

    function approve(TokenStorage storage self, address _spender, uint _value) public returns (bool success) {
        self.allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(TokenStorage storage self, address _owner, address _spender) public constant returns (uint balance) {
        return self.allowed[_owner][_spender];
    }

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

//OpenBountyLib.sol
library OpenBountyLib {
    struct BountyStorage {
        lockState bountyStatus;
        address ProjectOwner;
        mapping (address => bool) ProjectManagers;
        mapping (bytes32 => pullRequestStruct) pullRequests;
        uint lockBlockNumber;
        uint unlockBlockNumber;
    }

    struct pullRequestStruct {
        address bountyHunter;
        address approveManager;
        uint bountyValue;
        lockState pullRequestStatus;
    }

    enum lockState {
        Pending,
        Approved
    }

    function init (BountyStorage storage self) public {
        self.ProjectOwner = msg.sender;
        self.ProjectManagers[msg.sender] = true;
        self.lockBlockNumber = 0;
        self.unlockBlockNumber = 0;
    }

    function isBountyManager (BountyStorage storage self, address account) public view returns (bool isTrue) {
        return self.ProjectManagers[account];
    }

    function isProjectOwner (BountyStorage storage self, address account) public view returns (bool isTrue) {
        if (self.ProjectOwner == account){
			return true;
		}
	 	return false;
    }

    function changeProjectOwner (BountyStorage storage self, address _newProjectOwner) public returns (address newOwner) {
        require (msg.sender == self.ProjectOwner
				&& _newProjectOwner != address(0)
				&& _newProjectOwner != self.ProjectOwner
				&& self.bountyStatus != lockState.Approved);
        self.ProjectOwner = _newProjectOwner;
        OwnerChanged(msg.sender, self.ProjectOwner);
        return self.ProjectOwner;
    }

    function addManager (BountyStorage storage self, address _newManager) public returns (bool success) {
        require (msg.sender == self.ProjectOwner);
        self.ProjectManagers[_newManager] = true;
        ManagerAdded(_newManager);
        return true;
    }

    function delManager (BountyStorage storage self, address _oldManager) public returns (bool success) {
        require (msg.sender == self.ProjectOwner);
        self.ProjectManagers[_oldManager] = false;
        ManagerDeleted(_oldManager);
        return true;
    }

    function lockProjectBounty (BountyStorage storage self) public returns (bool success) {
	require(self.ProjectManagers[msg.sender] == true);
        self.bountyStatus = lockState.Pending;
        self.lockBlockNumber = block.number;
        BountyPending(msg.sender, self.lockBlockNumber);
        return true;
    }

    function unlockProjectBounty (BountyStorage storage self) public returns (bool success) {
        require(msg.sender == self.ProjectOwner);
        self.bountyStatus = lockState.Approved;
        self.unlockBlockNumber = block.number;
        BountyPending(msg.sender, self.unlockBlockNumber);
        return true;
    }

    function submitBounty (BountyStorage storage self, uint _tokenAmount, bytes32 _pullRequestID) public returns (bool success) {
        require(self.pullRequests[_pullRequestID].pullRequestStatus != lockState.Approved);
        require(self.pullRequests[_pullRequestID].bountyHunter == address(0) || self.pullRequests[_pullRequestID].bountyHunter == msg.sender);
        self.pullRequests[_pullRequestID] = pullRequestStruct ({
            bountyHunter: msg.sender,
            approveManager: address(0),
            bountyValue: _tokenAmount,
            pullRequestStatus: lockState.Pending
        });
        BountySubmitted(msg.sender, _tokenAmount, _pullRequestID);
        return true;
    }

    function acceptBounty (BountyStorage storage self, bytes32 _pullRequestID) public returns (bool success) {
        require(self.pullRequests[_pullRequestID].pullRequestStatus == lockState.Pending && self.ProjectManagers[msg.sender] == true && self.pullRequests[_pullRequestID].approveManager == address(0));
        self.pullRequests[_pullRequestID].approveManager = msg.sender;
        self.pullRequests[_pullRequestID].pullRequestStatus = lockState.Approved;
        BountyAccepted(msg.sender, self.pullRequests[_pullRequestID].bountyHunter, self.pullRequests[_pullRequestID].bountyValue);
        return true;
    }

    event OwnerChanged (address _oldOwner, address _newOwner);
    event ManagerAdded (address _newManager);
    event ManagerDeleted (address _oldManager);
    event BountySubmitted (address _bountyHunter, uint _tokenAmount, bytes32 _pullRequestID);
    event BountyAccepted (address _projectManager, address _bountyHunter, uint _amount);
    event BountyFunded (address _funder, uint _amount);
    event BountyPending (address _locker, uint _lockBlockTime);
    event BountyApproved (address _unlocker, uint _unlockBlockTime);
    event BountyCLaimed (address _bountyHunter, uint _tokenAmount, uint _etherAmount);
}

//OpenBounty.sol
contract OpenBounty {
    using ERC20Lib for ERC20Lib.TokenStorage;
    using OpenBountyLib for OpenBountyLib.BountyStorage;

    ERC20Lib.TokenStorage token;
    OpenBountyLib.BountyStorage bounty;

    function OpenBounty(uint _initialSupply) public {
        bounty.init();
        token.init(_initialSupply);
    }

    function projectOwner() public view returns (address ownerAddress) {
        return bounty.ProjectOwner;
    }

    function lockBlockNumber() public view returns (uint blockNumber) {
        return bounty.lockBlockNumber;
    }

    function unlockBlockNumber() public view returns (uint blockNumber) {
        return bounty.unlockBlockNumber;
    }

    function isBountyManager(address account) public view returns (bool isTrue) {
        return bounty.isBountyManager(account);
    }

    function isProjectOwner(address account) public view returns (bool isTrue) {
        return bounty.isProjectOwner(account);
    }

    function changeProjectOwner(address _newProjectOwner) public returns (address newOwner) {
        return bounty.changeProjectOwner(_newProjectOwner);
    }

    function addManager(address _newManager) public returns (bool success) {
        return bounty.addManager(_newManager);
    }

    function delManager(address _oldManager) public returns (bool success) {
        return bounty.delManager(_oldManager);
    }

    function lockProjectBounty() public returns (bool success) {
        return bounty.lockProjectBounty();
    }

    function unlockProjectBounty() public returns (bool success) {
        return bounty.unlockProjectBounty();
    }

    function submitBounty(uint _tokenAmount, bytes32 _pullRequestID) public returns (bool success) {
        return bounty.submitBounty(_tokenAmount, _pullRequestID);
    }

    function acceptBounty(bytes32 _pullRequestID) public returns (bool success) {
        bounty.acceptBounty(_pullRequestID);
        address bountyHunter = bounty.pullRequests[_pullRequestID].bountyHunter;
        uint tokenAmount = bounty.pullRequests[_pullRequestID].bountyValue;
        return token.transfer(bountyHunter, tokenAmount);
    }

    function claimBounty(uint _tokenAmount) public returns (bool success) {
        require(
            bounty.lockBlockNumber < bounty.unlockBlockNumber
            && bounty.bountyStatus == OpenBountyLib.lockState.Approved
            && token.balanceOf(msg.sender) >= _tokenAmount
            && msg.sender != bounty.ProjectOwner);
        uint tokenRatio = _tokenAmount / token.totalSupply;
        uint bountyAmount = this.balance * tokenRatio;
		require(this.balance > bountyAmount);
        msg.sender.transfer(bountyAmount);
        return true;
    }

    function totalSupply() public constant returns (uint tokenSupply) {
        return token.totalSupply;
    }

    function balanceOf(address who) public constant returns (uint balance) {
        return token.balanceOf(who);
    }

    function transfer(address to, uint value) public returns (bool success) {
        return token.transfer(to, value);
    }

    function transferFrom(address from, address to, uint value) public returns (bool success) {
        return token.transferFrom(from, to, value);
    }

    function approve(address spender, uint value) public returns (bool success) {
        return token.approve(spender, value);
    }

    function allowance(address owner, address spender) public constant returns (uint balance) {
        return token.allowance(owner, spender);
    }

	function () public payable {
		BountyFunded(msg.sender, msg.value);
	}

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

    event OwnerChanged (address _oldOwner, address _newOwner);
    event ManagerAdded (address _newManager);
    event ManagerDeleted (address _oldManager);
    event BountySubmitted (address _bountyHunter, uint _tokenAmount, bytes32 _pullRequestID);
    event BountyAccepted (address _projectManager, address _bountyHunter, uint _amount);
    event BountyFunded (address _funder, uint _amount);
    event BountyPending (address _locker, uint _lockBlockTime);
    event BountyApproved (address _unlocker, uint _unlockBlockTime);
    event BountyCLaimed (address _bountyHunter, uint _tokenAmount, uint _etherAmount);
}

contract TokenRegistry1 {

	event TokenAdded(address indexed token, bytes32 dataVerHash);
	event TokenRemoved(address indexed token, bytes32 dataVerHash);

	struct TokenDataStruct {
		address token;
		bytes32 dataVerHash;
	}

	mapping(address => TokenDataStruct) public tokens;
	mapping(bytes32 => address) tokenDataHash;

	address[] public tokenAddressList;
	address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

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

	function TokenRegistry1() public {
	    owner = msg.sender;
	}

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }

	function addToken(bytes32 _dataVerHash, uint256 _initialSupply) public {
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

	function() public payable {
		revert();
	}
}
