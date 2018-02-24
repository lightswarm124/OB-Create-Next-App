const OpenBounty = artifacts.require('./WIP/OpenBounty.sol');
const TokenRegistry = artifacts.require('./WIP/TokenRegistry.sol');

contract('Test TokenRegistry', (accounts) => {
	it('Test TokenRegistry for OpenBounty', async function () {
		const owner = accounts[0];
		const newRegistry = await TokenRegistry.new({ from: owner });
		const newOwner = await newRegistry.transferOwnership(accounts[1], { from: owner });
		const newOwner2 = await newRegistry.transferOwnership(owner, { from: newOwner });
	});
});
