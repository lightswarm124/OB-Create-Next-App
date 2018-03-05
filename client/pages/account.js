import React from 'react'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';
import AddressList from '../components/AddressList';
import QRCode from 'qrcode.react';
class Dapp extends React.Component {
  state = {
	  balance: 0,
	  ethBalance: 0,
    projectowner: 0,
    ownerTokenBalance:0,
	  tokenBalance: 0,
	  totalSupply: 0,
    ethaddress: 0x0
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
		<Layout title="OpenBounty - Account Management" description="OpenBounty Account Management">
    <br />
    <b>Account Management</b>
    <hr className="hr" />
        <div className="row">
            <a className="card" id="accountlists">
              <center><h3><b>Account List</b></h3></center>
              <hr className="hr" />
              <p><center><QRCode value="{this.state.ethaddress}" /></center></p>
              <center><h6>Address</h6></center>
              <hr className="hr" />
              <center>{this.state.ethaddress}</center>
              <select>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              <button class="btn btn-secondary" onClick={this.getValue.bind(this)}>Set Address</button>
              <button class="btn btn-secondary" onClick={this.getValue.bind(this)}>Get Balances</button>
            </a>
            <a className="card" id="accountbalances">
              <center><h3><b>Balances</b></h3></center>
                <hr className="hr" />
                <center><h6>Current Balance</h6></center>
                <center>{this.state.balance}</center>
                <hr className="hr" />
                <center><h6>ETH Balance</h6></center>
                <center>{this.state.ethBalance}</center>
                <hr className="hr" />
                <center><h6>Token Balance</h6></center>
                <center>{this.state.ownerTokenBalance}</center>
                <button class="btn btn-secondary" onClick={this.storeValue}>Store 5 to Acct Bal.</button>
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
                <button class="btn btn-secondary" onClick={() => this.transferTokens(accounts[0], accounts[1])}>Transfer to User</button>
                <button class="btn btn-secondary" onClick={() => this.transferTokens(accounts[1], accounts[0])}>Transfer to Owner</button>
            </a>
        </div>
        <br />
        <b>OpenBounty Activity</b>
        <hr className="hr" /><br />
          <div class="row">
            <b>Blockchain Activity</b>
              <hr className="hr" /><br />
                  <a className="cardfull" id="accountactivity" width="100%">
                    someshithere
                  </a>

            </div>
          <br />
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
            color: #9B9B9B;
            border: 1px solid #9B9B9B;
          }
          .card:hover {
            border-color: #b58e12;
          }
          .card h3 {
            margin: 0;
            color: #343a40;
            font-size: 18px;
          }
          .card h6 {
            margin: 0;
            color: #343a40;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #9B9B9B;
          }
        }
        .cardfull {
          padding: 10px 10px 10px;
          width: 100%;
          text-align: left;
          text-decoration: none;
          color: #9B9B9B;
          border: 1px solid #9B9B9B;
        }
        .cardfull:hover {
          border-color: #b58e12;
        }
        .cardfull h3 {
          margin: 0;
          color: #343a40;
          font-size: 18px;
        }
        .cardfull h6 {
          margin: 0;
          color: #343a40;
        }
        .cardfull p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #9B9B9B;
        }
          .hr{
            padding: 0px;
            margin: 0px;
          }
          .btn {
            display: inline-block;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
          }

          .btn:hover, .btn:focus {
            text-decoration: none;
          }

          .btn:focus, .btn.focus {
            outline: 0;
            -webkit-box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);
                    box-shadow: 0 0 0 0.2rem rgba(47, 164, 231, 0.25);
          }

          .btn.disabled, .btn:disabled {
            opacity: 0.65;
          }

          .btn:not(:disabled):not(.disabled) {
            cursor: pointer;
          }

          .btn:not(:disabled):not(.disabled):active, .btn:not(:disabled):not(.disabled).active {
            background-image: none;
          }
          .btn-secondary {
            color: #212529;
            background-color: #e9ecef;
            border-color: #e9ecef;
          }
          .btn-secondary:hover {
            color: #212529;
            background-color: #d3d9df;
            border-color: #cbd3da;
          }
          .btn-secondary:focus, .btn-secondary.focus {
            -webkit-box-shadow: 0 0 0 0.2rem rgba(233, 236, 239, 0.5);
            box-shadow: 0 0 0 0.2rem rgba(233, 236, 239, 0.5);
          }
          .btn-secondary.disabled, .btn-secondary:disabled {
            color: #212529;
            background-color: #e9ecef;
            border-color: #e9ecef;
          }
          .btn-secondary:not(:disabled):not(.disabled):active, .btn-secondary:not(:disabled):not(.disabled).active,
          .show > .btn-secondary.dropdown-toggle {
            color: #212529;
            background-color: #cbd3da;
            border-color: #c4ccd4;
          }
          .btn-secondary:not(:disabled):not(.disabled):active:focus, .btn-secondary:not(:disabled):not(.disabled).active:focus,
          .show > .btn-secondary.dropdown-toggle:focus {
            -webkit-box-shadow: 0 0 0 0.2rem rgba(233, 236, 239, 0.5);
            box-shadow: 0 0 0 0.2rem rgba(233, 236, 239, 0.5);
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
