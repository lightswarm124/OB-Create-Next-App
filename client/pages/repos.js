import Link from 'next/link';
import Layout from '../components/Layout';
import Web3Container from '../lib/Web3Container';
import GitSearch from '../components/GitSearch';
import GitData from '../components/GitData';

class Repos extends React.Component {
	render() {
		const { web3, accounts, OBContract } = this.props;
		return(
            <Layout title="Repository Dashboard">
				<h2>Search Repositories</h2>
                <GitSearch web3={web3} accounts={accounts} OBContract={OBContract} />
				<h2>Search Users</h2>
                <GitData web3={web3} accounts={accounts} OBContract={OBContract} />
        	</Layout>
    	);
	};
}

export default () => (
  	<Web3Container
    	renderLoading={() => <Layout title="Repository Dashboard">Loading..</Layout>}
    	render={({ web3, accounts, TokenRegistry, OBContract }) => (
      		<Repos web3={web3} accounts={accounts} TokenRegistry={TokenRegistry} OBContract={OBContract} />
    	)}
  	/>
)
