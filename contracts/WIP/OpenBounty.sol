pragma solidity ^0.4.18;

import "./ERC20Lib.sol";
import "./OpenBountyLib.sol";

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

    function isBountyManager(address account) public view returns (bool isTrue) {
        return bounty.isBountyManager(account);
    }

    function isProjectOwner(address account) public view returns (bool isTrue) {
        return bounty.isProjectOwner(account);
    }

    function checkBlockLock () public view returns (bool unlock) {
        return bounty.checkBlockLock();
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
		require(bounty.bountyStatus != OpenBountyLib.lockState.Inactive);
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
