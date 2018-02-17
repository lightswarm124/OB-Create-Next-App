const SimpleStorage = artifacts.require('./SimpleStorage.sol');

const SafeMathLib = artifacts.require('./WIP/SafeMathLib.sol');
const ERC20Lib = artifacts.require('./WIP/ERC20Lib.sol');
const OpenBountyLib = artifacts.require('./WIP/OpenBountyLib.sol');
const OpenBounty = artifacts.require('./WIP/OpenBounty.sol');

module.exports = function (deployer,) {
    deployer.deploy(SimpleStorage);

    deployer.deploy(SafeMathLib);
    deployer.link(SafeMathLib, ERC20Lib);
    deployer.deploy(ERC20Lib);
    deployer.deploy(OpenBountyLib);
    deployer.link(ERC20Lib, OpenBounty);
    deployer.link(OpenBountyLib, OpenBounty);
<<<<<<< HEAD
    deployer.deploy(OpenBounty, 10000000);
=======
    deployer.deploy(OpenBounty, 18);
>>>>>>> 789b72b3a85e6806d23c367654c7f16a5ce5c013
}
