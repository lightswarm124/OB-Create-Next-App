const SimpleStorage = artifacts.require('./SimpleStorage.sol');

const SafeMathLib = artifacts.require('./WIP/SafeMathLib.sol');
const ERC20Lib = artifacts.require('./WIP/ERC20Lib.sol');
const OpenBountyLib = artifacts.require('./WIP/OpenBountyLib.sol');
const OpenBounty = artifacts.require('./WIP/OpenBounty.sol');

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);

    deployer.deploy(SafeMathLib);
    deployer.link(SafeMathLib, ERC20Lib);
    deployer.deploy(ERC20Lib);
    deployer.deploy(OpenBountyLib);
    deployer.link(ERC20Lib, OpenBounty);
    deployer.link(OpenBountyLib, OpenBounty);
    deployer.deploy(OpenBounty);
}
