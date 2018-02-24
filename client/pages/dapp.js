import React from 'react'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';

class Dapp extends React.Component {
  state = {
	  balance: 0,
	  ethBalance: 0
  }

  storeValue = async () => {
    const { accounts, contract, OBContract } = this.props
    await contract.set(500000000000, { from: accounts[0] })
	console.log(accounts);
	console.log(contract);
	console.log(OBContract);
    alert('Stored 5 into account')
  }

  getValue = async () => {
    const { accounts, contract, web3 } = this.props
    let response = await contract.get.call({ from: accounts[0] });
	let etherBal = await web3.eth.getBalance(accounts[0]);
	//response = response.toNumber();
	console.log(response);
	console.log(etherBal);
	//response = Number(response.substring(2));
    this.setState({ balance: response.toNumber(), ethBalance: etherBal })
  }

  render () {
    const { web3, accounts } = this.props
    return (
		<Layout title="Dapp" description="Decentralized Application">
	      <div>
	        <h1>My Dapp</h1>
	        <button onClick={this.storeValue}>Store 5 into account balance</button>
	        <button onClick={this.getValue.bind(this)}>Get account balance</button>
	        <div>Balance: {this.state.balance}</div>
			<div>EthBalance: {this.state.ethBalance}</div>
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
