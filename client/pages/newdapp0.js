import React from 'react'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';
import AddressList from '../components/AddressList';

class Dapp extends React.Component {
  state = {
	  balance: 0,
	  ethBalance: 0,
    projectowner: 0,
    ownerTokenBalance:0,
	  tokenBalance: 0,
	  totalSupply: 0
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
    const { accounts, contract, web3, OBContract } = this.props

    let response = await contract.get.call({ from: accounts[0] });
	let etherBal = await web3.eth.getBalance(accounts[0]);
  let checkBlock = await OBContract.checkBlockLock();

  //response = response.toNumber();
	console.log(response);
	console.log(etherBal);
  console.log(checkBlock);
	//response = Number(response.substring(2));
    this.setState({ balance: response.toNumber(), ethBalance: etherBal })
  }
  transferTokens = async ( toAddress, fromAddress ) => {
    const { accounts, OBContract, web3 } = this.props;
    let sendTokens = await OBContract.transfer(fromAddress, 1, { from: toAddress });
    let ownerTokenBalanceOf = await OBContract.balanceOf(accounts[0]);
    let tokenBalanceOf = await OBContract.balanceOf(accounts[1]);
    this.setState({ tokenBalance: tokenBalanceOf.toNumber(), ownerTokenBalance: ownerTokenBalanceOf.toNumber() })
  }

  projectInfo = async () => {
    const { accounts, contract, web3, OBContract } = this.props
  let owner = await OBContract.projectOwner();
  //response = response.toNumber();
  console.log(owner);
  this.setState({ projectowner: owner })

  }
  render () {
    const { web3, accounts } = this.props
    return (
		<Layout title="Dapp" description="Decentralized Application">

        <div className="row">
            <a className="card">
            <center><h3>Account List</h3></center>
            <hr className="hr" />
            </a>
            <a className="card">
              <center><h3>Balances</h3></center>
              <hr className="hr" />
              <b>ETH Address:</b> {this.state.projectOwner}<br />
              <b>Current Balance:</b> {this.state.balance}<br />
              <b>Ether Balance:</b> {this.state.ethBalance}<br />
              <b>Token Balance:</b> {this.state.ownerTokenBalance}<br />
              <button onClick={this.storeValue}>Store 5 to Acct Bal.</button>
              <button onClick={this.getValue.bind(this)}>Get Balances</button>
            </a>
            <a className="card">
            <center><h3>Transfer Tokens</h3></center>
            <hr className="hr" />
            <b>ETH Address:</b><input type="text" name="TransferAddress" />
            <b>Owner Token Balance:</b> {this.state.ownerTokenBalance}<br />
            <b>User Token Balance:</b> {this.state.tokenBalance}<br />
            <b>Token Supply:</b> {this.state.tokenSupply}<br />
            <button onClick={() => this.transferTokens(accounts[0], accounts[1])}>Transfer to User</button>
            <button onClick={() => this.transferTokens(accounts[1], accounts[0])}>Transfer to Owner</button>
            </a>
        </div>
        <div className="row">

            <a className="card">
              <center><h3>Last 10 Transactions</h3></center>
              <hr className="hr" />
              1<br />
              2<br />
              3<br />
              5<br />
              4<br />
              6<br />
              7<br />
              9<br />
              8<br />
              10<br />
            </a>
            <a className="card">
              <center><h3>QRCode</h3></center>
              <p>qrcode goes here</p>
            </a>
            <a className="card">
              <center><h3>Backup Account</h3></center>
              <hr className="hr" />
              <p></p>
            </a>
        </div>
        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title, .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 10px 10px 10px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9B9B9B;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
          .hr{
            padding: 0px;
            margin: 0px;
          }
        `}</style>
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
