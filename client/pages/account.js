import React from 'react'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';
import AddressList from '../components/AddressList';
import Img from 'react-image';




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
	      <div>
            <h2><b>Account Management</b></h2>
            <hr className="hr" />
            <Img src ="../images/Logo_White.jpg" />
	      </div>
        <div className="row">
            <a className="card" id="accountlists">
              <center><h3><b>Account List</b></h3></center>
              <hr className="hr" />
            </a>
            <a className="card" id="accountbalances">
              <center><h3><b>Balances</b></h3></center>
                <hr className="hr" />
                <center><h6>ETH Address</h6></center>
                <center>0x0</center>
                <hr className="hr" />
                <center><h6>Current Balance</h6></center>
                <center>{this.state.balance}</center>
                <hr className="hr" />
                <center><h6>ETH Balance</h6></center>
                <center>{this.state.ethBalance}</center>
                <hr className="hr" />
                <center><h6>Token Balance</h6></center>
                <center>{this.state.ownerTokenBalance}</center>
                <button onClick={this.storeValue}>Store 5 to Acct Bal.</button>
                <button onClick={this.getValue.bind(this)}>Get Balances</button>
            </a>
            <a className="card" id="transfertokens">
              <center><h3><b>Transfer Tokens</b></h3></center>
                <hr className="hr" />
                <center><h6>ETH Address</h6></center>
                <input type="text" name="TransferAddress" /><br />
                <hr className="hr" />
                <center><h6>Owner Token Balance</h6></center>
                <center>{this.state.ownerTokenBalance}</center>
                <hr className="hr" />
                <center><h6>User Token Balance</h6></center>
                <center>{this.state.tokenBalance}</center>
                <hr className="hr" />
                <center><h6>Token Supply</h6></center>
                <center>{this.state.tokenSupply}</center>
                <button onClick={() => this.transferTokens(accounts[0], accounts[1])}>Transfer to User</button>
                <button onClick={() => this.transferTokens(accounts[1], accounts[0])}>Transfer to Owner</button>
            </a>
        </div>
        <div className="row">
            <a className="card" id="last10transactions">
              <center><h3><b>Last 10 Transactions</b></h3></center>
              <hr className="hr" />
              <table class="table table-hover" width="100%">
                <thead>
                  <tr>
                    <th scope="col"><center>Block</center></th>
                    <th scope="col"><center>Transaction</center></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-active">
                    <td><center>*trunca..*</center></td>
                    <td><center>*trunca..*</center></td>
                  </tr>
                  <tr>
                  </tr>
                </tbody>
              </table>

            </a>
            <a className="card" id="qrcode">
              <center><h3>QRCode</h3></center>
              <hr className="hr" />
              <p></p>
              <center><h6>Address</h6></center>
              <hr className="hr" />
              <center>0x0</center>
            </a>
            <a className="card" id="backupaccount">
              <center><h3><b>Backup Account</b></h3></center>
              <hr className="hr" /><br />
              <button onClick={this.getValue.bind(this)}>Backup Account</button>
              <p></p>
              <center><h3><b>Transfer Ownership</b></h3></center>
              <hr className="hr" />
              <center><h6>ETH Address</h6></center>
              <input type="text" id="transferaddress" name="TransferAddress" /><br />
              <button onClick={this.getValue.bind(this)}>Transfer</button><br />


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
