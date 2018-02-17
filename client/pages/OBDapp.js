import React from 'react'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';

class Dapp extends React.Component {
  state = {
	  balance: 0,
	  ethBalance: 0,
	  projectOwner: "0x0",
	  ownerTokenBalance:0,
	  tokenBalance: 0,
	  totalSupply: 0
  }

  storeValue = async () => {
    const { accounts, contract } = this.props
    await contract.set(500000000000, { from: accounts[0] })
	console.log(accounts);
	console.log(contract);
  }

  getValue = async () => {
    const { accounts, contract, OBContract, web3 } = this.props
	console.log(OBContract);
	let OpenBounty = await OBContract.projectOwner();
    let response = await contract.get.call({ from: accounts[0] });
	let etherBal = await web3.eth.getBalance(accounts[0]);
	let projectTokenSupply = await OBContract.totalSupply();
	//response = response.toNumber();
	console.log(response);
	console.log(etherBal);
	console.log(OpenBounty);
	console.log(projectTokenSupply.toNumber());
	//response = Number(response.substring(2));
    this.setState({ balance: response.toNumber(), ethBalance: etherBal, projectOwner: OpenBounty, tokenSupply: projectTokenSupply.toNumber() })
  }

  transferTokens = async ( toAddress, fromAddress ) => {
	  const { accounts, OBContract, web3 } = this.props;
	  let sendTokens = await OBContract.transfer(fromAddress, 1, { from: toAddress });
	  let ownerTokenBalanceOf = await OBContract.balanceOf(accounts[0]);
	  let tokenBalanceOf = await OBContract.balanceOf(accounts[1]);
	  this.setState({ tokenBalance: tokenBalanceOf.toNumber(), ownerTokenBalance: ownerTokenBalanceOf.toNumber() })
  }

  render () {
    const { web3, accounts } = this.props
    return (
		<Layout title="Dapp" description="Decentralized Application">
	      <div>
	        <h1>My Dapp</h1>

	        <button onClick={this.storeValue}>Store 5 into account balance</button>
	        <button onClick={this.getValue.bind(this)}>Get account balance</button>
			<button onClick={() => this.transferTokens(accounts[0], accounts[1])}>Transfer to Owner</button>
			<button onClick={() => this.transferTokens(accounts[1], accounts[0])}>Transfer to User</button>
	        <div>Balance: {this.state.balance}</div>
			<div>EthBalance: {this.state.ethBalance}</div>
			<div>Project Owner: {this.state.projectOwner}</div>
			<div>User Token Balance: {this.state.tokenBalance}</div>
			<div>Owner Token Balance: {this.state.ownerTokenBalance}</div>
			<div>Token Balance: {this.state.tokenSupply}</div>
		  </div>
		</Layout>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <Layout>Loading Dapp Page...</Layout>}
    render={({ web3, accounts, contract, OBContract }) => (
      <Dapp web3={web3} accounts={accounts} contract={contract} OBContract={OBContract} />
    )}
  />
)
