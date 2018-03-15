import Link from 'next/link';
import Layout from '../components/Layout';
import Web3Container from '../lib/Web3Container';
import getContract from '../lib/getContract';
import GitSearch from '../components/GitSearch';
import GitData from '../components/GitData';
import OpenBountyDefinition from '../../build/contracts/OpenBounty.json';


const Repo = ({...props}) => {
	return (
		<div className="repo">
			<Link href={{ pathname: '/repo', query: { key: props.id } }}>
				<a>Repo Name: {props.name}</a>
			</Link>
			<br />
			<Link href='https://github.com/lightswarm124/OB-Create-Next-App/pulls'><a>Repo_ID: {props.id}</a></Link>
			<p>Repo Description: {props.description}</p>
			<p>Owner UserName: {props.owner.login}</p>
			<p>Owner_ID: {props.owner.id}</p>
			<p>Created At: {props.created_at}</p>
		</div>
	)
}

class Repos extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repos: [],
			currentRepo: undefined,
			userName: undefined,
			loading: true,
		}
	}

	componentDidMount() {
		this.fetchRepos()
			.then(this.deployContract());
	}

	async fetchRepos() {
		const res = await fetch(`https://api.github.com/users/lightswarm124/repos`);
		const data = await res.json();
		return this.setState({
			repos: data,
			loading: false,
		})
	}

	async deployContract() {
		const { accounts, web3, TokenRegistry, OBContract } = this.props;
		console.log(accounts);
		console.log(web3);
		console.log(OBContract.contract);
		console.log(TokenRegistry.contract);

		let newOBContract = await getContract(web3, OpenBountyDefinition).then((inst) => {
			newOBContract = inst;
			console.log(newOBContract);
		});
	}

	render() {
		return(
            <Layout>
                <GitSearch />
                <GitData />
                {this.state.repos.map(repo => <Repo key={repo.id} {...repo} />)}
        </Layout>
    );
};
}

export default () => (
  <Web3Container
    renderLoading={() => <Layout>Testing Contract..</Layout>}
    render={({ web3, accounts, TokenRegistry, OBContract }) => (
      <Repos web3={web3} accounts={accounts} TokenRegistry={TokenRegistry} OBContract={OBContract} />
    )}
  />
)
