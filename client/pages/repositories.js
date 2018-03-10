import React from 'react'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout';
import AddressList from '../components/AddressList';
import RepositoryInfo from '../components/repositoryInfo';
import GitSearch from '../components/GitSearch';
import GitData from '../components/GitData';


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
<<<<<<< HEAD
		<Layout title="OpenBounty - Repository Management" description="Decentralized Application">
    <div></div>
    <div class="row">
    <b>Repository Management</b>
      <table width="100%">
      <tr>
        <td width="50%"><b>GitHub Repo Search</b></td>
        <td width="50%"><b>GitHub User Search</b></td>
      </tr>
      <tr>
        <td width="50%" valign="top"><GitSearch /></td>
        <td width="50%" valign="top"><GitData /></td>
      </tr>
      </table>


      </div>
=======
		<Layout title="Dapp" description="Decentralized Application">
	      <div>
            <h2>Repository Management</h2>
            <hr className="hr" />
            <p>Here you will manage your GitHub Repositories and register your project with OpenBounty.</p>
            <div>
            <h4>Owned GitHub Repositories</h4>

              <GitSearch />


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
            <h4>Recent GitHub Activity</h4>
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

        <div>
          <RepositoryInfo />
        </div>

>>>>>>> 3fa8c208dfcc5146cbfa0ad1f87bcb276265b20b
        <style jsx>{`
          .hero {
            width: 100%;
            color: #000;
          }
          .title {
            margin: 2 px;
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
          .column {
              float: left;
              width: 50%;
              padding: 10px;

          }
          .row:after {
              content: "";
              display: table;
              clear: both;
          }
          .card {
            padding: 10px 10px 10px;
            width: 40%;
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
          .hr{
            padding: 0px;
            margin: 0px;
            color: #212529;
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
