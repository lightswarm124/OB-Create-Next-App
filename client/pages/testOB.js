import React from 'react'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';

class OpenBounty extends React.Component {
  state = {
	owner: "",
	lock: "",
	unlock: ""
  }


getOwner = async () => {
    const { accounts, OBContract, web3 } = this.props
    let response = await OBContract.projectOwner.call();
	let res = await OBContract;
	console.log(accounts);
	this.setState({ owner: response })
  }

getIsOwner = async (ownerAddr, myAddr) => {
	  const { accounts, OBContract, web3 } = this.props;
    let response = await OBContract.isProjectOwner.call(ownerAddr, { from: myAddr });
	console.log(response);
	this.setState({ isOwner: response })
  }

changeOwner = async (newAddr, myAddr) => {
	  const { accounts, OBContract, web3 } = this.props;
	await OBContract.changeProjectOwner(newAddr, { from: myAddr })
    alert('Owner Updated')

}

addManager = async (mgrAddr, myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.addManager(mgrAddr, { from: myAddr })
console.log(response);
    alert('Manager Added')

}

deleteManager = async (mgrAddr, myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.delManager(mgrAddr, { from: myAddr })
console.log(response);
    alert('Manager Deleted')

}

isBountyManager = async (mgrAddr, myAddr) => {
	  const { accounts, OBContract, web3 } = this.props;
    let response = await OBContract.isBountyManager.call(mgrAddr, { from: myAddr });
	console.log(response);
	this.setState({ isManager: response })
  }


lockBounty = async (myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.lockProjectBounty({ from: myAddr })
console.log(response);

}

unlockBounty = async (myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.unlockProjectBounty({ from: myAddr })
console.log(response);

}

submitBounty = async (myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.submitBounty(5, "abcd12345", { from: myAddr })
console.log(response);

}

acceptBounty = async (myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.acceptBounty("abcd12345", { from: myAddr })
console.log(response);

}

claimBounty = async (myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.claimBounty(5, { from: myAddr })
console.log(response);

}
transfer = async (fromAddr, toAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.transfer(toAddr, 1000, { from: fromAddr })
console.log(response);

}

balance = async (myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	  let response = await OBContract.balanceOf(myAddr, { from: myAddr })
console.log(response.toNumber());

}
lockBlockNumber = async () => {
    const { accounts, OBContract, web3 } = this.props
    let response = await OBContract.lockBlockNumber.call();
	console.log(response);
	this.setState({ lock: response.toNumber() })
  }
unlockBlockNumber = async () => {
    const { accounts, OBContract, web3 } = this.props
    let response = await OBContract.unlockBlockNumber.call();
	console.log(response);
	this.setState({ unlock: response.toNumber() })
  }

payable = async (myAddr) => {
	const { accounts, OBContract, web3 } = this.props;
	let response = OBContract.send({from: myAddr, value:100000})
console.log(response);

}

  render () {
    const { web3, accounts } = this.props
    return (
		<Layout title="Dapp" description="Decentralized Application">
	      <div>
	        <h1>Open Bounty Testing</h1>

	        <button onClick={this.getOwner.bind(this)}>Get Project Owner</button>
		<button onClick={() => this.getIsOwner(accounts[0], accounts[0])}>Is Project Owner?</button>
		<button onClick={() => this.changeOwner(accounts[1], accounts[0])}>Change Project Owner</button>
		<button onClick={() => this.addManager(accounts[1], accounts[0])}>Add Bounty Manager</button>
		<button onClick={() => this.deleteManager(accounts[1], accounts[0])}>Delete Bounty Manager</button>
		<button onClick={() => this.isBountyManager(accounts[1], accounts[0])}>Is Bounty Manager?</button>

		<button onClick={() => this.balance(accounts[0])}>Balance of accounts[0]</button>
		<button onClick={() => this.balance(accounts[1])}>Balance of accounts[1]</button>
		<button onClick={() => this.balance(accounts[2])}>Balance of accounts[2]</button>

		<button onClick={() => this.transfer(accounts[0], accounts[1])}>Transfer to accounts[1]</button>
		<button onClick={() => this.transfer(accounts[0], accounts[2])}>Transfer to accounts[2]</button>

		<button onClick={() => this.submitBounty(accounts[0])}>Submit Bounty</button>
		<button onClick={() => this.acceptBounty(accounts[1])}>Accept Bounty</button>

		<button onClick={() => this.lockBounty(accounts[0])}>Lock Bounty</button>
		<button onClick={() => this.unlockBounty(accounts[0])}>Unlock Bounty</button>

	        <button onClick={this.lockBlockNumber.bind(this)}>Get Lock Block No</button>
	        <button onClick={this.unlockBlockNumber.bind(this)}>Get Unlock Block No</button>

	        <button onClick={() => this.payable(accounts[0])}>Call Payable</button>
		<button onClick={() => this.claimBounty(accounts[2])}>Claim Bounty</button>

	        <div>Owner: {this.state.owner}</div>
	        <div>Lock Block No.: {this.state.lock}</div>
	        <div>Unlock Block No.: {this.state.unlock}</div>
	      </div>
		</Layout>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <Layout>Testing Contract..</Layout>}
    render={({ web3, accounts, contract, OBContract }) => (
      <OpenBounty web3={web3} accounts={accounts} contract={contract} OBContract={OBContract} />
    )}
  />
)
