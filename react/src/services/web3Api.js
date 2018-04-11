import Web3 from 'web3';
import initContract from 'truffle-contract';
import SimpleStorageDefinition from '../../../build/contracts/SimpleStorage.json';
import OpenBountyDefinition from '../../../build/contracts/OpenBounty.json';

const WEB3_PROVIDER_URL = __WEB3_PROVIDER_URL__;
let web3;

function initWeb3() {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider(__WEB3_PROVIDER_URL__));
  }
}

export function getAccounts() {
  initWeb3();
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts(
      (error, accounts) => (error ? reject(error) : resolve(accounts))
    );
  });
}

export function getContract(contractDefinition) {
  initWeb3();
  const contract = initContract(contractDefinition);
  contract.setProvider(web3.currentProvider);

  // Dirty hack for web3@1.0.0 support for localhost testrpc
  // see https://github.com/trufflesuite/truffle-contract/issues/56#issuecomment-331084530
  if (typeof contract.currentProvider.sendAsync !== 'function') {
    contract.currentProvider.sendAsync = function () {
      return contract.currentProvider.send.apply(
        contract.currentProvider, arguments
      );
    };
  }
  return contract.deployed();
}

export function getSimpleStorageContract() {
  return getContract(SimpleStorageDefinition);
}

export function getOpenBountyContract() {
  return getContract(OpenBountyDefinition);
}
