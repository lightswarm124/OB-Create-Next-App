pragma solidity ^0.4.18;

import "./SafeMathLib.sol";

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
