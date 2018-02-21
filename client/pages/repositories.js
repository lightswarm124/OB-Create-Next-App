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
	      <div>
            <h2><b>Repository Management</b></h2>
            <hr className="hr" />
            <p>&nbsp;Here you will manage your GitHub Repositories and register your project with OpenBounty.</p>
            <div>
            <h4>&nbsp;&nbsp;<b>Owned GitHub Repositories</b></h4>
            <hr className="hr" />
            <table class="table table-hover" width="100%">
              <thead>
                <tr>
                  <th scope="col"><center>Repository Name</center></th>
                  <th scope="col"><center>ETH Address</center></th>
                  <th scope="col"><center>Token Supply</center></th>
                  <th scope="col"><center>Registration</center></th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-active">
                  <td><center>Some-Reponame-v0.01</center></td>
                  <td><center>*ETH ADDRES HERE*</center></td>
                  <td><center>10/18</center></td>
                  <td><center><button onClick={this.getValue.bind(this)}>Register</button></center></td>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
            </div>
            <p />
            <div>
            <h4>&nbsp;&nbsp;<b>Recent GitHub Activity</b></h4>
            <hr className="hr" />
            <table class="table table-hover" width="100%">
              <thead>
                <tr>
                  <th scope="col"><center>Repository Name</center></th>
                  <th scope="col"><center>Timestamp</center></th>
                  <th scope="col"><center>Action</center></th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-active">
                  <td><center>Some-Reponame-v0.01</center></td>
                  <td><center>02-18-2018-01:15:01</center></td>
                  <td><center>(pull/merge/etc)</center></td>
                </tr>
                <tr>

                </tr>

              </tbody>
            </table>
            </div>
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
