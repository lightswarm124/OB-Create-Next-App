const SafeMathLib = artifacts.require('./WIP/SafeMathLib.sol');
const ERC20Lib = artifacts.require('./WIP/ERC20Lib.sol');
const OpenBountyLib = artifacts.require('./WIP/OpenBountyLib.sol');
const OpenBounty = artifacts.require('./WIP/OpenBounty.sol');
const TokenRegistry = artifacts.require('./WIP/TokenRegistry.sol');

module.exports = function (deployer) {
	deployer.deploy(TokenRegistry);
    deployer.deploy(SafeMathLib);
    deployer.link(SafeMathLib, ERC20Lib);
    deployer.deploy(ERC20Lib);
    deployer.deploy(OpenBountyLib);
    deployer.link(ERC20Lib, OpenBounty);
    deployer.link(OpenBountyLib, OpenBounty);
    deployer.deploy(OpenBounty, 100000000);
}
