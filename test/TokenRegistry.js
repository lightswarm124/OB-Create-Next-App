const OpenBounty = artifacts.require('./WIP/OpenBounty.sol');
const TokenRegistry = artifacts.require('./WIP/TokenRegistry.sol');

contract('Test TokenRegistry', (accounts) => {
	it('Test TokenRegistry for OpenBounty', async () => {
		let registry = await TokenRegistry.deployed();
	});
});
